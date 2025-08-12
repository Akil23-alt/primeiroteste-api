Guia Prático para Construir uma API de Estatísticas Básicas
1. O que é uma API?
Imagine que você está em um restaurante. Você (seu aplicativo) não vai direto à cozinha para pegar a comida (os dados). Você conversa com um garçom (a API), que leva o seu pedido ao cozinheiro (o sistema) e traz a comida de volta para você.
Uma API (Interface de Programação de Aplicações) é exatamente esse garçom: uma ponte que permite que dois sistemas de software conversem entre si de forma organizada e padronizada.
2. Por que usar bibliotecas matemáticas em uma API?
Ao criar uma API que lida com cálculos, como a nossa, usar bibliotecas prontas é uma ótima prática. Elas:
Garantem precisão: Evitam que você cometa erros ao programar fórmulas complexas do zero.
Aumentam a produtividade: Com funções prontas, como math.mean(), você escreve menos código.
Facilitam a manutenção: O código se torna mais claro e fácil de entender, pois usa nomes de funções confiáveis.
No nosso projeto, usamos a biblioteca mathjs para fazer os cálculos de média, máximo e mínimo.
3. Estrutura da nossa API
Nossa API foi construída com Node.js e Express, seguindo uma estrutura modular para organizar o código.
app.js: O arquivo principal. Ele inicia o servidor, define a porta e “conecta” as rotas da nossa API.
JavaScript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mathRoutes = require('./routes/mathRoutes');

app.use(express.json());
app.use('/calcular', mathRoutes);

app.listen(port, () => {
    console.log(`API aberto na porta ${port}!`)
})


mathRoutes.js: Define os caminhos (endpoints) da nossa API. Aqui, dizemos que a rota / (que na verdade será /calcular) vai passar por uma validação antes de ir para o controlador.
JavaScript
const express = require('express');
const router = express.Router();

const validateNumbers = require('../middlewares/validateNumbers');
const mathController = require('../controllers/mathController')

router.post('/', validateNumbers, mathController.calculateStats);

module.exports = router;


validateNumbers.js: Este é um middleware de validação. Ele é executado antes do cálculo para garantir que os dados enviados estão no formato correto. Se os dados estiverem errados, ele retorna um erro sem nem chegar no controlador.
JavaScript
module.exports = (req, res, next) => {
    const numeros = req.body.numeros;

    if (!Array.isArray(numeros) || numeros.length === 0) {
        return res.status(400).json({ erro: 'Envie um Array valido no campo de "numeros".' });
    }
    if (!numeros.every(n => typeof n === 'number')) {
        return res.status(400).json({ erro: 'Todos os elementos do array devem ser numeros' })
    }
    next();
};


mathController.js: O coração da nossa lógica de negócio. Ele recebe os dados já validados, usa a biblioteca mathjs para calcular a média, máximo e mínimo, e retorna a resposta formatada em JSON.
JavaScript
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


numberModel.js: Um arquivo modelo, preparado para ser usado no futuro caso a API precise se conectar a um banco de dados, mas não está sendo usado no momento.
4. O Endpoint de Cálculo
Este é o endpoint principal da nossa API, onde você envia um array de números para obter as estatísticas.
Método: POST
URL: http://localhost:3000/calcular
Body (JSON):
Você deve enviar um array de números, seguindo a estrutura abaixo:
JSON
{
  "numeros": [10, 20, 30, 40, 50]
}


Resposta Esperada (JSON):
A API retornará a média, o valor máximo e o mínimo do array que você enviou.
JSON
{
  "media": 30,
  "maximo": 50,
  "minimo": 10
}


5. Validação e Boas Práticas
Nossa API segue boas práticas para ser profissional:
URLs claras: Usamos /calcular para indicar o que a rota faz.
Métodos corretos: Usamos POST para enviar dados e criar uma resposta, em vez de GET.
Status codes: Retornamos 200 OK para sucesso e 400 Bad Request se os dados enviados estiverem errados, graças ao nosso middleware validateNumbers.js.
Validação: A validação é feita de forma antecipada no middleware para garantir que a lógica de cálculo só seja executada com dados válidos.
6. Como testar a API com o Postman
Para testar a nossa API de forma simples:
Abra o Postman e crie uma nova requisição.
Configure o método para POST.
No campo de URL, digite http://localhost:3000/calcular.
Vá para a aba Body, selecione a opção raw e escolha o tipo JSON no menu dropdown.
No campo de texto, cole o exemplo de Body (JSON) da seção 4.
Clique em Send e observe a resposta na seção debaixo.
