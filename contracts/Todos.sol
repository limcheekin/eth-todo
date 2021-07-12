// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Todos {
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated(address owner, uint id, string content);

    event TaskCompleted(address owner, uint id, bool completed);

    // REF: https://medium.com/coinmonks/solidity-tutorial-all-about-mappings-29a12269ee14
    mapping(address => mapping(uint => Task)) public tasks;

    mapping(address => uint) public taskCount;

    function createTask(address owner, string memory _content) public {
        uint count = ++taskCount[owner];
        tasks[owner][count] = Task(count, _content, false);
        emit TaskCreated(owner, count, _content);
    }

    function toggleCompleted(address owner, uint _id) public {
        Task memory _task = tasks[owner][_id];
        _task.completed = !_task.completed;
        tasks[owner][_id] = _task;
        emit TaskCompleted(owner, _id, _task.completed);
    }
}
