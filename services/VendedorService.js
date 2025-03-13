class VendedorService {

    constructor(repositorio){
        this.repositorio = repositorio;
    }

    async cambiarBalance(balance, vendedor_id) {
        return this.repositorio.cambiarBalance(balance, vendedor_id);
    }
}

export default VendedorService;