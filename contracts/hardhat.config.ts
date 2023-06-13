import { HardhatUserConfig } from "hardhat/config"

import "@nomiclabs/hardhat-ethers-v5"
import "@typechain/hardhat"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-chai-matchers"
import "@nomicfoundation/hardhat-network-helpers"

import "./tasks/accounts"
import "./tasks/balance"
import "./tasks/block-number"

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
}

export default config
