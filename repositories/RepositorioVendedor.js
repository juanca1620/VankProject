import dotenv from 'dotenv';
dotenv.config();
import Vendedor from '../dto/VendedorDTO.js';

class RepositorioVendedor {

    async cambiarBalance (balance, vendedor_id){
        const vendedor = await Vendedor.findOne({where: {id: vendedor_id}})
        const vendedorJson = vendedor.toJSON()
        if(!vendedor){
            return {error: "Vendedor no encontrado", code: 404}
        }
        const nuevoBalance = parseFloat(vendedorJson.balance) + parseFloat(balance)
        if(nuevoBalance < 0){
            return {error: "Fondos insuficientes", code: 400}
        }
        
        await Vendedor.update({balance: nuevoBalance}, {where: {id: vendedor_id}})
        return {"nuevoBalance" : nuevoBalance}
    }

    async obtenerVendedorPorEmail(email){
        const vendedor = await Vendedor.findOne({where: {email : email}}).toJSON()
        if(!vendedor){
            return {error: "Vendedor no encontrado", code: 404}
        }
        return vendedor
    }

    async buscarVendedorPorId(vendedor_id){
        const vendedor = await Vendedor.findOne({where: {id : vendedor_id}})
        if(!vendedor){
            return {error: "Vendedor no encontrado", code: 404}
        }
        const vendedorJson = vendedor.toJSON()
        return vendedorJson;
    }
}

export default  RepositorioVendedor;