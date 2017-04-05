import CompleteMe from '../scripts/CompleteMe'

export var completion;

export const before = () => {
  completion = new CompleteMe();
}
