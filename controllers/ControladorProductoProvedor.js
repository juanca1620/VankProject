class ControladorProductoProvedor {
  constructor(productoProvedorService) {
    this.productoProvedorService = productoProvedorService;
  }

  crearProducto = async (req, res) => {
    try {
      const resp = await this.productoProvedorService.crearProducto(req.body);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  buscarProductoPorId = async (req, res) => {
    try {
      const id = req.params.id
      if(id == undefined){
        return res.status(400).json({error:"id no proporcionado"})
      }
      const resp = await this.productoProvedorService.buscarProductoPorId(req.params.id);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  buscarPorPalabraClave = async (req, res) => {
    try {
      const resp = await this.productoProvedorService.buscarPorPalabraClave(req.query.palabraClave);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  eliminarProductoPorId = async (req, res) => {
    try {
      const resp = await this.productoProvedorService.eliminarProductoPorId(req.params.id);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  actualizarProducto = async (req, res) => {
    try {
      const resp = await this.productoProvedorService.actualizarProducto(req.body);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  buscarProductoPorProvedorId = async (req, res) => {
    try {
      const resp = await this.productoProvedorService.buscarProductoPorProvedorId(req.params.provedor_id);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default ControladorProductoProvedor;