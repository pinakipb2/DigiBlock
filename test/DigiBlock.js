const DigiBlock = artifacts.require('./DigiBlock.sol');
const { assert } = require('chai');

contract('DigiBlock', (accounts) => {
  const contractOwner = accounts[0];
  const admin = [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]];
  const user = [accounts[6], accounts[7], accounts[8], accounts[9], accounts[10]];
  const issuer = [accounts[11], accounts[12], accounts[13], accounts[14], accounts[15]];
  const requestor = [accounts[16], accounts[17], accounts[18], accounts[19], accounts[20]];
  let timestampA = 0;
  let timestampC = 0;
  let DigiBlockInstance;
  beforeEach(async () => {
    DigiBlockInstance = await DigiBlock.deployed();
  });
  describe('Deployment', () => {
    it('should deploy smart contract properly', async () => {
      assert(DigiBlockInstance.address !== '', 'Contract not deployed correctly');
    });
    it('should set the right owner', async () => {
      const owner = await DigiBlockInstance.owner.call();
      assert(owner === contractOwner, 'Owner is not set properly');
    });
    it('validating first admin registration in constructor', async () => {
      await DigiBlockInstance.singleAdmin.call(contractOwner, (err, result) => {
        if (!err) {
          assert(result[0] === 'Pinaki', 'First Name is not set properly');
          assert(result[1] === 'Bhattacharjee', 'Last Name is not set properly');
          assert(result[2] === 'pinakipb2@gmail.com', 'Email is not set properly');
          assert(result[3] === 'Pinaki', 'Master Key is not set properly');
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
        if (!err) {
          assert(result === '1', 'Error in user count');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.addUser('User', '1', 'user1@gmail.com', user[1], { from: contractOwner });
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
        if (!err) {
          assert(result === '1', 'Error in requestor count');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.addRequestor('Requestor1', 'requestor1@gmail.com', requestor[1], { from: contractOwner });
    });
    it('Adding issuer & onlyAdmin check', async () => {
      try {
        await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', issuer[0], 'MKey', ['A', 'B'], { from: admin[1] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      try {
        await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', admin[0], 'MKey', ['A', 'B'], { from: admin[0] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert User Already Admin -- Reason given: User Already Admin.');
      }
      try {
        await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', user[0], 'MKey', ['A', 'B'], { from: admin[0] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Already Registered -- Reason given: Already Registered.');
      }
      try {
        await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', requestor[0], 'MKey', ['A', 'B'], { from: admin[0] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Already Registered -- Reason given: Already Registered.');
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
      try {
        await DigiBlockInstance.addIssuer('Issuer1', 'issuer1@gmail.com', issuer[0], 'MKey', ['A', 'B'], { from: admin[0] });
      } catch (err) {
        // console.log(err.message);
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Already Registered -- Reason given: Already Registered.');
      }
      await DigiBlockInstance.issuersCount.call((err, result) => {
        if (!err) {
          assert(result === '1', 'Error in issuer count');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.addIssuer('Issuer1', 'issuer1@gmail.com', issuer[1], 'MKey', ['C', 'D'], { from: admin[0] });
    });
  });
  describe('onlyOwner', () => {
    it('onlyOwner', async () => {
      await DigiBlockInstance.addAdmin('Admin', '1', 'admin1@gmail.com', admin[1], 'MKey', { from: contractOwner });
      try {
        await DigiBlockInstance.deleteAdmin(admin[1], { from: admin[4] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
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
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Invalid Admin');
      }
    });
  });
  describe('deleteAdmin', () => {
    it('deleteAdmin', async () => {
      try {
        await DigiBlockInstance.deleteAdmin(admin[4], { from: admin[0] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: contractOwner });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
    });
  });
  describe('allAdmins', () => {
    it('allAdmins', async () => {
      await DigiBlockInstance.allAdmins.call((err, result) => {
        if (!err) {
          assert(result[0][0] === 'Pinaki', 'First Name is not set properly');
          assert(result[0][1] === 'Admin', 'First Name is not set properly');
          assert(result[1][0] === 'Bhattacharjee', 'Last Name is not set properly');
          assert(result[1][1] === '0', 'Last Name is not set properly');
          assert(result[2][0] === 'pinakipb2@gmail.com', 'Email is not set properly');
          assert(result[2][1] === 'admin0@gmail.com', 'Email is not set properly');
          assert(result[3][0] === contractOwner, 'Address is not set properly');
          assert(result[3][1] === admin[0], 'Address is not set properly');
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('Document issuing and access flow', () => {
    it('document issued correctly', async () => {
      try {
        await DigiBlockInstance.issueDocument(user[0], 'ipfshash', 'A', { from: issuer[4] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      try {
        await DigiBlockInstance.issueDocument(requestor[0], 'ipfshash', 'A', { from: issuer[0] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Invalid User -- Reason given: Invalid User.');
      }
      await DigiBlockInstance.issueDocument(user[0], 'ipfshash', 'A', { from: issuer[0] });
      await DigiBlockInstance.getAllDocuments.call(user[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === issuer[0], 'Issuer is not set properly');
          assert(result[1][0] === 'ipfshash', 'Ipfshash is not set properly');
          assert(result[2][0] === 'A', 'Document Type is not set properly');
        } else {
          console.log(err);
        }
      });
      try {
        await DigiBlockInstance.getAllDocuments.call(user[4], (err, result) => {
          if (!err) {
            assert(result[0].length === 0, 'Length not proper');
            assert(result[1].length === 0, 'Length not proper');
            assert(result[2].length === 0, 'Length not proper');
            assert(result[3].length === 0, 'Length not proper');
          } else {
            throw err;
          }
        });
      } catch (err) {
        console.log(err.message);
      }
      await DigiBlockInstance.getDocsIssuedByIssuer.call(issuer[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === user[0], 'To address is not set properly');
          assert(result[1][0] === 'ipfshash', 'Ipfs hash is not set properly');
          assert(result[2][0] === 'A', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getDocsIssuedByIssuer.call(issuer[4], (err, result) => {
        if (!err) {
          assert(result[0].length === 0, 'Issuer has issued documents');
        } else {
          console.log(err);
        }
      });
      try {
        await DigiBlockInstance.issueDocument(user[0], 'ipfshash', 'A', { from: issuer[0] });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      await DigiBlockInstance.issueDocument(user[0], 'ipfshash1', 'C', { from: issuer[1] });
    });
    it('document requested correctly', async () => {
      try {
        await DigiBlockInstance.requestDocumentFromUser(user[0], 'A', { from: issuer[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      try {
        await DigiBlockInstance.requestDocumentFromUser(user[0], 'A', { from: user[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      try {
        await DigiBlockInstance.requestDocumentFromUser(user[0], 'A', { from: admin[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      try {
        await DigiBlockInstance.requestDocumentFromUser(user[4], 'A', { from: requestor[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Invalid User -- Reason given: Invalid User.');
      }
      try {
        await DigiBlockInstance.requestDocumentFromUser(user[0], 'T', { from: requestor[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Doc not Found -- Reason given: Doc not Found.');
      }
      await DigiBlockInstance.requestDocumentFromUser(user[0], 'A', { from: requestor[0] });
      await DigiBlockInstance.getUserPendingDocuments.call(user[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === requestor[0], 'From address is not set properly');
          assert(result[1][0] === 'A', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorPendingDocuments.call(requestor[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === user[0], 'To address is not set properly');
          assert(result[1][0] === 'A', 'DocType is not set properly');
          timestampA = result[2][0];
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.requestDocumentFromUser(user[0], 'C', { from: requestor[0] });
      await DigiBlockInstance.getRequestorPendingDocuments.call(requestor[0], (err, result) => {
        if (!err) {
          assert(result[0][1] === user[0], 'To address is not set properly');
          assert(result[1][1] === 'C', 'DocType is not set properly');
          timestampC = result[2][1];
        } else {
          console.log(err);
        }
      });
    });
    it('document status changed correctly', async () => {
      try {
        await DigiBlockInstance.changeDocumentStatus(requestor[0], user[0], 'A', parseInt(timestampA), 0, 3, { from: user[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Action Denied -- Reason given: Action Denied.');
      }
      try {
        await DigiBlockInstance.changeDocumentStatus(requestor[0], user[0], 'A', parseInt(timestampA), 0, 3, { from: user[4] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      await DigiBlockInstance.changeDocumentStatus(requestor[0], user[0], 'A', parseInt(timestampA), 0, 1, { from: user[0] });
      await DigiBlockInstance.getUserAcceptedDocuments.call(user[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === requestor[0], 'From address is not set properly');
          assert(result[1][0] === 'A', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorAcceptedDocuments.call(requestor[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === user[0], 'From address is not set properly');
          assert(result[1][0] === 'A', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.changeDocumentStatus(requestor[0], user[0], 'C', parseInt(timestampC), 0, 2, { from: user[0] });
      await DigiBlockInstance.getUserRejectedDocuments.call(user[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === requestor[0], 'From address is not set properly');
          assert(result[1][0] === 'C', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorRejectedDocuments.call(requestor[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === user[0], 'From address is not set properly');
          assert(result[1][0] === 'C', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.changeDocumentStatus(requestor[0], user[0], 'A', parseInt(timestampA), 1, 3, { from: user[0] });
      await DigiBlockInstance.getUserRevokedDocuments.call(user[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === requestor[0], 'From address is not set properly');
          assert(result[1][0] === 'A', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorRevokedDocuments.call(requestor[0], (err, result) => {
        if (!err) {
          assert(result[0][0] === user[0], 'From address is not set properly');
          assert(result[1][0] === 'A', 'DocType is not set properly');
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('updateMasterKey functionality', () => {
    it('update master key of owner', async () => {
      await DigiBlockInstance.updateMasterKey('NewMasterKey', { from: contractOwner });
      await DigiBlockInstance.singleAdmin.call(contractOwner, (err, result) => {
        if (!err) {
          assert(result[0] === 'Pinaki', 'First Name is not set properly');
          assert(result[1] === 'Bhattacharjee', 'Last Name is not set properly');
          assert(result[2] === 'pinakipb2@gmail.com', 'Email is not set properly');
          assert(result[3] === 'NewMasterKey', 'Master Key is not set properly');
        } else {
          console.log(err);
        }
      });
      try {
        await DigiBlockInstance.updateMasterKey('NextMasterKey', { from: contractOwner });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Action Denied -- Reason given: Action Denied.');
      }
    });
    it('should get error if called from admin account', async () => {
      try {
        await DigiBlockInstance.updateMasterKey('NewMasterKey', { from: admin[0] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Action Denied -- Reason given: Action Denied.');
      }
    });
    it('should get error if called from non-admin account', async () => {
      try {
        await DigiBlockInstance.updateMasterKey('NewMasterKey', { from: admin[4] });
      } catch (err) {
        assert(err.message, 'Returned error: VM Exception while processing transaction: revert Action Denied -- Reason given: Action Denied.');
      }
    });
  });
  describe('updateMasterKey functionality', () => {
    it('user verification check', async () => {
      await DigiBlockInstance.isUserVerified.call(user[1], (err, result) => {
        if (!err) {
          assert(result === false, 'Verfied status incorrect');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.isUserVerified.call(user[0], (err, result) => {
        if (!err) {
          assert(result === true, 'Verfied status incorrect');
        } else {
          console.log(err);
        }
      });
    });
  });
});


contract('DigiBlock Pending Docs', (accounts) => {
  const contractOwner = accounts[0];
  const admin = [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]];
  const user = [accounts[6], accounts[7], accounts[8], accounts[9], accounts[10]];
  const issuer = [accounts[11], accounts[12], accounts[13], accounts[14], accounts[15]];
  const requestor = [accounts[16], accounts[17], accounts[18], accounts[19], accounts[20]];
  let DigiBlockInstance;
  let timestampA = 0;
  let timestampB = 0;
  beforeEach(async () => {
    DigiBlockInstance = await DigiBlock.deployed();
  });
  describe('Deployment', () => {
    it('should deploy smart contract properly', async () => {
      assert(DigiBlockInstance.address !== '', 'Contract not deployed correctly');
    });
  });
  describe('Add User', () => {
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
        if (!err) {
          assert(result === '1', 'Error in user count');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.addUser('User', '1', 'user1@gmail.com', user[1], { from: contractOwner });
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
        if (!err) {
          assert(result === '1', 'Error in requestor count');
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.addRequestor('Requestor1', 'requestor1@gmail.com', requestor[1], { from: contractOwner });
    });
    it('Adding issuer', async () => {
      try {
        await DigiBlockInstance.addIssuer('Issuer0', 'issuer0@gmail.com', issuer[0], 'MKey', ['A', 'B'], { from: contractOwner });
      } catch (err) {
        assert(err.message === 'Returned error: VM Exception while processing transaction: revert Access Denied -- Reason given: Access Denied.');
      }
      await DigiBlockInstance.addIssuer('Issuer1', 'issuer1@gmail.com', issuer[1], 'MKey', ['C', 'D'], { from: contractOwner });
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
        if (!err) {
          assert(result === '2', 'Error in issuer count');
        } else {
          console.log(err);
        }
      });
    });
  });
  describe('Issue Doc', () => {
    it('Issue Doc', async () => {
      await DigiBlockInstance.issueDocument(user[0], 'ipfshash', 'A', { from: issuer[0] });
      await DigiBlockInstance.issueDocument(user[1], 'ipfshash1', 'B', { from: issuer[0] });
      await DigiBlockInstance.issueDocument(user[0], 'ipfshash2', 'C', { from: issuer[1] });
      await DigiBlockInstance.issueDocument(user[1], 'ipfshash3', 'D', { from: issuer[1] });
      await DigiBlockInstance.requestDocumentFromUser(user[0], 'A', { from: requestor[0] });
      await DigiBlockInstance.requestDocumentFromUser(user[0], 'C', { from: requestor[1] });
      await DigiBlockInstance.requestDocumentFromUser(user[1], 'B', { from: requestor[0] });
      await DigiBlockInstance.requestDocumentFromUser(user[1], 'D', { from: requestor[1] });
      //   const requested = await DigiBlockInstance.totalRequestedDocuments.call();
      //   console.log('Requested : ' + requested.words[0]);
      //   const pending = await DigiBlockInstance.totalRequestedPendingDocuments.call();
      //   console.log('Pending : ' + pending.words[0]);
      //   console.log(DigiBlockInstance);
      //   const reqdocs = await DigiBlockInstance.requestedDocuments.call(user[0], 1);
      //   console.log(reqdocs);
    });
  });
  describe('last', () => {
    it('last', async () => {
      await DigiBlockInstance.getUserPendingDocuments.call(user[0], async (err, result) => {
        if (!err) {
          console.log(result);
          timestampA = result[2][0];
          timestampB = result[2][1];
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.changeDocumentStatus(requestor[0], user[0], 'A', parseInt(timestampA), 0, 1, { from: user[0] });
      await DigiBlockInstance.changeDocumentStatus(requestor[1], user[0], 'C', parseInt(timestampB), 0, 1, { from: user[0] });
      //   const reqdocs = await DigiBlockInstance.requestedDocuments.call(user[0], 0);
      //   console.log(reqdocs);
      await DigiBlockInstance.getUserPendingDocuments.call(user[0], (err, result) => {
        if (!err) {
          console.log(result);
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getUserRevokedDocuments.call(user[0], (err, result) => {
        if (!err) {
          console.log(result);
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorPendingDocuments.call(requestor[0], (err, result) => {
        if (!err) {
          console.log(result);
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorPendingDocuments.call(requestor[1], (err, result) => {
        if (!err) {
          console.log(result);
        } else {
          console.log(err);
        }
      });
      await DigiBlockInstance.getRequestorPendingDocuments.call(requestor[4], (err, result) => {
        if (!err) {
          console.log(result);
        } else {
          console.log(err);
        }
      });
    });
  });
});
