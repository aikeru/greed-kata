// Hi Binary Defense! :)

function map(fn) {
  return fn(this)
}

const calculateScore = (diceThrown) => {
  const scoresForSet = [1000, 200, 300, 400, 500, 600]
  // Tuples of [number of dice, multiplier]
  const multipliers = [[3, 1], [4, 2], [5, 4], [6, 8]]
  const [minDiceInSet, maxDiceInSet] =
    multipliers.map(([numDice]) => numDice)
      ::map(numbers => [Math.min(...numbers), Math.max(...numbers)])
  // JavaScript "sort" mutates the array. We'll slice() to make a copy first.
  const sortedDice = diceThrown.slice().sort((a,b) => a - b)

  // Group the dice into sets or individual dice, depending on how many there are in sequence
  // Other languages like C# have convenient methods like .GroupBy()
  // ie: given [1,1,1,1,5] will result in [[1,1,1,1],[5]]
  const diceGroups = sortedDice.reduceRight((groups, nextDie) => {
    const [head = [], ...tail] = groups
    if(head.length < maxDiceInSet && head[0] === nextDie) {
      return [head.concat([nextDie]), ...tail]
    }
    return [[nextDie], ...groups]
  }, [])

  if(diceGroups.length === 3 && diceGroups.every(g => g.length === 2)) {
    // Three pairs (3 dice groups, each with 2 elements)
    return 800
  } else if(diceGroups.length === 6 && diceGroups.every(g => g.length === 1)) {
    // Straight (6 dice groups, each with 1 element)
    return 1200
  } else {
    // A mix of sets and individual dice
    return diceGroups.reduce((score, group) => {
      if (!group || !group.length) {
        return score
      }
      const die = group[0]
      // Single die scores
      if (group.length < minDiceInSet) {
        if (die === 5) {
          return score + (group.length * 50)
        }
        if (die === 1) {
          return score + (group.length * 100)
        }
        return score
      }
      // Dice in a running set (once sorted)
      const [, multiplier] = multipliers.find(([numDice]) => numDice === group.length)
      const scoreForSet = scoresForSet[die - 1]
      return score + (multiplier * scoreForSet)
    }, 0)
  }
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
  [[2,2,2,2,2],800],
  [[2,2,2,2,2,2], 1600],
  [[2,2,3,3,4,4], 800],
  [[1,2,3,4,5,6], 1200]
]

samples.forEach(([dice, expectedScore]) => {
  console.log('Score:', calculateScore(dice), 'Expected:', expectedScore)
})
