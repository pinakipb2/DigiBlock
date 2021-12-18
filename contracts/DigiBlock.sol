// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract DigiBlock {
    // global variables
    address public immutable owner; // don't make it public

    // constructor
    constructor() {
        owner = msg.sender;
        Admin memory ownerAdmin = Admin(
            "Pinaki",
            "Bhattacharjee",
            "pinakipb2@gmail.com",
            msg.sender,
            "Pinaki"
        );
        registeredAdmins[msg.sender] = ownerAdmin;
        registeredAdminsAddresses.push(msg.sender);
        emit AdminRegisteredEvent("Pinaki", msg.sender); // may be commented out in future
    }

    // Admin structure
    struct Admin {
        string firstName;
        string lastName;
        string email;
        address userAddress;
        string masterKey;
    }

    // mappings
    mapping(address => Admin) public registeredAdmins; // don't make public

    // arrays
    address[] registeredAdminsAddresses;

    // modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Access Denied");
        _;
    }

    modifier onlyAdmin() {
        require(
            registeredAdmins[msg.sender].userAddress !=
                0x0000000000000000000000000000000000000000,
            "Access Denied"
        ); // Not Registered as Admin
        _;
    }

    modifier alreadyRegisteredAdmin(address _userAddress) {
        if (
            registeredAdmins[_userAddress].userAddress !=
            0x0000000000000000000000000000000000000000
        ) {
            revert("User is Already a Admin");
        }
        _;
    }

    // events
    event AdminRegisteredEvent(string _firstName, address indexed _useraddress);
    event AdminDeletedEvent(string _firstName, address indexed _useraddress);

    // functions
    function addAdmin(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        address _userAddress,
        string memory _masterKey
    ) public onlyAdmin alreadyRegisteredAdmin(_userAddress) {
        Admin memory newAdmin = Admin(
            _firstName,
            _lastName,
            _email,
            _userAddress,
            _masterKey
        );
        registeredAdmins[_userAddress] = newAdmin;
        registeredAdminsAddresses.push(_userAddress);
        emit AdminRegisteredEvent(_firstName, _userAddress);
    }

    function deleteAdmin(address _userAddress) public onlyOwner {
        require(_userAddress != owner, "Access Denied");
        require(
            registeredAdmins[_userAddress].userAddress !=
                0x0000000000000000000000000000000000000000,
            "Not a valid Admin"
        );
        string memory _firstName = registeredAdmins[_userAddress].firstName;
        delete registeredAdmins[_userAddress];
        uint256 index = 0;
        while (registeredAdminsAddresses[index] != _userAddress) {
            index++;
        }
        require(
            index < registeredAdminsAddresses.length,
            "Admin Delete Failed"
        );
        registeredAdminsAddresses[index] = registeredAdminsAddresses[
            registeredAdminsAddresses.length - 1
        ];
        registeredAdminsAddresses.pop();
        emit AdminDeletedEvent(_firstName, _userAddress);
    }

    function allAdmins()
        public
        view
        returns (
            string[] memory,
            string[] memory,
            string[] memory,
            address[] memory
        )
    {
        uint256 adminCount = registeredAdminsAddresses.length;
        string[] memory _firstName = new string[](adminCount);
        string[] memory _lastName = new string[](adminCount);
        string[] memory _email = new string[](adminCount);
        address[] memory _userAddress = new address[](adminCount);
        for (uint256 i = 0; i < adminCount; i++) {
            _firstName[i] = registeredAdmins[registeredAdminsAddresses[i]]
                .firstName;
            _lastName[i] = registeredAdmins[registeredAdminsAddresses[i]]
                .lastName;
            _email[i] = registeredAdmins[registeredAdminsAddresses[i]].email;
            _userAddress[i] = registeredAdmins[registeredAdminsAddresses[i]]
                .userAddress;
        }
        return (_firstName, _lastName, _email, _userAddress);
    }

    function singleAdmin(address _userAddress)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(
            registeredAdmins[_userAddress].userAddress !=
                0x0000000000000000000000000000000000000000,
            "Not a valid Admin"
        );
        string memory _firstName = registeredAdmins[_userAddress].firstName;
        string memory _lastName = registeredAdmins[_userAddress].lastName;
        string memory _email = registeredAdmins[_userAddress].email;
        string memory _masterKey = registeredAdmins[_userAddress].masterKey;
        return (_firstName, _lastName, _email, _masterKey);
    }

    function updateMasterKey(string memory _masterKey) public onlyOwner {
        require(
            keccak256(bytes(registeredAdmins[msg.sender].masterKey)) ==
                keccak256(bytes("Pinaki")),
            "Action Denied"
        );
        registeredAdmins[msg.sender].masterKey = _masterKey;
    }
}
