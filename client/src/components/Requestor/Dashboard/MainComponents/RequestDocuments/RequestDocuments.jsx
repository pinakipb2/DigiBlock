import React, { useState } from 'react';

import { InputGroup, InputLeftElement, Input, FormControl, FormHelperText, Button } from '@chakra-ui/react';
import { BsJournalMedical } from 'react-icons/bs';
import { HiDocumentSearch } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const RequestDocuments = () => {
  const objects = [];
  const disabledDocs = [];
  const instance = useSelector((state) => state.contract.instance);
  const currentRequestor = useSelector((state) => state.requestor.currentRequestor).account;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userAcc, setUserAcc] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);

  const fetchUserDocuments = async (userAccount) => {
    // console.log(userAccount);
    setUserAcc(userAccount);
    setMessage('');
    try {
      const pendingDocs = await instance.methods.getUserPendingDocuments(userAccount.toLowerCase()).call();
      const acceptedDocs = await instance.methods.getUserAcceptedDocuments(userAccount.toLowerCase()).call();
      console.log(pendingDocs, acceptedDocs);
      // for (let i = 0; i < pendingDocs[0].length; i++) {
      //   if (pendingDocs[0][i].toLowerCase() === currentRequestor) {
      //     disabledDocs.push(pendingDocs[1][i]);
      //   }
      // }
      // for (let i = 0; i < acceptedDocs[0].length; i++) {
      //   if (acceptedDocs[0][i].toLowerCase() === currentRequestor) {
      //     disabledDocs.push(acceptedDocs[1][i]);
      //   }
      // }
      console.log(disabledDocs);
    } catch (error) {
      console.log(error);
    }
    try {
      const docs = await instance.methods.getAllDocuments(userAccount).call();
      // console.log(docs, disabledDocs);
      for (let i = 0; i < docs[2].length; i++) {
        objects.push({
          id: i + 1,
          docType: docs[2][i],
          isDisabled: disabledDocs.includes(docs[2][i])
        });
      }
      if (!docs[2][0]) { setMessage('No User Found'); } else { setMessage(''); }
      console.log(objects);
      setUserDocuments(objects);
    } catch (error) {
      setMessage('No User Found');
    }
  };

  const requestDocument = async (docType) => {
    setLoading(true);
    try {
      await instance.methods
        .requestDocumentFromUser(userAcc, docType)
        .send({ from: currentRequestor })
        .then(async () => {
          fetchUserDocuments(userAcc);
          toast.success('Document Requested Successfully', { toastId: 'Document-Requested' });
        })
        .catch((e) => {
          if (e.code === 4001) {
            toast.error('Something Went Wrong', { toastId: `${e.message}` });
          }
        });
    } catch (err) {
      toast.error('Something Went Wrong', { toastId: `${err.message}` });
    }
    setLoading(false);
  };

  const showData = userDocuments.map((val, index) => (
    <tr key={val.id} className={index % 2 !== 0 ? 'bg-blue-100' : 'bg-white'}>
      <td className="font-ubuntu p-2">{val.docType}</td>
      <td className="font-ubuntu p-2">
        <Button
          fontWeight="normal"
          colorScheme="green"
          isLoading={loading}
          isDisabled={val.isDisabled}
          leftIcon={<BsJournalMedical />}
          onClick={() => requestDocument(val.docType)}
        >
          Request
        </Button>
      </td>
    </tr>
  ));

  const exp = userDocuments?.length > 0
    ? (
      <div className="mt-10 mb-5 flex flex-col justify-center items-center">
        <table className="w-full border border-black shadow-xl">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-2">Document Type</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">{showData}</tbody>
        </table>
      </div>
    ) : null;
  return (
    <div className="px-6 pb-10 flex justify-center items-center">
      <div className="flex flex-col bg-white justify-center items-center py-6 w-full text-center rounded-2xl shadow-xl">
        <div className="w-1/2">
          <FormControl>
            <InputGroup>
              <InputLeftElement
                fontSize="lg"
                pointerEvents="none"
                children={<HiDocumentSearch />}
              />
              <Input
                size="md"
                placeholder="Enter User Account"
                onKeyDown={(e) => { if (e.key === 'Enter') fetchUserDocuments(e.target.value); }}
              />
            </InputGroup>
            <FormHelperText className="ml-2 text-left">
              Press enter to search
            </FormHelperText>
          </FormControl>
          {
            message === '' ? exp : <div className="mt-10 font-mono text-2xl text-red-500">{message}</div>
          }
        </div>
      </div>
    </div>
  );
};
export default RequestDocuments;
