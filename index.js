const express = require('express');
const QRCode = require('qrcode');
const app = express();

app.get('/api/qr', async (req, res) => {
    const texto = req.query.texto || 'Texto vacío';
    try {
        const qr = await QRCode.toBuffer(texto, { type: 'png', width: 300 });
        res.setHeader('Content-Type', 'image/png');
        res.send(qr);
    } catch (err) {
        res.status(500).send('Error al generar QR');
    }
});

const PORT = process.env.PORT || 3000;  // <-- ESTA LÍNEA CAMBIADA

app.listen(PORT, () => console.log(`Servidor QR activo en http://localhost:${PORT}`));

app.get('/', (req, res) => {
    res.send('Servidor QR activo. Usa /api/qr?texto=TU_TEXTO para generar un QR.');
});
