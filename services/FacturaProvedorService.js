class FacturaProvedorService {
    constructor(repositorioFactura, repositorioItemFactura, repositorioCliente, repositorioProvedor,repositorioProducto) {
        this.repositorioFactura = repositorioFactura;
        this.repositorioItemFactura = repositorioItemFactura;
        this.repositorioCliente = repositorioCliente;
        this.repositorioProvedor = repositorioProvedor;
        this.repositorioProducto = repositorioProducto;
    }

    async crearFactura(factura) {
        items_factura = factura.items_factura;
        const promesasBuscarProducto = items_factura.map(async item_factura => {
            this.repositorioProducto.buscarProductoPorId(item_factura.producto_id);
        })

        const promesasTerminadas = Promise.all(promesasBuscarProducto);

        const indexNull = promesasTerminadas.indexOf(null);

        if(indexNull != -1){
            return {error: `producto no encontrado en el item ${indexNull}`, code: 404}
        }
    }
}

export default FacturaProvedorService;