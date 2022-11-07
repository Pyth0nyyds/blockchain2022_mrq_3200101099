// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment the line to use openzeppelin/ERC20
// You can use this dependency directly because it has been installed already
import "./MyERC20.sol";


// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StudentSocietyDAO {

    // use a event if you want
    //event ProposalInitiated(uint32 proposalIndex);

    struct Proposal {
        uint32 index;      // index of this proposal
        address proposer;  // who make this proposal
        uint256 startTime; // proposal start time
        uint256 duration;  // proposal duration
        string name;       // proposal name
        uint32 agreement;
        uint32 disagreement;
        // ...
        // TODO add any member if you want
    }

    MyERC20 studentERC20;
    uint32 counter;
    
    uint32 constant Prop_cost = 100; 
    
    mapping(uint32 => Proposal) proposals; // A map from proposal index to proposal
    // ...
    // TODO add any variables if you want
    
    constructor() {
        // maybe you need a constructor
        studentERC20 = new MyERC20("ppsCoin", "ppsCoinSymbol");
        counter = 0;
    }
    
    function getindex (uint32 index) view external returns (uint32){
        Proposal storage prop = proposals[index];
        return prop.index;
    }

    function getname (uint32 index) view external returns (string memory){
        Proposal storage prop = proposals[index];
        return prop.name;
    }
    
    function agree (uint32 index) external  returns (uint32){
        Proposal storage prop = proposals[index];
        prop.agreement ++;
        return prop.agreement;
    }
    
    function disagree (uint32 index) external returns (uint32){
        Proposal storage prop = proposals[index];        
        prop.disagreement ++;
        return prop.disagreement;
    }
    
    function ifpass(uint32 index) view internal returns (bool){
        Proposal storage prop = proposals[index];
        return (prop.agreement > prop.disagreement ? true : false );
    }
    
    function PropInit (uint32 index,string memory namae) private{
        Proposal storage prop = proposals[index];
        prop.proposer = msg.sender;
        prop.name = namae;
        prop.agreement = 0;
        prop.disagreement = 0;
        prop.startTime = block.timestamp;
        prop.duration = 1 minutes;
    }
    //发起
    function propose (string memory namae) external {
        counter ++;  
        Proposal storage prop  = proposals[counter];
        prop.index = counter;
        PropInit (prop.index, namae);
        studentERC20.transferFrom(msg.sender, address(this), Prop_cost);
    }
    
    function prop_settle (uint32 index) external returns(bool){
        Proposal storage prop = proposals[index];
        if(prop.startTime + prop.duration < block.timestamp){
            return false;
        }else{
            if(ifpass(index)){
                studentERC20.transferFrom(address(this), prop.proposer, Prop_cost);
            }
            return true;
        }

    }

    // ...
    // TODO add any logic if you want
}
