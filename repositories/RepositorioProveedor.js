import ProveedorDTO from '../dto/ProvedorDTO.js';

class RepositorioProveedor {
    async buscarProveedorPorId(id){
        const provedor = await ProveedorDTO.findByPk(id);
        if(!provedor){
            return {error: "provedor no encontrado",code : 404}
        }
        return provedor.toJSON();
    }
}

export default RepositorioProveedor;