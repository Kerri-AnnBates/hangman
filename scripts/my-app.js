const hangmanWordEl = document.querySelector('#hangman-word')
const remainingGuessesEl = document.querySelector('#remaining-guesses')

//Create an instance of it and print both to the screen.
let game1

//Let user press key to guess a letter from the browser.
window.addEventListener('keypress', (e) => {
  const guess = e.key
  game1.makeGuess(guess)
  render()
})

const render = () => {
  hangmanWordEl.innerHTML = ''
  remainingGuessesEl.textContent = game1.statusMessage

  game1.puzzle.split('').forEach((letter) => {
    const wordEl = document.createElement('span')
    wordEl.textContent = letter
    hangmanWordEl.appendChild(wordEl)
    // hangmanWordEl.innerHTML += `<span>${letter}</span>`
  })

}

const startGame = async () => {
  const puzzle = await getPuzzle('2')
  game1 = new Hangman(puzzle, 5)
  render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()

// Use data from the http request
// getPuzzle('2').then((puzzle) => {
//   console.log(puzzle)
// }).catch((error) => {
//   console.log(error)
// })
