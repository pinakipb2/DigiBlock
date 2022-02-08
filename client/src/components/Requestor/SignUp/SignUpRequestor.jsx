import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';

import { logoutRequestor } from '../../../redux/requestor/requestor.actions';

const SignUpRequestor = ({ isConnected, isAccountChanged, isNetworkChanged, stepOne }) => {
  const requestor = useSelector((state) => state.requestor.currentRequestor);
  const instance = useSelector((state) => state.contract.instance);
  const dispatch = useDispatch();
  const [requestorDetails, setRequestorDetails] = useState({
    orgName: '',
    email: ''
  });
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const handleSignUp = async () => {
    const { orgName, email } = requestorDetails;
    if (!isEmail(email)) {
      toast.warn('Please enter valid email', { toastId: 'invalid-email' });
    } else {
      try {
        const transformedFirstName = capitalizeFirstLetter(orgName);
        console.log(transformedFirstName, email, requestor.account);
        await instance.methods.addRequestor(transformedFirstName, email, requestor.account)
          .send({ from: requestor.account })
          .then(() => {
            dispatch(logoutRequestor());
            setRequestorDetails({
              orgName: '',
              email: ''
            });
            stepOne();
            toast.success('Requestor Created Successfully', { toastId: 'Requestor-success' });
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
        <input className="text-center text-sm font-semibold shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker bg-gray-200" type="text" value={requestor?.account} readOnly />
      </div>
      <div className="mb-6 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">Organization Name</div>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 bg-gray-200"
          onChange={(e) => setRequestorDetails({ ...requestorDetails, orgName: e.target.value })}
          type="text"
          placeholder="Organization Name"
        />
        <p className="text-red-600 text-xs italic font-ubuntu">Enter your oragnization name.</p>
      </div>
      <div className="mb-6 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">Email</div>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 bg-gray-200"
          onChange={(e) => setRequestorDetails({ ...requestorDetails, email: e.target.value })}
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
export default SignUpRequestor;
