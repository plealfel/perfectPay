"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
// Função para validar os dados do pagamento
const validateTransactionData = (req, res, next) => {
    const paymentData = req.body;
    // Validar o campo 'customer'
    if (!paymentData.customer || typeof paymentData.customer !== "string") {
        res.status(400).json({ error: "O campo 'customer' deve ser uma string não vazia." });
        return; // Retorna para não continuar o fluxo
    }
    // Validar o campo 'value'
    if (typeof paymentData.value !== "number" || paymentData.value < 0.01) {
        res.status(400).json({ error: "O campo 'value' deve ser um número maior ou igual a 0.01." });
        return; // Retorna para não continuar o fluxo
    }
    // Validar o campo 'dueDate'
    if (!paymentData.dueDate || typeof paymentData.dueDate !== "string") {
        res.status(400).json({ error: "O campo 'dueDate' deve ser uma string de data válida." });
        return; // Retorna para não continuar o fluxo
    }
    const today = (0, moment_1.default)().startOf('day'); // Define o início do dia
    const dueDateObj = (0, moment_1.default)(paymentData.dueDate).startOf('day'); // Define o início do dia para a data de vencimento
    // Comparar as datas
    if (dueDateObj.isBefore(today, 'day')) {
        res.status(400).json({ error: "O 'dueDate' não pode ser anterior à data de hoje." });
        return;
    }
    // Se os dados estiverem válidos, chamamos o próximo middleware
    next();
};
exports.default = validateTransactionData;
