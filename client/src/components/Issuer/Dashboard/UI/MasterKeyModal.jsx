import React, { useState, useRef } from 'react';

import {
  FormLabel,
  FormControl,
  Box,
  Button,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useMergeRefs,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiFillLock } from 'react-icons/ai';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { validateMasterKey } from '../../../../../api/Admin';
import { isValidAlphanumeric } from '../Utils/Validations';

yup.addMethod(yup.string, 'isValidAlphanumeric', isValidAlphanumeric);

const validationSchema = yup.object().shape({ masterkey: yup.string().required('Master Key is a Required field').length(14, 'Invalid Master Key').isValidAlphanumeric() });

const MasterKeyModal = ({ isOpenRemoveAdmin, onCloseRemoveAdmin, deleteAdminDetails, deleteAdmin, modalHeaderText, modalButtonColor, modalButtonText }) => {
  const initialFocusRef = useRef();
  const [show, setShow] = useState(false);
  const tooglePass = () => setShow(!show);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const instance = useSelector((state) => state.contract.instance);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });
  const onSubmit = async (data) => {
    try {
      const adminDetails = await instance.methods.singleAdmin(admin.account).call();
      const res = await validateMasterKey(data.masterkey, adminDetails[3]);
      if (res.data.status === false) {
        toast.error('Enter Valid Credentials', { toastId: 'Invalid-Credentials' });
      } else {
        deleteAdmin(deleteAdminDetails.address);
      }
    } catch (err) {
      toast.error('Something Went Wrong', { toastId: `${err.message}` });
    }
    onCloseRemoveAdmin();
    reset();
    setShow(false);
  };
  // console.log(result);
  return (
    <Modal
      initialFocusRef={initialFocusRef}
      isOpen={isOpenRemoveAdmin}
      onClose={() => {
        onCloseRemoveAdmin();
        setShow(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg">{modalHeaderText}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="masterkey">Master Key</FormLabel>
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none" color="gray.400" fontSize="1.2em" children={<AiFillLock />} />
                  <Input
                    isInvalid={!!errors.masterkey}
                    focusBorderColor={errors.masterkey ? 'red.500' : ''}
                    type={show ? 'text' : 'password'}
                    placeholder="Enter Master Key"
                    {...register('masterkey')}
                    ref={useMergeRefs(initialFocusRef, register('masterkey').ref)}
                  />
                  <InputRightElement width="4rem">
                    <Button style={{ boxShadow: 'none' }} h="1.75rem" size="sm" onClick={tooglePass}>
                      {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </Button>
                  </InputRightElement>
                  {errors.masterkey ? <InputRightElement mr={12} children={<BsFillExclamationCircleFill color="red" />} /> : null}
                </InputGroup>
                <FormHelperText>Copy the Master Key and Paste Here</FormHelperText>
                {errors.masterkey ? <FormHelperText color="red.600">{errors.masterkey?.message}</FormHelperText> : null}
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={modalButtonColor} mr={3} type="submit" isLoading={isSubmitting}>
              {modalButtonText}
            </Button>
            <Button
              onClick={() => {
                onCloseRemoveAdmin();
                setShow(false);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MasterKeyModal;
