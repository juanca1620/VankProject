import itemFacturaProvedor from "../dto/ItemFacturaVendedorDTO.js"

class RepositorioItemFacturaVendedor {
    async crearItemFactura(itemFactura) {
        const itemFacturaCreado = await itemFacturaProvedor.create(itemFactura);
        const itemFacturaJSON = itemFacturaCreado.toJSON();
        return itemFacturaJSON;
    }

    async buscarItemFacturaPorFacturaId (factura_id){
        const itemFactura = await itemFacturaProvedor.findAll({where: {factura_id: factura_id}});
        if (!itemFactura) {
            return { error: "ItemFactura no encontrado", code: 404 }
        }
        return itemFactura;
    }
}

export default RepositorioItemFacturaVendedor;