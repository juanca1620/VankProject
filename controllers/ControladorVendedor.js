class ControladorVendedor {
    constructor(servicioVendedor) {
        this.servicioVendedor = servicioVendedor;
    }

    cambiarBalance = async (req, res) => {
        try{
            const resp = await this.servicioVendedor.cambiarBalance(req.body.credito, (req.body.id))
            if(resp.error){
                return res.status(resp.code).json(resp);
            }
            return res.json(resp);
        }catch(error){
            return res.status(500).json({error: error.message});
        }
    }
}

export default ControladorVendedor;
