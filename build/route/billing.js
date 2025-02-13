"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const billing_1 = require("../controller/billing");
const validateBillingData_1 = __importDefault(require("../middleware/validateBillingData"));
const router = express_1.default.Router();
/**
 * @swagger
 * /billing/pix:
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
router.post("/pix", validateBillingData_1.default, billing_1.createPixPayment);
/**
 * @swagger
 * /billing/credit-card:
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
router.post("/credit-card", validateBillingData_1.default, billing_1.createCreditCardPayment);
/**
 * @swagger
 * /billing/boleto:
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
router.post("/boleto", validateBillingData_1.default, billing_1.createBoletoPayment);
exports.default = router;
