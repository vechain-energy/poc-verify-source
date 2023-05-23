const { ethers } = require('hardhat')

const Contracts = {}
beforeEach(async function () {
    const Echo = await ethers.getContractFactory('Echo')
    Contracts.Echo = await Echo.deploy()
})


describe('setMessage(message)', () => {
    it('sets the new message', async () => {
        const newMessage = String(Math.random())
        await Contracts.Echo.setMessage(newMessage)
        const message = await Contracts.Echo.message()
        expect(message).toEqual(newMessage)
    })
})


describe('setMessage(message, signature)', () => {
    it('sets the new message', async () => {
        const newMessage = 'test'
        const signature = '0x11a91952fb6afaa68ca64768a26c2d70f3a88e852614e29c5a12bd95c34e49df1ff01b3a808d0962d95531f2e5a8fbcd732f4c12f96e789136dbc9fa6c23a0131b'

        await Contracts.Echo.setMessageVerified(newMessage, signature)
        const message = await Contracts.Echo.message()
        expect(message).toEqual(newMessage)
    })


    it('rejects invalid signatures', async () => {
        const newMessage = 'test2'
        const signature = '0x11a91952fb6afaa68ca64768a26c2d70f3a88e852614e29c5a12bd95c34e49df1ff01b3a808d0962d95531f2e5a8fbcd732f4c12f96e789136dbc9fa6c23a0131b'

        await expect(Contracts.Echo.setMessageVerified(newMessage, signature)).rejects.toThrow('Invalid signature')
    })
})
