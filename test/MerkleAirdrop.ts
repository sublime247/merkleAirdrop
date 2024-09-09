import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
import hre, { ethers } from "hardhat";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
  
// const merkleRoot = "0xa3154c447919bd34e06e76c809d66cbb63b5c6c136d8f1d0a6c9fce32d5de7fd"

describe("MerkleAirdrop", function () {
    async function deployToken() {
        const [owner, otherAccount] = await hre.ethers.getSigners();
        const KSHToken = await ethers.getContractFactory("KSH");
        const token = await KSHToken.deploy();
        
        return { token, owner, otherAccount };
    }

    async function deployMerkleAirdrop() {
        const [owner, otherAccount, otherAccount1, otherAccount2, otherAccount3, otherAccount4, otherAccount5] = await hre.ethers.getSigners();
        const { token } = await loadFixture(deployToken)
        const leafNodes = [owner, otherAccount, otherAccount1, otherAccount2, otherAccount3, otherAccount4, otherAccount5].map((addrs) => keccak256(ethers.solidityPacked(
            ["address", "uint256"], [otherAccount2.address, ethers.parseUnits("10", 18)]
        )));
        const merkleTree = new MerkleTree(leafNodes, keccak256, {
            sortPairs: true
        });
        const rootHash = merkleTree.getHexRoot();
        const MerkleAirdrop = await ethers.getContractFactory("MerkleAirdrop");

        const merkleAirdrop = await MerkleAirdrop.deploy(token, rootHash);
        
        return { merkleAirdrop, owner, otherAccount, token, otherAccount1,otherAccount2,otherAccount3,otherAccount4, otherAccount5, rootHash, merkleTree };
    }

    describe("Deployment", function () {

        it("Should check if token is correctly set", async function () {
            const { merkleAirdrop, owner, token } = await loadFixture(deployMerkleAirdrop);
            expect(await merkleAirdrop.tokenAddress()).to.equal(token);
        
        });
    
        it("Should check if owner is correct", async function () {
            const { merkleAirdrop, owner, } = await loadFixture(deployMerkleAirdrop);
            expect(await merkleAirdrop.owner()).to.equal(owner);
        
        });
        it("Should check if the merkleRoot is correctly set", async function () {
            const { merkleAirdrop, rootHash } = await loadFixture(deployMerkleAirdrop);
            expect(await merkleAirdrop.merkleRoot()).to.equal(rootHash);
        });

    });
    describe("ClaimAirdrop", function () {
        it("Should claim Successfully", async function () {
            const { merkleAirdrop, owner, otherAccount, otherAccount2, otherAccount3, otherAccount4, otherAccount5, token, merkleTree } = await loadFixture(deployMerkleAirdrop);
            
            // Transfer some token to the contract
            const trfAmount = ethers.parseUnits("100", 18);
            await token.transfer(merkleAirdrop, trfAmount);
            expect((await token.balanceOf(merkleAirdrop))).to.equal(trfAmount);

            //   Get Merkle proof
            const amountTobeClaimed = ethers.parseUnits("10", 18);
            const leaf = keccak256(ethers.solidityPacked(["address", "uint256"], [otherAccount2.address, amountTobeClaimed]))
            const proof = merkleTree.getHexProof(leaf);

            const claimfunction = await merkleAirdrop.connect(otherAccount2).claimAirdrop(amountTobeClaimed, proof);
            expect(claimfunction).to.be.revertedWith('TokenHasBeenClaimed');
            expect(claimfunction).to.be.revertedWith("Token transfer failed");

      
    })
        
        });
    
    
    describe("UpdateMerkleRoot", function () {
        it("It should update merkleRoot", async function () {
            
            const { merkleAirdrop, owner, otherAccount, otherAccount1, otherAccount2 } = await loadFixture(deployMerkleAirdrop);
            const leafNodes = [owner, otherAccount, otherAccount1, otherAccount2,].map((addrs) => keccak256(ethers.solidityPacked(
                ["address", "uint256"], [otherAccount1.address, ethers.parseUnits("10", 18)]
            )));
            const merkleTree = new MerkleTree(leafNodes, keccak256, {
                sortPairs: true
            });
            const rootHash = merkleTree.getHexRoot();
            await merkleAirdrop.updateMerkleroot(rootHash);
        });
    });

    describe("OwnerWithdrawal", function () {
        it("Should check if owner withdraw", async function () {

            const { merkleAirdrop, token, owner, otherAccount, otherAccount1, otherAccount2 } = await loadFixture(deployMerkleAirdrop);
            const bal = await token.balanceOf(merkleAirdrop);
            expect(await token.transferFrom(merkleAirdrop, owner, bal));
          
        });
        
    });
})
      




