import randomN from "../utils/Calculator";

const List = (props) => {
  let list = [];
  let final = 0;
  let index = 0;
  while (final === 0) {
    let randomNumer = randomN(0, 2);
    if (
      list[0] !== randomNumer &&
      list[1] !== randomNumer &&
      list[2] !== randomNumer
    ) {
      list[index] = randomNumer;
      if (index !== 2) {
        index++;
      } else {
        final = 1;
      }
    }
  }

  let newList = [];
  newList[list[0]] = props.numberForQuestion;
  newList[list[1]] = props.numberForQuestion2;
  newList[list[2]] = props.numberForQuestion3;
  return newList;
};

export default List;
