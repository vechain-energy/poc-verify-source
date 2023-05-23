// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Echo {
    string public message;
    address private allowedSigner = 0x9653fCC59c221863FAD440163dE3DA17cC399C0e;

    using ECDSA for bytes32;

    function setMessage(string memory _message) public {
        message = _message;
    }

    function setMessageVerified(
        string memory _message,
        bytes memory signature
    ) public {
        require(verifySignature(_message, signature), "Invalid signature");
        message = _message;
    }

    function verifySignature(
        string memory _message,
        bytes memory signature
    ) private view returns (bool) {
        address signer = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n",
                Strings.toString(bytes(_message).length),
                _message
            )
        ).recover(signature);
        console.log("detected signer: %s", signer);

        return (signer == allowedSigner);
    }
}
