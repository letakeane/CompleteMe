class DataNode {
  constructor (data) {
    this.data = data;
    this.children = {};
    this.isWord = false;
    this.timesSelected = 0;
  }
}

class CompleteMe {
  constructor () {
    this.root = new DataNode(null);
    this.counter = 0;
  }

  insert (word) {
    let letterArray = word.split('');
    let currentNode = this.root;

    letterArray.forEach( letter => {

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
      suggestions.push({
        word: wordSoFar,
        timesSelected: currentNode.timesSelected
      })
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
    })

    suggestions = this.getWord(currentNode, wordSoFar, suggestions);

    suggestions.sort( (a, b) => {
      return b.timesSelected - a.timesSelected;
    })

    suggestions = suggestions.map( object => {
      return object.word;
    })

    return suggestions;
  }

  populate (dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select (word) {
    let wordLetterArray = word.split('');
    let currentNode = this.root;

    wordLetterArray.forEach(letter => {
      if (currentNode.children[letter]) {
        currentNode = currentNode.children[letter];
        return;
      }
    })

    currentNode.timesSelected++;
  }

}


const dictionary =
  [
    'abandoned',
    'abashed',
    'aberrant',
    'abhorrent',
    'abiding',
    'abject',
    'ablaze',
    'able',
    'abnormal',
    'abounding',
    'abrasive',
    'abrupt',
    'absent',
    'absorbed',
    'absorbing',
    'abstracted',
    'absurd',
    'abundant',
    'abusive',
    'acceptable',
    'accurate',
    'acidic',
    'acoustic',
    'acrid',
    'actual',
    'adamant',
    'adaptable',
    'addicting',
    'adhesive',
    'adorable',
    'adventurous',
    'afraid',
    'aggressive',
    'agreeable',
    'alert',
    'alive',
    'alleged',
    'alluring',
    'aloof',
    'amazing',
    'ambiguous',
    'ambitious',
    'amusing',
    'ancient',
    'angry',
    'animated',
    'annoying',
    'anxious',
    'apathetic',
    'aquatic',
    'aromatic',
    'arrogant',
    'aspiring',
    'astonishing',
    'attractive',
    'auspicious',
    'automatic',
    'available',
    'average',
    'awake',
    'aware',
    'awesome',
    'awful',
    'axiomatic',
    'bad',
    'barbarous',
    'bashful',
    'bawdy',
    'beautiful',
    'belligerent',
    'beneficial',
    'bent',
    'berserk',
    'best',
    'better',
    'bewildered',
    'big',
    'billowy',
    'bitter',
    'bizarre',
    'bloody',
    'blue',
    'blushing',
    'boiling',
    'boorish',
    'bored',
    'boring',
    'bouncy',
    'boundless',
    'brainy',
    'brash',
    'brave',
    'brawny',
    'breakable',
    'breezy',
    'brief',
    'bright',
    'broad',
    'bumpy',
    'burly',
    'bustling',
    'busy',
    'cagey',
    'calculating',
    'callous',
    'calm',
    'capable',
    'capricious',
    'careful',
    'careless',
    'caring',
    'cautious',
    'certain',
    'changeable',
    'charming',
    'cheap',
    'cheerful',
    'chemical',
    'childlike',
    'chilly',
    'chivalrous',
    'chubby',
    'chunky',
    'clammy',
    'classy',
    'clean',
    'clear',
    'clever',
    'cloistered',
    'cloudy',
    'closed',
    'clumsy',
    'cluttered',
    'coherent',
    'cold',
    'colorful',
    'colossal',
    'combative',
    'comfortable',
    'common',
    'complete',
    'complex',
    'concerned',
    'condemned',
    'confused',
    'conscious',
    'cool',
    'cooperative',
    'coordinated',
    'courageous',
    'cowardly',
    'crabby',
    'craven',
    'crazy',
    'creepy',
    'crooked',
    'crowded',
    'cruel',
    'cuddly',
    'cultured',
    'curious',
    'curly',
    'curvy',
    'cut',
    'cute',
    'cute',
    'cynical',
    'daffy',
    'damaged',
    'damp',
    'dangerous',
    'dapper',
    'dark',
    'dashing',
    'dazzling',
    'dead',
    'deadpan',
    'deafening',
    'dear',
    'debonair',
    'decisive',
    'decorous',
    'deep',
    'deeply',
    'defeated',
    'defective',
    'defiant',
    'delicate',
    'delicious',
    'delightful',
    'demonic',
    'delirious',
    'depressed',
    'deranged',
    'detailed',
    'determined',
    'devilish',
    'didactic',
    'different',
    'difficult',
    'diligent',
    'direful',
    'dirty',
    'disagreeable',
    'disastrous',
    'discreet',
    'disgusted',
    'disgusting',
    'disillusioned',
    'distinct',
    'disturbed',
    'dizzy',
    'domineering',
    'doubtful',
    'drab',
    'draconian',
    'dramatic',
    'dreary',
    'drunk',
    'dry',
    'dull',
    'dusty',
    'dynamic',
    'dysfunctional',
    'eager',
    'early',
    'earsplitting',
    'earthy',
    'easy',
    'eatable',
    'economic',
    'educated',
    'efficacious',
    'efficient',
    'elated',
    'elderly',
    'electric',
    'elegant',
    'elfin',
    'elite',
    'embarrassed',
    'eminent',
    'enchanting',
    'encouraging',
    'endurable',
    'energetic',
    'enormous',
    'entertaining',
    'enthusiastic',
    'envious',
    'erect',
    'erratic',
    'ethereal',
    'evanescent',
    'evasive',
    'even',
    'excellent',
    'exciting',
    'exclusive',
    'exotic',
    'exuberant',
    'fabulous',
    'fair',
    'faithful',
    'fallacious',
    'familiar',
    'famous',
    'fanatical',
    'fancy',
    'fantastic',
    'far',
    'far-fetched',
    'fascinating',
    'fast',
    'fat',
    'fearless',
    'feeble',
    'fertile',
    'festive',
    'fierce',
    'filthy',
    'fine',
    'finicky',
    'first',
    'flagrant',
    'flaky',
    'flashy',
    'flawless',
    'flimsy',
    'flippant',
    'flowery',
    'fluffy',
    'fluttering',
    'foamy',
    'foolish',
    'forgetful',
    'fortunate',
    'frail',
    'fragile',
    'frantic',
    'freezing',
    'fresh',
    'fretful',
    'friendly',
    'frightening',
    'functional',
    'funny',
    'furtive',
    'futuristic',
    'fuzzy',
    'gabby',
    'gainful',
    'gamy',
    'garrulous',
    'gaudy',
    'general',
    'gentle',
    'giant',
    'giddy',
    'gifted',
    'gigantic',
    'glamorous',
    'gleaming',
    'glib',
    'glistening',
    'glorious',
    'glossy',
    'godly',
    'good',
    'goofy',
    'gorgeous',
    'graceful',
    'grandiose',
    'grateful',
    'greasy',
    'great',
    'greedy',
    'groovy',
    'grotesque',
    'grouchy',
    'grubby',
    'gruesome',
    'grumpy',
    'gullible',
    'hallowed',
    'handsome',
    'handy',
    'hapless',
    'happy',
    'harmonious',
    'harsh',
    'hateful',
    'heady',
    'healthy',
    'heartbreaking',
    'heavenly',
    'heavy',
    'hellish',
    'helpful',
    'helpless',
    'hesitant',
    'hideous',
    'high',
    'hilarious',
    'hissing',
    'hollow',
    'homeless',
    'homely',
    'honorable',
    'horrible',
    'hospitable',
    'hot',
    'huge',
    'hulking',
    'humdrum',
    'humorous',
    'hungry',
    'hurried',
    'hushed',
    'hypnotic',
    'hysterical',
    'icky',
    'icy',
    'idiotic',
    'ignorant',
    'ill',
    'illegal',
    'illustrious',
    'imaginary',
    'immense',
    'imminent',
    'impartial',
    'imperfect',
    'impolite',
    'important',
    'impossible',
    'incandescent',
    'incompetent',
    'inconclusive',
    'industrious',
    'incredible',
    'infamous',
    'innocent',
    'inquisitive',
    'insidious',
    'intelligent',
    'interesting',
    'invincible',
    'irate',
    'irritating',
    'itchy',
    'jaded',
    'jagged',
    'jazzy',
    'jealous',
    'jittery',
    'jobless',
    'jolly',
    'joyous',
    'judicious',
    'juicy',
    'jumbled',
    'jumpy',
    'juvenile',
    'keen',
    'kind',
    'kindhearted',
    'kindly',
    'knotty',
    'knowing',
    'knowledgeable',
    'known',
    'lackadaisical',
    'lamentable',
    'languid',
    'large',
    'laughing',
    'lazy',
    'lean',
    'learned',
    'legal',
    'lethal',
    'lewd',
    'light',
    'likeable',
    'limping',
    'literate',
    'little',
    'lively',
    'lonely',
    'lopsided',
    'loud',
    'loutish',
    'lovely',
    'loving',
    'lucky',
    'ludicrous',
    'lumpy',
    'lush',
    'luxuriant',
    'lyrical',
    'macabre',
    'macho',
    'maddening',
    'magical',
    'magnificent',
    'majestic',
    'malicious',
    'mammoth',
    'maniacal',
    'massive',
    'marvelous',
    'mature',
    'mean',
    'meaty',
    'meek',
    'mellow',
    'melodic',
    'merciful',
    'messy',
    'mighty',
    'mindless',
    'miniature',
    'miscreant',
    'misty',
    'modern',
    'moldy',
    'momentous',
    'motionless',
    'mushy',
    'mysterious',
    'naive',
    'narrow',
    'nasty',
    'natural',
    'naughty',
    'nauseating',
    'near',
    'neat',
    'nebulous',
    'necessary',
    'needy',
    'neighborly',
    'nervous',
    'new',
    'next',
    'nice',
    'nifty',
    'nimble',
    'noisy',
    'nonchalant',
    'nondescript',
    'nonstop',
    'normal',
    'nostalgic',
    'nosy',
    'noxious',
    'numberless',
    'nutritious',
    'nutty',
    'oafish',
    'obedient',
    'obnoxious',
    'obscene',
    'obsequious',
    'observant',
    'obsolete',
    'obtainable',
    'oceanic',
    'odd',
    'offbeat',
    'omniscient',
    'open',
    'opposite',
    'optimal',
    'ordinary',
    'organic',
    'ossified',
    'outgoing',
    'outrageous',
    'outstanding',
    'overconfident',
    'overjoyed',
    'painstaking',
    'pale',
    'panicky',
    'parched',
    'parsimonious',
    'pathetic',
    'peaceful',
    'perfect',
    'perpetual',
    'petite',
    'physical',
    'picayune',
    'piquant',
    'placid',
    'plain',
    'pleasant',
    'plucky',
    'poised',
    'polite',
    'powerful',
    'precious',
    'pretty',
    'prickly',
    'productive',
    'proud',
    'psychedelic',
    'puffy',
    'purring',
    'pushy',
    'puzzling',
    'quaint',
    'quarrelsome',
    'questionable',
    'quick',
    'quiet',
    'quirky',
    'quixotic',
    'quizzical',
    'rabid',
    'radical',
    'rambunctious',
    'rapid',
    'rare',
    'raspy',
    'real',
    'receptive',
    'regular',
    'relieved',
    'remarkable',
    'resolute',
    'resonant',
    'responsible',
    'righteous',
    'rigid',
    'ritzy',
    'roasted',
    'robust',
    'romantic',
    'rotten',
    'rough',
    'royal',
    'rude',
    'rustic',
    'ruthless',
    'sad',
    'salty',
    'sassy',
    'scandalous',
    'scary',
    'scintillating',
    'serious',
    'shaggy',
    'sharp',
    'shiny',
    'shocking',
    'shy',
    'silent',
    'silly',
    'sincere',
    'skillful',
    'sleepy',
    'slimy',
    'smart',
    'sneaky',
    'somber',
    'sophisticated',
    'sordid',
    'sour',
    'sparkling',
    'special',
    'spectacular',
    'spicy',
    'spiffy',
    'spiky',
    'spiteful',
    'splendid',
    'spooky',
    'steadfast',
    'steady',
    'sticky',
    'strange',
    'strong',
    'stupendous',
    'stupid',
    'successful',
    'succinct',
    'super',
    'superb',
    'supreme',
    'swanky',
    'sweet',
    'swift',
    'taboo',
    'tacky',
    'talented',
    'tawdry',
    'tedious',
    'tender',
    'tense',
    'terrible',
    'terrific',
    'thirsty',
    'thoughtful',
    'threatening',
    'tidy',
    'tired',
    'tiresome',
    'toothsome',
    'tough',
    'towering',
    'tranquil',
    'trashy',
    'tremendous',
    'tricky',
    'trite',
    'troubled',
    'truculent',
    'truthful',
    'typical',
    'ubiquitous',
    'ugly',
    'ultra',
    'unadvised',
    'unbiased',
    'understood',
    'uneven',
    'unique',
    'unknown',
    'unnatural',
    'unruly',
    'unusual',
    'upbeat',
    'useful',
    'utopian',
    'uttermost',
    'vacuous',
    'vagabond',
    'vague',
    'valuable',
    'vast',
    'vengeful',
    'venomous',
    'verdant',
    'victorious',
    'vigorous',
    'vivacious',
    'volatile',
    'voracious',
    'vulgar',
    'wacky',
    'waggish',
    'wandering',
    'warlike',
    'warm',
    'wary',
    'watery',
    'weak',
    'wealthy',
    'weary',
    'whimsical',
    'wicked',
    'wiggly',
    'wild',
    'wise',
    'wistful',
    'witty',
    'woebegone',
    'wonderful',
    'woozy',
    'wrathful',
    'wretched',
    'wry',
    'yielding',
    'young',
    'youthful',
    'yummy',
    'zany',
    'zealous',
    'zesty',
    'zippy',
  ];

let completion = new CompleteMe();

completion.populate(dictionary);

var userInputField = document.querySelector('.user-input');
var submitButton = document.querySelector('.submit-user-input');
var makePoemButton = document.querySelector('.make-poem');
var pickWordsArea = document.querySelector('.pick-words');
var completedPoemArea = document.querySelector('.completed-poem');
var userAdjectiveField = document.querySelector('.user-adjective');
var submitAdjectiveButton = document.querySelector('.submit-user-adjective');
var addArea = document.querySelector('.add');

userInputField.addEventListener('keyup', () => {
  submitButton.disabled = false;
  pickWordsArea.innerHTML = '';
  completedPoemArea.innerHTML = '';
})

submitButton.addEventListener('click', () => {
  let instructionsNode = document.createElement('P');
  let instructionsText = document.createTextNode(
    'Select one word for each letter, then click the MAKE POEM button below'
  );
  let nameLetterArray = userInputField.value.trim().toLowerCase().split('');

  userInputField.value = '';
  submitButton.disabled = true;
  pickWordsArea.classList.remove('hidden');
  makePoemButton.classList.remove('hidden');
  addArea.classList.remove('hidden');

  instructionsNode.appendChild(instructionsText);
  pickWordsArea.appendChild(instructionsNode);

  nameLetterArray.forEach(letter => {
    let h2Node = document.createElement('H2');
    let h2Text = document.createTextNode(letter);
    let h2Att = document.createAttribute('class');
    let wordBankNode = document.createElement('DIV');
    let wordBankAtt = document.createAttribute('id');

    h2Att.value = letter + 'header';
    h2Node.setAttributeNode(h2Att);
    h2Node.appendChild(h2Text);
    pickWordsArea.appendChild(h2Node);

    wordBankAtt.value = letter;
    wordBankNode.setAttributeNode(wordBankAtt);
    pickWordsArea.appendChild(wordBankNode)

    let suggestions = completion.suggest(letter);

    suggestions.forEach( word => {
      let buttonNode = document.createElement('BUTTON');
      let buttonText = document.createTextNode(word)
      let buttonAtt = document.createAttribute('class');

      buttonAtt.value = word + ' ' + letter + '-button';
      buttonNode.setAttributeNode(buttonAtt);
      buttonNode.appendChild(buttonText);
      wordBankNode.appendChild(buttonNode);
    });
  })
})


//When user clicks an adjective button
pickWordsArea.addEventListener('click', (event) => {
  let thisButton = event.target;
  let thisButtonText = event.target.textContent;
  let thisId = thisButtonText[0];
  let buttonArray = document.getElementById(thisId).querySelectorAll('button');

  completion.select(thisButtonText);
  thisButton.classList.toggle('clicked');

  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].disabled = true;
  }
})

makePoemButton.addEventListener('click', () => {
  completedPoemArea.classList.remove('hidden');
  pickWordsArea.classList.add('hidden');
  makePoemButton.classList.add('hidden');
  addArea.classList.add('hidden');

  let clickedArray = document.getElementsByClassName('clicked');

  for (let i = 0; i < clickedArray.length; i++) {
    let wordNode = document.createElement('H2')
    let wordText = document.createTextNode(clickedArray[i].textContent)

    wordNode.appendChild(wordText);
    completedPoemArea.appendChild(wordNode);
  }
})

userAdjectiveField.addEventListener('keyup', () => {
  submitAdjectiveButton.disabled = false;
})

submitAdjectiveButton.addEventListener('click', () => {
  let userAdjective = userAdjectiveField.value;

  userAdjectiveField.value = '';
  submitAdjectiveButton.disabled = true;
  completion.insert(userAdjective);
})
