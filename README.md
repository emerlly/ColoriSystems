# Colori Systems Backend

## Descrição do Projeto

O Colori Systems Backend é um sistema robusto de controle e gestão de estoque, desenvolvido para otimizar as operações de negócios. Ele oferece funcionalidades abrangentes para gerenciamento de usuários, produtos, categorias, fornecedores, clientes, movimentações de estoque e geração de relatórios detalhados. A arquitetura do sistema é baseada em Node.js com Express.js, utilizando MongoDB como banco de dados, garantindo escalabilidade e flexibilidade.

## Funcionalidades Principais

O sistema Colori Systems Backend oferece as seguintes funcionalidades:

*   **Autenticação e Autorização**: Sistema de login seguro com JSON Web Tokens (JWT) e controle de acesso baseado em papéis (RBAC), permitindo diferentes níveis de permissão para usuários (administrador, operador, estoquista, gerente).
*   **Gestão de Usuários**: Criação, leitura, atualização e exclusão (CRUD) de usuários do sistema, com atribuição de papéis específicos.
*   **Gestão de Produtos**: CRUD completo para produtos, incluindo informações como nome, descrição, preço, quantidade em estoque e estoque mínimo.
*   **Gestão de Categorias**: Organização de produtos através de categorias, facilitando a busca e a gestão.
*   **Gestão de Fornecedores**: CRUD para informações de fornecedores, permitindo o registro e a consulta de dados essenciais.
*   **Gestão de Clientes**: CRUD para o cadastro de clientes, armazenando dados relevantes para operações comerciais.
*   **Controle de Estoque**: Registro detalhado de movimentações de entrada e saída de produtos, com atualização automática dos níveis de estoque. Identificação de produtos com estoque baixo.
*   **Geração de Relatórios**: Capacidade de gerar relatórios analíticos sobre vendas por período, vendas por produto, produtos com estoque baixo, lucro por período e vendas por vendedor. Os relatórios podem ser exportados para formatos como Excel.
*   **Validação de Dados**: Validação integrada para documentos brasileiros como CPF e CNPJ, além de CEP, garantindo a integridade dos dados.
*   **Documentação da API**: Preparado para documentação da API utilizando Swagger, facilitando a integração e o entendimento dos endpoints disponíveis.

## Tecnologias Utilizadas

As principais tecnologias e bibliotecas utilizadas no desenvolvimento deste backend incluem:

*   **Node.js**: Ambiente de execução JavaScript assíncrono e orientado a eventos.
*   **Express.js**: Framework web rápido e minimalista para Node.js, utilizado para construir a API RESTful.
*   **MongoDB**: Banco de dados NoSQL orientado a documentos, para armazenamento flexível de dados.
*   **Mongoose**: Modelagem de objetos MongoDB (ODM) para Node.js, simplificando a interação com o banco de dados.
*   **JSON Web Tokens (JWT)**: Padrão aberto para criação de tokens de acesso que permitem a autenticação e autorização de usuários.
*   **Bcrypt.js**: Biblioteca para hash de senhas, garantindo a segurança das credenciais dos usuários.
*   **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.
*   **Multer**: Middleware para Node.js que facilita o upload de arquivos.
*   **ExcelJS**: Biblioteca para ler, manipular e escrever dados em arquivos Excel (xlsx).
*   **jsPDF**: Biblioteca para gerar documentos PDF no lado do cliente.
*   **Swagger-jsdoc & Swagger-ui-express**: Ferramentas para gerar e servir a documentação interativa da API (OpenAPI/Swagger UI).

## Estrutura do Projeto

A estrutura de diretórios do projeto é organizada da seguinte forma:

```
ColoriSystems/
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── seed/                  # Scripts para popular o banco de dados
│   └── admin.seed.js
└── src/                   # Código fonte da aplicação
    ├── app.js             # Configuração principal do Express
    ├── config/            # Configurações gerais (ex: Swagger)
    │   └── swagger.js
    ├── controller/        # Lógica de controle para as rotas
    │   ├── AuthController.js
    │   ├── CategoryController.js
    │   ├── CustomerController.js
    │   ├── ProductController.js
    │   ├── ReportController.js
    │   ├── StockController.js
    │   ├── SupplierController.js
    │   └── userController.js
    ├── middlewares/       # Middlewares para autenticação e autorização
    │   ├── authMiddleware.js
    │   └── roleMiddleware.js
    ├── migrations/        # Scripts de migração de banco de dados
    │   └── 001-init.js
    ├── models/            # Definições dos modelos de dados (Mongoose)
    │   ├── CategoryModel.js
    │   ├── ConnectionModel.js
    │   ├── CustomerModel.js
    │   ├── ProductModel.js
    │   ├── StockModel.js
    │   ├── SupplierModel.js
    │   └── UserModel.js
    ├── routes/            # Definição das rotas da API
    │   ├── v1/            # Rotas da versão 1 da API
    │   │   ├── auth.routes.js
    │   │   ├── category.routes.js
    │   │   ├── customer.routes.js
    │   │   ├── health.routes.js
    │   │   ├── index.js
    │   │   ├── products.routes.js
    │   │   ├── report.routes.js
    │   │   ├── stock.routes.js
    │   │   ├── supplier.routes.js
    │   │   └── user.routes.js
    │   └── v2/            # Rotas da versão 2 da API (vazia)
    ├── services/          # Lógica de negócio e serviços
    │   ├── AuthService.js
    │   ├── CategoryService.js
    │   ├── CustomerService.js
    │   ├── ProductService.js
    │   ├── ReportService.js
    │   ├── StockService.js
    │   ├── SupplierService.js
    │   └── userService.js
    ├── server.js          # Ponto de entrada do servidor
    └── utils/             # Utilitários e funções auxiliares
        └── validators/    # Validadores de documentos
            ├── ValidateCPF.js
            ├── validadeCEP.js
            └── validateCNPJ.js
```

## Como Rodar o Projeto

Para configurar e rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   Node.js (versão 14 ou superior)
*   npm (gerenciador de pacotes do Node.js)
*   MongoDB (servidor de banco de dados)

### Instalação

1.  **Clone o repositório** (se aplicável, ou descompacte o arquivo):

    ```bash
    git clone <github.com/emerlly/ColoriSystems>
    cd ColoriSystems
    ```

2.  **Instale as dependências**: Navegue até o diretório raiz do projeto e execute o comando:

    ```bash
    npm install
    ```

3.  **Configuração do Ambiente**: Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/colorisystems_db
    JWT_SECRET=sua_chave_secreta_jwt
    ```

    *   `PORT`: Porta em que o servidor será executado (padrão: 3000).
    *   `MONGODB_URI`: URI de conexão com o seu banco de dados MongoDB.
    *   `JWT_SECRET`: Uma string secreta forte para assinar os tokens JWT.

### Execução

Para iniciar o servidor em modo de desenvolvimento (com `nodemon` para recarga automática):

```bash
npm run dev
```

Ou para iniciar o servidor em modo de produção:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000/api` (ou na porta configurada no `.env`).

## Endpoints da API (Exemplos)

Alguns exemplos de endpoints disponíveis:

*   `POST /api/auth/register`: Registrar um novo usuário.
*   `POST /api/auth/login`: Autenticar um usuário e obter um token JWT.
*   `GET /api/products`: Listar todos os produtos.
*   `POST /api/products`: Criar um novo produto (requer autenticação e autorização).
*   `GET /api/reports/sales-by-period?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`: Gerar relatório de vendas por período.
*   `GET /api/users`: Listar todos os usuários (requer autenticação e autorização de administrador).

Para uma lista completa e detalhada dos endpoints, consulte a documentação do Swagger (se ativada e configurada).

## Contribuição

Para contribuir com o projeto, siga as boas práticas de desenvolvimento, crie branches para novas funcionalidades ou correções e envie Pull Requests.


---

**Desenvolvido por**: ColoriSystems
**Data**: 11 de janeiro de 2026
