require('locus')
import CompleteMe from '../scripts/CompleteMe'
// import DataNode from '../scripts/DataNode'
import { assert } from 'chai'

describe('CompleteMe trie tests', () => {
  var completion;
  var before = () => {
    completion = new CompleteMe();
  }

  it('should take in a single letter', () => {
    before();

    completion.insert('p');

    assert.deepEqual(completion.root.children.p.data, 'p')
  })

  it('should only mark the last node with "is word"', () => {
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

  it('should take in multiple new words that start with different letters', () => {
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
    assert.deepEqual(completion.root.children.p.children.i.children.e.data, 'e');
    assert.deepEqual(completion.root.children.p.children.i.children.z.data, 'z');
  })

  it('should mark two words complete even if one word is fully contained in another', () => {
    before();

    completion.insert('pie');
    completion.insert('pies');

    assert.deepEqual(completion.root.children.p.children.i.children.e.isWord, true)
    assert.deepEqual(completion.root.children.p.children.i.children.e.children.s.isWord, true)
  })

  it('should create a unique address for each node', () => {
    before();

    completion.insert('yum');

    assert.deepEqual(completion.root.children.y.address, 'y');
    assert.deepEqual(completion.root.children.y.children.u.address, 'yu');
    assert.deepEqual(completion.root.children.y.children.u.children.m.address, 'yum');
  })

  it('should find a node by its address', () => {
    before();

    completion.insert('cherry');

    let cher = completion.findByAddress('cher');
    let cherr = completion.findByAddress('cherr');

    assert.equal(cher.address, 'cher')
    assert.equal(cherr.address, 'cherr')
  })

  it('should suggest a new word', () => {
    before();

    completion.insert('cherry');
    completion.insert('vanilla');
    completion.insert('caramel');
    completion.insert('pie');
    completion.insert('cake');

    let secondSuggestion = completion.suggest('van')

    assert.deepEqual(secondSuggestion, ['vanilla'])

    let suggestion = completion.suggest('c');

    assert.deepEqual(suggestion, ['cherry', 'caramel', 'cake'])

  })

})
