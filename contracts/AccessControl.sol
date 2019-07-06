// solhint-disable-next-line compiler-fixed, compiler-gt-0_4.21
pragma solidity >=0.4.21 <0.6.0;


contract AccessControl {

    address public owner;
    address public newOwner; 

    /*** Events ****************/
    event OwnershipTransferred (
      address indexed _oldOwner,
      address indexed _newOwner
    );

    /*** Modifiers ****************/
    modifier onlyOwner() {
        require(msg.sender == owner, "Requestor has no permissions to Initiate this function");
        _;
    }

    /*** Methods ****************/
    ///@dev TransferOwnership of the Contract to Whitelist Other Addresses
    ///@param _newOwner new owner parameter
    function transferOwnership(address _newOwner) public onlyOwner() {
        if (_newOwner != address(0)) {
            newOwner = _newOwner;
        }
    }

    ///@dev Ownership transfer acceptance by corresponding owner
    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);  // solhint-disable-line
        owner = newOwner; 
        newOwner = address(0);
    }

    //constructor function to initialize contract
    constructor() public{
      //assing contract creator as owner of the contract
      owner = msg.sender;
    }

}