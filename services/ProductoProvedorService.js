class ProductoProvedorService {
    constructor(productoProvedorRepository,provedorRepository) {
        this.productoProvedorRepository = productoProvedorRepository;
        this.provedorRepository = provedorRepository;
    }

    async crearProducto(producto) {
        const provedor = await this.existeProvedor(producto.provedor_id)
        if(!provedor){
            return {error : 'Provedor inexistente', code : 404}
        }
        return await this.productoProvedorRepository.crearProducto(producto)
    }

    async buscarProductoPorId (id) {
        return await this.productoProvedorRepository.buscarProductoPorId(id);
    }

    async buscarPorPalabraClave (palabraClave){
        return await this.productoProvedorRepository.buscarPorPalabraClave(palabraClave)
    }

    async eliminarProductoPorId (id){
        return await this.productoProvedorRepository.eliminarProducto(id)
    }

    async actualizarProducto (producto){
        return await this.productoProvedorRepository.actualizarProducto(producto)
    }

    async buscarProductoPorProvedorId (provedor_id){
        const provedor = this.existeProvedor(provedor_id)
        if(!provedor){
            return {error : 'Provedor inexistente', code : 404}
        }

        return await this.productoProvedorRepository.buscarPorProvedorId(provedor_id)
    }

    async existeProvedor (provedor_id){
        const provedor = await this.provedorRepository.buscarProveedorPorId(provedor_id)

        return provedor.error == undefined
    }
}

export default ProductoProvedorService