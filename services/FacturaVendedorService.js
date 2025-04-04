class FacturaVendedorService {
        constructor(repositorioFactura, repositorioItemFactura, repositorioVendedor, repositorioProvedor, repositorioProducto, repositorioCupon,repositorioProductoVendedor,repositorioStock) {
            this.repositorioFactura = repositorioFactura;
            this.repositorioItemFactura = repositorioItemFactura;
            this.repositorioVendedor = repositorioVendedor;
            this.repositorioProvedor = repositorioProvedor;
            this.repositorioProducto = repositorioProducto;
            this.repositorioCupon = repositorioCupon;
            this.repositorioProductoVendedor = repositorioProductoVendedor;
            this.repositorioStock = repositorioStock;
        }

    async crearFactura(factura) {
            const items_factura = factura.items_factura;
            const promesasBuscarProducto = items_factura.map(async item_factura => {
                return this.repositorioProducto.buscarProductoPorId(item_factura.producto_id);
            });

            const vendedor = this.repositorioVendedor.buscarVendedorPorId(factura.vendedor_id);
            const provedor = this.repositorioProvedor.buscarProveedorPorId(factura.proveedor_id);

            const promesasGeneral = [vendedor, provedor, Promise.all(promesasBuscarProducto)];
            const resultadoPromesas = await Promise.all(promesasGeneral);

            const promesasTerminadas = resultadoPromesas[2];
            let indexNull;

            promesasTerminadas.forEach((item_factura, index) => {
                if (item_factura.error) {
                    indexNull = index = 1;
                }
            });


            if (indexNull !== undefined) {
                return { error: `Producto no encontrado en el item ${indexNull}`, code: 404 };
            }

            if (resultadoPromesas[0].error) {
                return resultadoPromesas[0];
            }

            if (resultadoPromesas[1].error) {
                return resultadoPromesas[1];
            }

            let descuento_porcentaje = 0;
            if (factura.cupon) {
                const cupon = await this.repositorioCupon.buscarCuponPorNombreYProveedor(factura.cupon, factura.proveedor_id);
                if (cupon.error) {
                    return cupon;
                }
                descuento_porcentaje = cupon.descuento_porcentaje;
            }

            const valorTotal = promesasTerminadas.reduce((valor_anterior, item_factura) => valor_anterior + parseInt(item_factura.precio),0);

            await this.repositorioVendedor.cambiarBalance(-valorTotal, factura.vendedor_id);

            const facturaJSON = {
                proveedor_id: factura.proveedor_id,
                vendedor_id: factura.vendedor_id,
                valor_total: valorTotal,
                descuento_aplicado : valorTotal - descuento_porcentaje/100 * valorTotal
            };

            const facturaCreada = await this.repositorioFactura.crearFacturaProvedor(facturaJSON);
            const itemsFacturaPromises = await items_factura.map(async (item_factura ,index ) => {
                item_factura.factura_id = facturaCreada.id;
                const productoVendedor =  await this.repositorioProductoVendedor.obtenerProductoPorNombreYVendedorId(promesasTerminadas[index].nombre, factura.vendedor_id);
                if(productoVendedor.error){
                    const promesaStock = await this.repositorioStock.crearStock(item_factura.cantidad_producto);

                    const productoJSON = {
                        nombre: promesasTerminadas[index].nombre,
                        precio: promesasTerminadas[index].precio,
                        descripcion: promesasTerminadas[index].descripcion,
                        url_imagen: promesasTerminadas[index].url_imagen,
                        vendedor_id: factura.vendedor_id,
                        stock_id : promesaStock.id
                    }
                    
                    await this.repositorioProductoVendedor.crearProductoVendedor(productoJSON);

                }else{
                    const stock = await this.repositorioStock.buscarStockPorId(productoVendedor.stock_id);
                    stock.cantidad = stock.cantidad + item_factura.cantidad_producto
                    await this.repositorioStock.cambiarStock(stock)
                }
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