class ControladorCupon {
    constructor(cuponService) {
        this.cuponService = cuponService;
    }

    buscarCuponPorNombreYVendedor = async (req, res) => {
        try {
            const { nombre, vendedor_id } = req.params;
            const respuesta = await this.cuponService.buscarCuponPorNombreYVendedor(nombre, vendedor_id);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    buscarCuponPorNombre = async (req, res) => {
        try {
            const { nombre } = req.params;
            const respuesta = await this.cuponService.buscarCuponPorNombre(nombre);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    crearCupon = async (req, res) => {
        try {
            const cupon = req.body;
            const respuesta = await this.cuponService.crearCupon(cupon);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };

    eliminarCuponPorNombreYVendedor = async (req, res) => {
        try {
            const { nombre, vendedor_id } = req.params;
            const respuesta = await this.cuponService.eliminarCuponPorNombreYVendedor(nombre, vendedor_id);
            if (respuesta.error) {
                return res.status(respuesta.code).json(respuesta);
            }
            return res.json(respuesta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}

export default ControladorCupon;