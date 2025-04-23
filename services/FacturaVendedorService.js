class FacturaVendedorService {
    constructor(repositorioFactura, repositorioItemFactura, repositorioVendedor, repositorioCliente, repositorioProducto, repositorioCupon, repositorioProductoVendedor, repositorioStock) {
        this.repositorioFactura = repositorioFactura;
        this.repositorioItemFactura = repositorioItemFactura;
        this.repositorioVendedor = repositorioVendedor;
        this.repositorioCliente = repositorioCliente;
        this.repositorioProducto = repositorioProducto;
        this.repositorioCupon = repositorioCupon;
        this.repositorioStock = repositorioStock;
    }

    async crearFactura(factura) {
        const items_factura = factura.items_factura;

        // Validar productos en la factura
        const promesasBuscarProducto = items_factura.map(async item_factura => {
            return this.repositorioProducto.obtenerProductoPorIdYVendedorId(item_factura.producto_id, factura.vendedor_id);
        });

        const vendedor = this.repositorioVendedor.buscarVendedorPorId(factura.vendedor_id);
        const cliente = this.repositorioCliente.buscarClientePorId(factura.cliente_id);

        const promesasGeneral = [vendedor, cliente, Promise.all(promesasBuscarProducto)];
        const resultadoPromesas = await Promise.all(promesasGeneral);

        const productosEncontrados = resultadoPromesas[2];
        let indexSinStock;

        // Verificar stock disponible para cada producto
        for (let i = 0; i < productosEncontrados.length; i++) {
            const producto = productosEncontrados[i];
            if (producto.error) {
                return { error: `Producto no encontrado en el item ${i}`, code: 404 };
            }

            const stock = await this.repositorioStock.buscarStockPorId(producto.stock_id);
            if (stock.error || stock.cantidad < items_factura[i].cantidad_producto) {
                indexSinStock = i;
                break;
            }
        }

        if (indexSinStock !== undefined) {
            return { error: `Stock insuficiente para el producto en el item ${indexSinStock}`, code: 400 };
        }

        if (resultadoPromesas[0].error) {
            return resultadoPromesas[0];
        }

        if (resultadoPromesas[1].error) {
            return resultadoPromesas[1];
        }

        // Aplicar descuento si hay un cupón
        let descuento_porcentaje = 0;
        if (factura.cupon) {
            const cupon = await this.repositorioCupon.buscarCuponPorNombreYVendedor(factura.cupon, factura.vendedor_id);
            if (cupon.error) {
                return cupon;
            }
            descuento_porcentaje = cupon.descuento_porcentaje;
        }

        // Calcular el valor total de la factura
        const valorTotal = productosEncontrados.reduce((valor_anterior, producto, index) => {
            return valor_anterior + producto.precio * items_factura[index].cantidad_producto;
        }, 0);

        // Crear la factura
        const facturaJSON = {
            cliente_id: factura.cliente_id,
            vendedor_id: factura.vendedor_id,
            valor_total: valorTotal,
            descuento_aplicado: valorTotal - (descuento_porcentaje / 100) * valorTotal
        };

        const facturaCreada = await this.repositorioFactura.crearFacturaVendedor(facturaJSON);

        // Crear los ítems de la factura y restar el stock
        const itemsFacturaPromises = items_factura.map(async (item_factura, index) => {
            item_factura.factura_id = facturaCreada.id;
            item_factura.precio_unitario = productosEncontrados[index].precio;

            // Restar el stock del producto
            const stock = await this.repositorioStock.buscarStockPorId(productosEncontrados[index].stock_id);
            stock.cantidad -= item_factura.cantidad_producto;
            await this.repositorioStock.cambiarStock(stock);

            return this.repositorioItemFactura.crearItemFactura(item_factura);
        });

        await Promise.all(itemsFacturaPromises);

        return facturaCreada;
    }

    async obtenerFacturaPorId(id) {
        return await this.repositorioFactura.buscarFacturaPorId(id);
    }

    async obtenerItemsFacturaPorIdFactura(id_factura) {
        return await this.repositorioItemFactura.buscarItemFacturaPorFacturaId(id_factura);
    }
}

export default FacturaVendedorService;