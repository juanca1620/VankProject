import express from 'express';

const router = express.Router();

router.post("/chat", (req, res) => {
    const chat = req.params.chat;
    res.send("Mensaje enviado");
});

router.get("/chat/mensaje", (req, res) => {
    const mensaje = req.params.mensaje;
    res.send("Mensaje recivido");
})