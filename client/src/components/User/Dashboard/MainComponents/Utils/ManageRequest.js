import { toast } from 'react-toastify';

import { setInstanceStart } from '../../../../../redux/contract/contract.actions';

const manageRequest = async ({ requestorAddress, docType, epoch }, currentState, action, setLoading, instance, dispatch, userAddress) => {
  setLoading(true);
  console.log(instance.methods);
  try {
    await instance.methods
      .changeDocumentStatus(requestorAddress, userAddress, docType, epoch, currentState, action)
      .send({ from: userAddress })
      .then(async () => {
        dispatch(setInstanceStart());
        toast.success('Request Approved', { toastId: 'Request-Accepted' });
      })
      .catch((e) => {
        if (e.code === 4001) {
          toast.error('Something Went Wrong', { toastId: `${e.message}` });
        }
      });
  } catch (err) {
    console.log(err);
    toast.error('Something Went Wrong', { toastId: `${err.message}` });
  }
  setLoading(false);
};

export default manageRequest;
