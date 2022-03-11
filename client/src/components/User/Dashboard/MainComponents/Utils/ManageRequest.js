import { toast } from 'react-toastify';

import { setInstanceStart } from '../../../../../redux/contract/contract.actions';

const manageRequest = async ({ requestorAddress, docType, epoch }, currentState, action, setLoading, instance, dispatch, userAddress) => {
  setLoading(true);
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
          toast.error('You denied the request', { toastId: `${e.message}` });
        } else {
          toast.error('Something Went Wrong', { toastId: `${e.message}` });
        }
      });
  } catch (err) {
    toast.error('Something Went Wrong', { toastId: `${err.message}` });
  }
  setLoading(false);
};

export default manageRequest;
