class ControladorProductoProvedor {
  constructor(productoVendedorService) {
    this.productoVendedorService = productoVendedorService;
  }

  publicarProducto = async (req, res) => {
    try {
      const resp = await this.productoVendedorService.publicarProducto(req.body);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  despublicarProducto = async (req, res) => {
    try {
      const resp = await this.productoVendedorService.despublicarProducto(req.body);
      if (resp.error) {
        return res.status(resp.code).json(resp);
      }
      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  actualizarPrecioProducto = async (req, res) => {
    try {
        const resp = await this.productoVendedorService.actualizarPrecioProducto(req.body);
        if (resp.error) {
            return res.status(resp.code).json(resp);
        }
        return res.json(resp);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

obtenerProductosPublicados = async (req, res) => {
  try {
      const resp = await this.productoVendedorService.obtenerProductosPublicados();
      if (resp.error) {
          return res.status(resp.code).json(resp);
      }
      return res.json(resp);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
}
}

export default ControladorProductoProvedor;