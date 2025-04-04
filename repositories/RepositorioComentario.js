import ComentarioDto from "../dto/ComentarioDTO.js"

class RepositorioComentario {

    async obtenerComentariosPorProductoId(id){
        const comentarios = await ComentarioDto.findAll({where: {producto_id: id}});
        const comentariosJson = comentarios.map(comentario => comentario.get({plain: true}));
        return comentarios;
    }
}

export default RepositorioComentario;