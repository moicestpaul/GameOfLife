const App = document.getElementById('app')

function displayMatrix(matrix) {

    App.innerHTML = ''

    for (let x = 0; x < matrix.length; x++) {

        let row = ''

        row += '<div class="row">'

        for (let y = 0; y < matrix[x].length; y++) {

            const cell = `<div data-x='${x}' data-y='${y}' data-alive='${matrix[x][y]}' class='cell'></div>`

            row += cell

        }


        App.insertAdjacentHTML('beforeend', row)

    }

}

function initMatrix(patern = 0) {

    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    const tileSize = 16 // in px, chane also size of .cell css style

    const matrixWidth = Math.floor(winWidth / tileSize)
    const matrixHeight = Math.floor(winHeight / tileSize)

    let newMatrix = []

    switch (patern) {

        case 1:

            for (let x = 0; x < matrixWidth; x++) {

                newMatrix.push([])

                for (let y = 0; y < matrixHeight; y++) {

                    newMatrix.push((x % 2 === 0) ? true : false)

                }

            }

            break;

        default:

            for (let x = 0; x < matrixWidth; x++) {

                newMatrix.push([])

                for (let y = 0; y < matrixHeight; y++) {

                    newMatrix[x].push((Math.random() > .9) ? true : false)

                }

            }

            break;
    }

    return newMatrix
}

function gameOfLife(matrix) {
    const matrixWidth = matrix.length
    const matrixHeight = matrix[0].length

    let adj = 0

    let newMatrix = []
    let newCell = false

    let gameOver = true

    // On parcours chaque cellule de la matrice

    for (let x = 0; x < matrixWidth; x++) {

        newMatrix.push([])

        for (let y = 0; y < matrixHeight; y++) {

            // Pour chaque cellule, on compte les cellules adjacentes vivantes

            for (let adj_X = -1; adj_X < 2; adj_X++) {

                for (let adj_Y = -1; adj_Y < 2; adj_Y++) {

                    if (    (x + adj_X >= 0 && x + adj_X < matrixWidth)
                        &&  (y + adj_Y >= 0 && y + adj_Y < matrixHeight)
                        &&  !(adj_X === adj_Y && adj_X === 0)) {

                            adj += matrix[x + adj_X][y + adj_Y]?1:0

                    }

                }

            }

            // On applique les règles du game of life

            newCell = (adj === 3) || (matrix[x][y] && adj === 2)

            newMatrix[x].push(newCell)

            if(newCell && gameOver){
                gameOver = false
            }

            // On réinitialise les variables 

            state = false
            adj = 0
        }

    }

    return (!gameOver)?newMatrix:false
}

function gameStart(patern = 0) {

    let matrix = initMatrix(patern)

    let game = setInterval(() => {
        matrix = gameOfLife(matrix)

        displayMatrix(matrix)

    }, 80)
}

let matrix = initMatrix()

displayMatrix(matrix)

gameStart(0)


// setTimeout(() => displayMatrix(gameOfLife(matrix)), 5000)