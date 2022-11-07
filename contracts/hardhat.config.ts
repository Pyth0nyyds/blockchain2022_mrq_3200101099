import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: 'http://127.0.0.1:8545',
      // the private key of signers, change it according to your ganache user
      accounts: [
        '847bcdd7dc92ac9f92db8cd8be5c3ba5a69135119448dfb31c026dd361e63b73',
        'ac02cfc092e50a80b9612511adeb6ae4dbe6b2ac50f771b13ff1a3324e81681d',
        '37ce0000c4e1111cd8c5403926fe1368932fa06580ae063bef6d0d84e5d6f1d5',
        '22bb54372b21e0910f3271d7bb282170d84683ab047bbd38763889f758656dc3',
        '8327688f31b2671ad96083fd168edab454acb3f92aa46af06f8873f4d0d340d3'
      ]
    },
  },
};

export default config;
