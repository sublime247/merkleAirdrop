// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
interface IMerkleAirdrop{
    function claimAirdrop(uint256 _amount, bytes32[] calldata _merkleProof) external;
    function withdrawRemainingToken() external;
}