require('locus')
import { completion, before } from './before-test-helper'
import { assert } from 'chai'
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary =
  fs.readFileSync(text).toString().trim().split('\n');

describe('CompleteMe trie tests', () => {
  it('should take in a single letter', () => {
    before();

    completion.insert('p');

    assert.deepEqual(completion.root.children.p.data, 'p')
  })

  it('should take in a word and only mark the last node with "is word"', () => {
    before();

    completion.insert('raspberry');

    assert.deepEqual(completion.root.children.r.children.a.isWord, false);
    assert.deepEqual()
  })

  it('should increment count when words are inserted', () => {
    before();

    completion.insert('pie');
    assert.equal(completion.count(), 1);

    completion.insert('apple')
    assert.equal(completion.count(), 2);

    completion.insert('vanilla')
    assert.equal(completion.count(), 3);
  })

  it('should take in multiple new words', () => {
    before();

    completion.insert('pie');
    assert.equal(completion.count(), 1);

    completion.insert('apple')
    assert.equal(completion.count(), 2);

    completion.insert('vanilla')
    assert.equal(completion.count(), 3);
  })

  it('should take in multiple words that start with the same letter', () => {
    before();

    completion.insert('pie');
    completion.insert('pizza');

    assert.deepEqual(completion.root.children.p.data, 'p');
    assert.deepEqual(completion.root.children.p.children.i.data, 'i');
    assert.deepEqual(
      completion.root.children.p.children.i.children.e.data, 'e'
    );
    assert.deepEqual(
      completion.root.children.p.children.i.children.z.data, 'z'
    );
  })

  it('should mark intelligently complete words even when nested', () => {
    before();

    completion.insert('pie');
    completion.insert('pies');

    assert.deepEqual(
      completion.root.children.p.children.i.children.e.isWord, true
    );
    assert.deepEqual(
      completion.root.children.p.children.i.children.e.children.s.isWord, true
    );
  })

  it('should suggest a complete word', () => {
    before();

    completion.insert('cherry');
    completion.insert('vanilla');
    completion.insert('caramel');
    completion.insert('pie');
    completion.insert('cake');

    let suggestion = completion.suggest('van')

    assert.deepEqual(suggestion, ['vanilla'])
  })

  it('should suggest words that share multiple letters', () => {
    before();

    completion.insert('cherry');
    completion.insert('vanilla');
    completion.insert('caramel');
    completion.insert('pie');
    completion.insert('cakepop');
    completion.insert('cake');

    let suggestion = completion.suggest('c');

    assert.deepEqual(suggestion, ['cherry', 'caramel', 'cake', 'cakepop'])
  })

  it('should import a dictionary', () => {
    before();

    completion.populate(dictionary)

    let dictionaryCount = completion.count()

    assert.equal(dictionaryCount, 235886);
  })

  it('should suggest words from a dictionary', () => {
    before();

    completion.populate(dictionary)

    let suggestion = completion.suggest('piz');

    assert.deepEqual(
      suggestion, ['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']
    );
  })

  it('should reorder the suggestions based on user preference', () => {
    before();

    completion.populate(dictionary)
    completion.select('pizza');
    completion.select('pizzeria');
    completion.select('pizza');

    let suggestion = completion.suggest('piz');

    assert.deepEqual(
      suggestion, ['pizza', 'pizzeria', 'pize', 'pizzicato', 'pizzle']
    );
  })
})
