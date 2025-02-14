import { Request, Response } from "express";
import billingService from "../services/billing";

// Exemplo de uma função de controlador
export const createPixPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const paymentResponse = await billingService.createPixBilling(paymentData);
    res.status(200).json(paymentResponse);
  } catch (error) {
      res.status(500).json({
        message: "Erro ao processar a cobrança",
        error,
      });
  }
};

export const createCreditCardPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const paymentResponse = await billingService.createCreditCardBilling(paymentData);
    res.status(200).json(paymentResponse);
  } catch (error: unknown) {
      res.status(500).json({
        message: "Erro ao processar a cobrança",
        error,
      });
  }
};

export const createBoletoPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const paymentResponse = await billingService.createBoletoBilling(paymentData);
    res.status(200).json(paymentResponse);
  } catch (error: unknown) {
      res.status(500).json({
        message: "Erro ao processar a cobrança",
        error
      });
  }
};
