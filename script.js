const gameBoard = (() => {

  let board = [["", "", ""],
  ["", "", ""],
  ["", "", ""]]
  console.log(board)

  const boardContainer = document.getElementById("boardContainer")
  const gameStatus = document.createElement("p")
  gameStatus.className = "gameStatus"
  const gameStatusContainer = document.querySelector(".gameStatusContainer")
  const infobtns = document.querySelector(".infobtns")
  const resetButton = document.createElement("button")
  const newNewGameButton = document.createElement("button")
  const newGameDialog = document.getElementById("dialog")
  const renderBoard = () => {

    boardContainer.innerHTML = ""
    gameStatusContainer.innerHTML = ""

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const boardCell = document.createElement("div")
        boardCell.className = "boardCell"
        boardCell.classList.add("a")
        boardCell.id = `${[i]}${[j]}`
        boardContainer.appendChild(boardCell)
        boardContainer.style.border = "15px solid #0a0a0d"

      }
    }

    resetButton.className = "resetButton"
    resetButton.textContent = "Reset"
    infobtns.appendChild(resetButton).onclick = resetGame.reset()

    newNewGameButton.className = "newNewGameButton"
    newNewGameButton.textContent = "New Game"
    infobtns.appendChild(newNewGameButton)
    newNewGameButton.addEventListener("click", () => {
      newGameDialog.showModal()
    })


    gameStatusContainer.appendChild(gameStatus)
  }

  return {
    board, renderBoard, gameStatus
  }

})()

function creatPlayer(name, symbol) {

  return {
    name,
    symbol
  }


}

const game = (() => {

  const startButton = document.getElementById("startGame")

  const newGameButton = document.querySelector(".pageWrap")
  const newGameDialog = document.getElementById("dialog")
  const infoContainer = document.querySelector(".infoContainer")
  const player1Input = document.getElementById("player1name")
  const player2Input = document.getElementById("player2name")

  newGameButton.addEventListener("click", () => {
    setTimeout(() => { newGameDialog.showModal() }, 400)
  })


  startButton.addEventListener("click", () => {
    startGame()
    newGameDialog.close()
    event.preventDefault()
  })

  let gameStarted = false
  let player1
  let player2
  let currentPlayer = player1

  function startGame() {
    player1 = creatPlayer(player1Input.value, "X")
    player2 = creatPlayer(player2Input.value, "O")

    if (player1Input.value === "") {
      player1.name = "Player 1"
    }
    if (player2Input.value === "") {
      player2.name = "Player 2"
    }
    gameStarted = true
    currentPlayer = player1
    console.log('game Started')
    gameBoard.renderBoard()
    gameController.clickBoardHandler()
    gameController.hoverHandler()
    gameBoard.gameStatus.textContent = `${player1.name}'s Turn`
    clearGameBoard.clear()
    newGameButton.style.display = "none"
    infoContainer.style.display = "flex"
    document.querySelector(".spanPlayer1Name").innerHTML = player1.name
    document.querySelector(".spanPlayer2Name").innerHTML = player2.name
  }
  function move(row, col) {
    if (gameStarted) {
      if (gameBoard.board[row][col] === "") {
        if (currentPlayer === player1) {
          gameBoard.board[row][col] = player1.symbol
          console.log("player 1 moved")
          gameBoard.gameStatus.textContent = `${player2.name}'s Turn`
          winConditions()
          currentPlayer = player2
        }
        else {
          gameBoard.board[row][col] = player2.symbol
          console.log("player 2 moved")
          gameBoard.gameStatus.textContent = `${player1.name}'s Turn`
          winConditions()
          currentPlayer = player1
        }
        console.log(gameBoard.board)
      } else {
        console.log("choose a empty space")
      }
    }
  }
  function winConditions() {
    let draw = true

    for (let i = 0; i < 3; i++) {
      const boardCells = document.querySelectorAll(".boardCell")
      if (
        gameBoard.board[i][0] !== "" &&
        gameBoard.board[i][0] === gameBoard.board[i][1] &&
        gameBoard.board[i][1] === gameBoard.board[i][2]
      ) {
        console.log(`${currentPlayer.name} wins`)
        gameBoard.gameStatus.textContent = `${currentPlayer.name} wins`
        draw = false
        gameStarted = false

        boardCells.forEach(boardCell => {
          boardCell.style.background = "white"
        })
      }
      if (
        gameBoard.board[0][i] !== "" &&
        gameBoard.board[0][i] === gameBoard.board[1][i] &&
        gameBoard.board[1][i] === gameBoard.board[2][i]
      ) {
        console.log(`${currentPlayer.name} wins`)
        gameBoard.gameStatus.textContent = `${currentPlayer.name} wins`
        draw = false
        gameStarted = false

        boardCells.forEach(boardCell => {
          boardCell.style.background = "white"
        })

      }
      if (
        gameBoard.board[0][0] !== "" &&
        gameBoard.board[0][0] === gameBoard.board[1][1] &&
        gameBoard.board[1][1] === gameBoard.board[2][2]
      ) {
        console.log(`${currentPlayer.name} wins`)
        gameBoard.gameStatus.textContent = `${currentPlayer.name} wins`

        draw = false
        gameStarted = false

        boardCells.forEach(boardCell => {
          boardCell.style.background = "white"
        })

      }
      if (
        gameBoard.board[0][2] !== "" &&
        gameBoard.board[0][2] === gameBoard.board[1][1] &&
        gameBoard.board[1][1] === gameBoard.board[2][0]
      ) {
        console.log(`${currentPlayer.name} wins`)
        gameBoard.gameStatus.textContent = `${currentPlayer.name} wins`

        draw = false
        gameStarted = false

        boardCells.forEach(boardCell => {
          boardCell.style.background = "white"
        })

      }
      if (gameBoard.board[i].includes("")) {
        draw = false
      }
    }
    if (draw) {
      console.log("It's a draw")
      gameBoard.gameStatus.textContent = "It's a draw"
      const boardCells = document.querySelectorAll(".boardCell")
      boardCells.forEach(boardCell => {
        boardCell.style.background = "white"
      })
      gameStarted = false
}

  }

  return {
    move, startGame, getCurrentPlayer: () => currentPlayer, getPlayer1: () => player1,
    getPlayer2: () => player2, getGameStarted: () => gameStarted
  }

})()

const gameController = (() => {
  function clickBoardHandler() {
    const boardCells = document.querySelectorAll(".boardCell")
    boardCells.forEach(boardCell => {
      game.getPlayer1()
      game.getPlayer2()
      game.getCurrentPlayer()
      game.getGameStarted()

      boardCell.addEventListener("click", () => {
        if (game.getGameStarted() && boardCell.textContent === "" || boardCell.style.opacity === "0.5") {

          if (game.getCurrentPlayer() === game.getPlayer1()) {
            boardCell.textContent = game.getPlayer1().symbol
            game.move(boardCell.id[0], boardCell.id[1])
            boardCells.forEach(boardCell => {
              boardCell.classList.add("b")
              boardCell.classList.remove("a")
            })
            boardCell.style.color = "#f15b24"
          }

          else {
            boardCell.textContent = game.getPlayer2().symbol
            game.move(boardCell.id[0], boardCell.id[1])
            boardCells.forEach(boardCell => {
              boardCell.classList.add("a")
              boardCell.classList.remove("b")
            })
            boardCell.style.color = "#5793ef"
          }


        }
      })
    })
  }

  function hoverHandler() {
    const hover = document.querySelectorAll(".hover")
    hover.forEach(hover => {
      hover.addEventListener("mouseover", () => {
        hover.innerHTML = game.getCurrentPlayer().symbol

      })
    })

    hover.forEach(hover => {
      hover.addEventListener("mouseout", () => {
        hover.innerHTML = ""
      })
    })

  }

  return {
    clickBoardHandler, hoverHandler
  }
})()

const clearGameBoard = (() => {
  function clear() {
    gameBoard.board = [["", "", ""],
    ["", "", ""],
    ["", "", ""]]
  }
  return {
    clear
  }
})()

const resetGame = (() => {
  function reset() {
    const resetButton = document.querySelector(".resetButton")
    resetButton.addEventListener("click", () => {
      clearGameBoard.clear()
      game.startGame()
    })
  }
  return {
    reset
  }
})()