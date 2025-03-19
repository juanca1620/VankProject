import { FacturaProvedor } from '../dto/FacturaProveedorDTO.js';

class RepositorioFacturaProvedor {
    async crearFacturaProvedor(facturaProvedor) {
        const facturaProvedorCreada = await FacturaProvedor.create(facturaProvedor);
        const facturaProvedorJSON = facturaProvedorCreada.toJSON();
        return facturaProvedorJSON
    }
}

export default RepositorioFacturaProvedor;