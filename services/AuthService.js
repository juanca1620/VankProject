class AuthService{
    constructor(repository){
        this.repository = repository
    }

    async register(usuarioInfo){
        return this.repository.register(usuarioInfo);
    }
}

export default AuthService;