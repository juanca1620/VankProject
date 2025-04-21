import ComentarioDto from "../dto/ComentarioDTO.js";

class RepositorioComentario {
    // Obtener comentarios por producto_id
    async obtenerComentariosPorProductoId(id) {
        const comentarios = await ComentarioDto.findAll({ where: { producto_id: id } });
        return comentarios.map(comentario => comentario.get({ plain: true }));
    }

    // Obtener comentario por id
    async obtenerComentarioPorId(id) {
        const comentario = await ComentarioDto.findByPk(id);
        if (!comentario) {
            return { error: "Comentario no encontrado", code: 404 };
        }
        return comentario.get({ plain: true });
    }

    // Obtener todos los comentarios por cliente_id
    async obtenerComentariosPorClienteId(cliente_id) {
        const comentarios = await ComentarioDto.findAll({ where: { cliente_id } });
        return comentarios.map(comentario => comentario.get({ plain: true }));
    }

    // Crear un nuevo comentario
    async crearComentario(comentarioData) {
        const nuevoComentario = await ComentarioDto.create(comentarioData);
        return nuevoComentario.toJSON();
    }

    // Actualizar un comentario por id
    async actualizarComentario(id, comentarioData) {
        const comentario = await ComentarioDto.findByPk(id);
        if (!comentario) {
            return { error: "Comentario no encontrado", code: 404 };
        }
        await comentario.update(comentarioData);
        return comentario.toJSON();
    }

    // Eliminar un comentario por id
    async eliminarComentario(id) {
        const comentario = await ComentarioDto.findByPk(id);
        if (!comentario) {
            return { error: "Comentario no encontrado", code: 404 };
        }
        await comentario.destroy();
        return { message: "Comentario eliminado correctamente", code: 200 };
    }
}

export default RepositorioComentario;