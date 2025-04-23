import Cupon from "../dto/CuponVendedorDTO.js";

class RepositorioCuponVendedor {

    async buscarCuponPorNombreYVendedor(nombre, vendedor_id){
        const cupon = await Cupon.findOne({where: {nombre: nombre, vendedor_id: vendedor_id}})
        if(!cupon){
            return {error: "Cupon no encontrado", code: 404}
        }
        const cuponJson = cupon.toJSON()
        return cuponJson;
    }

    async buscaCuponPorNombre (nombre){
        const cupon = await Cupon.findOne({where: {nombre: nombre}})
        if(!cupon){
            return {error: "Cupon no encontrado", code: 404}
        }
        const cuponJson = cupon.toJSON()
        return cuponJson;
    }

    async crearCupon(cupon){
        const cuponCreado = await Cupon.create(cupon);
        const cuponJson = cuponCreado.toJSON();
        return cuponJson;
    }

    async eliminarCuponPorNombreYVendedor(nombre, vendedor_id){
        const cuponEncontrado = await this.buscarCuponPorNombreYVendedor(nombre, vendedor_id);
        if(cuponEncontrado.error){
            return cuponEncontrado;
        }
        await Cupon.destroy({where: {nombre: nombre, vendedor_id: vendedor_id}});

        return cuponEncontrado;
    }
}

export default RepositorioCuponVendedor;