class CuponVendedorService {
    constructor(repositorioCupon,repositorioVendedor) {
        this.repositorioCupon = repositorioCupon;
        this.repositorioVendedor = repositorioVendedor;
    }

    async buscarCuponPorNombreYProveedor(nombre, vendedor_id) {
        return await this.repositorioCupon.buscarCuponPorNombreYVendedor(nombre, vendedor_id);
    }

    async buscarCuponPorNombre(nombre) {
        return await this.repositorioCupon.buscaCuponPorNombre(nombre);
    }

    async crearCupon(cupon) {
        const vendedor = await this.repositorioVendedor.buscarVendedorPorId(cupon.vendedor_id);

        
        if(vendedor.error){
            return vendedor;
        }
        return await this.repositorioCupon.crearCupon(cupon);
    }

    async eliminarCuponPorNombreYProveedor(nombre, vendedor_id) {
        return await this.repositorioCupon.eliminarCuponPorNombreYVendedor(nombre, vendedor_id);
    }
}

export default CuponVendedorService;
