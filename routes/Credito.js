import express from 'express';

const router = express.Router();

router.post("/solicitarCredito/provedor",(req,res) =>{
    res.send("Solicitud de crédito para proveedor");
});

router.post("/solicitarCredito/vendedor",(req,res) =>{
    res.send("Solicitud de crédito para vendedor");
});

router.delete("/eliminarCredito/provedor/:creditoId",(req,res) =>{
    const creditoId = req.params.creditoId;
    res.send(`Crédito eliminado ${creditoId}`);
});

router.delete("/eliminarCredito/vendedor/:creditoId",(req,res) =>{
    const creditoId = req.params.creditoId;
    res.send(`Crédito eliminado ${creditoId}`);
});


export default router;

