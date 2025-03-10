class AuthController {
  constructor(authService) {
    console.log(authService)
    this.authService = authService;
  }
  
  async register(req, res) {
      const resp = await this.authService.register(req.body).bind();
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
      } catch (error) {
      return res.status(500).json({ error: error.message });

    }

  
}

export default AuthController;