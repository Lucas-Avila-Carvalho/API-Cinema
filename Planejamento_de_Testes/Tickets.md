# **User Story: (Rota `/tickets`)**


### **Título:** Gerenciamento de Ingressos de Filmes

### **Descrição:**  
Como um **usuário autenticado**,  
Quero gerenciar ingressos para filmes (criar, listar, atualizar e excluir),  
Para organizar a venda e acompanhamento de ingressos.


### **Critérios de Aceitação Detalhados:**

#### **1. Cadastro de Ingressos**
- Usuários autenticados podem cadastrar novos ingressos para filmes específicos.  
- Campos obrigatórios:  
  - **Filme (ID do filme)** (string, obrigatório).  
  - **Preço** (número positivo, obrigatório).  
  - **Sessão (data e hora)** (formato ISO: `YYYY-MM-DDTHH:mm:ss`, obrigatório).  

#### **2. Listagem de Ingressos**
- Usuários podem listar todos os ingressos cadastrados.  
- O sistema deve suportar filtros opcionais:  
  - Por filme (ID).  
  - Por intervalo de preço.  
  - Por data da sessão.  

#### **3. Atualização de Ingressos**
- Usuários autenticados podem atualizar ingressos existentes.  
- Os mesmos campos do cadastro devem ser validados.

#### **4. Exclusão de Ingressos**
- Usuários autenticados podem excluir ingressos.  
- Caso o ID do ingresso não seja encontrado, o sistema deve retornar uma mensagem de erro.

#### **5. Validação e Segurança**
- Todas as ações exigem autenticação com token JWT.  
- Campos obrigatórios devem ser validados, e erros de validação devem ser claros e específicos.  


### **Cenários de Testes em Gherkin**

#### **Cenário 1: Cadastro bem-sucedido de um ingresso**
```gherkin
Funcionalidade: Cadastro de Ingressos
Cenário: Cadastro bem-sucedido de um ingresso
Dado que o usuário está autenticado com um token JWT válido
E envia uma requisição POST para a rota "/tickets"
E fornece os seguintes dados válidos:
  | Campo          | Valor                |
  | Filme          | abc123               |
  | Preço          | 50.00                |
  | Sessão         | 2024-12-01T19:30:00  |
Quando o sistema processa a requisição
Então deve retornar o código de status 201 Created
E o corpo da resposta deve conter os dados do ingresso cadastrado, incluindo o ID:
  """
  {
    "id": "ticket123",
    "filme": "abc123",
    "preco": 50.00,
    "sessao": "2024-12-01T19:30:00"
  }
  """
```


#### **Cenário 2: Listagem de ingressos sem filtros**
```gherkin
Funcionalidade: Listagem de Ingressos
Cenário: Listar todos os ingressos cadastrados
Dado que o usuário está autenticado com um token JWT válido
Quando o usuário envia uma requisição GET para a rota "/tickets"
Então o sistema deve retornar o código de status 200 OK
E uma lista de ingressos no corpo da resposta:
  """
  [
    {
      "id": "ticket123",
      "filme": "abc123",
      "preco": 50.00,
      "sessao": "2024-12-01T19:30:00"
    },
    {
      "id": "ticket456",
      "filme": "def456",
      "preco": 30.00,
      "sessao": "2024-12-05T21:00:00"
    }
  ]
  """
```


#### **Cenário 3: Falha ao cadastrar ingresso sem token**
```gherkin
Funcionalidade: Cadastro de Ingressos
Cenário: Falha ao cadastrar ingresso sem autenticação
Dado que o usuário não está autenticado
Quando o usuário envia uma requisição POST para a rota "/tickets" com dados válidos
Então o sistema deve retornar o código de status 401 Unauthorized
E a mensagem de erro "Token inválido ou ausente."
```


#### **Cenário 4: Atualização de ingresso com sucesso**
```gherkin
Funcionalidade: Atualização de Ingressos
Cenário: Atualizar ingresso existente com sucesso
Dado que o usuário está autenticado com um token JWT válido
E já existe um ingresso com ID "ticket123"
Quando o usuário envia uma requisição PUT para a rota "/tickets/ticket123" com os dados:
  | Campo          | Valor                |
  | Preço          | 60.00                |
  | Sessão         | 2024-12-02T20:00:00  |
Então o sistema deve retornar o código de status 200 OK
E o corpo da resposta deve conter os dados atualizados:
  """
  {
    "id": "ticket123",
    "filme": "abc123",
    "preco": 60.00,
    "sessao": "2024-12-02T20:00:00"
  }
  """
```


#### **Cenário 5: Exclusão de um ingresso inexistente**
```gherkin
Funcionalidade: Exclusão de Ingressos
Cenário: Falha ao excluir um ingresso inexistente
Dado que o usuário está autenticado com um token JWT válido
E não existe um ingresso com ID "ticket999"
Quando o usuário envia uma requisição DELETE para a rota "/tickets/ticket999"
Então o sistema deve retornar o código de status 404 Not Found
E a mensagem de erro "Ingresso não encontrado."
```


#### **Cenário 6: Cadastro falha por campo obrigatório ausente**
```gherkin
Funcionalidade: Cadastro de Ingressos
Cenário: Falha ao cadastrar ingresso sem o campo obrigatório "Preço"
Dado que o usuário está autenticado com um token JWT válido
E envia uma requisição POST para a rota "/tickets" sem o campo "Preço"
Quando o sistema processa a requisição
Então deve retornar o código de status 400 Bad Request
E a mensagem de erro "O campo Preço é obrigatório."
```

### **Planejamento de Testes para a Rota `/tickets`**


### **1. Objetivo**  
Validar completamente a funcionalidade da rota `/tickets`, incluindo cadastro, listagem, atualização e exclusão de ingressos. O planejamento abrange cenários positivos, negativos e de borda, utilizando testes manuais e automatizados, além de verificar validações, segurança, e desempenho.


### **2. Tipos de Testes Considerados**  
- **Funcionais:** Testar as operações de CRUD na rota.  
- **Validação de Campos:** Garantir que os campos obrigatórios e opcionais sejam processados corretamente.  
- **Segurança:** Validar autenticação JWT e impedir acessos não autorizados.  
- **Performance:** Avaliar a eficiência das respostas em cenários de alta carga.  
- **Testes de Erro:** Confirmar que mensagens de erro são claras e adequadas.  


### **3. Testes Planejados**


### **Funcionalidade:** Cadastro de Ingressos  

| **Tipo de Teste**   | **Execução** | **Cenário**                                                                                                                                                                                                                                         | **Passos**                                                                                                                                                                                                 | **Resultados Esperados**                                                                                                                      |
|----------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional            | Automático   | Cadastro de um ingresso válido.                                                                                                                                                                                                                     | 1. Enviar requisição POST para `/tickets` com payload válido.<br>2. Validar status 201 e corpo da resposta.                                                                                           | Código 201 Created.<br>Resposta contém dados do ingresso cadastrado, incluindo ID.                                                            |
| Funcional            | Automático   | Cadastro sem autenticação.                                                                                                                                                                                                                          | 1. Enviar requisição POST para `/tickets` sem token JWT.<br>2. Validar status 401 e mensagem de erro.                                                                                                | Código 401 Unauthorized.<br>Mensagem: *"Token inválido ou ausente."*                                                                           |
| Validação de Campos  | Automático   | Falha ao cadastrar sem o campo obrigatório "filme".                                                                                                                                                                                                 | 1. Enviar requisição POST para `/tickets` sem o campo "filme".<br>2. Validar status 400 e mensagem de erro.                                                                                          | Código 400 Bad Request.<br>Mensagem: *"O campo filme é obrigatório."*                                                                          |
| Validação de Campos  | Automático   | Cadastro de ingresso com "preço" zero ou negativo.                                                                                                                                                                                                  | 1. Enviar requisição POST para `/tickets` com `preco` igual a 0 ou negativo.<br>2. Validar status 400 e mensagem de erro.                                                                             | Código 400 Bad Request.<br>Mensagem: *"O campo preço deve ser maior que zero."*                                                                |
| Segurança            | Manual       | Garantir que usuários não autenticados não possam acessar a rota `/tickets`.                                                                                                                                                                                                                                                   |


### **Funcionalidade:** Listagem de Ingressos  

| **Tipo de Teste** | **Execução** | **Cenário**                                                                                                                                                                                                                                         | **Passos**                                                                                                                                                                                                 | **Resultados Esperados**                                                                                                                      |
|--------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional          | Automático   | Listar todos os ingressos cadastrados.                                                                                                                                                                                                             | 1. Enviar requisição GET para `/tickets`.<br>2. Validar status 200 e conteúdo da resposta.                                                                                                            | Código 200 OK.<br>Resposta contém array com todos os ingressos cadastrados.                                                                   |
| Funcional          | Automático   | Filtrar ingressos por filme.                                                                                                                                                                                                                       | 1. Enviar requisição GET para `/tickets?filme=abc123`.<br>2. Validar status 200 e que apenas ingressos relacionados ao filme "abc123" são retornados.                                                | Código 200 OK.<br>Resposta contém apenas ingressos filtrados.                                                                                  |
| Performance        | Automático   | Verificar performance da listagem com 1000 ingressos cadastrados.                                                                                                                                                                                 | 1. Popular a base com 1000 registros de ingressos.<br>2. Enviar requisição GET para `/tickets`.<br>3. Medir tempo de resposta.                                                                        | Resposta deve ser retornada em menos de 2 segundos.                                                                                           |


### **Funcionalidade:** Atualização de Ingressos  

| **Tipo de Teste**   | **Execução** | **Cenário**                                                                                                                                                                                                                                         | **Passos**                                                                                                                                                                                                 | **Resultados Esperados**                                                                                                                      |
|----------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional            | Automático   | Atualizar ingresso com sucesso.                                                                                                                                                                                                                    | 1. Enviar requisição PUT para `/tickets/{id}` com payload válido.<br>2. Validar status 200 e corpo da resposta.                                                                                       | Código 200 OK.<br>Ingresso atualizado com os novos dados fornecidos.                                                                          |
| Funcional            | Automático   | Falha ao atualizar um ingresso inexistente.                                                                                                                                                                                                        | 1. Enviar requisição PUT para `/tickets/{id_inexistente}`.<br>2. Validar status 404 e mensagem de erro.                                                                                              | Código 404 Not Found.<br>Mensagem: *"Ingresso não encontrado."*                                                                               |


### **Funcionalidade:** Exclusão de Ingressos  

| **Tipo de Teste**   | **Execução** | **Cenário**                                                                                                                                                                                                                                         | **Passos**                                                                                                                                                                                                 | **Resultados Esperados**                                                                                                                      |
|----------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional            | Automático   | Excluir ingresso com sucesso.                                                                                                                                                                                                                      | 1. Criar um ingresso.<br>2. Enviar requisição DELETE para `/tickets/{id}`.<br>3. Validar status 204 No Content.                                                                                       | Código 204 No Content.<br>Ingresso removido da base.                                                                                          |
| Funcional            | Automático   | Falha ao excluir um ingresso inexistente.                                                                                                                                                                                                          | 1. Enviar requisição DELETE para `/tickets/{id_inexistente}`.<br>2. Validar status 404 e mensagem de erro.                                                                                           | Código 404 Not Found.<br>Mensagem: *"Ingresso não encontrado."*                                                                               |




### **Funcionalidades**  
- **Cadastro de Ingressos:** Permite registrar novos ingressos com informações obrigatórias e opcionais.  
- **Listagem de Ingressos:** Exibe todos os ingressos cadastrados com suporte a filtros.  
- **Atualização de Ingressos:** Atualiza informações como preço ou data da sessão.  
- **Exclusão de Ingressos:** Remove ingressos com base no ID.


### **Recursos Necessários**  
- **Ambiente de Testes:**  
  - Base de dados configurada para validar operações de CRUD.  
  - Simuladores de carga para testes de performance.  
- **Ferramentas de Automação:**  
  - Postman, RestAssured ou Cypress para automação de testes de API.  
  - Gerador de dados para criar ingressos fictícios com diferentes combinações de valores.  


### **Critérios Usados**  
- **Cobertura de Operações CRUD:** Validar o funcionamento completo da rota `/tickets`.  
- **Cenários de Bordas:** Testar limites para campos numéricos e strings.  
- **Validação de Segurança:** Garantir que o acesso não autorizado seja bloqueado.  
- **Automação:** Priorizar cenários frequentes e repetitivos para automação.  


### **Quantidade de Testes**  
- **Testes Funcionais:** 16  
- **Testes de Validação de Campos:** 6  
- **Testes de Segurança:** 4  
- **Testes de Performance:** 2  
- **Total:** **28 Testes Planejados**


### **Riscos**  
- **Autenticação JWT:** Tokens expirados ou inválidos podem impedir testes legítimos.  
- **Validação de Campos:** Valores incorretos podem passar se as validações não forem robustas.  
- **Performance:** Respostas lentas em cenários de grande volume podem afetar a usabilidade.  


