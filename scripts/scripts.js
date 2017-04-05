import CompleteMe from './CompleteMe'
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary =
  fs.readFileSync(text).toString().trim().split('\n');
let completion = new CompleteMe();

completion.import(dictionary);

var userInput = document.querySelector('.user-input').value;
var submitButton = document.querySelector('.submit-user-input');
var makePoemButton = document.querySelector('.make-poem');
var pickWordsArea = document.querySelector('.pick-words');

submitButton.addEventListener('click', () => {
  console.log("CLICK");
  let nameLetterArray = userInput.trim().toLowerCase().split('');

  nameLetterArray.forEach(letter => {
    let h2Node = document.createElement('H2');
    let h2Text = document.createTextNode(`${nameLetterArray[letter]}`);
    let wordBankNode = document.createElement('DIV');
    let wordBankAtt = document.createAttribute('class');


    h2Node.appendChild(h2Text);
    wordBankAtt.value = `${nameLetterArray[letter]}`;
    pickWordsArea.appendChild(h2Node);
    pickWordsArea.appendChild(wordBankNode)


    let suggestions = completion.suggest(letter);

    suggestions.forEach( word => {
      let buttonNode = document.createElement('BUTTON');
      let buttonText = document.createTextElement(`${suggestions[word]}`)
      let buttonAtt = document.createAttribute('class');

      buttonAtt.value = `${suggestions[word]}`;
      buttonNode.appendChild(buttonText);
      wordBankNode.appendChild(buttonNode);
    });
  })
})
