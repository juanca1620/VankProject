import itemFacturaProvedor from '../dto/ItemFacturaProveedorDTO'

class RepositorioItemFacturaProvedor {
    async crearItemFactura(itemFactura) {
        const itemFacturaCreado = await itemFacturaProvedor.create(itemFactura);
        const itemFacturaJSON = itemFacturaCreado.toJSON();
        return itemFacturaJSON;
    }
}

export default RepositorioItemFacturaProvedor;