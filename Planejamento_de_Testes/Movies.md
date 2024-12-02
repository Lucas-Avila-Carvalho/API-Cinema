
### Planejamento de Testes para a Rota `/movies`
![alt text](/Planejamento_de_Testes/images/promptmovies.png)
---

### **1. Objetivo**  
Validar os fluxos principais e alternativos da rota `/movies` de acordo com a **user story**, garantindo que os requisitos funcionais e não funcionais sejam atendidos.  

---

### **2. Tipos de Testes Considerados**  
1. **Funcionais:** Cobertura completa do CRUD (criação, leitura, atualização e exclusão).  
2. **Validação de Campos:** Testes para validar campos obrigatórios, limites e regras.  
3. **Segurança:** Garantia de autenticação e autorização adequadas.  
4. **Performance:** Avaliação da API sob condições de carga e tempo de resposta.  
5. **Erros:** Análise das mensagens e comportamentos em casos de falha.  

---

### **3. Funcionalidades Testadas**  
1. **Cadastro de Filmes:** Validação de campos obrigatórios, unicidade do título e retorno correto (201 Created).  
2. **Listagem de Filmes:** Testes de exibição geral e com filtros, incluindo paginação.  
3. **Detalhes de um Filme por ID:** Verificação da resposta correta ou erro (404) ao buscar um filme específico.  
4. **Atualização de Filmes:** Testes para validar atualizações parciais e completas.  
5. **Exclusão de Filmes:** Verificação do comportamento ao excluir filmes existentes ou inexistentes.  

---

### **4. Testes Planejados**

Segue a tabela com a coluna **Passos** adicionada antes do **Resultado Esperado**:  

#### **Cadastro de Filmes**  
| **Tipo de Teste**         | **Cenário**                                      | **Passos**                                                                                   | **Resultado Esperado**                                              |  
|---------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| Funcional (Automático)    | Criar um filme válido.                           | 1. Enviar requisição POST com dados válidos (título, gênero, diretor, etc.).                | Código 201; Retorno com ID e detalhes do filme.                     |  
| Validação de Campos       | Falha ao omitir campos obrigatórios.             | 1. Enviar requisição POST omitindo um ou mais campos obrigatórios.                          | Código 400; Mensagem: "Campo obrigatório ausente."                  |  
| Validação de Campos       | Título duplicado.                                | 1. Enviar requisição POST com título já cadastrado.                                          | Código 409; Mensagem: "Título já cadastrado."                       |  
| Segurança (Automático)    | Enviar requisição sem autenticação.              | 1. Enviar requisição POST sem o token JWT no cabeçalho.                                      | Código 401; Mensagem: "Token inválido ou ausente."                  |  

#### **Listagem de Filmes**  
| **Tipo de Teste**         | **Cenário**                                      | **Passos**                                                                                   | **Resultado Esperado**                                              |  
|---------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| Funcional (Automático)    | Listar todos os filmes.                          | 1. Enviar requisição GET sem filtros.                                                       | Código 200; Array com todos os filmes.                              |  
| Funcional (Automático)    | Listar com filtro por gênero.                    | 1. Enviar requisição GET com parâmetro de filtro (gênero).                                   | Código 200; Apenas filmes do gênero especificado.                   |  
| Performance               | Listagem de 1000 filmes cadastrados.             | 1. Cadastrar 1000 filmes. 2. Enviar requisição GET e medir o tempo de resposta.             | Resposta < 2 segundos.                                              |  
| Segurança (Automático)    | Listar sem token JWT.                            | 1. Enviar requisição GET sem o token JWT no cabeçalho.                                       | Código 401; Mensagem: "Token inválido ou ausente."                  |  

#### **Detalhes de um Filme**  
| **Tipo de Teste**         | **Cenário**                                      | **Passos**                                                                                   | **Resultado Esperado**                                              |  
|---------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| Funcional (Automático)    | Buscar filme existente por ID.                   | 1. Enviar requisição GET com ID válido no endpoint.                                          | Código 200; Detalhes do filme.                                       |  
| Funcional (Automático)    | Buscar filme inexistente por ID.                 | 1. Enviar requisição GET com ID inválido ou não cadastrado.                                  | Código 404; Mensagem: "Filme não encontrado."                       |  

#### **Atualização de Filmes**  
| **Tipo de Teste**         | **Cenário**                                      | **Passos**                                                                                   | **Resultado Esperado**                                              |  
|---------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| Funcional (Automático)    | Atualizar título de um filme válido.             | 1. Enviar requisição PUT com ID válido e novos dados.                                       | Código 200; Retorno com detalhes atualizados.                       |  
| Validação de Campos       | Atualizar com título duplicado.                  | 1. Enviar requisição PUT com título já cadastrado.                                           | Código 409; Mensagem: "Título já cadastrado."                       |  
| Funcional (Automático)    | Atualizar filme inexistente.                     | 1. Enviar requisição PUT com ID inválido ou não cadastrado.                                  | Código 404; Mensagem: "Filme não encontrado."                       |  

#### **Exclusão de Filmes**  
| **Tipo de Teste**         | **Cenário**                                      | **Passos**                                                                                   | **Resultado Esperado**                                              |  
|---------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------|  
| Funcional (Automático)    | Excluir filme existente.                         | 1. Enviar requisição DELETE com ID válido.                                                  | Código 204; Filme removido do banco.                                |  
| Funcional (Automático)    | Excluir filme inexistente.                       | 1. Enviar requisição DELETE com ID inválido ou não cadastrado.                               | Código 404; Mensagem: "Filme não encontrado."                       |                    |

---

### **5. Recursos Necessários**  
1. **Ambiente de Teste:** Isolado, com acesso à API `/movies` e banco de dados dedicado.  
2. **Ferramentas:** Postman, RestAssured, JMeter e Cypress.  
3. **Dados de Teste:**  
   - Filmes válidos, duplicados e com campos ausentes.  
   - Tokens JWT válidos, inválidos e expirados.  

---

### **6. Métricas e Critérios de Sucesso**  
- **Cobertura Completa:** Validação de todos os fluxos descritos na user story.  
- **Tempo de Resposta:** Atender aos requisitos de performance (ex.: <200ms para criação).  
- **Segurança:** Garantir proteção contra acessos não autorizados.  
- **Automação:** 80% dos cenários cobertos por testes automatizados.  

---

### **7. Total de Testes Planejados**  
- Funcionais: **15**  
- Validação de Campos: **4**  
- Segurança: **3**  
- Performance: **2**  
- **Total:** **24 testes**  

### **Cenários de Testes em Gherkin - Refatorados**

#### **Cenário 1: Cadastro bem-sucedido de um filme**
```gherkin
Funcionalidade: Cadastro de Filmes
Cenário: Cadastro bem-sucedido de um filme
Dado que o usuário possui um token JWT válido
Quando envia uma requisição POST para "/movies" com os seguintes dados:
  | Campo              | Valor               |
  | Título             | Filme Exemplo       |
  | Gênero             | Ação                |
  | Data de Lançamento | 2024-01-01          |
  | Diretor            | Diretor Exemplo     |
  | Atores             | ["Ator 1", "Ator 2"]|
Então o sistema retorna o código 201 Created
E o corpo da resposta contém os dados do filme, incluindo o ID:
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
Dado que o usuário possui um token JWT válido
Quando envia uma requisição GET para "/movies"
Então o sistema retorna o código 200 OK
E uma lista com os filmes cadastrados no corpo da resposta:
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
Dado que o usuário não possui um token JWT
Quando envia uma requisição POST para "/movies" com dados válidos
Então o sistema retorna o código 401 Unauthorized
E a mensagem "Token inválido ou ausente."
```

#### **Cenário 4: Atualização de filme com sucesso**
```gherkin
Funcionalidade: Atualização de Filmes
Cenário: Atualizar filme existente com sucesso
Dado que o usuário possui um token JWT válido
E existe um filme com ID "abc123"
Quando envia uma requisição PUT para "/movies/abc123" com os dados:
  | Campo              | Valor               |
  | Título             | Filme Atualizado    |
  | Gênero             | Suspense            |
  | Data de Lançamento | 2025-05-01          |
Então o sistema retorna o código 200 OK
E o corpo da resposta contém os dados atualizados:
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
Dado que o usuário possui um token JWT válido
E o filme com ID "xyz789" não está cadastrado
Quando envia uma requisição DELETE para "/movies/xyz789"
Então o sistema retorna o código 404 Not Found
E a mensagem "Filme não encontrado."
```