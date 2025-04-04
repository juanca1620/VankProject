import CreditoProvedorDTO from "../dto/CreditoProveedorDTO.js"

class RepositorioCredito {
    async crearCredito (credito) {
        const creditoCreado = await CreditoProvedorDTO.create(credito);
        const creditoJson = creditoCreado.toJSON();
        return creditoJson;
    }
}

export default RepositorioCredito;