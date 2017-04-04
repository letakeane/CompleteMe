export default class DataNode {
  constructor (data) {
    this.data = data;
    this.address = '';
    this.children = {};
    this.isWord = false;
  }
}
