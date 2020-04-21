pragma solidity ^0.5.0;

contract Migrations {
  uint migrationCount=0;
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  struct Exodus {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Exodus) public roko;

  function executeRoko(string memory _content) public {
    migrationCount++;
    Exodus[migrationCount] = Exodus(migrationCount, _content, false);
  }
  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
