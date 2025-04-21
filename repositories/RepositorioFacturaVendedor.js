import FacturaVendedorDTO from '../dto/FacturaVendedorDTO.js';

class RepositorioFacturaVendedor {
    // Crear una nueva factura de vendedor
    async crearFacturaVendedor(facturaVendedor) {
        const facturaVendedorCreada = await FacturaVendedorDTO.create(facturaVendedor);
        return facturaVendedorCreada.toJSON();
    }

    // Buscar una factura por ID
    async buscarFacturaPorId(id) {
        const factura = await FacturaVendedorDTO.findByPk(parseInt(id));
        if (!factura) {
            return { error: "Factura no encontrada", code: 404 };
        }
        return factura.toJSON();
    }

    // Obtener todas las facturas de un vendedor por vendedor_id
    async obtenerFacturasPorVendedorId(vendedor_id) {
        const facturas = await FacturaVendedorDTO.findAll({ where: { vendedor_id } });
        return facturas.map(factura => factura.toJSON());
    }

    // Obtener todas las facturas de un proveedor por proveedor_id
    async obtenerFacturasPorProveedorId(proveedor_id) {
        const facturas = await FacturaVendedorDTO.findAll({ where: { provedor_id: proveedor_id } });
        return facturas.map(factura => factura.toJSON());
    }

    // Actualizar una factura por ID
    async actualizarFactura(id, facturaData) {
        const factura = await FacturaVendedorDTO.findByPk(id);
        if (!factura) {
            return { error: "Factura no encontrada", code: 404 };
        }
        await factura.update(facturaData);
        return factura.toJSON();
    }

    // Eliminar una factura por ID
    async eliminarFactura(id) {
        const factura = await FacturaVendedorDTO.findByPk(id);
        if (!factura) {
            return { error: "Factura no encontrada", code: 404 };
        }
        await factura.destroy();
        return { message: "Factura eliminada correctamente", code: 200 };
    }
}

export default RepositorioFacturaVendedor;