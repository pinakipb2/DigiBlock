import React, { useState, useRef } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
  FormHelperText,
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
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { add, genMasterKey, sendMasterKey, validateMasterKey } from '../../../../../api/Admin';
import { setInstanceStart } from '../../../../../redux/contract/contract.actions';
import { isValidEmail, isValidEthereumAddress, isValidAlphanumeric } from '../Utils/Validations';

yup.addMethod(yup.string, 'isValidEmail', isValidEmail);
yup.addMethod(yup.string, 'isValidEthereumAddress', isValidEthereumAddress);
yup.addMethod(yup.string, 'isValidAlphanumeric', isValidAlphanumeric);

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required('First Name is a Required field'),
  lastName: yup.string().trim().required('Last Name is a Required field'),
  email: yup.string().trim().lowercase().required('Email is a Required field').isValidEmail(),
  walletaddress: yup.string().lowercase().required('Wallet Address is a Required field').isValidEthereumAddress(),
  masterkey: yup.string().required('Master Key is a Required field').length(14, 'Invalid Master Key').isValidAlphanumeric(),
});

const AddAdminDrawer = ({ isOpenAddAdmin, onCloseAddAdmin }) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.currentAdmin);
  const instance = useSelector((state) => state.contract.instance);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
  const [show, setShow] = useState(false);
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const onSubmit = async (data) => {
    const transformedFirstName = capitalizeFirstLetter(data.firstName);
    const transformedLastName = capitalizeFirstLetter(data.lastName);
    const adminDetails = await instance.methods.singleAdmin(admin.account).call();
    const res = await validateMasterKey(data.masterkey, adminDetails[3]);
    if (res.data.status === false) {
      toast.error('Invalid Master Key', { toastId: 'Invalid-Master-Key' });
    } else {
      try {
        const newMasterKey = await genMasterKey();
        await instance.methods
          .addAdmin(transformedFirstName, transformedLastName, data.email, data.walletaddress, newMasterKey.data.hashedMasterKey)
          .send({ from: admin.account })
          .then(async () => {
            await add(data.walletaddress);
            await sendMasterKey(`${transformedFirstName} ${transformedLastName}`, data.email, newMasterKey.data.masterKey);
            dispatch(setInstanceStart());
            toast.success('Admin Created Successfully', { toastId: 'Admin-success' });
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
    onCloseAddAdmin();
    setShow(false);
    reset();
  };
  const initialFocusRef = useRef();
  const tooglePass = () => setShow(!show);
  return (
    <Drawer size="sm" isOpen={isOpenAddAdmin} placement="right" initialFocusRef={initialFocusRef} onClose={onCloseAddAdmin}>
      <DrawerOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton onClick={() => setShow(false)} />
          <DrawerHeader borderBottomWidth="1px">Add a new Admin</DrawerHeader>
          <DrawerBody>
            <Stack spacing="20px">
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <InputGroup>
                    <Input
                      isInvalid={!!errors.firstName}
                      focusBorderColor={errors.firstName ? 'red.500' : ''}
                      {...register('firstName')}
                      ref={useMergeRefs(initialFocusRef, register('firstName').ref)}
                      placeholder="First Name of admin"
                      autoComplete="off"
                    />
                    {errors.firstName ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
                  </InputGroup>
                  {errors.firstName ? <FormHelperText color="red.600">{errors.firstName?.message}</FormHelperText> : null}
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <InputGroup>
                    <Input isInvalid={!!errors.lastName} focusBorderColor={errors.lastName ? 'red.500' : ''} {...register('lastName')} placeholder="Last Name of admin" autoComplete="off" />
                    {errors.lastName ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
                  </InputGroup>
                  {errors.lastName ? <FormHelperText color="red.600">{errors.lastName?.message}</FormHelperText> : null}
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <Input isInvalid={!!errors.email} focusBorderColor={errors.email ? 'red.500' : ''} type="email" placeholder="Email of admin" {...register('email')} autoComplete="off" />
                    {errors.email ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
                  </InputGroup>
                  {errors.email ? <FormHelperText color="red.600">{errors.email?.message}</FormHelperText> : null}
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="walletaddress">Wallet Address</FormLabel>
                  <InputGroup>
                    <Input
                      isInvalid={!!errors.walletaddress}
                      focusBorderColor={errors.walletaddress ? 'red.500' : ''}
                      placeholder="Wallet Address of admin"
                      {...register('walletaddress')}
                      autoComplete="off"
                    />
                    {errors.walletaddress ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
                  </InputGroup>
                  {errors.walletaddress ? <FormHelperText color="red.600">{errors.walletaddress?.message}</FormHelperText> : null}
                </FormControl>
              </Box>

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
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onCloseAddAdmin();
                setShow(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                reset();
                setShow(false);
              }}
            >
              Reset
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default AddAdminDrawer;
