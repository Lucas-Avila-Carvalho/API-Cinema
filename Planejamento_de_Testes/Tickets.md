### **Planejamento de Testes para a Rota `/tickets`**

### **1. Objetivo**
Garantir que a funcionalidade de reserva de ingressos na API seja robusta, segura e eficiente, cobrindo todos os cenários de cadastro, validação, segurança e desempenho.

---

### **2. Tipos de Testes Considerados**
- **Funcionais:** Validação de todos os cenários relacionados a operações de CRUD.
- **Validação de Regras de Negócio:** Verificar limites de campos e consistência nas validações.
- **Segurança:** Certificar que apenas usuários autenticados possam realizar operações.
- **Performance:** Avaliar a resposta da API sob alta carga e latência.
- **Testes de Bordas:** Explorar os limites dos campos numéricos e de strings.

---

### **3. Casos de Teste Planejados**

#### **Funcionalidade:** Cadastro de Ingressos  

| **Tipo de Teste**   | **Cenário**                                                                                           | **Passos**                                                                                                 | **Resultado Esperado**                                                                 |
|----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Funcional            | Cadastro de ingresso válido.                                                                        | 1. Enviar POST para `/tickets` com payload válido.<br>2. Validar status 201 e corpo da resposta.           | Código 201 Created.<br>Resposta contém dados do ingresso, incluindo ID.              |
| Validação de Campos  | Falha ao cadastrar ingresso com "assento" fora do intervalo (0-99).                                 | 1. Enviar POST para `/tickets` com `seatNumber` = 150.<br>2. Validar status 400 e mensagem de erro.         | Código 400 Bad Request.<br>Mensagem: *"Número de assento deve estar entre 0 e 99."*  |
| Validação de Campos  | Falha ao cadastrar ingresso com "preço" acima do limite (60).                                       | 1. Enviar POST para `/tickets` com `price` = 100.<br>2. Validar status 400 e mensagem de erro.              | Código 400 Bad Request.<br>Mensagem: *"Preço deve ser menor ou igual a 60."*         |
| Validação de Campos  | Falha ao cadastrar ingresso sem um campo obrigatório (e.g., `movieId`).                             | 1. Enviar POST para `/tickets` sem `movieId`.<br>2. Validar status 400 e mensagem de erro.                  | Código 400 Bad Request.<br>Mensagem: *"O campo movieId é obrigatório."*             |
| Segurança            | Cadastro sem autenticação.                                                                          | 1. Enviar POST para `/tickets` sem token JWT.<br>2. Validar status 401 e mensagem de erro.                  | Código 401 Unauthorized.<br>Mensagem: *"Token inválido ou ausente."*                |

---

#### **Funcionalidade:** Listagem de Ingressos  

| **Tipo de Teste**   | **Cenário**                                                                                           | **Passos**                                                                                                 | **Resultado Esperado**                                                                 |
|----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Funcional            | Listar todos os ingressos cadastrados.                                                              | 1. Enviar GET para `/tickets`.<br>2. Validar status 200 e conteúdo da resposta.                            | Código 200 OK.<br>Resposta contém array com todos os ingressos cadastrados.          |
| Funcional            | Filtrar ingressos por `movieId`.                                                                    | 1. Enviar GET para `/tickets?movieId=123`.<br>2. Validar que apenas ingressos correspondentes ao filtro.   | Código 200 OK.<br>Lista contém apenas ingressos do filme especificado.              |
| Performance          | Verificar tempo de resposta com 1000 ingressos cadastrados.                                         | 1. Popular base com 1000 ingressos.<br>2. Enviar GET para `/tickets`.<br>3. Medir tempo de resposta.       | Resposta em menos de 300 ms.<br>Status 200 OK.                                       | Funcional (Automático)    | Buscar ticket existente por ID.                   | 1. Enviar requisição GET com ID válido no endpoint.                                          | Código 200; Detalhes do ticket.                                       |  
| Funcional (Automático)    | Buscar ticket inexistente por ID.                 | 1. Enviar requisição GET com ID inválido ou não cadastrado.                                  | Código 404; Mensagem: "ticket não encontrado."                       |  


---

#### **Funcionalidade:** Atualização de Ingressos  

| **Tipo de Teste**   | **Cenário**                                                                                           | **Passos**                                                                                                 | **Resultado Esperado**                                                                 |
|----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Funcional            | Atualizar preço e assento de um ingresso existente.                                                 | 1. Enviar PUT para `/tickets/{id}` com payload válido.<br>2. Validar status 200 e dados atualizados.       | Código 200 OK.<br>Dados do ingresso atualizados com sucesso.                         |
| Funcional            | Falha ao atualizar um ingresso inexistente.                                                        | 1. Enviar PUT para `/tickets/{id_inexistente}`.<br>2. Validar status 404 e mensagem de erro.               | Código 404 Not Found.<br>Mensagem: *"Ingresso não encontrado."*                     |

---

#### **Funcionalidade:** Exclusão de Ingressos  

| **Tipo de Teste**   | **Cenário**                                                                                           | **Passos**                                                                                                 | **Resultado Esperado**                                                                 |
|----------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Funcional            | Excluir ingresso com sucesso.                                                                       | 1. Criar ingresso.<br>2. Enviar DELETE para `/tickets/{id}`.<br>3. Validar status 204 No Content.          | Código 204 No Content.<br>Ingresso removido com sucesso.                             |
| Funcional            | Falha ao excluir um ingresso inexistente.                                                          | 1. Enviar DELETE para `/tickets/{id_inexistente}`.<br>2. Validar status 404 e mensagem de erro.            | Código 404 Not Found.<br>Mensagem: *"Ingresso não encontrado."*                     |

---

### **4. Requisitos Não Funcionais**

#### **Performance**
- Processar no mínimo **50 solicitações de reserva por segundo**.
- Garantir resposta média em **menos de 300 milissegundos**.

#### **Segurança**
- Somente usuários autenticados podem acessar as operações.

#### **Automação**
- Utilizar ferramentas como Postman, Cypress, ou RestAssured para testes automatizados.

---

### **5. Total de Testes Planejados**
- **Funcionais:** 12
- **Validações:** 8
- **Segurança:** 4
- **Performance:** 2  
**Total:** **26 Testes Planejados**

### **Cenários de Testes em Gherkin para Reserva de Ingressos**  

#### **Cenário 1: Reserva bem-sucedida de um ingresso**  
```gherkin  
Funcionalidade: Reserva de Ingressos  
Cenário: Reserva bem-sucedida de um ingresso  
Dado que o usuário está autenticado com um token JWT válido  
E envia uma requisição POST para o endpoint "/tickets" com os seguintes detalhes:  
  | Campo          | Valor                |  
  | movieId        | abc123               |  
  | userId         | user001              |  
  | seatNumber     | 15                   |  
  | price          | 50.00                |  
  | showtime       | 2024-12-01T19:30:00  |  
Quando o sistema processa a requisição  
Então deve retornar o código de status 201 Created  
E o corpo da resposta deve conter os detalhes da reserva com um ID único:  
  """  
  {  
    "id": "reservation123",  
    "movieId": "abc123",  
    "userId": "user001",  
    "seatNumber": 15,  
    "price": 50.00,  
    "showtime": "2024-12-01T19:30:00"  
  }  
  """  
```  

#### **Cenário 2: Falha ao reservar ingresso com assento inválido**  
```gherkin  
Funcionalidade: Reserva de Ingressos  
Cenário: Falha ao reservar ingresso com número de assento fora do intervalo permitido  
Dado que o usuário está autenticado com um token JWT válido  
E envia uma requisição POST para o endpoint "/tickets" com o número de assento 150  
Quando o sistema processa a requisição  
Então deve retornar o código de status 400 Bad Request  
E a mensagem de erro "Número do assento deve estar entre 0 e 99."  
```  

#### **Cenário 3: Falha ao reservar ingresso com preço inválido**  
```gherkin  
Funcionalidade: Reserva de Ingressos  
Cenário: Falha ao reservar ingresso com preço fora do intervalo permitido  
Dado que o usuário está autenticado com um token JWT válido  
E envia uma requisição POST para o endpoint "/tickets" com o preço -10  
Quando o sistema processa a requisição  
Então deve retornar o código de status 400 Bad Request  
E a mensagem de erro "O preço deve estar entre 0 e 60."  
```  

#### **Cenário 4: Falha ao reservar ingresso com campo obrigatório ausente**  
```gherkin  
Funcionalidade: Reserva de Ingressos  
Cenário: Falha ao reservar ingresso sem o campo "movieId"  
Dado que o usuário está autenticado com um token JWT válido  
E envia uma requisição POST para o endpoint "/tickets" sem o campo "movieId"  
Quando o sistema processa a requisição  
Então deve retornar o código de status 400 Bad Request  
E a mensagem de erro "O campo movieId é obrigatório."  
```  

#### **Cenário 5: Performance da reserva de ingressos sob alta carga**  
```gherkin  
Funcionalidade: Performance da API  
Cenário: A API deve processar 50 solicitações de reserva de ingressos por segundo  
Dado que 50 usuários enviam requisições POST para o endpoint "/tickets" simultaneamente  
Quando o sistema processa todas as requisições  
Então cada resposta deve ter um tempo médio inferior a 300 milissegundos  
E todas as requisições devem retornar o código de status 201 Created  
```  

#### **Cenário 6: Falha ao reservar ingresso sem autenticação**  
```gherkin  
Funcionalidade: Reserva de Ingressos  
Cenário: Falha ao reservar ingresso sem autenticação  
Dado que o usuário não está autenticado  
E envia uma requisição POST para o endpoint "/tickets" com dados válidos  
Quando o sistema processa a requisição  
Então deve retornar o código de status 401 Unauthorized  
E a mensagem de erro "Token inválido ou ausente."  
```  

