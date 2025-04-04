class ControladorComentario {
    constructor(servicio){
        this.servicio = servicio;
    }

    obtenerComentariosPorProductoId = async(req, res) => {
        try {
            const id = req.params.id;
            const respuesta = await this.servicio.obtenerComentariosPorProductoId(id);
            if(respuesta.error) {
                res.status(respuesta.code).json(respuesta);
            } else {
                res.status(200).json(respuesta);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

export default ControladorComentario;