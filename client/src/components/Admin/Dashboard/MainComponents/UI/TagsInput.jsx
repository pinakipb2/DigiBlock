import React, { useState, useRef } from 'react';

import { Input, Tag, TagLabel, TagCloseButton, Box, WrapItem, Wrap, InputGroup, InputRightElement } from '@chakra-ui/react';
import { BsFillExclamationCircleFill } from 'react-icons/bs';

const TagsInput = ({ id, placeholder, error, onChange, defaultTags }) => {
  const [value, setValue] = useState('');
  const [tags, setTags] = useState(defaultTags || []);

  const inputRef = useRef(null);

  const changeHandler = (e) => {
    setValue(e.target.value);
    onChange(tags);
  };

  const removeTag = (tag) => {
    const arr = tags.filter((t) => t !== tag);
    setTags(arr);
    onChange(arr);
  };

  const updateTagsHandler = (e) => {
    e.preventDefault();
    if (e.target.value !== '' && e.target.value !== ',') {
      if (e.key === ',') {
        const newTag = value.trim().split(',')[0];
        const found = tags.find((tag) => tag.toLowerCase() === newTag.toLowerCase());
        if (found === undefined && newTag !== '') {
          const arr = [...tags, newTag];
          setTags(arr);
          onChange(arr);
        }
        setValue('');
        inputRef.current.focus();
      } else if (e.key === 'Enter') {
        const newTag = value.trim();
        const found = tags.find((tag) => tag.toLowerCase() === newTag.toLowerCase());
        if (found === undefined && newTag !== '') {
          const arr = [...tags, newTag];
          setTags(arr);
          onChange(arr);
        }
        setValue('');
        inputRef.current.focus();
      }
    }
  };
  return (
    <>
      <Box>
        <Wrap align="center" mb={2}>
          {tags.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <WrapItem key={index}>
              <Tag size="lg" borderRadius="full" variant="solid" bg="purple.600">
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={() => removeTag(tag)} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <InputGroup>
          <Input
            autoFocus
            ref={inputRef}
            isInvalid={!!error}
            errorBorderColor={error ? 'red.500' : ''}
            type="text"
            placeholder={placeholder}
            id={id}
            name={id}
            value={value}
            onChange={changeHandler}
            autoComplete="off"
            onKeyUp={updateTagsHandler}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
          />
          {error ? <InputRightElement children={<BsFillExclamationCircleFill color="red" />} /> : null}
        </InputGroup>
      </Box>
    </>
  );
};

export default TagsInput;
