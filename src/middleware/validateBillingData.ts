import moment from "moment";
import { Request, Response, NextFunction } from "express";
import { BillingData } from "../types/billingData";

const validatebillingData = (req: Request, res: Response, next: NextFunction): void => {
  const paymentData: BillingData = req.body;

  if (!paymentData.customer || typeof paymentData.customer !== "string") {
    res.status(400).json({ error: "O campo 'customer' deve ser uma string não vazia." });
    return;
  }

  if (!Number.isFinite(paymentData.value) || paymentData.value < 0.01) {
    res.status(400).json({ error: "O campo 'value' deve ser um número maior ou igual a 0.01." });
    return;
  }

  if (
    !paymentData.dueDate ||
    typeof paymentData.dueDate !== "string" ||
    !moment(paymentData.dueDate, "YYYY-MM-DD", true).isValid()
  ) {
    res.status(400).json({ error: "O campo 'dueDate' deve estar no formato YYYY-MM-DD." });
    return;
  }

  const today = moment().startOf("day");
  const dueDateObj = moment(paymentData.dueDate, "YYYY-MM-DD").startOf("day");

  if (dueDateObj.isBefore(today, "day")) {
    res.status(400).json({ error: "O 'dueDate' não pode ser anterior à data de hoje." });
    return;
  }

  next();
};

export default validatebillingData;
