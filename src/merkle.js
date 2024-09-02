"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const merkletreejs_1 = require("merkletreejs");
const keccak256_1 = __importDefault(require("keccak256"));
const airdropList = [];
const leaves = {};
// Reading of CSv file{}
fs.createReadStream("airdrop.csv").pipe((0, csv_parser_1.default)()).on('data', (row) => {
    const address = row.address;
    const amount = row.amount;
    const leaf = (0, keccak256_1.default)(`${address}${amount}`);
    airdropList.push(leaf);
    leaves[address] = leaf;
}).on('end', () => {
    const merkleTree = new merkletreejs_1.MerkleTree(airdropList, keccak256_1.default, { sortPairs: true });
    const rootHash = merkleTree.getRoot().toString('hex');
    console.log("Merkle Root", rootHash);
    // Example: Pass address and amount as command-line arguments or input prompts
    const specificAddress = process.argv[2];
    const specificAmount = process.argv[3];
    const specificLeaf = (0, keccak256_1.default)(`${specificAddress}${specificAmount}`);
    // console.log( specificLeaf);
    const proof = merkleTree.getHexProof(specificLeaf);
    console.log(`Merkle Proof for ${specificAddress}:`, proof);
});
