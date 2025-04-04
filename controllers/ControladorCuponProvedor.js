class ControladorCupon {
    constructor(cuponService) {
        this.cuponService = cuponService;
    }

    buscarCuponPorNombreYProveedor = async (req, res) => {
        try {
            const { nombre, proveedor_id } = req.params;
            const respuesta = await this.cuponService.buscarCuponPorNombreYProveedor(nombre, proveedor_id);
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

    eliminarCuponPorNombreYProveedor = async (req, res) => {
        try {
            const { nombre, proveedor_id } = req.params;
            const respuesta = await this.cuponService.eliminarCuponPorNombreYProveedor(nombre, proveedor_id);
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