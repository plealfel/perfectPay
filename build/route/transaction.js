"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_1 = require("../controller/transaction");
const validateTransactionData_1 = __importDefault(require("../middleware/validateTransactionData"));
const router = express_1.default.Router();
/**
 * @swagger
 * /transactions/pix:
 *   post:
 *     summary: Processa um pagamento via PIX
 *     description: Cria um pagamento utilizando o método de pagamento PIX.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: Nome do cliente
 *                 default: "cus_000006509864"
 *               value:
 *                 type: number
 *                 description: Valor do pagamento
 *                 default: 5
 *               dueDate:
 *                 type: string
 *                 description: Data de vencimento do pagamento
 *                 default: "2025-02-13"
 *             required:
 *               - customer
 *               - value
 *               - dueDate
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso
 *       400:
 *         description: Erro de validação dos dados
 */
router.post("/pix", validateTransactionData_1.default, transaction_1.createPixPayment);
/**
 * @swagger
 * /transactions/credit-card:
 *   post:
 *     summary: Processa um pagamento via Cartão de Crédito
 *     description: Cria um pagamento utilizando o método de pagamento Cartão de Crédito.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: Nome do cliente
 *                 default: "cus_000006509864"
 *               value:
 *                 type: number
 *                 description: Valor do pagamento
 *                 default: 5
 *               dueDate:
 *                 type: string
 *                 description: Data de vencimento do pagamento
 *                 default: "2025-02-13"
 *             required:
 *               - customer
 *               - value
 *               - dueDate
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso
 *       400:
 *         description: Erro de validação dos dados
 */
router.post("/credit-card", validateTransactionData_1.default, transaction_1.createCreditCardPayment);
/**
 * @swagger
 * /transactions/boleto:
 *   post:
 *     summary: Processa um pagamento via Boleto
 *     description: Cria um pagamento utilizando o método de pagamento Boleto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: Nome do cliente
 *                 default: "cus_000006509864"
 *               value:
 *                 type: number
 *                 description: Valor do pagamento
 *                 default: 5
 *               dueDate:
 *                 type: string
 *                 description: Data de vencimento do pagamento
 *                 default: "2025-02-13"
 *             required:
 *               - customer
 *               - value
 *               - dueDate
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso
 *       400:
 *         description: Erro de validação dos dados
 */
router.post("/boleto", validateTransactionData_1.default, transaction_1.createBoletoPayment);
exports.default = router;
