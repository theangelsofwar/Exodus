pragma solidity ^0.5.0;

contract ExodusList {
  uint public exodusCount = 0;
  //number of exits from web3

  struct Exodus {
    uint id;
    string content;
    //each exit will contain an exit message
    bool completed;
  }

  mapping(uint => Exodus) public exodusArray;

  event ExodusCreated(
    uint id,
    string content,
    bool completed
  );

  event ExodusCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createExodus("The future is distributed by the humans");
  }

  function createExodus(string memory _content) public {
    exodusCount ++;
    exodusArray[exodusCount] = Exodus(exodusCount, _content, false);
    emit ExodusCreated(exodusCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Exodus memory _exodus = exodusArray[_id];
    //allocate memory to assign local variable of Exodus struct type
    _exodus.completed = !_exodus.completed;
    exodusArray[_id] = _exodus;
    emit ExodusCompleted(_id, _exodus.completed);
  }
}