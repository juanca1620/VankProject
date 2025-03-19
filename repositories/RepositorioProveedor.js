import ProveedorDTO from '../dto/ProvedorDTO.js';

class RepositorioProveedor {
    async buscarProvedorPorId (id) {
        const provedor = await ProveedorDTO.findByPk(id);
        if(!provedor){
            return {error: "provedor no encontrado",code : 404}
        }
        return provedor
    }
}

export default RepositorioProveedor;