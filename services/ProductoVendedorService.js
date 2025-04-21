class ProductoProvedorService {

    constructor (repositorioProductoProvedor,repositorioStock) {
        this.repositorioProductoProvedor = repositorioProductoProvedor;
        this.repositorioStock = repositorioStock;
    }

    async publicarProducto (producto) {
        const productoEncontrado = await this.repositorioProductoProvedor.obtenerProductoPorNombreYVendedorId(producto.nombre, producto.vendedor_id);
        if (productoEncontrado.error) {
            return productoEncontrado;
        }

        if(productoEncontrado.publicado){
            return {error : 'El producto ya fue publicado', code : 400}
        }

        const stock = await this.repositorioStock.buscarStockPorId(productoEncontrado.stock_id);
        if(stock.cantidad < 1){
            return {error : 'No hay stock suficiente', code : 400}
        }
        
        await this.repositorioProductoProvedor.publicarProducto(productoEncontrado.id);

        return {message : 'Producto publicado correctamente', code : 200}
    }

    async despublicarProducto (producto) {
        const productoEncontrado = await this.repositorioProductoProvedor.obtenerProductoPorNombreYVendedorId(producto.nombre, producto.vendedor_id);
        if (productoEncontrado.error) {
            return productoEncontrado;
        }

        if(!productoEncontrado.publicado){
            return {error : 'El producto ya fue despublicado', code : 400}
        }

        await this.repositorioProductoProvedor.despublicarProducto(productoEncontrado.id)

        return {message : 'Producto despublicado correctamente', code : 200}
    }

    async actualizarPrecioProducto(producto) {
        const productoEncontrado = await this.repositorioProductoProvedor.obtenerProductoPorNombreYVendedorId(producto.nombre, producto.vendedor_id);
        if (productoEncontrado.error) {
            return productoEncontrado;
        }
    
        if (producto.nuevoPrecio < 0) {
            return { error: "El precio no puede ser negativo", code: 400 };
        }
    
        return await this.repositorioProductoProvedor.actualizarPrecioProducto(productoEncontrado.id, producto.nuevoPrecio);
    }

    async obtenerProductosPublicados() {
        const productos = await this.repositorioProductoProvedor.obtenerProductosPublicados();
        if (productos.error) {
            return productos;
        }
        return { productos, code: 200 };
    }
}

export default ProductoProvedorService;