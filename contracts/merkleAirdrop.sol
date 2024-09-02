//SPDX-License-Identifier:MiT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract MerkleAirdrop{
    bytes32 merkleRoot;
    address tokenAddress;
    address owner;


   mapping (address => bool) hasClaimed;
    constructor(address _tokenAddress, bytes32 _merkleRoot){
        tokenAddress =_tokenAddress;
        merkleRoot =_merkleRoot;
        owner = msg.sender;
    }


error TokenHasBeenClaimed();
error NotOwner();


function OnlyOwner()view private{
   if(msg.sender!=owner){
        revert NotOwner();
   }
}

event AirdropClaimed(address indexed _user, uint256 _amount);
event AirdropWithdrawn(uint  _tokenBalance, string successMessage);

function claimAirdrop(uint256 _amount, bytes32[] calldata _merkleProof ) external {
if(hasClaimed[msg.sender]){
    revert TokenHasBeenClaimed();
 }
 bytes32 leaf = keccak256(abi.encodePacked(msg.sender, _amount));
 require(MerkleProof.verify(_merkleProof, merkleRoot, leaf ));


 hasClaimed[msg.sender]=true;
 
IERC20(tokenAddress).transfer(msg.sender, _amount);

emit AirdropClaimed(msg.sender, _amount);
}



function updateMerkleroot(bytes32 _merkleroot) external {
    OnlyOwner();
    merkleRoot=_merkleroot;
} 


function withdrawRemainingToken() external{
    OnlyOwner();
    uint256 _tokenBalance = IERC20(tokenAddress).balanceOf(address(this));
    require(_tokenBalance>0, "You have not token left");

   require(IERC20(tokenAddress).transfer(owner, _tokenBalance), "Transaction Fail");

   emit AirdropWithdrawn(_tokenBalance, "Successful");
}
}