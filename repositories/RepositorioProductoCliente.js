import ProductoClienteView from "../dto/ClienteProductoDto.js";

class RepositorioProductoCliente {
    
    async buscarProductoPorClienteYProductoId(cliente_id, producto_id) {
        const producto = await ProductoClienteView.findOne({
            attributes: { exclude: ['id'] }, // Excluye el campo id
            where: {
              cliente_id: cliente_id,
              producto_id: producto_id
            }
          });

        if (!producto) {
            return { error: "Producto no encontrado para el cliente especificado", code: 404 };
        }

        return producto.get({ plain: true });
    }
}

export default RepositorioProductoCliente;

