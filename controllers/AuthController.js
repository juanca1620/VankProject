class AuthController {
  constructor(authService) {
    console.log(authService);
    this.authService = authService;
  }

  login = async (req, res) => {
    try {
      const resp = await this.authService.login(req.body);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  register = async (req, res) => {
    try {
      const resp = await this.authService.register(req.body);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default AuthController;