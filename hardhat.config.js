require("@nomiclabs/hardhat-waffle");
require('dotenv').config()


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

//https://polygon-mumbai.infura.io/v3/871b810ff04e4f4aa63c36e774350a12
module.exports = {
  networks: {
    hardhat: {

    },
    /*development: {
      chainId:1337
    },*/
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/871b810ff04e4f4aa63c36e774350a12',
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    }, 
    mainnet: {
      url: 'https://polygon-mainnet.infura.io/v3/871b810ff04e4f4aa63c36e774350a12',
      accounts: [process.env.METAMASK_PRIVATE_KEY]
    }
  },
  solidity: "0.8.4",
};

