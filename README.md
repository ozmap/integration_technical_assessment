# Avaliação Técnica

<a id="sumario"></a>
## Sumário

<!-- TOC -->
  * [Tarefa](#tarefa)
  * [Instruções](#instrucoes)
  * [Dados necessários](#dados)
  * [Submissão da solução](#submissao)
<!-- /TOC -->

<a id="tarefa"></a>
## 1. Tarefa

 O objetivo deste teste envolve a execução de algumas tarefas desempenhadas no setor de integrações da empresa, onde esteremos avaliando a solução desenvolvida pelo condidato para o problema proposto. 
 A tarefa consiste no desenvolvimento de uma aplicação backend em Node.js ou Typescript, que deverá rodar a cada X minutos, realizando consultas em uma API pública, e a partir dos dados vindos desta API, criar elementos via API em uma base OZmap. 
 Requisitos adicionais:
 * Logger registrando as ações realizadas pela aplicação;
 * Endpoint para visualização dos logs da aplicação pelo navegador;
 * A cada execução da aplicação, deve ser exportado um relatório (deverá ser incrementado) sobre as ações realizadas, incluindo as que obtiverem erro;
 * Elaborar uma documentação para a aplicação.
 
<a id="instrucoes"></a>
## 2. Instruções

A API externa a ser consultada retorna, a cada requisição, um usuário aleatório. Na primeira execução da aplicação, deve consultar a API externa e usar os dados para criar um imóvel com cliente no OZmap, e nas execuções seguintes, criar dois imóveis com cliente no OZmap: um com os mesmos dados da execução anterior, e outro com dados novos, coletados novamente na API externa. Para definição dos atributos do imóvel com cliente no OZmap, considerar as seguintes orientações: 
 * Dados fixos: box=64ac62633f250c0014f65dc2, auto_connect=false, force=true;
 * Dados variáveis:
   address=location.street.name + location.street.number + location.postcode + location.city;
   client.name=name.first + name.last;
   client.code=name.first + "." + name.last;
   client.observation=email;

<a id="dados"></a>
## 3. Dados necessários
* API externa: https://randomuser.me/api;
* Documentação API OZmap: https://ozmap.stoplight.io/docs/ozmap/180b1534fb63f-cria-um-imovel
* URL da base OZmap: http://sandbox.ozmap.com.br:9090
* Chave-api da base OZmap:
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2R1bGUiOiJhcGkiLCJ1c2VyIjoiNWQ5ZjNmYjgyMDAxNDEwMDA2NDdmNzY4IiwiY3JlYXRpb25EYXRlIjoiMjAyMy0wNy0xMFQxNTowMzoyOC4zOTBaIiwiaWF0IjoxNjg5MDAxNDA4fQ.rACa9_8wIp7FjbGHVEzvaQmtotsOvGnmQPf2Z1yMFw8
```

<a id="submissao"></a>
## 4. Submissão da solução

De modo que a sua solução seja passível de ser avaliada, a mesma deverá ser submetida segundo as estipulações listadas abaixo:

* Realizar o fork deste repositório;
* Alterar a visibilidade do fork para privada;
* Adicionar como contribuidores os seguintes usuários:
  - [Leonardo Bittencourt (leonardo-rb)](https://github.com/leonardo-rb)
  - [Mateus Souza (mateusdevoz)](https://github.com/mateusdevoz)
* Publicar os seus commits em um branch, como o nome no formato `solution/[your-github-username]`.
