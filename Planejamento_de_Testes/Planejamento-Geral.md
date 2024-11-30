### **Planejamento Geral de Testes para a API**  

### Mapa mental
![alt text](image.png)


### **1. Objetivo**  
Garantir que todas as funcionalidades principais da API, incluindo as rotas `/tickets` e `/movies`, sejam testadas de forma abrangente, cobrindo todos os requisitos funcionais, de segurança, performance e validação de regras de negócio.  


### **2. Escopo do Planejamento**  
As rotas a serem testadas incluem:  

- **`/tickets`**  
  - Cadastro, listagem, atualização e exclusão de ingressos.  
  - Validação de regras de negócio específicas (limites de preço e assento).  
- **`/movies`**  
  - CRUD completo (criação, leitura, atualização e exclusão) de filmes.  
  - Listagem com filtros e paginação.  

Além disso, todos os testes incluirão verificações de segurança, performance e comportamento esperado em situações de erro.  


### **3. Tipos de Testes Considerados**  
1. **Funcionais:** Garantir que as operações básicas funcionem conforme esperado.  
2. **Validação de Campos:** Testar limites, tipos de dados e requisitos obrigatórios.  
3. **Segurança:** Garantir que acessos não autenticados ou não autorizados sejam bloqueados.  
4. **Performance:** Avaliar tempos de resposta e estabilidade sob carga.  
5. **Casos de Erro:** Validar mensagens e respostas da API em situações anômalas.  


### **4. Funcionalidades Testadas**  

| **Funcionalidade**           | **Descrição**                                                                                        |  
|-------------------------------|------------------------------------------------------------------------------------------------------|  
| **Cadastro de Recursos**      | Validação de criação de tickets e filmes com dados válidos e inválidos.                             |  
| **Listagem de Recursos**      | Verificação da listagem geral e com filtros específicos (ex.: por gênero ou por filme).             |  
| **Detalhes por ID**           | Busca de detalhes de tickets e filmes por ID válido ou inexistente.                                |  
| **Atualização de Recursos**   | Validação de atualizações parciais e completas de tickets e filmes.                                 |  
| **Exclusão de Recursos**      | Garantir que recursos existentes sejam excluídos e que a API responda adequadamente para IDs inválidos. |  


### **5. Casos de Teste Planejados**  

#### **Testes Funcionais e de Validação de Campos**  

| **Rota**     | **Cenário**                                          | **Passos**                                                                                     | **Resultado Esperado**                                              |  
|--------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| `/tickets`   | Criar ticket válido.                                 | POST com payload correto.                                                                      | Código 201; Retorno com ID e detalhes do ticket.                   |  
| `/tickets`   | Criar ticket com assento fora do intervalo permitido. | POST com `seatNumber` = 150.                                                                  | Código 400; Mensagem de erro informativa.                          |  
| `/movies`    | Criar filme com título duplicado.                    | POST com título já cadastrado.                                                                | Código 409; Mensagem: "Título já cadastrado."                       |  
| `/movies`    | Atualizar título de filme válido.                    | PUT com ID válido e novo título.                                                              | Código 200; Retorno com dados atualizados.                         |  
| `/tickets`   | Buscar ticket inexistente por ID.                    | GET com ID inválido ou não cadastrado.                                                        | Código 404; Mensagem: "Ticket não encontrado."                     |  


#### **Testes de Segurança**  

| **Rota**     | **Cenário**                                          | **Passos**                                                                                     | **Resultado Esperado**                                              |  
|--------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| `/tickets`   | Cadastro sem autenticação.                           | POST sem token JWT.                                                                           | Código 401; Mensagem: "Token inválido ou ausente."                  |  
| `/movies`    | Exclusão de filme sem autorização.                   | DELETE com token de usuário sem permissão.                                                    | Código 403; Mensagem de acesso negado.                              |  


#### **Testes de Performance**  

| **Cenário**                                          | **Passos**                                                                                     | **Resultado Esperado**                                              |  
|------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| Listagem de 1000 tickets.                           | Cadastrar 1000 tickets e realizar GET.                                                       | Resposta < 300ms; Código 200.                                       |  
| Listagem de 1000 filmes com filtros.                | Cadastrar 1000 filmes e realizar GET com filtros.                                             | Resposta < 2 segundos; Código 200.                                  |  


### **6. Recursos Necessários**  

- **Ambiente de Teste:** Base isolada com dados realistas para `/tickets` e `/movies`.  
- **Ferramentas:**  
  - Postman para testes manuais e automação simples.  
  - JMeter para testes de carga.  
  - Cypress ou RestAssured para automação funcional.  
- **Dados de Teste:**  
  - Exemplos de ingressos e filmes válidos, duplicados e com dados inválidos.  
  - Tokens JWT válidos, expirados e com permissões inadequadas.  


### **7. Métricas de Sucesso**  

1. **Cobertura:**  
   - Cobrir todos os cenários de sucesso e falha previstos para as rotas `/tickets` e `/movies`.  

2. **Performance:**  
   - Resposta média inferior a **300ms** em consultas simples.  
   - Capacidade de processar **50 requisições por segundo** sem falhas.  

3. **Automação:**  
   - Garantir que **80% dos cenários** sejam cobertos por testes automatizados.  


### **8. Total de Testes Planejados**  

| **Tipo de Teste**      | **Quantidade Planejada** |  
|------------------------|--------------------------|  
| Funcionais             | 27                      |  
| Validação de Campos    | 12                      |  
| Segurança              | 7                       |  
| Performance            | 4                       |  
| **Total**              | **50**                  |  

