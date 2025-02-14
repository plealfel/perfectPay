"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const validatebillingData = (req, res, next) => {
    const paymentData = req.body;
    if (!paymentData.customer || typeof paymentData.customer !== "string") {
        res.status(400).json({ error: "O campo 'customer' deve ser uma string não vazia." });
        return;
    }
    if (!Number.isFinite(paymentData.value) || paymentData.value < 0.01) {
        res.status(400).json({ error: "O campo 'value' deve ser um número maior ou igual a 0.01." });
        return;
    }
    if (!paymentData.dueDate ||
        typeof paymentData.dueDate !== "string" ||
        !(0, moment_1.default)(paymentData.dueDate, "YYYY-MM-DD", true).isValid()) {
        res.status(400).json({ error: "O campo 'dueDate' deve estar no formato YYYY-MM-DD." });
        return;
    }
    const today = (0, moment_1.default)().startOf("day");
    const dueDateObj = (0, moment_1.default)(paymentData.dueDate, "YYYY-MM-DD").startOf("day");
    if (dueDateObj.isBefore(today, "day")) {
        res.status(400).json({ error: "O 'dueDate' não pode ser anterior à data de hoje." });
        return;
    }
    next();
};
exports.default = validatebillingData;
