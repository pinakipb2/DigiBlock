const DigiBlock = artifacts.require('./DigiBlock.sol');
const { assert } = require('chai');

contract('DigiBlock (Modifier Functions)', (accounts) => {
  const contractOwner = accounts[0];
  const admin = [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]];
  const user = [accounts[6], accounts[7], accounts[8], accounts[9], accounts[10]];
  const issuer = [accounts[11], accounts[12], accounts[13], accounts[14], accounts[15]];
  const requestor = [accounts[16], accounts[17], accounts[18], accounts[19], accounts[20]];
  const PREFIX = 'Returned error: VM Exception while processing transaction: ';
  const web3ErrorMessage = (errType, reason) => {
    return PREFIX + errType + ' ' + reason + ' -- ' + 'Reason given: ' + reason + '.';
  };
  let DigiBlockInstance;
	beforeEach(async () => {
		DigiBlockInstance = await DigiBlock.deployed();
	});
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
      // function Admin(firstName, lastName, email, masterKey) {
      //   (this.firstName = firstName), (this.lastName = lastName), (this.email = email), (this.masterKey = masterKey);
      // }
      await DigiBlockInstance.singleAdmin.call(contractOwner, (err, result) => {
        if (!err) {
          assert(result[0] === 'Pinaki', 'First Name is not set properly');
          assert(result[1] === 'Bhattacharjee', 'Last Name is not set properly');
          assert(result[2] === 'pinakipb2@gmail.com', 'Email is not set properly');
          assert(result[3] === 'Pinaki', 'Master Key is not set properly');
          // const me = new Admin(result[0], result[1], result[2], result[3]);
          // console.table(me);
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('Adding test accounts', () => {
    it('Adding admin', async () => {
      await DigiBlockInstance.addAdmin('Admin', '0', 'admin0@gmail.com', admin[0], 'MKey', { from: contractOwner });
      await DigiBlockInstance.singleAdmin.call(admin[0], (err, result) => {
        if (!err) {
          assert(result[0] === 'Admin', 'First Name is not set properly');
          assert(result[1] === '0', 'Last Name is not set properly');
          assert(result[2] === 'admin0@gmail.com', 'Email is not set properly');
          assert(result[3] === 'MKey', 'Master Key is not set properly');
        } else {
          console.log(err);
        }
      });
    });
    it('Adding user', async () => {
      await DigiBlockInstance.addUser('User', '0', 'user0@gmail.com', user[0], { from: contractOwner });
      await DigiBlockInstance.singleUser.call(user[0], (err, result) => {
        if (!err) {
          assert(result[0] === 'User', 'First Name is not set properly');
          assert(result[1] === '0', 'Last Name is not set properly');
          assert(result[2] === 'user0@gmail.com', 'Email is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.usersCount.call((err, result) => {
        if(!err) {
          assert(result === '1', 'Error in user count');
        } else {
          console.log(err);
        }
      });
    });
    it('Adding issuer & onlyAdmin check', async () => {
      try {
        await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', issuer[0], 'MKey', ['A', 'B'], { from: admin[1] });
      } catch (err) {
        assert(err.message === "Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.");
      }
      
      await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', issuer[0], 'MKey', ['A', 'B'], { from: admin[0] });
      await DigiBlockInstance.singleIssuer.call(issuer[0], (err, result) => {
        if (!err) {
          assert(result[0] === 'Issuer0', 'Org Name is not set properly');
          assert(result[1] === 'issuer0@gmail.com', 'Email is not set properly');
          assert(result[2] === 'MKey', 'Master Key is not set properly');
          assert(result[3].length === 2, 'DocumentType length does not match');
          assert(result[3][0] === 'A', 'First docType does not match');
          assert(result[3][1] === 'B', 'Second docType does not match');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.issuersCount.call((err, result) => {
        if(!err) {
          assert(result === '1', 'Error in issuer count');
        } else {
          console.log(err);
        }
      });
    });
    it('Adding requestor', async () => {
      await DigiBlockInstance.addRequestor('Requestor0', 'requestor0@gmail.com', requestor[0], { from: contractOwner });
      await DigiBlockInstance.singleRequestor.call(requestor[0], (err, result) => {
        if (!err) {
          assert(result[0] === 'Requestor0', 'Org Name is not set properly');
          assert(result[1] === 'requestor0@gmail.com', 'Email is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.requestorsCount.call((err, result) => {
        if(!err) {
          assert(result === '1', 'Error in requestor count');
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('onlyOwner', () => {
    it('onlyOwner', async () => {
      await DigiBlockInstance.addAdmin('Admin', '1', 'admin1@gmail.com', admin[1], 'MKey', { from: contractOwner });
      try {
        await DigiBlockInstance.deleteAdmin(admin[1], { from: admin[4] });
      } catch (err) {
        const errType = 'revert';
        const reason = 'Access Denied';
        assert(err.message === web3ErrorMessage(errType, reason), 'Got: ' + err.message);
      }
      await DigiBlockInstance.singleAdmin.call(admin[1], (err, result) => {
        if (!err) {
          assert(result[0] === 'Admin', 'First Name is not set properly');
          assert(result[1] === '1', 'Last Name is not set properly');
          assert(result[2] === 'admin1@gmail.com', 'Email is not set properly');
          assert(result[3] === 'MKey', 'Master Key is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.deleteAdmin(admin[1], { from: contractOwner });
      try {
        await DigiBlockInstance.singleAdmin.call(admin[1]);
      } catch (err) {
        assert(err.message === "Returned error: VM Exception while processing transaction: revert Invalid Admin");
      }
    });
  });
});