1. O que é uma API
Imagina que a gente está em um restaurante. A gente (o seu app ou site) quer um prato, mas não vai direto na cozinha (o servidor) fazer a comida. A gente fala com o garçom (a API). A gente faz o pedido, o garçom leva pra cozinha e volta com a nossa comida (os dados).

API é tipo um garçom super educado: ele é a ponte que deixa o nosso código pedir coisas para outro código, de um jeito fácil e organizado.

2. Por que usar bibliotecas prontas
Quando a gente precisa fazer contas de matemática, tipo calcular a média, a gente não vai reinventar a roda. A gente usa uma biblioteca matemática pronta! É tipo usar a calculadora em vez de fazer a conta no papel.

No projeto, usamos a biblioteca mathjs. Por que ela é top?

A gente não erra: As fórmulas já estão testadas e super confiáveis.

A gente é mais rápido: Em vez de escrever um monte de código pra calcular a média, a gente só escreve math.mean(numeros). Pronto, já calculou!

O código fica mais limpo: Fica fácil de ler e entender, tipo uma receita de bolo.

3. A Estrutura do nosso Projeto
Nosso código é dividido em arquivos, cada um com uma função. Isso ajuda a gente a não se perder!

app.js: Esse é o "chefe" do projeto. Ele liga o servidor e diz "ó, galera, o restaurante tá aberto na porta tal!". Ele também fala pro garçom (as rotas) onde as coisas estão.

mathRoutes.js: Pensa nisso como o mapa do restaurante. Ele mostra o caminho para a cozinha. No nosso caso, ele diz que quando alguém pedir algo em /calcular, é pra chamar o nosso "segurança" (validateNumbers) e depois a "cozinheira" (mathController).

validateNumbers.js: Esse é o nosso "segurança" ou "check-in". Antes de o pedido (os dados) chegar na cozinha, ele verifica se está tudo em ordem. Ele confere se a gente mandou uma lista de números e se todos os itens da lista são realmente números. Se tiver algo errado, ele já barra a gente e dá um aviso.

mathController.js: A nossa "cozinheira" oficial! Depois que o segurança libera o pedido, ela entra em ação. Ela pega a lista de números, usa a nossa biblioteca mathjs para calcular a média, o valor mais alto e o mais baixo, e devolve o resultado bonitinho.

numberModel.js: Por enquanto, esse arquivo é só um rascunho. Ele seria usado se a gente quisesse salvar esses números em um banco de dados, tipo uma agenda de contatos. Por agora, a gente só precisa saber que ele existe, mas não vamos usar.

4. Como Usar a Nossa API
A gente vai usar um "endereço" e um "pedido" pra falar com a API:

Método: POST (é tipo enviar um formulário para o servidor).

Endereço: http://localhost:3000/calcular

O que a gente manda (no "corpo" do pedido): A gente tem que enviar uma lista de números, assim:

JSON

{
  "numeros": [10, 20, 30, 40, 50]
}
O que a gente recebe (a resposta): Se tudo der certo, ela vai devolver isso aqui:

JSON

{
  "media": 30,
  "maximo": 50,
  "minimo": 10
}
5. Dicas do Chef (Boas Práticas)
Nossa API foi feita seguindo regras de ouro para ser profissional e fácil de usar:

Endereços claros: A gente não usou http://.../rota1, mas sim /calcular, que diz exatamente o que a rota faz.

Validação antecipada: A gente usa o validateNumbers.js antes de tudo pra não sobrecarregar o nosso servidor com pedidos errados. É como ter um porteiro na entrada do restaurante!

Códigos de resposta: A gente responde com 200 quando dá tudo certo, e 400 quando a gente erra no pedido. Isso ajuda a gente (e o nosso código) a saber o que aconteceu.

6. Postman: O nosso Melhor Amigo para Testar
Para testar a API, a gente não precisa de um site. A gente usa o Postman!

Abre o Postman e clica em "New".

Muda o método para POST.

No campo de URL, cola o nosso endereço: http://localhost:3000/calcular.

Vai na aba Body, escolhe raw e depois JSON no menu.

Cola o nosso "pedido" (o JSON com os números).

Clica em Send e veja a mágica acontecer!
