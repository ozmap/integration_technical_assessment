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

Olá, candidato!

Bem-vindo ao nosso teste técnico para desenvolvedor júnior. Este teste é uma oportunidade para você demonstrar suas habilidades no campo de integrações. O objetivo é avaliar a solução que você desenvolverá para um problema específico.

A tarefa consiste em criar uma aplicação backend em Node.js ou Typescript que realizará as seguintes ações:

1. Executar automaticamente a cada X minutos.
2. A cada execução, buscar e tratar dados de uma API pública externa.
3. E criar elementos via API em uma base OZmap, com base nesses dados buscados na API pública externa.

Além disso, temos alguns requisitos adicionais:
 * Tempo de intervalo entre cada execução da aplicação definido por uma variável de ambiente.
 * Utilização de um logger para registrar as ações realizadas pela aplicação.
 * Criação de um endpoint para visualização dos logs da aplicação por meio do navegador.
 * A cada execução da aplicação, deverá ser exportado um relatório que será incrementado com informações sobre as ações realizadas, incluindo aquelas que apresentarem erro.
 * Elaboração de uma documentação para a aplicação.

Boa sorte e divirta-se desenvolvendo a solução!
 
<a id="instrucoes"></a>
## 2. Instruções

 A API externa consultada retorna um usuário aleatório a cada requisição. Na primeira execução da aplicação, ela deve consultar a API externa e usar os dados obtidos para criar um imóvel com cliente no OZmap. Nas execuções seguintes, a aplicação deve tentar criar dois imóveis com cliente no OZmap: um com os mesmos dados da execução anterior e outro com novos dados coletados novamente na API externa. Para definir os atributos do imóvel com cliente no OZmap, considere as seguintes orientações:
 * Dados fixos: box = 64ac62633f250c0014f65dc2, auto_connect = false, force = true;
 * Dados variáveis:
   address = location.street.name + location.street.number + location.postcode + location.city + location.state + location.country;
   client.name = name.first + name.last;
   client.code = name.first + "." + name.last (tudo em minúsculo);
   client.observation = email;

<a id="dados"></a>
## 3. Dados necessários
* API externa: https://randomuser.me/api
* Documentação API OZmap: https://ozmap.stoplight.io/docs/ozmap/180b1534fb63f-cria-um-imovel
* URL da base OZmap: http://sandbox.ozmap.com.br:9090
* Chave-api da base OZmap:
```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2R1bGUiOiJhcGkiLCJ1c2VyIjoiNWQ5ZjNmYjgyMDAxNDEwMDA2NDdmNzY4IiwiY3JlYXRpb25EYXRlIjoiMjAyMy0wNy0xMFQxNTowMzoyOC4zOTBaIiwiaWF0IjoxNjg5MDAxNDA4fQ.rACa9_8wIp7FjbGHVEzvaQmtotsOvGnmQPf2Z1yMFw8
```

<a id="submissao"></a>
## 4. Submissão da solução

Para que sua solução possa ser avaliada, ela precisa ser submetida de acordo com as estipulações listadas abaixo:

* Realize o fork deste repositório.
* Faça os commits da sua solução em um branch com o seguinte formato de nome: `solution/[your-github-username]`.
