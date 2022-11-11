/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/); // places sentence's words into an array: \r(carriage return) and \n(new line)
    this.words = words.filter(c => c !== ""); // eliminate any extra spaces
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    // console.log(this.words)
    // The Map object holds key-value pairs and remembers the original insertion order of the keys.
    // A Map object is iterated by key-value pairs — a for...of loop returns a 2-member array of [key, value] for each iteration. Iteration happens in insertion order, which corresponds to the order in which each key-value pair was first inserted into the map by the set() method (that is, there wasn't a key with the same value already in the map when set() was called).
    let chain = new Map()

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i]
      let nextWord = this.words[i + 1] || null

      if (chain.has(word)) { // The has() method returns a boolean indicating whether an element with the specified key exists or not. 
        chain.get(word).push(nextWord)
      } else { // The set() method adds or updates an entry in a Map object with a specified key and a value.
        chain.set(word, [nextWord])
      }
    }

    this.chain = chain // return new chain
    // console.log(chain.get('the')) // ['cat', 'hat']
    // console.log(chain.get('in')) // ['the']
    // console.log(chain.get('cat')) // ['in']
  }

  // randomize word selected from array
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chain.keys())
    let key = MarkovMachine.choice(keys)
    let result = []

    while (result.length < numWords && key !== null) {
      result.push(key)
      key = MarkovMachine.choice(this.chain.get(key))
    }
    // console.log(result.join(" "))
    return result.join(" ")
  }
}

module.exports = { MarkovMachine }

// let mm = new MarkovMachine("the cat in the hat ");
