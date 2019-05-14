import { map } from "./fp"

// Hi Binary Defense! :)

const numberOfDice = 5

const howMany = (num, arr) => arr.reduce((tot,b) => b === num ? tot + 1 : tot, 0)

// console.log(howMany(5, [5,5,5]))
// console.log(howMany(7, [5,5,5]))

const calculateScore = (_dice) => {
  const sets = [1,2,3,4,5,6]
  const scoresForSet = [1000, 200, 300, 400, 500, 600]

  const dice = _dice.slice().sort((a,b) => a - b)

  // const scoreFromSets = sets.reduce((tot, num, i) => {
  //   const countNum = howMany(num, dice)
  //   const howMany3 = Math.floor(countNum / 3)
  //   console.log(countNum, howMany3, scoresForSet[i])
  //   const currentScore = howMany3 * scoresForSet[i]
  //
  //   return tot + currentScore
  //   // if(howMany(num, dice) > 3 ) {
  //   //   return tot + (scoresForSet[i] * 2)
  //   // }
  //   // if(howMany(num, dice) >= 3) {
  //   //   return tot + (scoresForSet)
  //   // }
  // })
    // (howMany(1, dice) >= 3 ? 1000 : 0)
    // + (howMany(2, dice) >= 3 ? 200 : 0)
    // + (howMany(3, dice) >= 3 ? 300 : 0)
    // + (howMany(4, dice) >= 3 ? 400 : 0)
    // + (howMany(5, dice) >= 3 ? 500 : 0)
    // + (howMany(6, dice) >= 3 ? 600 : 0)

  const diceWithoutSets = []
  let currentScore = 0

  console.log('Dice', dice)


  for(let i = 0; i < dice.length; i++) {
    const die = dice[i]
    const next1 = dice[i + 1]
    const next2 = dice[i + 2]
    const next3 = dice[i + 3]
    const all4 = [die, next1, next2, next3]
    // if(all4.every(d => d === die)) {
    //   currentScore += scoresForSet[die - 1] * 2
    //   i += 3
    // }
    if(howMany(die, [die, next1, next2, next3]) === 4) {
      currentScore += scoresForSet[die - 1] * 2
      i += 3
      continue
    }
    if(howMany(die, [die, next1, next2]) === 3) {
      currentScore += scoresForSet[die - 1]
      i += 2
      continue
    }
    diceWithoutSets.push(die)
  }
  // const diceWithoutSets = dice.reduce((tot, next) => {
  //   if(howMany(next, tot) >= 2) {
  //     return tot
  //   }
  //   return tot.concat([next])
  // }, [])

  console.log('Dice Without Sets', diceWithoutSets)

  const singleDiceScores =
    diceWithoutSets.reduce((tot, n) => n === 1 ? 100 + tot : tot, 0) // single 1 = 100
    + diceWithoutSets.reduce((tot, n) => n === 5 ? 50 + tot : tot, 0) // single 5 = 50

  return currentScore + singleDiceScores
}

//

const samples = [
  [[1,1,1,5,1], 2050],
  [[2,3,4,6,2], 0],
  [[3,4,5,3,3], 350],
  [[1,5,1,2,4], 250],
  [[5,5,5,5,5], 1050],
  [[1,1,1,5,1,1], 2150],
  [[2,3,4,6,2,3], 0],
  [[5,5,5,5,5,5], 1100],
]

samples.forEach(([dice, expectedScore]) => {
  console.log('Score:', calculateScore(dice), 'Expected:', expectedScore)
})

// const numbers = Array.from(Array(100))
//   .map((_, i) => i + 1)
//
// numbers.forEach(num => {
//   if(num % 3 === 0 && num % 5 === 0) {
//     console.log('FizzBuzz')
//     return
//   }
//   if(num % 3 === 0) {
//     console.log('Fizz')
//     return
//   }
//   if(num % 5 === 0) {
//     console.log('Buzz')
//     return
//   }
//   console.log(num)
// })
//
// console.log(numbers)

