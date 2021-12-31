const DigiBlock = artifacts.require('./DigiBlock.sol');
const { assert } = require('chai');

contract('DigiBlock', (accounts) => {
  const contractOwner = accounts[0];
  const admin = [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]];
  const issuer = [accounts[6], accounts[7], accounts[8], accounts[9], accounts[10]];
  let DigiBlockInstance;
  const PREFIX = 'Returned error: VM Exception while processing transaction: ';
  beforeEach(async () => {
    DigiBlockInstance = await DigiBlock.deployed();
  });
  const checkAllAdminsCount = async (cnt) => {
    await DigiBlockInstance.allAdmins.call((err, result) => {
      if (!err) {
        assert(result[0].length === cnt, 'Array length is not proper');
        assert(result[1].length === cnt, 'Array length is not proper');
        assert(result[2].length === cnt, 'Array length is not proper');
        assert(result[3].length === cnt, 'Array length is not proper');
      } else {
        console.log(err);
      }
    });
  };
  const checkAllIssuersCount = async (cnt) => {
    await DigiBlockInstance.issuersCount.call((err, result) => {
      if (!err) {
        assert(result === cnt.toString(), 'Issuers Array is not of correct length');
      } else {
        console.log(err);
      }
    });
  };
  const web3ErrorMessage = (errType, reason) => {
    return PREFIX + errType + ' ' + reason + ' -- ' + 'Reason given: ' + reason + '.';
  };
  describe('Deployment', () => {
    it('should deploy smart contract properly', async () => {
      // console.log('Contract at : ' + DigiBlockInstance.address);
      // console.log('Owner : ' + contractOwner);
      assert(DigiBlockInstance.address !== '', 'Contract not deployed correctly');
    });
    it('should set the right owner', async () => {
      const owner = await DigiBlockInstance.owner.call();
      // console.log('Owner in smart contract is : ' + owner);
      assert(owner === contractOwner, 'Owner is not set properly');
    });
    it('validating first admin registration in constructor', async () => {
      function Admin(firstName, lastName, email, userAddress, masterKey) {
        (this.firstName = firstName), (this.lastName = lastName), (this.email = email), (this.userAddress = userAddress), (this.masterKey = masterKey);
      }
      await DigiBlockInstance.registeredAdmins.call(contractOwner, (err, result) => {
        if (!err) {
          assert(result.firstName === 'Pinaki', 'First Name is not set properly');
          assert(result.lastName === 'Bhattacharjee', 'Last Name is not set properly');
          assert(result.email === 'pinakipb2@gmail.com', 'Last Name is not set properly');
          assert(result.userAddress === contractOwner, 'Account Address is not set properly');
          assert(result.masterKey === 'Pinaki', 'Master Key is not set properly');
          const me = new Admin(result.firstName, result.lastName, result.email, result.userAddress, result.masterKey);
          // console.table(me);
        } else {
          console.log(err);
        }
      });
    });
    it('should return first admin from array', async () => {
      await DigiBlockInstance.allAdmins.call((err, result) => {
        if (!err) {
          checkAllAdminsCount(1);
          assert(result[0][0] === 'Pinaki', 'First Name is not set properly');
          assert(result[1][0] === 'Bhattacharjee', 'Last Name is not set properly');
          assert(result[2][0] === 'pinakipb2@gmail.com', 'Email is not set properly');
          assert(result[3][0] === contractOwner, 'Account Address is not set properly');
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('addAdmin functionality', () => {
    it('owner cannot addAdmin itself', async () => {
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', contractOwner, 'MKey', { from: contractOwner });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Admin';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(1);
    });
    it('owner can addAdmin non-admin', async () => {
      await DigiBlockInstance.addAdmin('User', '0', 'user0@gmail.com', admin[0], 'MKey', { from: contractOwner });
      checkAllAdminsCount(2);
    });
    it('owner again cannot addAdmin already admin-user', async () => {
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', admin[0], 'MKey', { from: contractOwner });
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Admin';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('admin cannot addAdmin itself', async () => {
      // Now admin[0] is an admin
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', admin[0], 'MKey', { from: admin[0] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Admin';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
    });
    it('admin cannot addAdmin owner', async () => {
      // Now admin[0] is an admin
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', contractOwner, 'MKey', { from: admin[0] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Admin';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('admin can addAdmin non-admin', async () => {
      await DigiBlockInstance.addAdmin('User', '1', 'user1@gmail.com', admin[1], 'MKey', { from: admin[0] });
      checkAllAdminsCount(3);
    });
    it('non-admin cannot addAdmin owner', async () => {
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', contractOwner, 'MKey', { from: admin[2] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(3);
    });
    it('non-admin cannot addAdmin an admin', async () => {
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', admin[0], 'MKey', { from: admin[2] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(3);
    });
    it('non-admin cannot addAdmin non-admin', async () => {
      try {
        await DigiBlockInstance.addAdmin('Fname', 'Lname', 'Email', admin[3], 'MKey', { from: admin[2] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(3);
    });
    it('getting all(3) Admins', async () => {
      function Admin(firstName, lastName, email, userAddress) {
        (this.firstName = firstName), (this.lastName = lastName), (this.email = email), (this.userAddress = userAddress);
      }
      checkAllAdminsCount(3);
      await DigiBlockInstance.allAdmins.call((err, result) => {
        if (!err) {
          var admins = {};
          admins.one = new Admin(result[0][0], result[0][1], result[0][2], result[0][3]);
          admins.two = new Admin(result[1][0], result[1][1], result[1][2], result[0][3]);
          admins.three = new Admin(result[2][0], result[2][1], result[2][2], result[0][3]);
          // console.table(admins);
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('deleteAdmin functionality', () => {
    it('owner cannot deleteAdmin itself', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: contractOwner });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(3);
    });
    it('owner can deleteAdmin an admin', async () => {
      await DigiBlockInstance.deleteAdmin(admin[1], { from: contractOwner });
      checkAllAdminsCount(2);
    });
    it('owner cannot deleteAdmin a non-admin', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[4], { from: contractOwner });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Not a valid Admin';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('admin cannot deleteAdmin owner', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: admin[0] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('admin cannot deleteAdmin itself', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[0], { from: admin[0] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('admin cannot deleteAdmin an admin', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[0], { from: admin[0] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('admin cannot deleteAdmin a non-admin', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[4], { from: admin[0] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('non-admin cannot deleteAdmin owner', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: admin[4] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('non-admin cannot deleteAdmin itself', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[4], { from: admin[4] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('non-admin cannot deleteAdmin an admin', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[0], { from: admin[4] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('non-admin cannot deleteAdmin a non-admin', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[3], { from: admin[4] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
  });
  describe('singleAdmin functionality', () => {
    it('fetching a single admin details', async () => {
      try {
        const adminDetails = await DigiBlockInstance.singleAdmin(admin[0], { from: admin[4] });
        assert(adminDetails[0] === 'User', 'First Name is not returned Properly');
        assert(adminDetails[1] === '0', 'Last Namae is not returned Properly');
        assert(adminDetails[2] === 'user0@gmail.com', 'Email is not returned Properly');
        assert(adminDetails[3] === 'MKey', 'Master Key is not returned Properly');
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Not a valid Admin');
      }
      checkAllAdminsCount(2);
    });
    it('should get error if fetching a single non-admin details', async () => {
      try {
        await DigiBlockInstance.singleAdmin(admin[4], { from: admin[1] });
        throw null;
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Not a valid Admin');
      }
      checkAllAdminsCount(2);
    });
  });
  describe('updateMasterKey functionality', () => {
    it('update master key of owner', async () => {
      try {
        await DigiBlockInstance.updateMasterKey('NewMasterKey', { from: contractOwner });
        const adminDetails = await DigiBlockInstance.singleAdmin(contractOwner, { from: admin[4] });
        assert(adminDetails[3] === 'NewMasterKey', 'Master Key is updated Properly');
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Not a valid Admin');
      }
      checkAllAdminsCount(2);
    });
    it('should get error if called from admin account', async () => {
      try {
        await DigiBlockInstance.updateMasterKey('NewMasterKey', { from: admin[0] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
    it('should get error if called from non-admin account', async () => {
      try {
        await DigiBlockInstance.updateMasterKey('NewMasterKey', { from: admin[4] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllAdminsCount(2);
    });
  });
  describe('issuersCount functionality', () => {
    it('should return count 0 initially', async () => {
      checkAllIssuersCount(0);
    });
  });
  describe('addIssuer functionality', () => {
    it('should return error if non-admin calls', async () => {
      try {
        await DigiBlockInstance.addIssuer('OrgName', 'Email', issuer[0], 'MKey', { from: admin[4] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
    });
    it('should pass if issuer is added by an Admin', async () => {
      try {
        await DigiBlockInstance.addIssuer('OrgName', 'Email', issuer[0], 'MKey', { from: admin[0] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllIssuersCount(1);
    });
    it('should return error if an existing Issuer is added by an Admin', async () => {
      try {
        await DigiBlockInstance.addIssuer('OrgName', 'Email', issuer[0], 'MKey', { from: admin[0] });
        throw null;
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Issuer';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllIssuersCount(1);
    });
  });
  describe('singleIssuer functionality', () => {
    it('should return error if Issuer does not exists', async () => {
      try {
        await DigiBlockInstance.singleIssuer(issuer[1], { from: admin[0] });
        throw null;
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Not a valid Issuer');
      }
      checkAllIssuersCount(1);
    });
    it('should return details if Issuer exists', async () => {
      try {
        const issuerDetails = await DigiBlockInstance.singleIssuer(issuer[0], { from: admin[0] });
        assert(issuerDetails[0] === 'OrgName', 'Organisation Name is not set Properly');
        assert(issuerDetails[1] === 'Email', 'Email is not set Properly');
        assert(issuerDetails[2] === 'MKey', 'Master Key is not set Properly');
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Issuer';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllIssuersCount(1);
    });
    it('should return details if Issuer exists (2nd call)', async () => {
      try {
        await DigiBlockInstance.addIssuer('OrgName1', 'Email1', issuer[1], 'MKey1', { from: admin[0] });
        const issuerDetails = await DigiBlockInstance.singleIssuer(issuer[1], { from: admin[0] });
        assert(issuerDetails[0] === 'OrgName1', 'Organisation Name is not set Properly');
        assert(issuerDetails[1] === 'Email1', 'Email is not set Properly');
        assert(issuerDetails[2] === 'MKey1', 'Master Key is not set Properly');
      } catch (err) {
        const errType = 'revert';
        const reason = 'User is Already a Issuer';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      checkAllIssuersCount(2);
    });
  });
  describe('allIssuers functionality', () => {
    it('should return all Issuer details', async () => {
      await DigiBlockInstance.allIssuers.call((err, res) => {
        if (!err) {
          assert(res[2][0] === issuer[0], 'Incorrect Details');
          assert(res[2][1] === issuer[1], 'Incorrect Details');
        } else {
          console.log(err);
        }
      });
      checkAllIssuersCount(2);
    });
  });
});
