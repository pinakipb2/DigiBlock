import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

import { logoutUser } from '../../../redux/user/user.actions';

const SignUpUser = ({ isConnected, isAccountChanged, isNetworkChanged, stepOne }) => {
  const user = useSelector((state) => state.user.currentUser);
  const instance = useSelector((state) => state.contract.instance);
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastname: '',
    email: ''
  });
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const handleSignUp = async () => {
    const { firstName, lastName, email } = userDetails;
    if (!isEmail(email)) {
      toast.warn('Please enter valid email', { toastId: 'invalid-email' });
    } else {
      try {
        const transformedFirstName = capitalizeFirstLetter(firstName);
        const transformedLastName = capitalizeFirstLetter(lastName);
        console.log(transformedFirstName, transformedLastName, email, user.account);
        await instance.methods.addUser(transformedFirstName, transformedLastName, email, user.account)
          .send({ from: user.account })
          .then(() => {
            dispatch(logoutUser());
            setUserDetails({
              firstName: '',
              lastname: '',
              email: ''
            });
            stepOne();
            toast.success('User Created Successfully', { toastId: 'User-success' });
          })
          .catch((e) => {
            if (e.code === 4001) {
              toast.error('Something Went Wrong', { toastId: `${e.message}` });
            }
          });
      } catch (err) {
        toast.error('Something Went Wrong', { toastId: `${err.message}` });
      }
    }
  };
  return (
    <div className="bg-white h-auto m-6 p-4 w-2/3 rounded-2xl flex flex-col justify-center items-center">
      <h1 className="font-bold text-gray-900 text-2xl text-center mb-8 mt-3 font-roboto">SIGN UP</h1>
      <div className="mb-4 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">Address</div>
        <input className="text-center text-sm font-semibold shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker bg-gray-200" type="text" value={user?.account} readOnly />
      </div>
      <div className="mb-6 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">First Name</div>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 bg-gray-200"
          onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
          type="text"
          placeholder="First Name"
        />
        <p className="text-red-600 text-xs italic font-ubuntu">Enter your first name.</p>
      </div>
      <div className="mb-6 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">Last Name</div>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 bg-gray-200"
          onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
          type="text"
          placeholder="Last Name"
        />
        <p className="text-red-600 text-xs italic font-ubuntu">Enter your last name.</p>
      </div>
      <div className="mb-6 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">Email</div>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 bg-gray-200"
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          type="text"
          placeholder="Email"
        />
        <p className="text-red-600 text-xs italic font-ubuntu">Enter your email.</p>
      </div>
      <div className="flex justify-between items-center w-3/5 pb-10">
        <button type="button" className="bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none" onClick={() => stepOne()}>
          Back
        </button>
        {isConnected && isAccountChanged === false && isNetworkChanged === false ? (
          <button
            type="button"
            className="bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        ) : (
          <button type="button" className="cursor-not-allowed bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none" disabled>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};
export default SignUpUser;
