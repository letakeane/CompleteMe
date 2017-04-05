export default class DataNode {
  constructor (data) {
    this.data = data;
    this.children = {};
    this.isWord = false;
    this.timesSelected = 0;
  }
}
