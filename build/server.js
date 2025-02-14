"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const billing_1 = __importDefault(require("./route/billing"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const database_1 = __importDefault(require("./database/database"));
require("reflect-metadata");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve a documentação do Swagger no caminho "/api-docs"
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Middlewares e rotas
app.use(express_1.default.json());
app.use("/billing", billing_1.default);
// Função para iniciar o servidor
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializando a conexão com o banco de dados usando TypeORM
            yield database_1.default.initialize();
            console.log("✅ Conectado ao MySQL com TypeORM!");
            // Inicia o servidor Express após a conexão com o banco ser bem-sucedida
            const port = process.env.PORT || 3000;
            app.listen(port, () => {
                console.log(`Servidor rodando na porta ${port}`);
                console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
            });
        }
        catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error);
            process.exit(1); // Encerra o processo se a conexão falhar
        }
    });
}
exports.default = app;
