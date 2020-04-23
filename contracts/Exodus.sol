pragma solidity ^0.5.0;

contract RedShiftExodus {
  uint public exodusCount = 0;
  struct Exodus {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Exodus) public roko;

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
    executeRoko("Paradigm Shift");
  }

  function executeRoko(string memory _content) public {
    exodusCount++;
    roko[exodusCount] = Exodus(exodusCount, _content, false);
    emit ExodusCompleted(exodusCount, false);
  }

  function toggleCompleted(uint _id) public {
    Exodus memory _exodus = roko[_id];
    _exodus.completed = !_exodus.completed;
    roko[_id] = _exodus;
    emit ExodusCompleted(_id, _exodus.completed);
  }
}