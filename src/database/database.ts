import { DataSource } from "typeorm";  // Importa o DataSource do TypeORM
import dotenv from "dotenv";
import { Billing } from '../entities/billing'; // Supondo que você tenha uma entidade Billing

dotenv.config(); // Carrega as variáveis de ambiente

// Criando a instância do DataSource para configurar a conexão com o MySQL
const AppDataSource = new DataSource({
  type: "mysql", 
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT || "3306"), 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME, 
  entities: [Billing],  
  synchronize: true,  
  logging: true,  
});

export default AppDataSource;
