import DataNode from '../scripts/DataNode'
import { assert } from 'chai'

describe('datanode tests', () => {

  it('instance should have data and children', () => {
    let node = new DataNode('a');

    assert.equal(node.data, 'a');
    assert.deepEqual(node.children, {})
  })

  it('should not be a word', () => {
    let node = new DataNode('a');

    assert.deepEqual(node.isWord, false)
  })

  it('should have been selected zero times', () => {
    let node = new DataNode('a');

    assert.deepEqual(node.timesSelected, 0)
  })
})
