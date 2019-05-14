// Hi Binary Defense! :)

const howMany = (num, arr) => arr.reduce((tot,b) => b === num ? tot + 1 : tot, 0)

const calculateScore = (_dice) => {
  const scoresForSet = [1000, 200, 300, 400, 500, 600]
  const dice = _dice.slice().sort((a,b) => a - b)
  const diceWithoutSets = []
  let currentScore = 0

  for(let i = 0; i < dice.length; i++) {
    const die = dice[i]
    const next1 = dice[i + 1]
    const next2 = dice[i + 2]
    const next3 = dice[i + 3]
    const next4 = dice[i + 4]

    if(howMany(die, [die, next1, next2, next3, next4]) === 5) {
      currentScore += scoresForSet[die - 1] * 4
      i += 4
      continue
    }
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

  const singleDiceScores =
    diceWithoutSets.reduce((tot, n) => n === 1 ? 100 + tot : tot, 0) // single 1 = 100
    + diceWithoutSets.reduce((tot, n) => n === 5 ? 50 + tot : tot, 0) // single 5 = 50

  return currentScore + singleDiceScores
}

const samples = [
  [[1,1,1,5,1], 2050],
  [[2,3,4,6,2], 0],
  [[3,4,5,3,3], 350],
  [[1,5,1,2,4], 250],
  [[5,5,5,5,5], 2000],
  [[1,1,1,5,1,1], 4050],
  [[2,3,4,6,2,3], 0],
  [[5,5,5,5,5,5], 2050],
  [[2,2,2,2,2],800]
]

samples.forEach(([dice, expectedScore]) => {
  console.log('Score:', calculateScore(dice), 'Expected:', expectedScore)
})
