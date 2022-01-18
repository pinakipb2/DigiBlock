// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract DigiBlock {
    // global variables
    address public immutable owner;

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
    }

    // Function to comapre two strings
    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(bytes(a)) == keccak256(bytes(b)));
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
        string docType;
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
        string[] docTypes;
    }

    // Requestor structure
    struct Requestor {
        string orgName;
        string email;
        address orgAddress;
    }

    // Request a document structure
    struct RequestedDocument {
        docAccessStatus status;
        address from;
        address to;
        string ipfsHash;
        string docType;
        uint256 timestamp;
    }

    // enums
    enum docAccessStatus {
        PENDING,
        ACCEPTED,
        REJECTED,
        REVOKED
    }

    // mappings
    mapping(address => Admin) registeredAdmins;
    mapping(address => Issuer) registeredIssuers;
    mapping(address => User) registeredUsers;
    mapping(address => Document[]) issuedDocuments;
    mapping(address => Document[]) issuedDocsByIssuer;
    mapping(address => Requestor) registeredRequestors;
    mapping(address => RequestedDocument[]) requestedDocuments;
    mapping(address => RequestedDocument[]) requestedDocsByRequestor;

    // arrays
    address[] registeredAdminsAddresses;
    address[] registeredIssuersAddresses;
    address[] registeredUsersAddresses;
    address[] registeredRequestorsAddresses;

    // count variables
    uint256 totalIssuedDocuments;
    uint256 totalRequestedDocuments;

    uint256 totalRequestedPendingDocuments;
    uint256 totalRequestedAcceptedDocuments;
    uint256 totalRequestedRejectedDocuments;
    uint256 totalRequestedRevokedDocuments;

    // modifier functions
    // Owner Only Action
    function onlyOwner(address _owner) internal view {
        require(_owner == owner, "Access Denied");
    }

    // Admin Only Action
    function onlyAdmin() internal view {
        require(
            registeredAdmins[msg.sender].userAddress != address(0),
            "Access Denied"
        ); // Not Registered as Admin
    }

    // Pass: User is not Admin
    function alreadyRegisteredAdmin(address _userAddress) internal view {
        if (registeredAdmins[_userAddress].userAddress != address(0)) {
            revert("User Already Admin");
        }
    }

    // Issuers
    // Issuer Only Action
    function onlyIssuer() internal view {
        require(
            registeredIssuers[msg.sender].orgAddress != address(0),
            "Access Denied"
        ); // Not Registered as Issuer
    }

    // Pass: User is not Issuer
    function alreadyRegisteredIssuer(address _orgAddress) internal view {
        if (registeredIssuers[_orgAddress].orgAddress != address(0)) {
            revert("Already Registered");
        }
    }

    // Users
    // User Only Action
    function onlyUser() internal view {
        require(
            registeredUsers[msg.sender].userAddress != address(0),
            "Access Denied"
        ); // Not Registered as User
    }

    // Pass: User is not User
    function alreadyRegisteredUser(address _userAddress) internal view {
        if (registeredUsers[_userAddress].userAddress != address(0)) {
            revert("Already Registered");
        }
    }

    // Requestor
    // Requestor Only Action
    function onlyRequestor() internal view {
        require(
            registeredRequestors[msg.sender].orgAddress != address(0),
            "Access Denied"
        ); // Not Registered as Requestor
    }

    // Pass: User is not Requestor
    function alreadyRegisteredRequestor(address _orgAddress) internal view {
        if (registeredRequestors[_orgAddress].orgAddress != address(0)) {
            revert("Already Registered");
        }
    }

    // events
    // event AdminRegisteredEvent(string _firstName, address indexed _useraddress);
    // event AdminDeletedEvent(string _firstName, address indexed _useraddress);

    // event IssuerRegisteredEvent(string _orgName, address indexed _orgaddress);

    // event UserRegisteredEvent(string _firstName, address indexed _useraddress);

    // event RequestorRegisteredEvent(string _orgName, address indexed _orgAddress);

    event DocumentStatusChange(
        address indexed _from,
        address _to,
        string _docType,
        uint256 _status,
        uint256 _timestamp
    );

    // functions
    // Add an Admin
    function addAdmin(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        address _userAddress,
        string memory _masterKey
    ) external {
        onlyAdmin();
        alreadyRegisteredAdmin(_userAddress);
        alreadyRegisteredIssuer(_userAddress);
        alreadyRegisteredUser(_userAddress);
        alreadyRegisteredRequestor(_userAddress);
        Admin memory newAdmin = Admin(
            _firstName,
            _lastName,
            _email,
            _userAddress,
            _masterKey
        );
        registeredAdmins[_userAddress] = newAdmin;
        registeredAdminsAddresses.push(_userAddress);
    }

    // Delete an Admin
    function deleteAdmin(address _userAddress) external {
        onlyOwner(msg.sender);
        require(_userAddress != owner, "Access Denied");
        require(
            registeredAdmins[_userAddress].userAddress != address(0),
            "Invalid Admin"
        );
        delete registeredAdmins[_userAddress];
        uint256 index = 0;
        while (registeredAdminsAddresses[index] != _userAddress) {
            index++;
        }
        require(
            index < registeredAdminsAddresses.length,
            "Failed"
        );
        registeredAdminsAddresses[index] = registeredAdminsAddresses[
            registeredAdminsAddresses.length - 1
        ];
        registeredAdminsAddresses.pop();
    }

    // Get all Admins
    function allAdmins()
        external
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
            Admin storage currentAdmin = registeredAdmins[
                registeredAdminsAddresses[i]
            ];
            _firstName[i] = currentAdmin.firstName;
            _lastName[i] = currentAdmin.lastName;
            _email[i] = currentAdmin.email;
            _userAddress[i] = currentAdmin.userAddress;
        }
        return (_firstName, _lastName, _email, _userAddress);
    }

    // Get a single Admin by address
    function singleAdmin(address _userAddress)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(
            registeredAdmins[_userAddress].userAddress != address(0),
            "Invalid Admin"
        );
        Admin storage currentAdmin = registeredAdmins[_userAddress];
        string memory _firstName = currentAdmin.firstName;
        string memory _lastName = currentAdmin.lastName;
        string memory _email = currentAdmin.email;
        string memory _masterKey = currentAdmin.masterKey;
        return (_firstName, _lastName, _email, _masterKey);
    }

    // Update Master Key of Owner on CONTRACT DEPLOYMENT
    function updateMasterKey(string memory _masterKey) external {
        onlyOwner(msg.sender);
        require(
            compareStrings(registeredAdmins[msg.sender].masterKey, "Pinaki"),
            "Action Denied"
        );
        registeredAdmins[msg.sender].masterKey = _masterKey;
    }

    // Add a new Issuer (Admin Only action)
    function addIssuer(
        string memory _orgName,
        string memory _email,
        address _orgAddress,
        string memory _masterKey,
        string[] memory _docTypes
    ) external {
        onlyAdmin();
        alreadyRegisteredIssuer(_orgAddress);
        alreadyRegisteredAdmin(_orgAddress);
        alreadyRegisteredUser(_orgAddress);
        alreadyRegisteredRequestor(_orgAddress);
        Issuer memory newIssuer = Issuer(
            _orgName,
            _email,
            _orgAddress,
            _masterKey,
            _docTypes
        );
        registeredIssuers[_orgAddress] = newIssuer;
        registeredIssuersAddresses.push(_orgAddress);
    }

    // Get a single Issuer by address
    function singleIssuer(address _orgAddress)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string[] memory
        )
    {
        require(
            registeredIssuers[_orgAddress].orgAddress != address(0),
            "Invalid Issuer"
        );
        Issuer storage currentIssuer = registeredIssuers[_orgAddress];
        string memory _orgName = currentIssuer.orgName;
        string memory _email = currentIssuer.email;
        string memory _masterKey = currentIssuer.masterKey;
        string[] memory _docTypes = currentIssuer.docTypes;
        return (_orgName, _email, _masterKey, _docTypes);
    }

    // Get the count of Issuers
    function issuersCount() external view returns (uint256) {
        return registeredIssuersAddresses.length;
    }

    // Add a new User
    function addUser(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        address _userAddress
    ) external {
        alreadyRegisteredUser(_userAddress);
        alreadyRegisteredIssuer(_userAddress);
        alreadyRegisteredAdmin(_userAddress);
        alreadyRegisteredRequestor(_userAddress);
        User memory newUser = User(_firstName, _lastName, _email, _userAddress);
        registeredUsers[_userAddress] = newUser;
        registeredUsersAddresses.push(_userAddress);
    }

    // Get a single User by address
    function singleUser(address _userAddress)
        external
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        require(
            registeredUsers[_userAddress].userAddress != address(0),
            "Invalid User"
        );
        User storage currentUser = registeredUsers[_userAddress];
        string memory _firstName = currentUser.firstName;
        string memory _lastName = currentUser.lastName;
        string memory _email = currentUser.email;
        return (_firstName, _lastName, _email);
    }

    // Get the count of Users
    function usersCount() external view returns (uint256) {
        return registeredUsersAddresses.length;
    }

    // Issue a document to User
    function issueDocument(
        address _to,
        string memory _ipfsHash,
        string memory _docType
    ) external {
        onlyIssuer();
        // _to must be a User
        require(registeredUsers[_to].userAddress != address(0), "Invalid User");
        // _to must not be issued this docType before
        uint256 userIssuedDocsCount = issuedDocuments[_to].length;
        for (uint256 i = 0; i < userIssuedDocsCount; i++) {
            if (compareStrings(issuedDocuments[_to][i].docType, _docType)) {
                revert("Access Denied");
            }
        }
        Document memory newDocument = Document(
            msg.sender,
            _to,
            _ipfsHash,
            _docType,
            block.timestamp
        );
        issuedDocuments[_to].push(newDocument);
        issuedDocsByIssuer[msg.sender].push(newDocument);
        ++totalIssuedDocuments;
    }

    // Issued documents by a Issuer
    function getDocsIssuedByIssuer(address _orgAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        // onlyIssuer();
        uint256 docsIssued = issuedDocsByIssuer[_orgAddress].length;
        address[] memory _to = new address[](docsIssued);
        string[] memory _ipfsHash = new string[](docsIssued);
        string[] memory _docType = new string[](docsIssued);
        uint256[] memory _timeStamp = new uint256[](docsIssued);
        for (uint256 i = 0; i < docsIssued; i++) {
            Document storage currentDoc = issuedDocsByIssuer[_orgAddress][i];
            _to[i] = currentDoc.to;
            _ipfsHash[i] = currentDoc.ipfsHash;
            _docType[i] = currentDoc.docType;
            _timeStamp[i] = currentDoc.timestamp;
        }
        return (_to, _ipfsHash, _docType, _timeStamp);
    }

    // Is User Verified (pass : if one or more docs issued)
    function isUserVerified(address _userAddress) external view returns (bool) {
        if (issuedDocuments[_userAddress].length > 0) return true;
        return false;
    }

    // get all Documents issued to a User
    function getAllDocuments(address _userAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        uint256 issuedDocs = issuedDocuments[_userAddress].length;
        address[] memory _from = new address[](issuedDocs);
        string[] memory _ipfsHash = new string[](issuedDocs);
        string[] memory _docType = new string[](issuedDocs);
        uint256[] memory _timeStamp = new uint256[](issuedDocs);
        for (uint256 i = 0; i < issuedDocs; i++) {
            Document storage currentDoc = issuedDocuments[_userAddress][i];
            _from[i] = currentDoc.from;
            _ipfsHash[i] = currentDoc.ipfsHash;
            _docType[i] = currentDoc.docType;
            _timeStamp[i] = currentDoc.timestamp;
        }
        return (_from, _ipfsHash, _docType, _timeStamp);
    }

    // Add a new Requestor
    function addRequestor(
        string memory _orgName,
        string memory _email,
        address _orgAddress
    ) external {
        alreadyRegisteredUser(_orgAddress);
        alreadyRegisteredIssuer(_orgAddress);
        alreadyRegisteredAdmin(_orgAddress);
        alreadyRegisteredRequestor(_orgAddress);
        Requestor memory newRequestor = Requestor(
            _orgName,
            _email,
            _orgAddress
        );
        registeredRequestors[_orgAddress] = newRequestor;
        registeredRequestorsAddresses.push(_orgAddress);
    }

    // Get a single Requestor by address
    function singleRequestor(address _orgAddress)
        external
        view
        returns (string memory, string memory)
    {
        require(
            registeredRequestors[_orgAddress].orgAddress != address(0),
            "Invalid Requestor"
        );
        Requestor storage currentRequestor = registeredRequestors[_orgAddress];
        string memory _orgName = currentRequestor.orgName;
        string memory _email = currentRequestor.email;
        return (_orgName, _email);
    }

    // Get the count of Requestors
    function requestorsCount() external view returns (uint256) {
        return registeredRequestorsAddresses.length;
    }

    // Requestor request document by User then by docType
    function requestDocumentFromUser(
        address _userAddress,
        string memory _docType
    ) external {
        onlyRequestor();
        require(
            registeredUsers[_userAddress].userAddress != address(0),
            "Invalid User"
        );
        uint256 userIssuedDocsCount = issuedDocuments[_userAddress].length;
        bool isDoc = false;
        Document memory currentDoc;
        for (uint256 i = 0; i < userIssuedDocsCount; i++) {
            if (
                compareStrings(
                    issuedDocuments[_userAddress][i].docType,
                    _docType
                )
            ) {
                currentDoc = issuedDocuments[_userAddress][i];
                isDoc = true;
                break;
            }
        }
        if (!isDoc) revert("Doc not Found");
        RequestedDocument memory newRequestedDoc = RequestedDocument(
            docAccessStatus(0),
            msg.sender,
            _userAddress,
            currentDoc.ipfsHash,
            currentDoc.docType,
            block.timestamp
        );
        requestedDocuments[_userAddress].push(newRequestedDoc);
        requestedDocsByRequestor[msg.sender].push(newRequestedDoc);
        ++totalRequestedDocuments;
        ++totalRequestedPendingDocuments;
        emit DocumentStatusChange(
            msg.sender,
            _userAddress,
            _docType,
            0,
            block.timestamp
        );
    }

    // user show all requested pending documents
    function getUserPendingDocuments(address _userAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _from = new address[](totalRequestedPendingDocuments);
        string[] memory _docType = new string[](totalRequestedPendingDocuments);
        uint256[] memory _timestamp = new uint256[](
            totalRequestedPendingDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocuments[_userAddress][i].status) == 0) {
                _from[j] = requestedDocuments[_userAddress][i].from;
                _docType[j] = requestedDocuments[_userAddress][i].docType;
                _timestamp[j] = requestedDocuments[_userAddress][i].timestamp;
                ++j;
            }
        }
        return (_from, _docType, _timestamp);
    }

    // user show all requested accepted documents
    function getUserAcceptedDocuments(address _userAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _from = new address[](totalRequestedAcceptedDocuments);
        string[] memory _docType = new string[](
            totalRequestedAcceptedDocuments
        );
        uint256[] memory _timestamp = new uint256[](
            totalRequestedAcceptedDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocuments[_userAddress][i].status) == 1) {
                _from[j] = requestedDocuments[_userAddress][i].from;
                _docType[j] = requestedDocuments[_userAddress][i].docType;
                _timestamp[j] = requestedDocuments[_userAddress][i].timestamp;
                ++j;
            }
        }
        return (_from, _docType, _timestamp);
    }

    // user show all requested rejected documents
    function getUserRejectedDocuments(address _userAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _from = new address[](totalRequestedRejectedDocuments);
        string[] memory _docType = new string[](
            totalRequestedRejectedDocuments
        );
        uint256[] memory _timestamp = new uint256[](
            totalRequestedRejectedDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocuments[_userAddress][i].status) == 2) {
                _from[j] = requestedDocuments[_userAddress][i].from;
                _docType[j] = requestedDocuments[_userAddress][i].docType;
                _timestamp[j] = requestedDocuments[_userAddress][i].timestamp;
                ++j;
            }
        }
        return (_from, _docType, _timestamp);
    }

    // user show all requested revoked documents
    function getUserRevokedDocuments(address _userAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _from = new address[](totalRequestedRevokedDocuments);
        string[] memory _docType = new string[](totalRequestedRevokedDocuments);
        uint256[] memory _timestamp = new uint256[](
            totalRequestedRevokedDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocuments[_userAddress][i].status) == 3) {
                _from[j] = requestedDocuments[_userAddress][i].from;
                _docType[j] = requestedDocuments[_userAddress][i].docType;
                _timestamp[j] = requestedDocuments[_userAddress][i].timestamp;
                ++j;
            }
        }
        return (_from, _docType, _timestamp);
    }

    // Requestor show all requested pending documents
    function getRequestorPendingDocuments(address _orgAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _to = new address[](totalRequestedPendingDocuments);
        string[] memory _docType = new string[](totalRequestedPendingDocuments);
        uint256[] memory _timestamp = new uint256[](
            totalRequestedPendingDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocsByRequestor[_orgAddress][i].status) == 0) {
                _to[j] = requestedDocsByRequestor[_orgAddress][i].to;
                _docType[j] = requestedDocsByRequestor[_orgAddress][i].docType;
                _timestamp[j] = requestedDocsByRequestor[_orgAddress][i]
                    .timestamp;
                ++j;
            }
        }
        return (_to, _docType, _timestamp);
    }

    // Requestor show all requested accepted documents
    function getRequestorAcceptedDocuments(address _orgAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _to = new address[](totalRequestedAcceptedDocuments);
        string[] memory _docType = new string[](
            totalRequestedAcceptedDocuments
        );
        string[] memory _ipfsHash = new string[](
            totalRequestedAcceptedDocuments
        );
        uint256[] memory _timestamp = new uint256[](
            totalRequestedAcceptedDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocsByRequestor[_orgAddress][i].status) == 1) {
                _to[j] = requestedDocsByRequestor[_orgAddress][i].to;
                _docType[j] = requestedDocsByRequestor[_orgAddress][i].docType;
                _ipfsHash[j] = requestedDocsByRequestor[_orgAddress][i]
                    .ipfsHash;
                _timestamp[j] = requestedDocsByRequestor[_orgAddress][i]
                    .timestamp;
                ++j;
            }
        }
        return (_to, _docType, _ipfsHash, _timestamp);
    }

    // Requestor show all requested rejected documents
    function getRequestorRejectedDocuments(address _orgAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _to = new address[](totalRequestedRejectedDocuments);
        string[] memory _docType = new string[](
            totalRequestedRejectedDocuments
        );
        uint256[] memory _timestamp = new uint256[](
            totalRequestedRejectedDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocsByRequestor[_orgAddress][i].status) == 2) {
                _to[j] = requestedDocsByRequestor[_orgAddress][i].to;
                _docType[j] = requestedDocsByRequestor[_orgAddress][i].docType;
                _timestamp[j] = requestedDocsByRequestor[_orgAddress][i]
                    .timestamp;
                ++j;
            }
        }
        return (_to, _docType, _timestamp);
    }

    // Requestor show all requested revoked documents
    function getRequestorRevokedDocuments(address _orgAddress)
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        address[] memory _to = new address[](totalRequestedRevokedDocuments);
        string[] memory _docType = new string[](totalRequestedRevokedDocuments);
        uint256[] memory _timestamp = new uint256[](
            totalRequestedRevokedDocuments
        );
        uint256 j = 0;
        for (uint256 i = 0; i < totalRequestedDocuments; i++) {
            if (uint8(requestedDocsByRequestor[_orgAddress][i].status) == 3) {
                _to[j] = requestedDocsByRequestor[_orgAddress][i].to;
                _docType[j] = requestedDocsByRequestor[_orgAddress][i].docType;
                _timestamp[j] = requestedDocsByRequestor[_orgAddress][i]
                    .timestamp;
                ++j;
            }
        }
        return (_to, _docType, _timestamp);
    }

    // User change status (_from -> requestor)
    function changeDocumentStatus(
        address _from,
        address _to,
        string memory _docType,
        uint256 _timestamp,
        uint256 _prevStatus,
        uint256 _nextStatus
    ) external {
        onlyUser();
        require(registeredUsers[_to].userAddress != address(0), "Invalid User");
        require(
            registeredRequestors[_from].orgAddress != address(0),
            "Invalid Requestor"
        );
        if (
            (_prevStatus < 0 || _prevStatus > 3) ||
            (_nextStatus < 0 || _nextStatus > 3) ||
            (_prevStatus == _nextStatus)
        ) revert("Action Denied");
        if (_prevStatus == 0 && _nextStatus == 3)
            revert("Action Denied");
        if (_prevStatus == 1 && _nextStatus != 3)
            revert("Action Denied");
        if (_prevStatus == 2 || _prevStatus == 3)
            revert("Action Denied");
        RequestedDocument[] storage requestedToUserDocs = requestedDocuments[
            _to
        ];
        RequestedDocument[]
            storage requestedByRequestorDocs = requestedDocsByRequestor[_from];
        uint256 totalDocs = requestedToUserDocs.length;
        for (uint256 i = 0; i < totalDocs; i++) {
            if (
                requestedToUserDocs[i].from == _from &&
                requestedToUserDocs[i].timestamp == _timestamp &&
                uint256(requestedToUserDocs[i].status) == _prevStatus
            ) {
                if (uint256(requestedToUserDocs[i].status) == 0)
                    --totalRequestedPendingDocuments;
                else if (uint256(requestedToUserDocs[i].status) == 1)
                    --totalRequestedAcceptedDocuments;
                if (_nextStatus == 1) ++totalRequestedAcceptedDocuments;
                else if (_nextStatus == 2) ++totalRequestedRejectedDocuments;
                else if (_nextStatus == 3) ++totalRequestedRevokedDocuments;
                requestedToUserDocs[i].status = docAccessStatus(_nextStatus);
                break;
            }
        }
        totalDocs = requestedByRequestorDocs.length;
        for (uint256 i = 0; i < totalDocs; i++) {
            if (
                requestedByRequestorDocs[i].to == _to &&
                requestedByRequestorDocs[i].timestamp == _timestamp &&
                uint256(requestedByRequestorDocs[i].status) == _prevStatus
            ) {
                requestedByRequestorDocs[i].status = docAccessStatus(
                    _nextStatus
                );
                break;
            }
        }
        emit DocumentStatusChange(
            _from,
            _to,
            _docType,
            _nextStatus,
            _timestamp
        );
    }
}
