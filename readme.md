# Teste técnico Shopper.com.br - Serviço de Leitura de Medidores

Bem-vindo ao repositório do projeto de teste técnico para a vaga de desenvolvedor na Shopper.com.br! Este projeto tem como objetivo construir um serviço de back-end que gerencia a leitura de medidores de água e gás utilizando imagens.

## Visão Geral

Este projeto é composto por um serviço de back-end desenvolvido em Node.js com TypeScript, Docker e integração com a API do Google Gemini. O serviço possui três endpoints principais para gerenciamento de leituras de medidores:

- **POST /upload**: Recebe uma imagem em base64, consulta a API do Google Gemini para obter a medição e retorna o valor lido, junto com um link temporário para a imagem e um GUID.
- **PATCH /confirm**: Permite confirmar ou corrigir o valor lido pelo LLM. Atualiza o valor no banco de dados e retorna o status da operação.
- **GET /<customer_code>/list**: Lista todas as leituras realizadas por um cliente específico. Permite filtrar por tipo de medição (água ou gás) se o parâmetro `measure_type` for fornecido.

## Funcionalidades

- **Upload de Imagem**: Valida e processa imagens em base64 para obter medições precisas.
- **Confirmação de Leitura**: Permite a correção manual das leituras, se necessário.
- **Listagem de Leituras**: Recupera todas as medições realizadas por um cliente com a opção de filtrar por tipo de medição.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**: Para desenvolvimento do back-end.
- **PostgreSQL**: Para armazenamento das leituras de medidores.
- **Google Gemini API**: Para a leitura das medições a partir de imagens.
- **Docker**: Para containerização da aplicação.

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/tuliogontijo/tech_test_backend.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd tech_test_backend
   ```
3. Certifique-se de ter o Docker e o Docker Compose instalados.
4. Crie um arquivo .env na raiz do projeto com a seguinte variável de ambiente:
   ```bash
   GEMINI_API_KEY=<sua-chave-api>
   ```
5. Suba os containers com o Docker Compose:
   ```bash
   docker-compose up --build
   ```
6. A aplicação estará disponível em http://localhost:3000.

## Endpoints
- POST /upload
- PATCH /confirm
- GET /<customer_code>/list


Uma coleção com os endpoints para Postman está disponível [aqui](https://raw.githubusercontent.com/tuliogontijo/tech_test_backend/main/postman_collection.json).