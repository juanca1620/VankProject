class ComentarioService {

    constructor(repositorioComentario, repositorioProducto) {
        this.repositorioComentario = repositorioComentario;
        this.repositorioProducto = repositorioProducto;
    }

    async obtenerComentariosPorProductoId(id){
        const producto = await this.repositorioProducto.buscarProductoPorId(id);
        if (producto.error) {
            return producto;
        }

        const comentarios = await this.repositorioComentario.obtenerComentariosPorProductoId(id);

        return comentarios;
    }
}

export default ComentarioService;