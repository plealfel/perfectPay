import BillingService from "../services/billing"; 
import AsaasApi from "../integrations/asaas";
import { BillingData } from "../types/billingData";

// Mock da API externa
jest.mock("../integrations/asaas");

describe("BillingService", () => {
  const mockBillingData: BillingData = {
    customer: "Cliente Teste",
    value: 100.50,
    dueDate: "2025-02-15"
  };

  const mockResponse = {
    id: "123456",
    status: "PENDING",
    value: 100.50,
    dueDate: "2025-02-15"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar uma cobrança PIX e buscar informações de cobrança", async () => {
    (AsaasApi.createBilling as jest.Mock).mockResolvedValue({ id: mockResponse.id });
    (AsaasApi.getBillingInfo as jest.Mock).mockResolvedValue(mockResponse);

    const result = await BillingService.createPixBilling(mockBillingData);

    expect(AsaasApi.createBilling).toHaveBeenCalledWith("PIX", mockBillingData);
    expect(AsaasApi.getBillingInfo).toHaveBeenCalledWith(mockResponse.id);
    expect(result).toEqual(mockResponse);
  });

  test("Deve criar uma cobrança de cartão de crédito e buscar informações de cobrança", async () => {
    (AsaasApi.createBilling as jest.Mock).mockResolvedValue({ id: mockResponse.id });
    (AsaasApi.getBillingInfo as jest.Mock).mockResolvedValue(mockResponse);

    const result = await BillingService.createCreditCardBilling(mockBillingData);

    expect(AsaasApi.createBilling).toHaveBeenCalledWith("CREDIT_CARD", mockBillingData);
    expect(AsaasApi.getBillingInfo).toHaveBeenCalledWith(mockResponse.id);
    expect(result).toEqual(mockResponse);
  });

  test("Deve criar uma cobrança de boleto e buscar informações de cobrança", async () => {
    (AsaasApi.createBilling as jest.Mock).mockResolvedValue({ id: mockResponse.id });
    (AsaasApi.getBillingInfo as jest.Mock).mockResolvedValue(mockResponse);

    const result = await BillingService.createBoletoBilling(mockBillingData);

    expect(AsaasApi.createBilling).toHaveBeenCalledWith("BOLETO", mockBillingData);
    expect(AsaasApi.getBillingInfo).toHaveBeenCalledWith(mockResponse.id);
    expect(result).toEqual(mockResponse);
  });
});
