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
const billing_1 = __importDefault(require("../repositories/billing"));
class BillingService {
    createPixBilling(billingData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const createBilling = yield asaas_1.default.createBilling("PIX", billingData);
            const billingInfo = yield asaas_1.default.getBillingInfo(createBilling.id);
            const newBilling = {
                id: createBilling.id,
                createdAt: new Date(),
                value: billingData.value,
                customer: billingData.customer,
                type: "PIX",
                status: createBilling.status,
                bankslipLink: ((_a = billingInfo.bankSlip) === null || _a === void 0 ? void 0 : _a.bankSlipUrl) || null,
                bankslipCode: ((_b = billingInfo.bankSlip) === null || _b === void 0 ? void 0 : _b.barCode) || null,
                pixKey: ((_c = billingInfo.pix) === null || _c === void 0 ? void 0 : _c.payload) || null
            };
            yield billing_1.default.createBilling(newBilling);
            return {
                message: "Cobrança no PIX criada com sucesso",
                data: Object.assign({ pixEncodedImage: ((_d = billingInfo.pix) === null || _d === void 0 ? void 0 : _d.encodedImage) || null }, newBilling)
            };
        });
    }
    createCreditCardBilling(billingData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const createBilling = yield asaas_1.default.createBilling("CREDIT_CARD", billingData);
            const billingInfo = yield asaas_1.default.getBillingInfo(createBilling.id);
            const newBilling = {
                id: createBilling.id,
                createdAt: new Date(),
                value: billingData.value,
                customer: billingData.customer,
                type: "CREDIT_CARD",
                status: createBilling.status,
                bankslipLink: ((_a = billingInfo.bankSlip) === null || _a === void 0 ? void 0 : _a.bankSlipUrl) || null,
                bankslipCode: ((_b = billingInfo.bankSlip) === null || _b === void 0 ? void 0 : _b.barCode) || null,
                pixKey: ((_c = billingInfo.pix) === null || _c === void 0 ? void 0 : _c.payload) || null
            };
            yield billing_1.default.createBilling(newBilling);
            return {
                message: "Cobrança no cartão de crédito criada com sucesso",
                data: newBilling,
            };
        });
    }
    createBoletoBilling(billingData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const createBilling = yield asaas_1.default.createBilling("BOLETO", billingData);
            const billingInfo = yield asaas_1.default.getBillingInfo(createBilling.id);
            const newBilling = {
                id: createBilling.id,
                createdAt: new Date(),
                value: billingData.value,
                customer: billingData.customer,
                type: "BOLETO",
                status: createBilling.status,
                bankslipLink: ((_a = billingInfo.bankSlip) === null || _a === void 0 ? void 0 : _a.bankSlipUrl) || null,
                bankslipCode: ((_b = billingInfo.bankSlip) === null || _b === void 0 ? void 0 : _b.barCode) || null,
                pixKey: ((_c = billingInfo.pix) === null || _c === void 0 ? void 0 : _c.payload) || null
            };
            yield billing_1.default.createBilling(newBilling);
            return {
                message: "Boleto criado com sucesso",
                data: newBilling,
            };
        });
    }
}
exports.default = new BillingService();
