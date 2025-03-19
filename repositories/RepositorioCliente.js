import Cliente from "../dto/ClienteDTO.js";

class RepositorioCliente {
    async buscarClientePorId(id) {
        const cliente = await Cliente.findByPk(parseInt(id));
        if (!cliente) {
            return { error: "Cliente no encontrado", code: 404 }
        }
        return cliente.toJSON();
    }
}

export default RepositorioCliente;