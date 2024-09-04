import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0xcfe275F79ee68D6A861bA33081dcc1c8963d32f7";
const merkleRoot = "0xb54aa9a56b21e38132edaeafd9ad5d4a531afa2b267d2f2610d008dfcf15d844"

const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {

    const merkle = m.contract("MerkleAirdrop", [tokenAddress, merkleRoot]);

    return { merkle };
});

export default MerkleAirdropModule;




// Token address
// 0xC0D43791e03157c66D283C53A508488f2813F5B9

// MerkleRoot
// 0xa3154c447919bd34e06e76c809d66cbb63b5c6c136d8f1d0a6c9fce32d5de7fd

// contract deployed address
// 0x178BAF5e7423eaCFf3f27037A1079cff601C6722