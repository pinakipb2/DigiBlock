import React, { useState, useEffect } from 'react';

import { IconButton } from '@chakra-ui/react';
import Tippy from '@tippyjs/react';
import { FaHistory } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import Loading from '../../../../Common/Loading/Loading';
import Pagination from '../UI/Pagination';
import manageRequest from '../Utils/ManageRequest';

const AccessGranted = () => {
  const objects = [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const instance = useSelector((state) => state.contract.instance);
  const userAddress = useSelector((state) => state.user.currentUser).account;
  // Data shown at table
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState(originalData);
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const acceptedDocs = await instance.methods.getUserAcceptedDocuments(userAddress).call();
      for (let i = 0; i < acceptedDocs[0].length; i++) {
        if (acceptedDocs[2][i] !== '0') {
          objects.push({
            id: i + 1,
            requestorAddress: acceptedDocs[0][i],
            docType: acceptedDocs[1][i],
            timestamp: new Date(parseInt(acceptedDocs[2][i], 10) * 1000).toDateString(),
            epoch: acceptedDocs[2][i],
          });
        }
      }
      setOriginalData(objects);
      setTableData(objects);
      setIsComponentLoading(false);
    };
    func();
  }, [instance]);

  // Current Page Number
  const [pageNumber, setPageNumber] = useState(0);
  // Number of rows per page
  const dataPerPage = 6;
  // Number of pages visited
  const pagesVisited = pageNumber * dataPerPage;
  // Total number of pages
  const pageCount = Math.ceil(tableData.length / dataPerPage);
  // Function to change page number

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // function to search in table
  const searchTable = (term) => {
    console.log(term);
    const searchTerm = term.toLowerCase();
    if (searchTerm === '') {
      setTableData(originalData);
    } else {
      const filteredTable = originalData.filter(
        (row) => row.requestorAddress.toLowerCase().includes(searchTerm) || row.docType.toLowerCase().includes(searchTerm) || row.timestamp.toLowerCase().includes(searchTerm)
      );
      setTableData(filteredTable);
    }
  };

  const showData = tableData.slice(pagesVisited, pagesVisited + dataPerPage).map((val, index) => (
    <tr key={val.id} className={index % 2 !== 0 ? 'bg-blue-100' : 'bg-white'}>
      <td className="font-ubuntu p-2">{val.id}</td>
      <td className="font-ubuntu p-2">{val.requestorAddress}</td>
      <td className="font-ubuntu p-2">{val.docType}</td>
      <td className="font-ubuntu p-2">{val.timestamp}</td>
      <td className="font-ubuntu p-2">
        <Tippy
          key={val.id}
          content={<span className="w-auto p-2 m-2 min-w-max bg-gray-900 text-white left-14 rounded-md shadow-md text-xs font-bold transition-all duration-100 origin-left">Revoke</span>}
        >
          <IconButton icon={<FaHistory />} colorScheme="red" isLoading={loading} onClick={() => manageRequest(val, 1, 3, setLoading, instance, dispatch, userAddress)} />
        </Tippy>
      </td>
    </tr>
  ));

  return (
    <div className="px-6 pb-10">
      <div className="text-white flex justify-between items-center bg-gray-800 w-full text-xl p-4 mb-1.5">
        <div className="font-ubuntu">
          Access
          <span className="font-bold ml-2">Granted</span>
        </div>
        <div className="flex justify-evenly items-center">
          <div className="mr-6 bg-white rounded-full text-black">
            <i className="fas fa-search mx-2" />
            <input
              type="search"
              placeholder="Search"
              className="p-1 w-44 rounded-full outline-none"
              onChange={(event) => {
                searchTable(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {isComponentLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <table className="w-full border border-black shadow-xl">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-2">SNo</th>
                <th className="p-2">Requestor Address</th>
                <th className="p-2">Document Type</th>
                <th className="p-2">Timestamp</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">{showData}</tbody>
          </table>
          {tableData.length === 0 ? <div className="mt-10 font-mono text-2xl text-red-500">NO MATCHING RESULTS FOUND</div> : <Pagination pageCount={pageCount} changePage={changePage} />}
        </div>
      )}
    </div>
  );
};

export default AccessGranted;
