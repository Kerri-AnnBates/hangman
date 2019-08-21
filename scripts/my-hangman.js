class Hangman {
  //Create a hangman constructor function.
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.guessedLetters = []
    this.status = 'playing'
  }

  //Show the word puzzle.
  get puzzle() {
    //Replace each letter with an '*' to hide word.
    let unknownWord = this.word.map((letter) => {
      return (letter === ' ') ? ' ' : '*'
    })

    //Take unknown word and if guessed letter is found in the word, replace the '*' with the correct letter.
    this.guessedLetters.forEach((letter) => {
      if (this.word.includes(letter)) {
        let correctLetterIndex = this.word.indexOf(letter)
        while (correctLetterIndex != -1) {
          unknownWord.splice(correctLetterIndex, 1, letter)
          correctLetterIndex = this.word.indexOf(letter, correctLetterIndex + 1)
        }
      }
    })

    unknownWord = unknownWord.join('')
    //Return the word.
    return unknownWord
  }

  //Functionality for calcuating the guess.
  makeGuess(guess) {
    guess = guess.toLowerCase()
    const isUnique = !this.guessedLetters.includes(guess)
    const isBadGuess = !this.word.includes(guess)

    if (this.status === 'playing') {
      if (isUnique) {
        this.guessedLetters.push(guess)
      }

      if (isUnique && isBadGuess) {
        this.remainingGuesses--
      }
    }

    this.calculateStatus()
  }

  //Calculate the status of the game.
  calculateStatus() {
    let correctLetters = 0

    //If letter in word is guessed increment correct letters found by 1.
    this.word.forEach((letter) => {
      if (this.guessedLetters.indexOf(letter) != -1 || letter === ' ') {
        correctLetters++
      }
    })

    if (this.remainingGuesses === 0) {
      this.status = 'failed'
    }

    if (this.word.length === correctLetters && this.remainingGuesses > 0) {
      this.status = 'finished'
    }
  }

  //Show status message to user.
  get statusMessage() {
    let message = ''

    if (this.status === 'playing') {
      message += `Guesses left: ${this.remainingGuesses}`
    } else if (this.status === 'failed') {
      message += `Nice try! The word was "${this.word.join('')}"`
    } else {
      message += 'Great work! You guessed the word.'
    }

    return message
  }
}
