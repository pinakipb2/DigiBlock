import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Loading from '../../../../Common/Loading/Loading';
import Pagination from '../UI/Pagination';
import Table from '../UI/Table';

const RevokedDocuments = () => {
  const objects = [];
  const instance = useSelector((state) => state.contract.instance);
  const requestorAddress = useSelector((state) => state.requestor.currentRequestor).account;
  // Data shown at table
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState(originalData);
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const revokedDocs = await instance.methods.getRequestorRevokedDocuments(requestorAddress).call();
      for (let i = 0; i < revokedDocs[0].length; i++) {
        if (revokedDocs[2][i] !== '0') {
          objects.push({
            id: i + 1,
            userAddress: revokedDocs[0][i],
            docType: revokedDocs[1][i],
            timestamp: new Date(parseInt(revokedDocs[2][i], 10) * 1000).toDateString(),
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
    const searchTerm = term.toLowerCase();
    if (searchTerm === '') {
      setTableData(originalData);
    } else {
      const filteredTable = originalData.filter(
        (row) => row.userAddress.toLowerCase().includes(searchTerm) || row.docType.toLowerCase().includes(searchTerm) || row.timestamp.toLowerCase().includes(searchTerm)
      );
      setTableData(filteredTable);
    }
  };

  return (
    <div className="px-6 pb-10">
      <div className="text-white flex justify-between items-center bg-gray-800 w-full text-xl p-4 mb-1.5">
        <div className="font-ubuntu">
          Revoked
          <span className="font-bold ml-2">Documents</span>
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
                <th className="p-2">User Address</th>
                <th className="p-2">Document Type</th>
                <th className="p-2">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <Table tableData={tableData} pagesVisited={pagesVisited} dataPerPage={dataPerPage} />
            </tbody>
          </table>
          {tableData.length === 0 ? <div className="mt-10 font-mono text-2xl text-red-500">NO MATCHING RESULTS FOUND</div> : <Pagination pageCount={pageCount} changePage={changePage} />}
        </div>
      )}
    </div>
  );
};

export default RevokedDocuments;
