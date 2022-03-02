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

import { validateMasterKey } from '../../../../../api/Admin';
import { addIssuer, genIssuerMasterKey, sendIssuerMasterKey, } from '../../../../../api/Issuer';
import { setInstanceStart } from '../../../../../redux/contract/contract.actions';
import { isValidEmail, isValidEthereumAddress, isValidAlphanumeric } from '../Utils/Validations';
import TagsInput from './TagsInput';

yup.addMethod(yup.string, 'isValidEmail', isValidEmail);
yup.addMethod(yup.string, 'isValidEthereumAddress', isValidEthereumAddress);
yup.addMethod(yup.string, 'isValidAlphanumeric', isValidAlphanumeric);

const validationSchema = yup.object().shape({
  orgName: yup.string().trim().required('Organization Name is a Required field'),
  email: yup.string().trim().lowercase().required('Email is a Required field').isValidEmail(),
  walletaddress: yup.string().lowercase().required('Wallet Address is a Required field').isValidEthereumAddress(),
  masterkey: yup.string().required('Master Key is a Required field').length(14, 'Invalid Master Key').isValidAlphanumeric(),
});

const AddIssuerDrawer = ({ isOpenAddIssuer, onCloseAddIssuer }) => {
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
  const [tags, setTags] = useState([]);
  const [docErrors, setDocErrors] = useState({});

  const changeHandler = (value) => {
    setTags(value);
    if (value.length > 0 && docErrors.tags) {
      setDocErrors((prev) => {
        const prevErrors = { ...prev };
        delete prevErrors.tags;
        return prevErrors;
      });
    }
  };
  const onSubmit = async (data) => {
    if (tags.length === 0) {
      setDocErrors((prev) => ({
        ...prev,
        tags: 'Please add atleast one Document Type',
      }));
    } else {
      console.log(tags);
      // console.log(data);
      const adminDetails = await instance.methods.singleAdmin(admin.account).call();
      const res = await validateMasterKey(data.masterkey, adminDetails[3]);
      console.log(res.data.status);
      if (res.data.status === false) {
        toast.error('Invalid Master Key', { toastId: 'Invalid-Master-Key' });
      } else {
        try {
          const newMasterKey = await genIssuerMasterKey();
          await instance.methods
            .addIssuer(data.orgName, data.email, data.walletaddress, newMasterKey.data.hashedMasterKey, tags)
            .send({ from: admin.account })
            .then(async () => {
              await sendIssuerMasterKey(data.orgName, data.email, newMasterKey.data.masterKey);
              await addIssuer(data.orgName, data.walletaddress, tags);
              dispatch(setInstanceStart());
              toast.success('Issuer Created Successfully', { toastId: 'Issuer-success' });
            })
            .catch((e) => {
              if (e.code === 4001) {
                toast.error('Something Went Wrong', { toastId: `${e.message}` });
              }
            });
        } catch (err) {
          console.log(err.message);
          toast.error('Something Went Wrong', { toastId: `${err.message}` });
        }
      }
      onCloseAddIssuer();
      setShow(false);
      reset();
      setTags([]);
    }
  };
  const initialFocusRef = useRef();
  const tooglePass = () => setShow(!show);
  return (
    <Drawer size="sm" isOpen={isOpenAddIssuer} placement="right" initialFocusRef={initialFocusRef} onClose={onCloseAddIssuer}>
      <DrawerOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerContent>
          <DrawerCloseButton onClick={() => setShow(false)} />
          <DrawerHeader borderBottomWidth="1px">Add a new Issuer</DrawerHeader>
          <DrawerBody>
            <Stack spacing="20px">
              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="orgName">Organization Name</FormLabel>
                  <InputGroup>
                    {/* https://issueexplorer.com/issue/chakra-ui/chakra-ui/4792 */}
                    <Input
                      isInvalid={!!errors.orgName}
                      focusBorderColor={errors.orgName ? 'red.500' : ''}
                      {...register('orgName')}
                      ref={useMergeRefs(initialFocusRef, register('orgName').ref)}
                      placeholder="Name of Organization"
                      autoComplete="off"
                    />
                    {errors.orgName ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
                  </InputGroup>
                  {errors.orgName ? <FormHelperText color="red.600">{errors.orgName?.message}</FormHelperText> : null}
                </FormControl>
              </Box>

              <Box>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <Input isInvalid={!!errors.email} focusBorderColor={errors.email ? 'red.500' : ''} type="email" placeholder="Email of issuer" {...register('email')} autoComplete="off" />
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
                      placeholder="Wallet Address of issuer"
                      {...register('walletaddress')}
                      autoComplete="off"
                    />
                    {errors.walletaddress ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
                  </InputGroup>
                  {errors.walletaddress ? <FormHelperText color="red.600">{errors.walletaddress?.message}</FormHelperText> : null}
                </FormControl>
              </Box>

              <Box>
                <FormControl>
                  <FormLabel>
                    Document Types <span style={{ color: 'red' }}>*</span>
                  </FormLabel>
                  <TagsInput id="tags" placeholder="Add a Document Type" onChange={changeHandler} error={docErrors.tags} defaultTags={tags} key={tags} />
                  {docErrors.tags ? <FormHelperText color="red.600">{docErrors?.tags}</FormHelperText> : null}
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
                onCloseAddIssuer();
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
                setTags([]);
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

export default AddIssuerDrawer;
