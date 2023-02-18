// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.16;
import "openzeppelin/utils/Strings.sol";
import "openzeppelin/access/Ownable.sol";
import "openzeppelin/token/ERC20/IERC20.sol";
import "openzeppelin/token/ERC721/ERC721.sol";
import {ModuleBase} from "../ModuleBase.sol";
import {DataTypes} from "../libraries/DataTypes.sol";
import {IWriteRule, ITransferRule, IFundRule, ICashRule, IApproveRule} from "../interfaces/IWTFCRules.sol";

contract HandshakeTimeLock is ModuleBase {
//     mapping(address => mapping(address => bool)) public userAuditor; // Whether User accepts Auditor
//     mapping(address => mapping(address => bool)) public auditorUser; // Whether Auditor accepts User
//     mapping(uint256 => uint256) public inspectionPeriod;
//     mapping(uint256 => address) public cheqAuditor;
//     mapping(address => bool) public cheqVoided;
//     string private _baseURI;

    constructor(
        address registrar,
        address _writeRule, 
        address _transferRule, 
        address _fundRule, 
        address _cashRule, 
        address _approveRule,
        DataTypes.WTFCFees memory _fees,
        string memory __baseURI
    ) ModuleBase(registrar, _writeRule, _transferRule, _fundRule, _cashRule, _approveRule, _fees) {
        _URI = __baseURI;
    }

// TRANSFERING
//         (address auditor, uint256 _inspectionPeriod) = abi.decode(initData, (address, uint256));
//         require(userAuditor[caller][auditor] && auditorUser[auditor][caller], "Must handshake");
//         inspectionPeriod[cheqId] = _inspectionPeriod;
//         cheqAuditor[cheqId] = auditor;

// FUNDING
//         require(inspectionPeriod[cheqId] + cheq.mintTimestamp <= block.timestamp, "Already cashed");  // How to abstract this?

// CASHING
// //         if (block.timestamp >= cheqCreated[cheqId]+cheqInspectionPeriod[cheqId]
// //             || crx.ownerOf(cheqId)!=caller
// //             || cheqVoided[cheqId]){
// //             return 0;
// //         } else{
// //             return crx.cheqEscrowed(cheqId);
// //         }
// require(!cheqVoided[cheqId], "Voided");
// cheqVoided[cheqId] = true;

//     function tokenURI(uint256 /*tokenId*/) external pure returns (string memory){
//         return "";
//     }

//     function voidCheq(uint256 cheqId) external {
//         require(cheqAuditor[cheqId]==_msgSender(), "Only auditor");
//         cheqVoided[cheqId] = true;
//         // crx.cash(cheqId, crx.cheqDrawer(cheqId), crx.cheqEscrowed(cheqId));  // Return escrow to drawer
//     }
//     function status(uint256 cheqId, address caller) public view returns(string memory){
//         if(cashable(cheqId, caller) != 0){
//             return "mature";
//         } else if(cheqVoided[cheqId]){
//             return "voided";
//         } else {
//             return "pending";
//         }
//     }
}
