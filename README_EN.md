🇬🇧 *Read this in English* | [🇧🇷 Leia isto em Português](README.md)

### 🧬 Genetic Algorithm for the N-Queens Problem

The provided JavaScript code describes an implementation of a genetic algorithm to solve the classic N-Queens problem.

| Property                    | Description                                                                                |
|-----------------------------|--------------------------------------------------------------------------------------------|
| **Encoding**                | Arrays of integers representing the queens' positions on the board.                        |
| **Chromosomes**             | Composed of `n` genes, representing the queens' positions.                                 |
| **Evaluation Function**     | Calculates pairs of queens that attack each other.                                         |
| **Selection Operator**      | "Tournament Selection" with a tournament among `size` individuals.                          |
| **Crossover Operator**      | Single-point crossover.                                                                    |
| **Crossover Rate**          | All parent pairs are crossed.                                                              |
| **Mutation**                | Random alteration of a queen's position.                                                   |
| **Mutation Rate**           | Determined by `mutationRate`.                                                              |
| **Substitution**            | Elitism strategy with the top 10% of individuals retained.                                 |
| **Population Size**         | Determined by `populationSize`.                                                            |
| **Initial Generation**      | Initial individuals with random positions for the queens.                                  |
| **Stopping Condition**      | Ideal solution found or maximum number of generations reached.                             |

