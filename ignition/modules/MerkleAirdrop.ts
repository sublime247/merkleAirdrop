import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0xC0D43791e03157c66D283C53A508488f2813F5B9";
const merkleRoot = "0xa3154c447919bd34e06e76c809d66cbb63b5c6c136d8f1d0a6c9fce32d5de7fd"

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