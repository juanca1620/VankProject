import dotenv from 'dotenv';
dotenv.config();
import Vendedor from '../dto/VendedorDTO.js';

class RepositorioVendedor {

    async cambiarBalance (balance, vendedor_id){
        const vendedor = await Vendedor.findOne({where: {id: vendedor_id}}).toJSON()
        if(!vendedor){
            return {error: "Vendedor no encontrado", code: 404}
        }
        const nuevoBalance = vendedor.balance + balance
        if(nuevoBalance < 0){
            return {error: "Fondos insuficientes", code: 400}
        }

        const usuarioActualizado = await Vendedor.update({balance: nuevoBalance}, {where: {id: vendedor_id}}).toJSON()

        return {"nuevoBalance" : usuarioActualizado.balance}
    }

    async obtenerVendedorPorEmail(email){
        const vendedor = await Vendedor.findOne({where: {email : email}}).toJSON()
        if(!vendedor){
            return {error: "Vendedor no encontrado", code: 404}
        }
        return vendedor
    }
}

export default  RepositorioVendedor;