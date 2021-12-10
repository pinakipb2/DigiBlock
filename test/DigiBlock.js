const DigiBlock = artifacts.require("./DigiBlock.sol");
const { assert } = require('chai');

contract("DigiBlock", accounts => {
  const contractOwner = accounts[0];
  const user = [accounts[1], accounts[2], accounts[3], accounts[4], accounts[5]];
  let DigiBlockInstance;
  const PREFIX = "Returned error: VM Exception while processing transaction: ";
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
  }
  const web3ErrorMessage = (errType, reason) => {
    return (PREFIX + errType + ' ' + reason + ' -- ' + 'Reason given: ' + reason + '.');
  }
  describe("Deployment", () => {
    it("should deploy smart contract properly", async () => {
      // console.log('Contract at : ' + DigiBlockInstance.address);
      // console.log('Owner : ' + contractOwner);
      assert(DigiBlockInstance.address !== '', 'Contract not deployed correctly');
    });
    it("should set the right owner", async () => {
      const owner = await DigiBlockInstance.owner.call();
      // console.log('Owner in smart contract is : ' + owner);
      assert(owner === contractOwner, 'Owner is not set properly');
    });
    it("validating first admin registration in constructor", async () => {
      function Admin(firstName, lastName, email, userAddress, masterKey) {
        this.firstName = firstName,
          this.lastName = lastName,
          this.email = email,
          this.userAddress = userAddress,
          this.masterKey = masterKey
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
    it("should return first admin from array", async () => {
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
  describe("addAdmin functionality", () => {
    it("owner cannot addAdmin itself", async () => {
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", contractOwner, "MKey", { from: contractOwner });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "User is Already a Admin";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(1);
    });
    it("owner can addAdmin non-admin", async () => {
      await DigiBlockInstance.addAdmin("User", "0", "user0@gmail.com", user[0], "MKey", { from: contractOwner });
      checkAllAdminsCount(2);
    });
    it("owner again cannot addAdmin already admin-user", async () => {
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", user[0], "MKey", { from: contractOwner });
      } catch (err) {
        const errType = "revert";
        const reason = "User is Already a Admin";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("admin cannot addAdmin itself", async () => {
      // Now user[0] is an admin
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", user[0], "MKey", { from: user[0] });
      } catch (err) {
        const errType = "revert";
        const reason = "User is Already a Admin";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
    });
    it("admin cannot addAdmin owner", async () => {
      // Now user[0] is an admin
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", contractOwner, "MKey", { from: user[0] });
      } catch (err) {
        const errType = "revert";
        const reason = "User is Already a Admin";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("admin can addAdmin non-admin", async () => {
      await DigiBlockInstance.addAdmin("User", "1", "user1@gmail.com", user[1], "MKey", { from: user[0] });
      checkAllAdminsCount(3);
    });
    it("non-admin cannot addAdmin owner", async () => {
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", contractOwner, "MKey", { from: user[2] });
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(3);
    });
    it("non-admin cannot addAdmin an admin", async () => {
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", user[0], "MKey", { from: user[2] });
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(3);
    });
    it("non-admin cannot addAdmin non-admin", async () => {
      try {
        await DigiBlockInstance.addAdmin("Fname", "Lname", "Email", user[3], "MKey", { from: user[2] });
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(3);
    });
    it("getting all(3) Admins", async () => {
      function Admin(firstName, lastName, email, userAddress) {
        this.firstName = firstName,
          this.lastName = lastName,
          this.email = email,
          this.userAddress = userAddress
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
  describe("deleteAdmin functionality", () => {
    it("owner cannot deleteAdmin itself", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: contractOwner });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(3);
    });
    it("owner can deleteAdmin an admin", async () => {
      await DigiBlockInstance.deleteAdmin(user[1], { from: contractOwner });
      checkAllAdminsCount(2);
    });
    it("owner cannot deleteAdmin a non-admin", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[4], { from: contractOwner });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Not a valid Admin";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("admin cannot deleteAdmin owner", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: user[0] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("admin cannot deleteAdmin itself", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[0], { from: user[0] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("admin cannot deleteAdmin an admin", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[0], { from: user[0] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("admin cannot deleteAdmin a non-admin", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[4], { from: user[0] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("non-admin cannot deleteAdmin owner", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(contractOwner, { from: user[4] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("non-admin cannot deleteAdmin itself", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[4], { from: user[4] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("non-admin cannot deleteAdmin an admin", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[0], { from: user[4] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
    it("non-admin cannot deleteAdmin a non-admin", async () => {
      try {
        await DigiBlockInstance.deleteAdmin(user[3], { from: user[4] });
        throw null;
      } catch (err) {
        const errType = "revert";
        const reason = "Access Denied";
        assert(err.message === web3ErrorMessage(errType, reason), "Got: " + err.message);
      }
      checkAllAdminsCount(2);
    });
  });
});