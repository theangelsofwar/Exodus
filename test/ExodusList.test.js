const ExodusList = artifacts.require('./ExodusList.sol');

contract('ExodusList', (accounts) => {
  before(async () => {
    this.exodusList = await ExodusList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.exodusList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists Exodus Migrations', async () => {
    const exodusCount = await this.exodusList.exodusCount()
    const exodus = await this.exodusList.exodusArray(exodusCount)
    assert.equal(exodus.id.toNumber(), exodusCount.toNumber())
    assert.equal(exodus.completed, false)
    assert.equal(exodusCount.toNumber(), 1)
  })

  it('creates Exodus', async () => {
    const result = await this.exodusList.createExodus('New Exodus')
    const exodusCount = await this.exodusList.exodusCount()
    assert.equal(exodusCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'New Exodus')
    assert.equal(event.completed, false)
  })

  it('toggles exodus completed', async () => {
    const result = await this.exodusList.toggleCompleted(1)
    const exodus = await this.exodusList.exodusArray(1)
    assert.equal(exodus.completed, true)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })

})