# **User Story: (Rota `/movies`)**


### **Título:** Cadastro e Gerenciamento de Filmes

### **Descrição:**  
Como um **usuário autenticado**,  
Quero gerenciar informações de filmes (criar, listar, atualizar e excluir),  
Para organizar e disponibilizar uma base de dados consistente de filmes.


### **Critérios de Aceitação Detalhados:**

#### **1. Cadastro de Filmes**
- Usuários autenticados podem cadastrar novos filmes.  
- Campos obrigatórios:  
  - **Título** (string, único, entre 1 e 100 caracteres).  
  - **Gênero** (string, entre 3 e 50 caracteres).  
  - **Data de Lançamento** (formato ISO: `YYYY-MM-DD`).  
- Campos opcionais:  
  - **Diretor** (string, até 100 caracteres).  
  - **Atores** (lista de strings).  

#### **2. Listagem de Filmes**
- Usuários podem listar todos os filmes cadastrados.  
- O sistema deve suportar filtros opcionais:  
  - Por gênero.  
  - Por data de lançamento (antes, depois ou exata).  

#### **3. Atualização de Filmes**
- Usuários autenticados podem atualizar filmes existentes.  
- O sistema deve validar os mesmos campos do cadastro.  

#### **4. Exclusão de Filmes**
- Usuários autenticados podem excluir filmes.  
- Caso o ID não seja encontrado, retornar mensagem de erro.

#### **5. Validação e Segurança**
- Todas as ações exigem autenticação com token JWT.  
- Erros de validação devem ser claros e específicos.  


### **Cenários de Testes em Gherkin**

#### **Cenário 1: Cadastro bem-sucedido de um filme**
```gherkin
Funcionalidade: Cadastro de Filmes
Cenário: Cadastro bem-sucedido de um filme
Dado que o usuário está autenticado com um token JWT válido
E envia uma requisição POST para a rota "/movies"
E fornece os seguintes dados válidos:
  | Campo              | Valor               |
  | Título             | Filme Exemplo       |
  | Gênero             | Ação                |
  | Data de Lançamento | 2024-01-01          |
  | Diretor            | Diretor Exemplo     |
  | Atores             | ["Ator 1", "Ator 2"]|
Quando o sistema processa a requisição
Então deve retornar o código de status 201 Created
E o corpo da resposta deve conter os dados do filme cadastrado, incluindo o ID:
  """
  {
    "id": "abc123",
    "titulo": "Filme Exemplo",
    "genero": "Ação",
    "dataLancamento": "2024-01-01",
    "diretor": "Diretor Exemplo",
    "atores": ["Ator 1", "Ator 2"]
  }
  """
```


#### **Cenário 2: Listagem de filmes sem filtros**
```gherkin
Funcionalidade: Listagem de Filmes
Cenário: Listar todos os filmes cadastrados
Dado que o usuário está autenticado com um token JWT válido
Quando o usuário envia uma requisição GET para a rota "/movies"
Então o sistema deve retornar o código de status 200 OK
E uma lista de filmes no corpo da resposta:
  """
  [
    {
      "id": "abc123",
      "titulo": "Filme Exemplo 1",
      "genero": "Ação",
      "dataLancamento": "2024-01-01"
    },
    {
      "id": "def456",
      "titulo": "Filme Exemplo 2",
      "genero": "Drama",
      "dataLancamento": "2023-12-15"
    }
  ]
  """
```


#### **Cenário 3: Falha ao cadastrar filme sem token**
```gherkin
Funcionalidade: Cadastro de Filmes
Cenário: Falha ao cadastrar filme sem autenticação
Dado que o usuário não está autenticado
Quando o usuário envia uma requisição POST para a rota "/movies" com dados válidos
Então o sistema deve retornar o código de status 401 Unauthorized
E a mensagem de erro "Token inválido ou ausente."
```

#### **Cenário 4: Atualização de filme com sucesso**
```gherkin
Funcionalidade: Atualização de Filmes
Cenário: Atualizar filme existente com sucesso
Dado que o usuário está autenticado com um token JWT válido
E já existe um filme com ID "abc123"
Quando o usuário envia uma requisição PUT para a rota "/movies/abc123" com os dados:
  | Campo            | Valor               |
  | Título           | Filme Atualizado    |
  | Gênero           | Suspense            |
  | Data de Lançamento | 2025-05-01         |
Então o sistema deve retornar o código de status 200 OK
E o corpo da resposta deve conter os dados atualizados:
  """
  {
    "id": "abc123",
    "titulo": "Filme Atualizado",
    "genero": "Suspense",
    "dataLancamento": "2025-05-01"
  }
  """
```


#### **Cenário 5: Exclusão de um filme inexistente**
```gherkin
Funcionalidade: Exclusão de Filmes
Cenário: Falha ao excluir um filme inexistente
Dado que o usuário está autenticado com um token JWT válido
E não existe um filme com ID "xyz789"
Quando o usuário envia uma requisição DELETE para a rota "/movies/xyz789"
Então o sistema deve retornar o código de status 404 Not Found
E a mensagem de erro "Filme não encontrado."
```


### **Planejamento de Testes para a Rota `/movies`**


### **1. Objetivo**  
Validar completamente a funcionalidade da rota `/movies`, incluindo o cadastro, listagem, atualização e exclusão de filmes. Os testes contemplam cenários positivos, negativos e de borda, utilizando tanto testes manuais quanto automatizados.  


### **2. Tipos de Testes Considerados**  
- **Funcionais:** Validação das funcionalidades de cadastro, listagem, atualização e exclusão.  
- **Validação de Campos:** Testar limites e regras de campos obrigatórios e opcionais.  
- **Segurança:** Garantir autenticação JWT e proteção contra acessos não autorizados.  
- **Performance:** Validar comportamento sob grande volume de dados.  
- **Testes de Erro:** Certificar mensagens de erro claras e consistentes.  



### **3. Testes Planejados**


### **Funcionalidade:** Cadastro de Filmes  

| **Tipo de Teste** | **Execução** | **Cenário**                                                                                                                                                                                                                                       | **Passos**                                                                                                                                                                                                                             | **Resultados Esperados**                                                                                                                                               |
|--------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional          | Automático   | Cadastro de um filme válido.                                                                                                                                                                                                                     | 1. Enviar requisição POST para `/movies` com payload válido.<br>2. Validar status 201 e corpo da resposta.                                                                                                                            | Código 201 Created.<br>Resposta contém os dados cadastrados, incluindo ID.                                                                                             |
| Funcional          | Automático   | Cadastro sem autenticação.                                                                                                                                                                                                                      | 1. Enviar requisição POST para `/movies` sem incluir token JWT.<br>2. Validar status 401 e mensagem de erro.                                                                                                                          | Código 401 Unauthorized.<br>Mensagem: *"Token inválido ou ausente."*                                                                                                   |
| Validação de Campos| Automático   | Falha ao cadastrar sem o campo obrigatório "título".                                                                                                                                                                                             | 1. Enviar requisição POST para `/movies` sem o campo "título".<br>2. Validar status 400 e mensagem de erro.                                                                                                                            | Código 400 Bad Request.<br>Mensagem: *"O campo título é obrigatório."*                                                                                                 |
| Validação de Campos| Automático   | Falha ao cadastrar com "título" acima do limite de 100 caracteres.                                                                                                                                                                               | 1. Enviar requisição POST para `/movies` com um "título" com mais de 100 caracteres.<br>2. Validar status 400 e mensagem de erro.                                                                                                     | Código 400 Bad Request.<br>Mensagem: *"O campo título deve ter no máximo 100 caracteres."*                                                                             |
| Validação de Campos| Automático   | Cadastro de filme sem diretor e atores (opcionais).                                                                                                                                                                                              | 1. Enviar requisição POST para `/movies` sem os campos "diretor" e "atores".<br>2. Validar status 201 e corpo da resposta.                                                                                                             | Código 201 Created.<br>Campos "diretor" e "atores" aparecem como `null` ou array vazio no retorno.                                                                     |
| Segurança          | Manual       | Garantir que usuários não autenticados não possam acessar a rota `/movies`.                                                                                                                                                                      | 1. Tentar acessar qualquer método da rota `/movies` sem token JWT.<br>2. Validar retorno 401.                                                                                                                                        | Código 401 Unauthorized.<br>Mensagem: *"Token inválido ou ausente."*                                                                                                   |
| Segurança          | Manual       | Garantir que um token JWT inválido ou expirado bloqueie o acesso à rota `/movies`.                                                                                                                                                               | 1. Enviar requisição com token inválido ou expirado.<br>2. Validar status 401 e mensagem de erro.                                                                                                                                     | Código 401 Unauthorized.<br>Mensagem: *"Token inválido ou expirado."*                                                                                                  |


### **Funcionalidade:** Listagem de Filmes  

| **Tipo de Teste** | **Execução** | **Cenário**                                                                                                                                                                                                                                       | **Passos**                                                                                                                                                                                                                             | **Resultados Esperados**                                                                                                                                               |
|--------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional          | Automático   | Listar todos os filmes cadastrados.                                                                                                                                                                                                             | 1. Enviar requisição GET para `/movies`.<br>2. Validar status 200 e conteúdo da resposta.                                                                                                                                             | Código 200 OK.<br>Resposta contém array com todos os filmes cadastrados.                                                                                                |
| Funcional          | Automático   | Filtrar filmes por gênero.                                                                                                                                                                                                                      | 1. Enviar requisição GET para `/movies?genre=Drama`.<br>2. Validar status 200 e que apenas filmes do gênero "Drama" são retornados.                                                                                                   | Código 200 OK.<br>Resposta contém apenas filmes do gênero especificado.                                                                                                |
| Performance        | Automático   | Verificar performance da listagem com 1000 filmes cadastrados.                                                                                                                                                                                  | 1. Popular a base com 1000 registros de filmes.<br>2. Enviar requisição GET para `/movies`.<br>3. Medir tempo de resposta.                                                                                                           | Resposta deve ser retornada em menos de 2 segundos.                                                                                                                    |
| Segurança          | Manual       | Garantir que usuários não autenticados não possam listar filmes.                                                                                                                                                                               | 1. Enviar requisição GET para `/movies` sem token JWT.<br>2. Validar status 401.                                                                                                                                                       | Código 401 Unauthorized.<br>Mensagem: *"Token inválido ou ausente."*                                                                                                   |


### **Funcionalidade:** Atualização de Filmes  

| **Tipo de Teste** | **Execução** | **Cenário**                                                                                                                                                                                                                                       | **Passos**                                                                                                                                                                                                                             | **Resultados Esperados**                                                                                                                                               |
|--------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional          | Automático   | Atualizar filme com sucesso.                                                                                                                                                                                                                    | 1. Enviar requisição PUT para `/movies/{id}` com payload válido.<br>2. Validar status 200 e corpo da resposta.                                                                                                                         | Código 200 OK.<br>Filme atualizado com os novos dados fornecidos.                                                                                                     |
| Funcional          | Automático   | Falha ao atualizar um filme inexistente.                                                                                                                                                                                                        | 1. Enviar requisição PUT para `/movies/{id_inexistente}`.<br>2. Validar status 404 e mensagem de erro.                                                                                                                                 | Código 404 Not Found.<br>Mensagem: *"Filme não encontrado."*                                                                                                           |
| Validação de Campos| Automático   | Falha ao atualizar filme com título duplicado.                                                                                                                                                                                                  | 1. Criar dois filmes com títulos distintos.<br>2. Enviar requisição PUT para alterar o título de um deles para o mesmo título do outro.<br>3. Validar status 409 e mensagem de erro.                                                   | Código 409 Conflict.<br>Mensagem: *"Já existe um filme cadastrado com este título."*                                                                                   |



### **Funcionalidade:** Exclusão de Filmes  

| **Tipo de Teste** | **Execução** | **Cenário**                                                                                                                                                                                                                                       | **Passos**                                                                                                                                                                                                                             | **Resultados Esperados**                                                                                                                                               |
|--------------------|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Funcional          | Automático   | Excluir filme com sucesso.                                                                                                                                                                                                                      | 1. Criar um filme.<br>2. Enviar requisição DELETE para `/movies/{id}`.<br>3. Validar status 204 No Content.                                                                                                                            | Código 204 No Content.<br>Filme removido da base.                                                                                                                      |
| Funcional          | Automático   | Falha ao excluir um filme inexistente.                                                                                                                                                                                                          | 1. Enviar requisição DELETE para `/movies/{id_inexistente}`.<br>2. Validar status 404 e mensagem de erro.                                                                                                                             | Código 404 Not Found.<br>Mensagem: *"Filme não encontrado."*                                                                                                           |



### **Funcionalidades**  
- **Cadastro de Filmes:** Permite registrar novos filmes com validação de campos obrigatórios e opcionais.  
- **Listagem de Filmes:** Exibe todos os filmes cadastrados, com suporte a filtros (por gênero, título, etc.).  
- **Atualização de Filmes:** Atualiza informações de filmes existentes, como título, gênero ou ano.  
- **Exclusão de Filmes:** Remove filmes cadastrados com base no ID.  


### **Recursos Necessários**  
- **Ambiente de Testes:**  
  - Um ambiente isolado com acesso à API `/movies`.  
  - Base de dados dedicada para garantir consistência nos testes.  
- **Ferramentas de Automação:**  
  - Postman, RestAssured ou Cypress para testes de API automatizados.  
  - Ferramentas para carga e desempenho, como JMeter ou k6.  
- **Dados de Teste:**  
  - Filmes com diferentes combinações de campos preenchidos.  
  - Cenários que simulam tokens JWT válidos, inválidos e expirados.  


### **Critérios Usados**  
- **Cobertura Funcional Completa:** Todos os fluxos principais (CRUD) foram abordados.  
- **Cobertura de Cenários Positivos e Negativos:** Certificar-se de que comportamentos esperados e erros estão devidamente validados.  
- **Prioridade Baseada no Risco:** Recursos críticos (como autenticação e validação de campos) têm prioridade maior nos testes.  
- **Automação de Cenários Repetitivos:** Os cenários mais frequentes ou com dados dinâmicos são candidatos à automação.  


### **Quantidade de Testes**  
- **Testes Funcionais:** 16  
- **Testes de Validação de Campos:** 6  
- **Testes de Segurança:** 4  
- **Testes de Performance:** 2  
- **Total:** **28 Testes Planejados**


### **Riscos**  
- **Validação de Dados:** Possibilidade de inconsistências na validação de campos obrigatórios e limites (ex.: títulos longos).  
- **Autenticação JWT:** Falha na implementação de segurança pode expor a API a acessos não autorizados.  
- **Carga Excessiva:** Volume alto de dados pode comprometer a performance da listagem de filmes.  
- **Integração com Outros Sistemas:** Problemas na comunicação com o sistema que gerencia as sessões ou ingressos podem causar falhas nos testes.  
