import FacturaVendedor from '../dto/FacturaVendedorDTO';

class RepositorioFacturaVendedor {
    async crearFacturaVendedor(facturaVendedor) {
        const facturaVendedorCreada = await FacturaVendedor.create(facturaVendedor);
        const facturaVendedorJSON = facturaVendedorCreada.toJSON();
        return facturaVendedorJSON;
    }

    async buscarFacturaID (id) {
        const factura = await FacturaVendedor.findByPk(parseInt(id));
        if (!factura) {
            return {error: "Factura no encontrada", code: 404}
        }
        return factura.toJSON();
    }
}

export default RepositorioFacturaVendedor;