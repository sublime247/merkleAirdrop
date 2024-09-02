import * as fs from 'fs';
import csvParser from "csv-parser";
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';


interface AirdropEntry{
    address: string,
    amount:number,
}


const airdropList: Buffer[] = [];
const leaves: { [address: string]: Buffer } = {};

// Reading of CSv file{}
fs.createReadStream("airdrop.csv").pipe(csvParser()).on('data', (row: AirdropEntry) => {
    const address = row.address;
    const amount = row.amount;
    const leaf = keccak256(`${address}${amount}`);
    airdropList.push(leaf)
    leaves[address] = leaf;
}).on('end', () => {
    const merkleTree = new MerkleTree(airdropList, keccak256, { sortPairs: true });
    const rootHash = merkleTree.getRoot().toString('hex');
    console.log("Merkle Root", rootHash);

// Example: Pass address and amount as command-line arguments or input prompts
const specificAddress = process.argv[2] ;
    const specificAmount = process.argv[3];


    const specificLeaf = keccak256(`${specificAddress}${specificAmount}`);
    // console.log( specificLeaf);

    const proof = merkleTree.getHexProof(specificLeaf);
    console.log(`Merkle Proof for ${specificAddress}:`, proof);
}

)