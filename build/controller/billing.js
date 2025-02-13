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
exports.createBoletoPayment = exports.createCreditCardPayment = exports.createPixPayment = void 0;
const billing_1 = __importDefault(require("../services/billing"));
// Exemplo de uma função de controlador
const createPixPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentData = req.body;
        const paymentResponse = yield billing_1.default.createPixBilling(paymentData);
        res.status(200).json(paymentResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Erro ao processar a cobrança",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Erro desconhecido a cobrança",
            });
        }
    }
});
exports.createPixPayment = createPixPayment;
const createCreditCardPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentData = req.body;
        const paymentResponse = yield billing_1.default.createCreditCardBilling(paymentData);
        res.status(200).json(paymentResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Erro ao processar a cobrança",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Erro desconhecido ao processar a cobrança",
            });
        }
    }
});
exports.createCreditCardPayment = createCreditCardPayment;
const createBoletoPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentData = req.body;
        const paymentResponse = yield billing_1.default.createBoletoBilling(paymentData);
        res.status(200).json(paymentResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: "Erro ao processar a cobrança",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: "Erro desconhecido ao processar a cobrança",
            });
        }
    }
});
exports.createBoletoPayment = createBoletoPayment;
