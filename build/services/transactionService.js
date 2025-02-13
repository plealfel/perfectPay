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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = (_a = process.env.API_URL) !== null && _a !== void 0 ? _a : "";
const ACCESS_TOKEN = (_b = process.env.ACCESS_TOKEN) !== null && _b !== void 0 ? _b : "";
class PaymentService {
    createPixPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.processPayment("PIX", paymentData);
        });
    }
    createCreditCardPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.processPayment("CREDIT_CARD", paymentData);
        });
    }
    createBoletoPayment(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.processPayment("BOLETO", paymentData);
        });
    }
    processPayment(billingType, paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(API_URL, Object.assign({ billingType }, paymentData), {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        access_token: ACCESS_TOKEN,
                    },
                });
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new PaymentService();
