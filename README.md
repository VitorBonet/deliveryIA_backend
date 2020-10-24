# Leilão de Entregas

## Indice

  - [Sobre](#-sobre)
  - [Tercnologias Utilizadas](#-tecnologias-utilizadas)
  - [Como baixar o projeto](#-como-baixer-o-projeto)

---

### 📜 Sobre

  **Leilão de entregas - Front-End** é a parte back-end de um trabalho universitário o desafio é dado uma entrada .csv com dados do grafo, que representam o mapa, e os pedidos o sistema defina quais serão entregues e quais não, buscando um valor final de pagamento maior, sabendo que cada entrega tem um custo diferente.

  **A1** deverá importar o .csv e exibir as entregas realizadas, sem necessidade de buscar o melhor caminho.

  **A2** deverá buscar o melhor caminho e criar uma imagem do grafo.

  **Rotas disponiveis**
  - PATCH -> /delivery/upload
    - Entrada -> JSON { upload: arquivo.csv }
    - Saída -> Itens grafo

  - GET -> /delivery
    - Sem entrada
    - Saída -> Entregas realizadas ou não

  - GET -> /delivery/grafo
    - Sem entrada
    - Saída -> Grafo

    **Exemplo de arquivo de entrada .csv**

    4

    A,B,C,D

    0,5,0,2

    5,0,3,0

    0,3,0,8

    2,0,8,0

    3

    0,B,1

    5,C,10

    10,D,8

  **Matérias envolvidas:**
   - Disciplina de Inteligência Artificial (IA)
      - Desenvolver uma versão do Leilão de Entregas utilizando algoritmos de Inteligência Artificial. (A2)
      - Apresentar resultados comparativos entre a solução utilizada para a disciplina de Análise de Algoritmos com a solução utilizada para a disciplina de Inteligência Artificial.
      - Apresentar gráficos com iteração do tipo Solução A versus Solução B.

  - Disciplina de Processamento Digital de Imagens (PDI)
    - Desenvolver ... (A2) (obs.: escopo ainda em elaboração)
    - Gerar uma matriz de incidência do grafo e gerar a imagem correspondente.
    - Gerar a imagem do grafo.
    - Gerar ...

  - Disciplina de Projeto Interdisciplinar (PI)
    - Desenvolvimento de um Projeto em Equipe (Ágile em até 4 integrantes)
    - Visão de Produto
    - Apresentação do Problema (Leilão de Entregas);
    - Especificação da Solução do Problema;
    - Implementação da Solução;
    - Apresentação da Solução;
    - Visão de Projeto
    - Organização da Equipe
    - Planejamento e Execução do Projeto (Scrum)

  - Disciplina de Engenharia de Software
    - Desenvolvimento do Projeto utilizando metodologia ágil (quebrar o projeto em pequenas entregas de valor)
    - Descoberta de produto (como montar a visão do produto utilizando técnicas descoberta para isso)
    - Criar um Trello com as etapas do fluxo de desenvolvimento  e com as atividades quebradas o trello precisa ter a etapa de descoberta do produto até a entrega
    - Os épicos do projeto devem ter o detalhamento do negócio e as histórias devem ser escritas com instruções de como será feito
    - Utilização de testes ágeis
    - Apresentação final do MVP, detalhando método utilizado

---

  ### 💻 Tecnologias utilizadas

  O projeto foi desenvolvido utilizando as sequintes tecnologias.

  - [Node](https://nodejs.org/en/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Postgres](https://www.postgresql.org/)


---
  ### 🖨 Como baixar o projeto

  ```bash

    # Clonar o repositório
    $ git clone https://github.com/VitorBonet/deliveryIA_backend.git

    #Entrar no diretório
    $ cd deliveryIA_backend

    # Intalar as dependências
    $ yarn install


    # Iniciar o projeto
    $ yarn dev:server
  ```
---

Desenvolvido por Vitor Bonet 🏄‍♂️
