import dotenv from 'dotenv';
import ProveedorDTO from '../dto/ProvedorDTO.js';
dotenv.config();

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