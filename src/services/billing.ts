import { BillingData } from "../types/billingData";
import AsaasApi from "../integrations/asaas";

class BillingService {

  async createPixBilling(billingData: BillingData) {
    const createBilling = await AsaasApi.createBilling("PIX", billingData);
    return AsaasApi.getBillingInfo(createBilling.id);
  }

  async createCreditCardBilling(billingData: BillingData) {
    const createBilling = await AsaasApi.createBilling("CREDIT_CARD", billingData);
    return AsaasApi.getBillingInfo(createBilling.id);
  }

  async createBoletoBilling(billingData: BillingData) {
    const createBilling = await AsaasApi.createBilling("BOLETO", billingData);
    return AsaasApi.getBillingInfo(createBilling.id);
  } 
}

export default new BillingService();
