const Todos = artifacts.require('./Todos.sol')

contract('Todos', (accounts) => {
  before(async () => {
    this.todos = await Todos.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.todos.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('create a task', async () => {
    const address = await this.todos.address
    const result = await this.todos.createTask(address, 'A new task')
    const taskCount = await this.todos.taskCount(address)
    assert.equal(taskCount, 1)
    const event = result.logs[0].args
    assert.equal(event.id, 1)
    assert.equal(event.content, 'A new task')
  })

  it('lists tasks', async () => {
    const address = await this.todos.address
    const result = await this.todos.createTask(address, 'A task')
    const taskCount = await this.todos.taskCount(address)
    assert.equal(taskCount, 2)
    for (var i = 1; i <= taskCount; i++) {
        const task = await this.todos.tasks(address, i) 
        assert.equal(task.id, i)
    }
  })

  it('toggles task completion', async () => {
    const address = await this.todos.address
    const result = await this.todos.toggleCompleted(address, 1)
    const task = await this.todos.tasks(address, 1)
    assert.equal(task.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id, 1)
    assert.equal(event.completed, true)
  })
})