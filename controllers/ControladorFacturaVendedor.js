class ControladorFacturaVendedor {
    constructor(servicioFacturaVendedor) {
        this.servicioFacturaVendedor = servicioFacturaVendedor;
    }

    crearFacturaVendedor = async (req, res) => {
        try {
            const factura = req.body;
            const respuesta = await this.servicioFacturaVendedor.crearFactura(factura);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.status(201).json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    obtenerFacturaPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const respuesta = await this.servicioFacturaVendedor.obtenerFacturaPorId(id);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.status(200).json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    obtenerItemsFacturaPorIdFactura = async (req, res) => {
        try {
            const id_factura = req.params.id_factura;
            const respuesta = await this.servicioFacturaVendedor.obtenerItemsFacturaPorIdFactura(id_factura);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.status(200).json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default ControladorFacturaVendedor;