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
const asaas_1 = __importDefault(require("../integrations/asaas"));
class BillingService {
    createPixBilling(billingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createBilling = yield asaas_1.default.createBilling("PIX", billingData);
            return asaas_1.default.getBillingInfo(createBilling.id);
        });
    }
    createCreditCardBilling(billingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createBilling = yield asaas_1.default.createBilling("CREDIT_CARD", billingData);
            return asaas_1.default.getBillingInfo(createBilling.id);
        });
    }
    createBoletoBilling(billingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const createBilling = yield asaas_1.default.createBilling("BOLETO", billingData);
            return asaas_1.default.getBillingInfo(createBilling.id);
        });
    }
}
exports.default = new BillingService();
