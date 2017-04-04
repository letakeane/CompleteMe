import DataNode from '../scripts/DataNode'
import { assert } from 'chai'

describe('datanode tests', () => {

  it('instance should have data and children', () => {
    let node = new DataNode('a');

    assert.equal(node.data, 'a');
    assert.deepEqual(node.children, {})
  })

})
