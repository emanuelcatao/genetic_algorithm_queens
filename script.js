function fitness(chromosome) {
    let attackingPairs = 0;
    const n = chromosome.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (chromosome[i] == chromosome[j] || Math.abs(chromosome[i] - chromosome[j]) == j - i) {
                attackingPairs++;
            }
        }
    }
    return -attackingPairs;
}

function mutate(chromosome, mutationRate) {
    if (Math.random() < mutationRate) {
        const index = Math.floor(Math.random() * chromosome.length);
        chromosome[index] = Math.floor(Math.random() * chromosome.length);
    }
    return chromosome;
}

function crossover(parent1, parent2) {
    const point = Math.floor(Math.random() * (parent1.length - 1) + 1);
    const child1 = parent1.slice(0, point).concat(parent2.slice(point));
    const child2 = parent2.slice(0, point).concat(parent1.slice(point));
    return [child1, child2];
}

function selectTournament(population, size=5) {
    let tournament = [];
    for (let i = 0; i < size; i++) {
        tournament.push(population[Math.floor(Math.random() * population.length)]);
    }
    return tournament.reduce((a, b) => fitness(a) > fitness(b) ? a : b);
}

async function geneticAlgorithm(n, maxGenerations, populationSize, mutationRate) {
    let population = [];
    for (let i = 0; i < populationSize; i++) {
        const individual = [];
        for (let j = 0; j < n; j++) {
            individual.push(Math.floor(Math.random() * n));
        }
        population.push(individual);
    }

    let bestSolution = null;

    const generationStep = async (generation) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPopulation = [];
                
                // Elitism: keep the top 10% of the population - tentativa de algo
                const eliteCount = Math.floor(0.1 * populationSize);
                let elites = [...population].sort((a, b) => fitness(a) - fitness(b)).slice(0, eliteCount);
                newPopulation.push(...elites);

                for (let i = 0; i < (populationSize - eliteCount) / 2; i++) {
                    const parent1 = selectTournament(population);
                    const parent2 = selectTournament(population);
                    const [child1, child2] = crossover(parent1, parent2);
                    newPopulation.push(mutate(child1, mutationRate), mutate(child2, mutationRate));
                }

                const progressPercentage = (generation / maxGenerations) * 100;
                updateProgress(progressPercentage);

                population = newPopulation;
                const bestIndividual = population.reduce((a, b) => fitness(a) > fitness(b) ? a : b);
                if (fitness(bestIndividual) === (n * (n - 1)) / 2) {
                    bestSolution = bestIndividual;
                    document.getElementById("bestFitness").textContent = "Best Fitness: " + fitness(bestIndividual);
                }
                resolve();
            }, 0);
        });
    };

    for (let generation = 0; generation < maxGenerations; generation++) {
        await generationStep(generation);
    }

    bestSolution =  bestSolution || population.reduce((a, b) => fitness(a) > fitness(b) ? a : b);
    const bestFitness = fitness(bestSolution);
    return { solution: bestSolution, fitness: bestFitness };
}


function prepareBoard() {
    const n = parseInt(document.getElementById('nValue').value);
    const boardElement = document.getElementById('board');
    
    // Isso aqui em algum momento funcionou, mas agora parece não fazer diferença
    // Calcula o tamanho máximo de uma célula para caber no tamanho máximo do tabuleiro.
    const cellSize = Math.min(boardElement.clientWidth / n, boardElement.clientHeight / n);
    console.log(cellSize);

    boardElement.style.gridTemplateRows = `repeat(${n}, ${cellSize}px)`;
    boardElement.style.gridTemplateColumns = `repeat(${n}, ${cellSize}px)`;
    
    // Limpa o tabuleiro e cria as novas células.
    boardElement.innerHTML = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.classList.add('cell');
            if ((i + j) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
            boardElement.appendChild(cell);
        }
    }
}


function drawQueens(solution) {
    const boardElement = document.getElementById('board');
    const cells = boardElement.querySelectorAll('.cell');
    
    for (let i = 0; i < solution.length; i++) {
        const queenPosition = i * solution.length + solution[i];
        cells[queenPosition].classList.add('queen');
    }
}

async function startCalculation() {
    const n = parseInt(document.getElementById('nValue').value);
    prepareBoard(n);

    const maxGenerations = parseInt(document.getElementById('numGenerations').value) || 1000; // Valor padrão 1000
    const populationSize = parseInt(document.getElementById('populationSize').value) || 100;  // Valor padrão 100
    const mutationRate = parseFloat(document.getElementById('mutationRate').value) || 0.05;   // Valor padrão 0.05

    const result = await geneticAlgorithm(n, maxGenerations, populationSize, mutationRate);
    drawQueens(result.solution); // Depois, coloque as rainhas
    updateProgress(0);
    document.getElementById("bestFitness").textContent = "Best Fitness: " + result.fitness;
}



function updateProgress(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
}
