# **Relatório de Testes - API Cinema**

## **1. Testes de Autenticação e Permissões**

### **Testes:**

- **Falha ao deletar um ticket sem autorização**  
  **Prioridade:** Altíssima  
  **Tipo:** Bug  
  **Descrição:** Testar se a API retorna erro 401 quando a tentativa de exclusão de um ticket é feita sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha ao atualizar ticket sem autorização**  
  **Prioridade:** Altíssima  
  **Tipo:** Bug  
  **Descrição:** Testar se a API retorna erro 401 quando a tentativa de atualização de um ticket é feita sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha de autenticação na listagem de tickets**  
  **Prioridade:** Altíssima  
  **Tipo:** Melhoria  
  **Descrição:** Verificar se a API retorna erro 401 quando a listagem de tickets é feita sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha de autenticação na criação de tickets**  
  **Prioridade:** Altíssima  
  **Tipo:** Melhoria  
  **Descrição:** Testar se a API retorna erro 401 ao tentar criar um ticket sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha ao deletar filme sem autorização**  
  **Prioridade:** Altíssima  
  **Tipo:** Melhoria  
  **Descrição:** Testar se a API retorna erro 401 ao tentar deletar um filme sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha ao atualizar filme sem autorização**  
  **Prioridade:** Altíssima  
  **Tipo:** Melhoria  
  **Descrição:** Testar se a API retorna erro 401 ao tentar atualizar um filme sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha de autenticação na listagem de filmes**  
  **Prioridade:** Altíssima  
  **Tipo:** Melhoria  
  **Descrição:** Verificar se a API retorna erro 401 ao tentar listar filmes sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

- **Falha de autenticação na criação de filmes**  
  **Prioridade:** Altíssima  
  **Tipo:** Melhoria  
  **Descrição:** Verificar se a API retorna erro 401 ao tentar criar um filme sem autorização.
  **Resultado esperado:** Status 401 e mensagem "Token inválido ou ausente".

## **2. Testes de Validação de Campos e Integridade**

### **Testes:**

- **Permissão de gerar um ticket sem UserID e MovieID**  
  **Prioridade:** Altíssima  
  **Tipo:** Bug  
  **Descrição:** Testar se a API aceita a criação de um ticket sem os campos obrigatórios UserID e MovieID.
  **Resultado esperado:** A criação deve falhar e retornar erro 400 com a mensagem "UserID e MovieID são obrigatórios".

- **A criação de um filme aceita qualquer string para o campo de data**  
  **Prioridade:** Alta  
  **Tipo:** Bug  
  **Descrição:** Testar se a API permite a criação de filmes com valores inválidos para o campo de data.
  **Resultado esperado:** A criação deve falhar, retornando erro 400 para o campo de data inválido.

- **A API Cinema aceita a atualização de filme com nome duplicado**  
  **Prioridade:** Média  
  **Tipo:** Bug  
  **Descrição:** Testar se a API permite a atualização de filmes com nomes duplicados.
  **Resultado esperado:** A atualização deve falhar com erro 400 e mensagem sobre a duplicidade de nomes.

- **Bug que aceita um campo vazio na atualização de QUALQUER campo do filme**  
  **Prioridade:** Altíssima  
  **Tipo:** Bug  
  **Descrição:** Testar se a API permite a atualização de um filme com um campo vazio.
  **Resultado esperado:** A atualização deve falhar com erro 400 e a mensagem correspondente ao campo vazio.

- **Não validação que permite que a rota Movies aceite vários títulos iguais**  
  **Prioridade:** Média  
  **Tipo:** Bug  
  **Descrição:** Testar se a API permite criar ou atualizar filmes com títulos duplicados.
  **Resultado esperado:** A criação ou atualização deve falhar com erro 400 indicando que o título já existe.

## **3. Testes de Resposta e Código de Status**

### **Testes:**

- **Melhoria sobre resposta de status code na rota DELETE**  
  **Prioridade:** Baixa  
  **Tipo:** Melhoria  
  **Descrição:** Melhorar a resposta de código de status na rota DELETE, garantindo que a API retorne o status correto para a exclusão de recursos.
  **Resultado esperado:** O status da resposta para exclusão deve ser 204 (No Content) quando o filme ou ingresso for deletado com sucesso.

- **Melhoria relacionada a ID inválido na rota DELETE**  
  **Prioridade:** Baixa  
  **Tipo:** Melhoria  
  **Descrição:** Testar como a API lida com um ID inválido para exclusão.
  **Resultado esperado:** A API deve retornar erro 400 ou 404, dependendo da implementação, e uma mensagem clara sobre o ID inválido.

## **4. Testes de Erros de Sistema**

### **Testes:**

- **Erro de Dev - Get tickets por ID faz com que a página pare de rodar localmente**  
  **Prioridade:** Altíssima  
  **Tipo:** Bug  
  **Descrição:** Verificar se ao tentar buscar tickets por ID ocorre algum erro que faz com que o sistema pare de rodar localmente.
  **Resultado esperado:** A requisição deve retornar os dados corretamente, sem fazer o sistema parar.
