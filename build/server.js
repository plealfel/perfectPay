"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const billing_1 = __importDefault(require("./route/billing"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve a documentação do Swagger no caminho "/api-docs"
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Middlewares e rotas
app.use(express_1.default.json());
app.use("/billing", billing_1.default);
exports.default = app;
