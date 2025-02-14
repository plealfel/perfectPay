import { Request, Response } from "express";
import * as billingController from "../controller/billing";
import billingService from "../services/billing";

// Mock do serviço de billing
jest.mock("../services/billing");

describe("Billing Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {
      body: {
        customer: "Cliente Teste",
        value: 100.5,
        dueDate: "2025-02-15",
      },
    };

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };
  });

  test("Deve criar um pagamento PIX com sucesso", async () => {
    (billingService.createPixBilling as jest.Mock).mockResolvedValue({ id: "123", status: "PENDING" });

    await billingController.createPixPayment(mockRequest as Request, mockResponse as Response);

    expect(billingService.createPixBilling).toHaveBeenCalledWith(mockRequest.body);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: "123", status: "PENDING" });
  });

  test("Deve retornar erro 500 ao falhar a criação de pagamento PIX", async () => {
    const errorMock = new Error("Erro na API");
    (billingService.createPixBilling as jest.Mock).mockRejectedValue(errorMock);

    await billingController.createPixPayment(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao processar a cobrança",
      error: errorMock,
    });
  });

  test("Deve criar um pagamento com cartão de crédito com sucesso", async () => {
    (billingService.createCreditCardBilling as jest.Mock).mockResolvedValue({ id: "456", status: "APPROVED" });

    await billingController.createCreditCardPayment(mockRequest as Request, mockResponse as Response);

    expect(billingService.createCreditCardBilling).toHaveBeenCalledWith(mockRequest.body);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: "456", status: "APPROVED" });
  });

  test("Deve retornar erro 500 ao falhar a criação de pagamento com cartão de crédito", async () => {
    const errorMock = new Error("Erro de pagamento");
    (billingService.createCreditCardBilling as jest.Mock).mockRejectedValue(errorMock);

    await billingController.createCreditCardPayment(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao processar a cobrança",
      error: errorMock,
    });
  });

  test("Deve criar um pagamento por boleto com sucesso", async () => {
    (billingService.createBoletoBilling as jest.Mock).mockResolvedValue({ id: "789", status: "WAITING_PAYMENT" });

    await billingController.createBoletoPayment(mockRequest as Request, mockResponse as Response);

    expect(billingService.createBoletoBilling).toHaveBeenCalledWith(mockRequest.body);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ id: "789", status: "WAITING_PAYMENT" });
  });

  test("Deve retornar erro 500 ao falhar a criação de pagamento por boleto", async () => {
    const errorMock = new Error("Erro no boleto");
    (billingService.createBoletoBilling as jest.Mock).mockRejectedValue(errorMock);

    await billingController.createBoletoPayment(mockRequest as Request, mockResponse as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Erro ao processar a cobrança",
      error: errorMock,
    });
  });
});
