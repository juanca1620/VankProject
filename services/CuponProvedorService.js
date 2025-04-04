class CuponProvedorService {
    constructor(repositorioCupon,repositorioProveedor) {
        this.repositorioCupon = repositorioCupon;
        this.repositorioProveedor = repositorioProveedor;
    }

    async buscarCuponPorNombreYProveedor(nombre, proveedor_id) {
        return await this.repositorioCupon.buscarCuponPorNombreYProveedor(nombre, proveedor_id);
    }

    async buscarCuponPorNombre(nombre) {
        return await this.repositorioCupon.buscaCuponPorNombre(nombre);
    }

    async crearCupon(cupon) {
        const proveedor = await this.repositorioProveedor.buscarProveedorPorId(cupon.proveedor_id);

        
        if(proveedor.error){
            return proveedor;
        }
        return await this.repositorioCupon.crearCupon(cupon);
    }

    async eliminarCuponPorNombreYProveedor(nombre, proveedor_id) {
        return await this.repositorioCupon.eliminarCuponPorNombreYProvedor(nombre, proveedor_id);
    }
}

export default CuponProvedorService;
