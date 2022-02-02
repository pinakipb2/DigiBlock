/* eslint-disable react/jsx-no-bind */
import { Buffer } from 'buffer';

import React, { useState } from 'react';

import { FormControl, FormLabel, Input, Select, IconButton, Text, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalCloseButton, ModalHeader, ModalOverlay, Center } from '@chakra-ui/react';
import { create } from 'ipfs-http-client';
import { FaTrash } from 'react-icons/fa';
import { MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage } from 'react-icons/md';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import Dropzone from './Dropzone';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', apiPath: '/api/v0' });

const IssueDocument = () => {
  const [file, setFile] = useState(null);
  const [buffer, setBuffer] = useState(null);
  // const [url, setUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onFileCapture = async (blob) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      // eslint-disable-next-line no-buffer-constructor
      setBuffer(Buffer(reader.result));
    };
  };

  const uploadToIPFS = async () => {
    const resp = await ipfs.add(buffer);
    console.log(resp.path);
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line no-shadow
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  function changePageFirst() {
    setPageNumber(1);
  }
  function changePageLast() {
    setPageNumber(numPages);
  }

  return (
    <div className="container flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-2/3 h-auto bg-white rounded-2xl">
        <div className="w-1/2 flex flex-col p-4">
          <FormControl isRequired className="pb-4">
            <FormLabel htmlFor="user-address">User Address</FormLabel>
            <Input id="user-address" placeholder="Enter User Address" />
          </FormControl>

          <FormControl isRequired className="pb-6">
            <FormLabel htmlFor="document-type">Document Type</FormLabel>
            <Select id="document-type" placeholder="Select Document Type">
              <option>United Arab Emirates</option>
              <option>Nigeria</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="document-type">Upload Document</FormLabel>
            {!file && <Dropzone file={file} setFile={setFile} onFileCapture={onFileCapture} />}
          </FormControl>
          {file && (
            <>
              <div className="flex items-center justify-center space-x-4 mb-8 mt-8">
                <img src="/assets/pdf.png" alt="PDF" className="w-8.5 h-12" />
                <Text maxWidth="60" isTruncated>
                  {file?.name}
                </Text>
                <Text>{`${(file?.size / (1024 * 1024)).toFixed(2)} MB`}</Text>
                <IconButton icon={<FaTrash />} colorScheme="red" onClick={() => setFile(null)} />
              </div>

              <div className="flex justify-evenly">
                <Button colorScheme="teal" onClick={onOpen}>
                  View Document
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    uploadToIPFS();
                  }}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text isTruncated>{file?.name}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess} height={1}>
                <Page pageNumber={pageNumber} />
              </Document>
              <Center m={2}>
                <Text fontSize="2xl">
                  Page {pageNumber} of {numPages}
                </Text>
              </Center>
              <Center>
                {pageNumber > 1 && (
                  <>
                    <IconButton
                      m={2}
                      colorScheme="pink"
                      icon={<MdFirstPage />}
                      onClick={() => {
                        changePageFirst();
                      }}
                    />
                    <IconButton
                      m={2}
                      colorScheme="pink"
                      icon={<MdChevronLeft />}
                      onClick={() => {
                        changePageBack();
                      }}
                    />
                  </>
                )}
                {pageNumber < numPages && (
                  <>
                    <IconButton
                      m={2}
                      colorScheme="pink"
                      icon={<MdChevronRight />}
                      onClick={() => {
                        changePageNext();
                      }}
                    />
                    <IconButton
                      m={2}
                      colorScheme="pink"
                      icon={<MdLastPage />}
                      onClick={() => {
                        changePageLast();
                      }}
                    />
                  </>
                )}
              </Center>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default IssueDocument;
