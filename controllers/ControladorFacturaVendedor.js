class ControladorFacturaVendedor{
    constructor(servicioFacturaVendedor){
        this.servicioFacturaVendedor = servicioFacturaVendedor;
    }

    crearFacturaVendedor = async(req, res) => {
        try {
            const factura = req.body;
            const respuesta = await this.servicioFacturaVendedor.crearFactura(factura);
            if(respuesta.error) {
                res.status(respuesta.code).json(respuesta);
            } else {
                res.status(201).json(respuesta);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    obtenerFacturaId = async(req, res) => {
        try {
            const id = req.params.id;
            const respuesta = await this.servicioFacturaVendedor.obtenerFacturaId(id);
            if(respuesta.error) {
                res.status(respuesta.code).json(respuesta);
            } else {
                res.status(200).json(respuesta);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    obtenerItemFacturaPorID = async(req, res) => {
        try {
            const id = req.params.id;
            const respuesta = await this.servicioFacturaVendedor.obtenerItemFacturaPorID(id);
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

export default ControladorFacturaVendedor;