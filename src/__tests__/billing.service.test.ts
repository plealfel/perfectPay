import BillingService from "../services/billing";
import AsaasApi from "../integrations/asaas";
import BillingRepository from "../repositories/billing";
import { BillingData } from "../types/billingData";

// Mock das dependências
jest.mock("../integrations/asaas", () => ({
  createBilling: jest.fn(),
  getBillingInfo: jest.fn(),
}));

jest.mock("../repositories/billing", () => ({
  createBilling: jest.fn(),
}));

describe("BillingService", () => {
  const mockBillingData: BillingData = {
    customer: "Cliente Teste",
    value: 100.50,
    dueDate: "2025-02-15",
  };

  const mockCreateResponse = {
    id: "123456",
    status: "PENDING",
  };

  const mockBillingInfo = {
    bankSlip: { bankSlipUrl: "https://boleto.com", barCode: "1234567890" },
    pix: { payload: "chave-pix", encodedImage: "imagem-base64" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar uma cobrança PIX e salvar no banco de dados", async () => {
    // Mock do comportamento das funções
    (AsaasApi.createBilling as jest.Mock).mockResolvedValue(mockCreateResponse);
    (AsaasApi.getBillingInfo as jest.Mock).mockResolvedValue(mockBillingInfo);
    (BillingRepository.createBilling as jest.Mock).mockResolvedValue(undefined); // Mock da gravação no banco

    const result = await BillingService.createPixBilling(mockBillingData);

    // Verifica se as funções foram chamadas corretamente
    expect(AsaasApi.createBilling).toHaveBeenCalledWith("PIX", mockBillingData);
    expect(AsaasApi.getBillingInfo).toHaveBeenCalledWith(mockCreateResponse.id);
    expect(BillingRepository.createBilling).toHaveBeenCalledWith(expect.objectContaining({
      id: mockCreateResponse.id,
      value: mockBillingData.value,
      type: "PIX",
      status: mockCreateResponse.status,
      bankslipLink: mockBillingInfo.bankSlip.bankSlipUrl,
      bankslipCode: mockBillingInfo.bankSlip.barCode,
      pixKey: mockBillingInfo.pix.payload,
    }));
    
    // Verifica a resposta do serviço
    expect(result).toEqual({
      message: "Cobrança no PIX criada com sucesso",
      data: expect.objectContaining({
        pixEncodedImage: mockBillingInfo.pix.encodedImage,
      }),
    });
  });

  test("Deve criar uma cobrança de cartão de crédito e salvar no banco de dados", async () => {
    (AsaasApi.createBilling as jest.Mock).mockResolvedValue(mockCreateResponse);
    (AsaasApi.getBillingInfo as jest.Mock).mockResolvedValue(mockBillingInfo);
    (BillingRepository.createBilling as jest.Mock).mockResolvedValue(undefined);

    const result = await BillingService.createCreditCardBilling(mockBillingData);

    expect(AsaasApi.createBilling).toHaveBeenCalledWith("CREDIT_CARD", mockBillingData);
    expect(AsaasApi.getBillingInfo).toHaveBeenCalledWith(mockCreateResponse.id);
    expect(BillingRepository.createBilling).toHaveBeenCalledWith(expect.objectContaining({
      id: mockCreateResponse.id,
      value: mockBillingData.value,
      type: "CREDIT_CARD",
      status: mockCreateResponse.status,
      bankslipLink: mockBillingInfo.bankSlip.bankSlipUrl,
      bankslipCode: mockBillingInfo.bankSlip.barCode,
      pixKey: null, // Não aplicável para cartão de crédito
    }));

    expect(result).toEqual({
      message: "Cobrança no cartão de crédito criada com sucesso",
      data: expect.objectContaining({}),
    });
  });

  test("Deve criar uma cobrança de boleto e salvar no banco de dados", async () => {
    (AsaasApi.createBilling as jest.Mock).mockResolvedValue(mockCreateResponse);
    (AsaasApi.getBillingInfo as jest.Mock).mockResolvedValue(mockBillingInfo);
    (BillingRepository.createBilling as jest.Mock).mockResolvedValue(undefined);

    const result = await BillingService.createBoletoBilling(mockBillingData);

    expect(AsaasApi.createBilling).toHaveBeenCalledWith("BOLETO", mockBillingData);
    expect(AsaasApi.getBillingInfo).toHaveBeenCalledWith(mockCreateResponse.id);
    expect(BillingRepository.createBilling).toHaveBeenCalledWith(expect.objectContaining({
      id: mockCreateResponse.id,
      value: mockBillingData.value,
      type: "BOLETO",
      status: mockCreateResponse.status,
      bankslipLink: mockBillingInfo.bankSlip.bankSlipUrl,
      bankslipCode: mockBillingInfo.bankSlip.barCode,
      pixKey: mockBillingInfo.pix.payload, // Neste caso, o pix também pode ser atribuído
    }));

    expect(result).toEqual({
      message: "Boleto criado com sucesso",
      data: expect.objectContaining({}),
    });
  });
});
