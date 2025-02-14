import { Repository } from "typeorm";
import { Billing } from "../entities/billing";
import AppDataSource from "../database/database";

class BillingRepository {
  private repo: Repository<Billing>;

  constructor() {
    this.repo = AppDataSource.getRepository(Billing);
  }

  async createBilling(data: Billing): Promise<Billing> {
    const billing = this.repo.create(data);
    return await this.repo.save(billing);
  }

  async getBillingById(id: string): Promise<Billing | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async getAllBillings(): Promise<Billing[]> {
    return await this.repo.find();
  }

  async updateBilling(id: string, data: Partial<Billing>): Promise<Billing | null> {
    await this.repo.update(id, data);
    return this.getBillingById(id);
  }

  async deleteBilling(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}

export default new BillingRepository();
