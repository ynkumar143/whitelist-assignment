// solhint-disable-next-line compiler-fixed, compiler-gt-0_4.21
pragma solidity >=0.4.21 <0.6.0;

import "./AccessControl.sol";

contract WhiteList is AccessControl {

    /**** Storage Types *******/
    //Number of devices can be added under each user address
    uint256 public maxDeviceCount = 64; 

    /*** Events ****************/
    //Trigger this event when a user got whitelisted inside smart contract
    event UserWhiteListed (
        //Fill in parameter details
    );

    //Trigger this event when a device is whitelisted under user
    event DeviceWhiteListed (
        //Fill in parameter details
    );

    //Trigger this event when a device removed from the user's list of devices. 
    event DeviceRemoved (
        //Fill in parameter details
    );

    //Trigger this event when an user is removed from list of users. 
    event UserRemoved (
        //Fill in paramter details
    );
    
    /*** Modifiers *************/
    /// @dev Only allow whitelisted users/devices
    modifier onlyWhitelisted() {
        //Fill the necessary mapping
    }

    /// @dev Use Enum values differentiating address is device or user. 

    /// @dev Account information used to whitelist user/device
    /// @param whitelisted Checks the account is whitelisted or not
    /// @param addrtype Defines type of the Account for device / user
    // 1. Add any other parameters to define uniqueness of entry. 
    struct Account {
       //Define structure
    }

    //Map User Address to Account

    /***  Methods **********************************/
    /// @dev Add user to the whitelisted map
    /// @param _addr The address of the user
    /// 1. add modifiers to verify the user is whitelisted by only owner of the contract. 
    function addUserToWhitelist(address _addr) public{
    }

    /// @dev Verifies whether address whitelisted or not
    /// @param _addr The address of the user
    /// @return bool Whether user is whitelisted or caused any errors during assignment
    /// 1. Use appropriate view/pure to display the result as mentioned in return. 
    function isWhiteListed(address _addr) public {
        //Verifies if the whitelist is happening for already whitelisted address
    }

    /// @dev Add Device to the list of devices of user
    /// @param _devAddr The address of the device
    /// 1. Add modifier that will validate the user that is adding device should be whitelisted already. 
    function addDevice(address _devAddr) public{
        //Assign device Account information
        // Use Account structure to properly distinguish the ethereum addresss is for user/device. 
        
    }

    /// @dev Remove device from the list of allowed devices 
    /// @param devaddr Device Address to be removed
    /// 1. Use modifier where only owner of this device ethereum address can remove device. 
    function removeDevice(address devaddr) public  {
        
    }

    /// @dev Remove whitelisted user accessing to portal
    /// @param useraddr User Address to be removed from accessing
    function removeWhitelistedUser(address useraddr) public onlyOwner(){
        
    }

    /// @dev Show list of devices mapped for user address
    /// @param useraddr Address of user to view list of devices
    /// @return address[] List of address mapped with user address
    function showDevices(address useraddr) public view returns (address[] memory) {

        
    }

    /// @dev Finding Device Owner on providing device addresss
    /// @param devaddr Device address information to find owner of the address
    /// @return address Returns device owner
    function findDeviceOwner(address devaddr) public view returns(address) {
        
    }

    /*** Constructor *************/
    /// @dev streamSpace constructor
    constructor() public { }
}