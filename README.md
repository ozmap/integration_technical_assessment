# Avaliação Técnica

<a id="sumario"></a>
## Sumário

<!-- TOC -->
  * [Tarefa](#tarefa)
  * [Instruções](#instrucoes)
  * [Submissão da solução](#submissao)
<!-- /TOC -->

<a id="tarefa"></a>
## 1. Tarefa

 O objetivo deste teste envolve a execução de algumas tarefas desempenhadas no setor de integrações da empresa, avaliando a solução desenvolvida pelo condidato para o problema proposto. 
 A tarefa consiste no desenvolvimento de uma aplicação backend que deverá rodar a cada X minutos, realizando consultas em uma API pública, e a partir dos dados vindos desta API, criar elementos via API em uma base OZmap. 
 Requisitos adicionais:
 * Logger registrando as ações realizadas pela aplicação;
 * Endpoint para visualização dos logs da aplicação pelo navegador;
 * A cada execução da aplicação, deve ser exportado um relatório (deverá ser incrementado) sobre as ações realizadas, incluindo as que obtiverem erro;
 * Elaborar uma documentação para a aplicação.
 
<a id="instrucoes"></a>
## 2. Instruções

A API externa a ser consultada retorna, a cada requisição, um usuário aleatório. Na primeira execução da aplicação, deve consultar a API externa e usar os dados para criar um imóvel com cliente no OZmap, e nas execuções seguintes, criar dois imóveis com cliente no OZmap: um com os mesmos dados da execução anterior, e outro com dados novos, coletados novamente na API externa. Para definição dos atributos do imóvel com cliente no OZmap, considerar as seguintes orientações:
 * Logger registrando as ações realizadas pela aplicação;

```json
{"userId": "uid2", "image": "http://api.ozmap.com.br/test-platform/6.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/1.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/2.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/7.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/3.png"}
{"userId": "uid1", "image": "http://api.ozmap.com.br/test-platform/1.png"}
{"userId": "uid2", "image": "http://api.ozmap.com.br/test-platform/5.png"}
{"userId": "uid2", "image": "http://api.ozmap.com.br/test-platform/4.png"}
```

```shell
cd images-api
npm install
npm run start
```

<a id="submissao"></a>
## 3. Submissão da solução

De modo que a sua solução seja passível de ser avaliada, a mesma deverá ser submetida segundo as estipulações listadas abaixo:

* Realizar o fork deste repositório;
* Alterar a visibilidade do fork para privada;
* Adicionar como contribuidores os seguintes usuários:
  - [Leonardo Bittencourt (leonardo-rb)](https://github.com/leonardo-rb)
  - [Mateus Souza (mateusdevoz)](https://github.com/mateusdevoz)
* Publicar os seus commits em um branch, como o nome no formato `solution/[your-github-username]`.

[**Voltar para o sumário**](#sumario)
