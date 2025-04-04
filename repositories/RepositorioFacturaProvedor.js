import FacturaProvedor from '../dto/FacturaProveedorDTO.js';

class RepositorioFacturaProvedor {
    async crearFacturaProvedor(facturaProveedor) {
        const facturaProvedorCreada = await FacturaProvedor.create(facturaProveedor);
        const facturaProvedorJSON = facturaProvedorCreada.toJSON();
        return facturaProvedorJSON
    }

    async buscarFacturaPorId (id) {
        const factura = await FacturaProvedor.findByPk(parseInt(id));
        if (!factura) {
            return { error: "Factura no encontrada", code: 404 }
        }
        return factura.toJSON();
    }
}

export default RepositorioFacturaProvedor;