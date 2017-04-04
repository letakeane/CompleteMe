import DataNode from './DataNode'

export default class CompleteMe {
  constructor () {
    this.root = new DataNode(null);
    this.counter = 0;
  }

  insert (word) {
    let letterArray = word.split('');
    let currentNode = this.root;
    // let addressSoFar = '';

    letterArray.forEach( letter => {
      // addressSoFar += letter;

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
      currentNode.children[letter] = new DataNode(letter);

      currentNode = currentNode.children[letter];
    })

    currentNode.isWord = true;
    this.counter++;
  }

  count () {
    return this.counter;
  }

  getWord (currentNode, wordSoFar, suggestions) {
    if (currentNode.isWord) {
      suggestions.push(wordSoFar)
    }

    let nodeChildrenKeys = Object.keys(currentNode.children);

    nodeChildrenKeys.forEach((key) => {
      let nextNode = currentNode.children[key];

      this.getWord(nextNode, wordSoFar + key, suggestions)
    })

    return suggestions;
  }

  suggest (wordSoFar) {
    let wordSoFarLetterArray = wordSoFar.split('');
    let currentNode = this.root;
    let suggestions = [];

    wordSoFarLetterArray.forEach(letter => {

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }

      currentNode = currentNode.children[letter];
    })

    return suggestions = this.getWord(currentNode, wordSoFar, suggestions);
  }

}
