import React, { useState } from 'react';

import { InputGroup, InputLeftElement, Input, FormControl, FormHelperText, Button } from '@chakra-ui/react';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const RequestDocuments = () => {
  const objects = [];
  const instance = useSelector((state) => state.contract.instance);
  const [message, setMessage] = useState('');
  const [userDocuments, setUserDocuments] = useState([]);
  const fetchUserDocuments = async (userAccount) => {
    // console.log(userAccount);
    setMessage('');
    try {
      const docs = await instance.methods.getAllDocuments(userAccount).call();
      console.log(docs);
      for (let i = 0; i < docs[2].length; i++) {
        objects.push({
          id: i + 1,
          docType: docs[2][i]
        });
      }
      if (!docs[2][0]) { setMessage('No User Found'); } else { setMessage(''); }
      console.log(objects);
      setUserDocuments(objects);
    } catch (error) {
      setMessage('No User Found');
    }
  };

  const showData = userDocuments.map((val) => (
    <tr key={val.id} className="p-2">
      <td className="font-ubuntu p-2">{val.docType}</td>
      <td className="font-ubuntu p-2">
        <Button colorScheme="blue">
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
                children={<BsPersonBoundingBox />}
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
