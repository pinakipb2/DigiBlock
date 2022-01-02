// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

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

    // Document structure
    struct Document {
        address from;
        address to;
        string ipfsHash;
        uint256 timestamp;
    }
    
    // User structure
    struct User {
        string firstName;
        string lastName;
        string email;
        address userAddress;
    }

    // Issuer structure
    struct Issuer {
        string orgName;
        string email;
        address orgAddress;
        string masterKey;
    }

    // mappings
    mapping(address => Admin) public registeredAdmins;
    mapping(address => Issuer) public registeredIssuers;

    // arrays
    address[] registeredAdminsAddresses;
    address[] registeredIssuersAddresses;

    // modifiers
    // Owner Only Action
    modifier onlyOwner() {
        require(msg.sender == owner, "Access Denied");
        _;
    }

    // Admin Only Action
    modifier onlyAdmin() {
        require(
            registeredAdmins[msg.sender].userAddress !=
                0x0000000000000000000000000000000000000000,
            "Access Denied"
        ); // Not Registered as Admin
        _;
    }

    // Pass: User is not Admin
    modifier alreadyRegisteredAdmin(address _userAddress) {
        if (
            registeredAdmins[_userAddress].userAddress !=
            0x0000000000000000000000000000000000000000
        ) {
            revert("User is Already a Admin");
        }
        _;
    }

    // Issuers
    // Issuer Only Action
    modifier onlyIssuer() {
        require(
            registeredIssuers[msg.sender].orgAddress !=
                0x0000000000000000000000000000000000000000,
            "Access Denied"
        ); // Not Registered as Issuer
        _;
    }

    // Pass: User is not Issuer
    modifier alreadyRegisteredIssuer(address _orgAddress) {
        if (
            registeredIssuers[_orgAddress].orgAddress !=
            0x0000000000000000000000000000000000000000
        ) {
            revert("User is Already a Issuer");
        }
        _;
    }

    // events
    event AdminRegisteredEvent(string _firstName, address indexed _useraddress);
    event AdminDeletedEvent(string _firstName, address indexed _useraddress);

    event IssuerRegisteredEvent(string _orgName, address indexed _useraddress);

    // functions
    // Add an Admin
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

    // Delete an Admin
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

    // Get all Admins
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

    // Get a single Admin by address
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

    // Update Master Key of Owner on CONTRACT DEPLOYMENT
    function updateMasterKey(string memory _masterKey) public onlyOwner {
        require(
            keccak256(bytes(registeredAdmins[msg.sender].masterKey)) ==
                keccak256(bytes("Pinaki")),
            "Action Denied"
        );
        registeredAdmins[msg.sender].masterKey = _masterKey;
    }

    // Add a new Issuer (Admin Only action)
    function addIssuer(string memory _orgName, string memory _email, address _orgAddress, string memory _masterKey) public onlyAdmin alreadyRegisteredIssuer(_orgAddress) alreadyRegisteredAdmin(_orgAddress) {
        Issuer memory newIssuer = Issuer(
            _orgName,
            _email,
            _orgAddress,
            _masterKey
        );
        registeredIssuers[_orgAddress] = newIssuer;
        registeredIssuersAddresses.push(_orgAddress);
        emit IssuerRegisteredEvent(_orgName, _orgAddress);
    }

    // Get list of all Issuers
    function allIssuers()
        public
        view
        returns (
            string[] memory,
            string[] memory,
            address[] memory
        )
    {
        uint256 issuerCount = registeredIssuersAddresses.length;
        string[] memory _orgName = new string[](issuerCount);
        string[] memory _email = new string[](issuerCount);
        address[] memory _orgAddress = new address[](issuerCount);
        for (uint256 i = 0; i < issuerCount; i++) {
            _orgName[i] = registeredIssuers[registeredIssuersAddresses[i]]
                .orgName;
            _email[i] = registeredIssuers[registeredIssuersAddresses[i]].email;
            _orgAddress[i] = registeredIssuers[registeredIssuersAddresses[i]]
                .orgAddress;
        }
        return (_orgName, _email, _orgAddress);
    }

    // Get a single Issuer by address
    function singleIssuer(address _orgAddress)
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        require(
            registeredIssuers[_orgAddress].orgAddress !=
                0x0000000000000000000000000000000000000000,
            "Not a valid Issuer"
        );
        string memory _orgName = registeredIssuers[_orgAddress].orgName;
        string memory _email = registeredIssuers[_orgAddress].email;
        string memory _masterKey = registeredIssuers[_orgAddress].masterKey;
        return (_orgName, _email, _masterKey);
    }

    // Get the count of Issuers
    function issuersCount() public view returns (uint256) {
        return registeredIssuersAddresses.length;
    }
}
