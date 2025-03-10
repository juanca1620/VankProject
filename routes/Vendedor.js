import express from 'express';

const router = express.Router();

router.post("/reporte/:vendedorId", (req, res) =>{
    const vendedorID = req.params.vendedorId;
    res.send(`Reporte del vendedor ${vendedorID}`);
})

router.put("/aumentarCredito/:vendedorId", (req, res) =>{
    const vendedorID = req.params.vendedorId;
    res.send(`Aumentar crédito del vendedor ${vendedorID}`);
})
export default router;