import DataNode from './DataNode'

export default class CompleteMe {
  constructor () {
    this.root = new DataNode(null);
    this.counter = 0;
  }

  insert (word) {
    let letterArray = word.split('');
    let currentNode = this.root;
    let addressSoFar = '';

    letterArray.forEach( letter => {
      addressSoFar += letter;

      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
      currentNode.children[letter] = new DataNode(letter);

      currentNode = currentNode.children[letter];
      currentNode.address = addressSoFar;
    })

    currentNode.isWord = true;
    this.counter++;
  }

  count () {
    return this.counter;
  }

  findByAddress (searchterm) {
    let searchLettersArray = searchterm.split('');
    let currentNode = this.root;

    searchLettersArray.forEach ( letter => {
      if (!currentNode.children[letter]) {
        return 'No node exists with that address';
      }
      currentNode = currentNode.children[letter];
    })

    return currentNode;
  }

  suggest (prefix) {
    let suggestions = [];
    let currentNode = this.findByAddress(prefix);
    let nodeChildrenKeys = Object.keys(currentNode.children);

    nodeChildrenKeys.forEach((key) => {
      if (currentNode.children[key].isWord) {
        suggestions.push(currentNode.children[key].address)
      }
      let returnedArray = this.suggest(currentNode.children[key].address)

      suggestions.push(...returnedArray);
    })
    return suggestions;
  }

}
