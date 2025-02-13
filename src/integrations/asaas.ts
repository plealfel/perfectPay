import axios from "axios";
import dotenv from "dotenv";
import { BillingData } from "../types/billingData";
dotenv.config();

const API_URL: string = process.env.API_URL ?? "";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN ?? "";

class AsaasApi{
  async createBilling(billingType: string, billingData: BillingData) {
  try {
    const response = await axios.post(
      API_URL,
      {
        billingType,
        ...billingData,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token: ACCESS_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async getBillingInfo(billingtId: string) {
  try {
    const response = await axios.get(
      `${API_URL}/${billingtId}/billingInfo`,
      {
        headers: {
          Accept: "application/json",
          access_token: ACCESS_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}}

export default new AsaasApi();


