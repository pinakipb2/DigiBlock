import React from 'react';

import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

const RequestDocuments = () => (
  <div className="px-6 pb-10 flex justify-center items-center">
    <div className="flex flex-col bg-white justify-center items-center py-6 w-full text-center rounded-2xl shadow-xl">
      <div className="w-1/2">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch />}
          />
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
      </div>
    </div>
  </div>
);
export default RequestDocuments;
