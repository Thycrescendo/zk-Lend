const { ethers } = require('ethers');
const { Provider, Wallet, ContractFactory } = require("zksync-ethers");
require('dotenv').config();

// Import the compiled ABI and bytecode of the BattleGame contract
const BattleGame = require('../artifacts-zk/contracts/BattleGame.sol/BattleGame.json');

// Replace with your zkSync RPC URL and private key
const ZKSYNC_RPC_URL = 'https://mainnet.era.zksync.io';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
    console.error("Please set your PRIVATE_KEY in the .env file");
    process.exit(1);
}

async function deploy() {
    // Connect to zkSync provider
    const provider = new ethers.providers.JsonRpcProvider(ZKSYNC_RPC_URL);
    
    // Connect wallet using private key
    const wallet = new Wallet(PRIVATE_KEY, provider);

    // Log wallet address
    console.log('Deploying from wallet address:', wallet.address);

    // Instantiate the ContractFactory for BattleGame
    const BattleGameFactory = new ContractFactory(BattleGame.abi, BattleGame.bytecode, wallet);

    // Example argument for the constructor
    const initialCount = 5;

    // Deploy the contract with the constructor arguments
    const battleGame = await BattleGameFactory.deploy(initialCount);
    await battleGame.deployed();

    // Log deployed contract address
    console.log('BattleGame deployed to:', battleGame.address);
}

deploy()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('Error deploying BattleGame contract:', error);
        process.exit(1);
    });
