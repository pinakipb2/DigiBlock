import React from 'react';

import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const Dropzone = ({ file, setFile, onFileCapture }) => {
  const onDrop = React.useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      onFileCapture(acceptedFiles[0]);
    }
    fileRejections.forEach((selectedFile) => {
      selectedFile.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          toast.error('File is larger than 10 MB', { toastId: 'Large-File' });
        }
        if (err.code === 'file-invalid-type') {
          toast.error('Invalid file type', { toastId: 'Invalid-File' });
        }
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({ onDrop, multiple: false, maxFiles: 1, maxSize: 10485760, accept: 'application/pdf', disabled: !!file });
  return (
    <div className="w-full">
      <div {...getRootProps()} className="w-full text-white bg-gray-900 h-64 rounded-2xl p-2 text-center cursor-pointer focus:outline-none">
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center border-2 rounded-xl border-dashed h-full space-y-3">
          {isDragReject && (
            <div className="flex flex-col items-center justify-center">
              <img src="/assets/incorrect.png" alt="PDF" className="w-16 h-16 mb-5" />
              <p>Attention! Only *.pdf will be accepted</p>
            </div>
          )}
          {!isDragAccept && !isDragReject ? (
            <div className="flex flex-col items-center justify-center">
              <img src="/assets/pdf.png" alt="PDF" className="w-12 h-16 mb-5" />
              <p>Drag &apos;n&apos; Drop Files Here</p>
              <p className="mt-2 text-base text-gray-400">(Only *.pdf will be accepted)</p>
              <p className="mt-2 text-base text-gray-400">Max Size: 10 MB</p>
            </div>
          ) : null}
          {isDragAccept && (
            <div className="flex flex-col items-center justify-center">
              <img src="/assets/correct.png" alt="PDF" className="w-16 h-16 mb-5" />
              <p>Attention! This *.pdf will be accepted</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
