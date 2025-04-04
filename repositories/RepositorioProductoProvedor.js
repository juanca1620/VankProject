import dotenv from 'dotenv';
import productoProvedorDTO from '../dto/ProductoProveedorDTO.js';
import { Op } from 'sequelize';
dotenv.config();

class RepositorioProductoProvedor {
    
    async crearProducto(producto) {
        const guardarProducto = await productoProvedorDTO.create(producto);
        const productoJSON = guardarProducto.toJSON();
        return productoJSON;
    }

    async buscarProductoPorId(id) {
        const producto = await productoProvedorDTO.findByPk(parseInt(id));
        if (!producto) {
            return { error: "Producto no encontrado", code: 404 }
        }
        return producto.toJSON();
    }

    async buscarPorPalabraClave(palabraClave) {
        const productos = await productoProvedorDTO.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${palabraClave}%`
                }
            }
        });
        const productosJSON = productos.map((producto) => producto.toJSON());

        return productosJSON;
    }

    async actualizarProducto(producto) {
        const productoEncontrado = await productoProvedorDTO.findByPk(producto.id);
        if (!productoEncontrado) {
            return { error: "Producto no encontrado", code: 404 }
        }
        delete producto.provedor_id
        await productoProvedorDTO.update(producto, {
            where: {
                id: producto.id
            }
        });

        const productoActualizado = await this.buscarProductoPorId(producto.id)
        return productoActualizado
    }

    async eliminarProducto(id){
        const producto = await productoProvedorDTO.findByPk(id);
        if (!producto) {
            return { error: "Producto no encontrado", code: 404 }
        }
        await productoProvedorDTO.destroy({
            where: {
                id: id
            }
        });
        return producto.toJSON();
    }

    async buscarPorProvedorId(id) {
        const productos = await productoProvedorDTO.findAll({
            where: {
                provedor_id: id
            }
        });

        const productosJSON = productos.map((producto) => producto.toJSON());

        return productosJSON;
    }
}

export default RepositorioProductoProvedor;