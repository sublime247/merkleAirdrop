// import {
//     time,
//     loadFixture,
//   } from "@nomicfoundation/hardhat-toolbox/network-helpers";
//   import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
//   import { expect } from "chai";
// import hre, { ethers } from "hardhat";
  
// const merkleRoot = "0xa3154c447919bd34e06e76c809d66cbb63b5c6c136d8f1d0a6c9fce32d5de7fd"

// describe("MerkleAirdrop", function () {
//     async function deployToken() {
//         const [owner, otherAccount] = await hre.ethers.getSigners();
//         const KSHToken = await ethers.getContractFactory("KSH");
//         const token = await KSHToken.deploy();
        
//         return { token, owner, otherAccount };
//     }

//     async function deployMerkleAirdrop() {
//         const [owner, otherAccount] = await hre.ethers.getSigners();
//        const{token} =await loadFixture(deployToken)
//         const MerkleAirdrop = await ethers.getContractFactory("MerkleAirdrop");
//         const merkleAirdrop = await MerkleAirdrop.deploy(token, merkleRoot);
        
//         return { merkleAirdrop, owner, otherAccount, token};
//     }

//     describe("Deployment", function () {
//         it("Should check if owner is correct", async function () {
//             const { merkleAirdrop, owner, } = await loadFixture(deployMerkleAirdrop);
//             expect(await merkleAirdrop.owner()).to.equal(owner);
        
//     })
//         it("Should check if token is correctly set", async function () {
//             const { merkleAirdrop, owner, token } = await loadFixture(deployMerkleAirdrop);
//             expect(await merkleAirdrop.tokenAddress()).to.equal(token);
        
//         });
    
// })
//     describe("ClaimAirdrop", function () {
//         it("Should claim Successfully", async function () {
//             const { merkleAirdrop, owner, otherAccount, token } = await loadFixture(deployMerkleAirdrop);
//             const trfAmount = ethers.parseUnits("100", 18);


//             await token.transfer(otherAccount, trfAmount);
//             expect((await token.balanceOf(otherAccount))).to.equal(trfAmount);
//             await token.connect(otherAccount).approve(merkleAirdrop, trfAmount);

//             // const depositAmount = ethers.parseUnits("10", 18);

//             // await merkleAirdrop.connect(otherAccount).claimAirdrop(depositAmount);
      
//     })
//         // it("Should check if token is correctly set", async function () {
//         //     const { merkleAirdrop, owner, token } = await loadFixture(deployMerkleAirdrop);
//         //     expect(await merkleAirdrop.tokenAddress()).to.equal(token);
        
//         // });
    
// })
      
// });



