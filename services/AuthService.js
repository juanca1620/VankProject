class AuthService{
    constructor(repository){
        this.repository = repository
    }

    async register(usuarioInfo){
        return this.repository.register(usuarioInfo);
    }

    async login(loginInfo){
        return this.repository.login(loginInfo);
    }
}

export default AuthService;