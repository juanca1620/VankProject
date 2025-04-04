import ProductoVendedorDTO from "../dto/ProductoVendedorDTO.js"

class RepositorioProductoVendedor {
    async obtenerProductoPorNombreYVendedorId (nombre, vendedor_id) {
        const producto = await ProductoVendedorDTO.findOne({where: {nombre: nombre, vendedor_id: vendedor_id}});
        if (!producto) {
            return { error: "Producto no encontrado", code: 404 }
        }
        return producto.get({ plain: true });
    }

    async crearProductoVendedor (productoVendedor) {
        const productoVendedorCreado = await ProductoVendedorDTO.create(productoVendedor);
        const productoVendedorJSON = productoVendedorCreado.toJSON();
        return productoVendedorJSON;
    }

    async publicarProducto (id){
        const producto = await ProductoVendedorDTO.findByPk(id);
        if (!producto) {
            return { error: "Producto no encontrado", code: 404 };
        }
        producto.publicado = true;
        await producto.save();
        return producto.toJSON();
    }

    async despublicarProducto (id){
        const producto = await ProductoVendedorDTO.findByPk(id);
        if (!producto) {
            return { error: "Producto no encontrado", code: 404 };
        }
        producto.publicado = false;
        await producto.save();
        return producto.toJSON();
    }

    async actualizarPrecioProducto(id, nuevoPrecio) {
        const producto = await ProductoVendedorDTO.findByPk(id);
        if (!producto) {
            return { error: "Producto no encontrado", code: 404 };
        }
        producto.precio = nuevoPrecio;
        await producto.save();
        return producto.toJSON();
    }
}

export default RepositorioProductoVendedor;