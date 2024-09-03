import { ethers } from "hardhat";
async function main() {
  const KSHTokenAddress = "0xC0D43791e03157c66D283C53A508488f2813F5B9";
  const Ksh = await ethers.getContractAt("IERC20", KSHTokenAddress);

    
  const merkleRoot = "0xb54aa9a56b21e38132edaeafd9ad5d4a531afa2b267d2f2610d008dfcf15d844"
  const merkleAddress = "0x178BAF5e7423eaCFf3f27037A1079cff601C6722";
  const merkleAidrop = await ethers.getContractAt("IMerkleAirdrop", merkleAddress);


  // // test user
  const userPrivateKey = `${process.env.ACCOUNT_PRIVATE_KEY}`; // Replace with your private key
  const userWallet = new ethers.Wallet(userPrivateKey, ethers.provider);


  // const USER = {
  //   address: "0x557119D048498e66269Ee226b431D16e9beB0d9f",
  //   amount: "1000000000000000000",
  // };
    
  // const merkleProof = [
  //   "0x06dab7f453b6a96db79e5b7977c2ce50c29a1eee65387d7f490d0fea579eb2af",
  //   "0x34340b8c22a750c1e3ce89486d6b152b5f13c314af142428d9f64dacd12fd6b8",
  //   "0xf0e7841043b59728c076bde032efe5bf1c25f5b2360b54d9bf6519ff33fa29f6",
  //   "0x29d0d182ee9e2578803eeac200e1914c3706b60263a6cb22782faf6ed7f38d2d"
  // ];
  // approve and send money to our contract so user will be able to claim from our contract
  // const approvalAmount =  ethers.parseUnits("2000", 10);
  // const approvalTx = await Ksh.transfer(merkleAidrop, approvalAmount);
  // approvalTx.wait();


  // try {
  //     const claimTx = await merkleAidrop.claimAirdrop(USER.amount, merkleProof);
  //     // const claimTx = await merkleAidrop.connect(userWallet).claimAirdrop(USER.amount, merkleProof);
    
  //     console.log(`Transaction sent` + claimTx);
  //     // // Wait for the transaction to be mined
  //     claimTx.wait();
    
  //     console.log("Airdrop claimed successfully");
    
    
  //     //   user balance after
  //     const userTokenBalanceAfter = await Ksh.balanceOf(USER.address);
  //     console.log("User CWT balance after: " + userTokenBalanceAfter);
  //   } catch (error) {
  //     console.error("Error claiming airdrop:", error);
  //   }
  // }


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});