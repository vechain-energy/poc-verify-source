require("@nomiclabs/hardhat-waffle");
require('@vechain.energy/hardhat-thor')

module.exports = {
  solidity: "0.8.18",
  networks: {
    vechain: {
      url: 'https://testnet.veblocks.net',
      privateKey: "0x94a990b5e79f09238425d227921116f702d10e180fcc6bb8f67e0383f23cdbad",
      delegateUrl: 'https://sponsor-testnet.vechain.energy/by/90'
    }
  }
};