class ComentarioService {
    constructor(repositorioComentario, repositorioProducto, repositorioClienteProducto, repositorioCliente) {
        this.repositorioComentario = repositorioComentario;
        this.repositorioProducto = repositorioProducto;
        this.repositorioClienteProducto = repositorioClienteProducto;
        this.repositorioCliente = repositorioCliente;
    }
    async obtenerComentariosPorProductoId(id) {
        const producto = await this.repositorioProducto.buscarProductoPorId(id);
        if (producto.error) {
            return producto;
        }

        const comentarios = await this.repositorioComentario.obtenerComentariosPorProductoId(id);
        return comentarios;
    }

    async obtenerComentariosPorClienteId(cliente_id) {
        const cliente = await this.repositorioCliente.buscarClientePorId(cliente_id);
        if (cliente.error) {
            return cliente;
        }

        const comentarios = await this.repositorioComentario.obtenerComentariosPorClienteId(cliente_id);
        return comentarios;
    }

    async crearComentario(comentario) {
        const { cliente_id, producto_id } = comentario;

        const cliente = await this.repositorioCliente.buscarClientePorId(cliente_id);
        if (cliente.error) {
            return cliente;
        }

        // Verificar que el producto exista
        const producto = await this.repositorioProducto.buscarProductoPorId(producto_id);
        if (producto.error) {
            return producto;
        }

        // Verificar que el cliente haya comprado el producto
        const clienteProducto = await this.repositorioClienteProducto.buscarProductoPorClienteYProductoId(cliente_id, producto_id);
        if (clienteProducto.error) {
            return { error: "El cliente no ha comprado este producto, no puede comentar", code: 403 };
        }

        const nuevoComentario = await this.repositorioComentario.crearComentario(comentario);
        return nuevoComentario;
    }
}

export default ComentarioService;