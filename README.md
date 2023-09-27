🇧🇷 *Leia isto em Português* | [🇬🇧 Read this in English](README_EN.md)

### 🧬 Algoritmo Genético para o Problema das N Rainhas

O código JavaScript apresentado descreve uma implementação de algoritmo genético para solucionar o problema clássico das N Rainhas.

| Propriedade                 | Descrição                                                                                   |
|-----------------------------|-------------------------------------------------------------------------------------------|
| **Codificação**             | Arrays de inteiros representando posições das rainhas no tabuleiro.                        |
| **Cromossomos**             | Composto por `n` genes, representando as posições das rainhas.                             |
| **Função de avaliação**     | Calcula pares de rainhas que se atacam mutuamente.                                        |
| **Operador de seleção**     | "Tournament Selection" com torneio entre `size` indivíduos.                                |
| **Operador de cruzamento**  | Cruzamento de ponto único.                                                                 |
| **Taxa de cruzamento**      | Todos os pares de pais são cruzados.                                                      |
| **Mutação**                 | Alteração aleatória de uma posição de rainha.                                              |
| **Taxa de mutação**         | Determinada por `mutationRate`.                                                            |
| **Substituição**            | Estratégia de elitismo com os top 10% dos indivíduos mantidos.                             |
| **Tamanho da população**    | Determinado por `populationSize`.                                                          |
| **Geração inicial**         | Indivíduos iniciais com posições aleatórias para as rainhas.                               |
| **Condição de parada**      | Solução ideal encontrada ou número máximo de gerações alcançado.                           |


