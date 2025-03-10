import express from 'express';

const router = express.Router();

router.get("/credito/:creditoId",(req,res) =>{
    const creditoId = req.params.creditoId;
    res.send(`Abonos con el credito con el id ${creditoId}`);
})


router.post("/:creditoId",(req,res) =>{
    const creditoId = req.params.creditoId;
    res.send(`Abono con el credito con el id ${creditoId}`);
})