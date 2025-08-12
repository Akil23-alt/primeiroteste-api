const math = require('mathjs');

exports.calculateStats = (req, res) => {
    const numeros = req.body.numeros;
    try {
        const media = math.mean(numeros);
        const maximo = math.max(numeros);
        const minimo = math.min(numeros);

        return res.json({ media, maximo, minimo });
    }
        catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Error ao calcular os valores.' });
    }
};