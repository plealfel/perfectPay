import express from "express";
import dotenv from "dotenv";
import billingRoute from "./route/billing";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import AppDataSource from "./database/database";
import "reflect-metadata";

dotenv.config();

const app = express();

// Definindo as opções do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Cobrança integrado com APIs da ASAAS",
      version: "1.0.0",
      description: "API para criar cobranças em PIX, Cartão de crédito e Boleto",
    },
  },
  apis: ["**/*.ts"],
};

// Gera o Swagger com base nas configurações
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve a documentação do Swagger no caminho "/api-docs"
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares e rotas
app.use(express.json());
app.use("/billing", billingRoute);

// Função para iniciar o servidor
async function startServer() {
  try {
    // Inicializando a conexão com o banco de dados usando TypeORM
    await AppDataSource.initialize();
    console.log("✅ Conectado ao MySQL com TypeORM!");

    // Inicia o servidor Express após a conexão com o banco ser bem-sucedida
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

export { startServer };
export default app;
