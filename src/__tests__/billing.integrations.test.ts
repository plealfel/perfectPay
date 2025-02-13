import axios from "axios";
import AsaasApi from "../integrations/asaas";
import { BillingData } from "../types/billingData";

// Mock do axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AsaasApi", () => {
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

  test("Deve criar uma cobrança corretamente", async () => {
    mockedAxios.post.mockResolvedValue({ data: mockResponse });

    const result = await AsaasApi.createBilling("PIX", mockBillingData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        billingType: "PIX",
        ...mockBillingData
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: expect.any(String)
        })
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test("Deve buscar informações de uma cobrança corretamente", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const result = await AsaasApi.getBillingInfo("123456");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("123456/billingInfo"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "application/json",
          access_token: expect.any(String)
        })
      })
    );
    expect(result).toEqual(mockResponse);
  });

  test("Deve lançar erro caso a criação de cobrança falhe", async () => {
    mockedAxios.post.mockRejectedValue(new Error("Erro na API"));

    await expect(AsaasApi.createBilling("PIX", mockBillingData)).rejects.toThrow("Erro na API");
  });

  test("Deve lançar erro caso a busca de informações de cobrança falhe", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Erro na API"));

    await expect(AsaasApi.getBillingInfo("123456")).rejects.toThrow("Erro na API");
  });
});
