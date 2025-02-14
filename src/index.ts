import { startServer } from "./server";

const PORT = process.env.PORT || 3000;

startServer().then(() => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
}).catch((error) => {
  console.error("Erro ao iniciar o servidor:", error);
});
