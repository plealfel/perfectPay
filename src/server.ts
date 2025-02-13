import express from "express";
import dotenv from "dotenv";
import billingRoute from "./route/billing";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

const app = express();

// Definindo as opções do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cobrança integrado com APIs da ASAAS',
      version: '1.0.0',
      description: 'API para criar cobranças em PIX, Cartão de crédito e Boleto',
    },
  },
  apis: ["**/*.ts"], // Caminho para o arquivo de rotas onde você documenta as rotas
};

// Gera o Swagger com base nas configurações
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve a documentação do Swagger no caminho "/api-docs"
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares e rotas
app.use(express.json());
app.use("/billing", billingRoute);

export default app;
