import words_by_level from '../../../data/words_by_level.json';


export default async function handler(req, res) {
    const { levelQuery } = req.query;
    let level;
    if (!levelQuery) {
      level = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'][Math.floor(Math.random()*6)];
    }
    else if (levelQuery.length > 1) {
      res.status(404).json({ error: 'Api endpoint not found.' });
      return;
    } else {
      level = levelQuery[0];
    }

    try {
      const randomWord = getRandomWord(level, words_by_level);
      res.status(200).json(randomWord);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

function getRandomWord(level, words_by_level) {
  level = level.toUpperCase();
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'INTERMEDIATE', 'ADVANCED'];
  if (!levels.includes(level)) {
    throw new Error(`Level ${level} not found. Available levels are A1, A2, B1, B2, C1, C2, Intermediate, Advanced.`);
  }

  if (level === 'INTERMEDIATE') {
    level = weightedRandom(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], [0.2, 0.2, 0.2, 0.2, 0.1, 0.1]).item;
  } else if (level === 'ADVANCED') {
    level = weightedRandom(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], [0.1, 0.1, 0.2, 0.2, 0.2, 0.2]).item;
  }

  const words = words_by_level[level];
  const wordData = words[Math.floor(Math.random()*words.length)];
  const [artikel, word, translation, definition] = wordData.split(':');
  
  return { word, artikel, translation, definition, level };
}





/**
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
 * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
/* eslint-disable consistent-return */
function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }

  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return {
        item: items[itemIndex],
        index: itemIndex,
      };
    }
  }
}
