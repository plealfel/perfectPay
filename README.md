# perfectPay - Sistema de Processamento de Pagamentos Integrado ao Asaas

## 📌 Sobre o Projeto
O **perfectPay** é um sistema de processamento de pagamentos integrado ao **Asaas**. Permite pagamentos via **Boleto**, **Cartão de Crédito** ou **Pix**, com validação de dados e resposta em JSON.

### 🚀 Tecnologias Utilizadas
- **Backend**: Node.js com Express.js
- **Banco de Dados**: MySQL
- **ORM**: TypeORM
- **Testes**: Jest
- **Integração**: Asaas API

## ⚙️ Funcionalidades
- Processamento de pagamentos (**Boleto**, **Cartão de Crédito**, **Pix**).
- Integração com **Asaas** para criação e consulta de pagamentos.
- **Swagger** para documentação interativa em `http://localhost:3000/api-docs`.

## 🛠 Como Executar Localmente

### 🔧 Pré-requisitos
- **Node.js** (v16+)
- **MySQL**
- **Docker** (opcional)
- **Conta no Asaas Sandbox**

## 📥 Clone o Repositório
```bash
git clone https://github.com/plealfel/perfectPay.git
cd perfectPay
```

### 📦 Instale Dependências
```bash
npm install
```

### ⚙️ Configure o Banco de Dados
Crie o arquivo .env na raiz do projeto com as seguintes variáveis:
```bash
PORT=3000
API_URL="https://api-sandbox.asaas.com/v3/payments"
ACCESS_TOKEN="sua_chave_do_asaas"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=seu_database
DB_PORT=3307
```

### ▶️ Execute o Servidor
Inicie o servidor com o comando:
```
npm run dev
```
O servidor estará disponível em http://localhost:3000.

### 🧪 Executando Testes
Para rodar os testes automatizados:
```
npm test
```