import { BillingData } from "../types/billingData";
import AsaasApi from "../integrations/asaas";
import BillingRepository from "../repositories/billing";
import { Billing } from "../entities/billing";

class BillingService {

  async createPixBilling(billingData: BillingData) {
    const createBilling = await AsaasApi.createBilling("PIX", billingData);

    const billingInfo = await AsaasApi.getBillingInfo(createBilling.id);

    const newBilling: Billing = {
      id: createBilling.id, 
      createdAt: new Date(),
      value: billingData.value, 
      customer: billingData.customer,
      type: "PIX",
      status: createBilling.status,
      bankslipLink: billingInfo.bankSlip?.bankSlipUrl || null,
      bankslipCode : billingInfo.bankSlip?.barCode  || null,
      pixKey: billingInfo.pix?.payload  || null
    };

    await BillingRepository.createBilling(newBilling);

    return {
      message: "Cobrança no PIX criada com sucesso",
      data: {
        pixEncodedImage: billingInfo.pix?.encodedImage || null,
        ...newBilling
      }
    };
  }

  async createCreditCardBilling(billingData: BillingData) {
    const createBilling = await AsaasApi.createBilling("CREDIT_CARD", billingData);
    const billingInfo = await AsaasApi.getBillingInfo(createBilling.id);

    const newBilling: Billing = {
      id: createBilling.id,
      createdAt: new Date(),
      value: billingData.value,
      customer: billingData.customer,
      type: "CREDIT_CARD",
      status: createBilling.status,
      bankslipLink: billingInfo.bankSlip?.bankSlipUrl || null,
      bankslipCode: billingInfo.bankSlip?.barCode || null,
      pixKey: billingInfo.pix?.payload  || null
    };

    await BillingRepository.createBilling(newBilling);

    return {
      message: "Cobrança no cartão de crédito criada com sucesso",
      data: newBilling,
    };
}


async createBoletoBilling(billingData: BillingData) {
  const createBilling = await AsaasApi.createBilling("BOLETO", billingData);
  const billingInfo = await AsaasApi.getBillingInfo(createBilling.id);

  const newBilling: Billing = {
    id: createBilling.id,
    createdAt: new Date(),
    value: billingData.value,
    customer: billingData.customer,
    type: "BOLETO",
    status: createBilling.status,
    bankslipLink: billingInfo.bankSlip?.bankSlipUrl || null,
    bankslipCode: billingInfo.bankSlip?.barCode || null,
    pixKey: billingInfo.pix?.payload  || null
  };

  await BillingRepository.createBilling(newBilling);

  return {
    message: "Boleto criado com sucesso",
    data: newBilling,
  };
}
}

export default new BillingService();
