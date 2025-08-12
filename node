const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mathRoutes = require('./routes/mathRoutes');

app.use(express.json());

app.use('/calcular', mathRoutes);

app.listen(port, () => {
    console.log(`API aberto na porta ${port}!`)
})
