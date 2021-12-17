require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    
    hardhat: {
      chainId:1337
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/LhltBAHnspBMIgCx1SsxYJqM_rJOeZYe',
      accounts: [`0x${privateKey}`]
    }
  },
  solidity: "0.8.4",
};

