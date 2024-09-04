import { ethers } from "hardhat";

async function main() {
  const KSHTokenAddress = "0xA67721E9F45Eb0d6f385144518dA2f86744b2863";
  const merkleAddress = "0xda92c932AB0227dF47F526AE77Ae65951B3B201f";

  // Connect to the KSH token and MerkleAirdrop contracts
  const Ksh = await ethers.getContractAt("IERC20", KSHTokenAddress);
  const merkleAirdrop = await ethers.getContractAt("IMerkleAirdrop", merkleAddress);
 
 
  // 0xb54aa9a56b21e38132edaeafd9ad5d4a531afa2b267d2f2610d008dfcf15d844
  // const approve = await Ksh.approve(merkleAddress, 1000);
  // console.log("approve:" + approve.hash);
  // await approve.wait();
  // const bal = await Ksh.balanceOf(merkleAddress);
  // console.log(bal)

  const recipientAddress = "0x557119D048498e66269Ee226b431D16e9beB0d9f";  // Replace with actual recipient address
  const claimAmount = ethers.parseUnits("10", 18); // Adjust according to token decimals

  const merkleProof = ["0x06dab7f453b6a96db79e5b7977c2ce50c29a1eee65387d7f490d0fea579eb2af"
    , "0x34340b8c22a750c1e3ce89486d6b152b5f13c314af142428d9f64dacd12fd6b8", "0xf0e7841043b59728c076bde032efe5bf1c25f5b2360b54d9bf6519ff33fa29f6"
     ,"0x29d0d182ee9e2578803eeac200e1914c3706b60263a6cb22782faf6ed7f38d2d"];

     
  try {
  
    // If simulation passes, proceed with the transaction
    const claimTx = await merkleAirdrop.claimAirdrop(claimAmount, merkleProof);
    console.log("Claim transaction submitted:", claimTx.hash);
     claimTx.wait();
    console.log("Claim transaction confirmed");

} catch (error) {
    console.error("Error during transaction:", error);
}
}

main().catch((error) => {
    console.error("Script failed:", error);
    process.exitCode = 1;
});
