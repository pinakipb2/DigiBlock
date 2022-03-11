import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../../../../Common/Loading/Loading';
import Pagination from '../../UI/Pagination';

const IssuerDocuments = () => {
  const objects = [];
  const instance = useSelector((state) => state.contract.instance);
  const issuerAddress = useSelector((state) => state.issuer.currentIssuer).account;
  // Data shown at table
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState(originalData);
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const issuerDocuments = await instance.methods.getDocsIssuedByIssuer(issuerAddress).call();
      for (let i = 0; i < issuerDocuments[0].length; i++) {
        objects.push({
          id: i + 1,
          userAddress: issuerDocuments[0][i],
          ipfsHash: issuerDocuments[1][i],
          docType: issuerDocuments[2][i],
          timestamp: new Date(parseInt(issuerDocuments[3][i], 10) * 1000).toDateString(),
        });
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
        (row) => row.userAddress.toLowerCase().includes(searchTerm) || row.ipfsHash.toLowerCase().includes(searchTerm) || row.docType.toLowerCase().includes(searchTerm) || row.timestamp.toLowerCase().includes(searchTerm)
      );
      setTableData(filteredTable);
    }
  };

  const showData = tableData.slice(pagesVisited, pagesVisited + dataPerPage).map((val, index) => (
    <tr key={val.id} className={index % 2 !== 0 ? 'bg-blue-100' : 'bg-white'}>
      <td className="font-ubuntu p-2">{val.id}</td>
      <td className="font-ubuntu p-2">{val.userAddress}</td>
      <td className="font-ubuntu p-2 flex items-center justify-center">
        <Link to={{ pathname: `https://ipfs.io/ipfs/${val.ipfsHash}` }} target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </td>
      <td className="font-ubuntu p-2">{val.docType}</td>
      <td className="font-ubuntu p-2">{val.timestamp}</td>
    </tr>
  ));

  return (
    <div className="px-6 pb-10">
      <div className="text-white flex justify-between items-center bg-gray-800 w-full text-xl p-4 mb-1.5">
        <div className="font-ubuntu">
          Manage
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
                <th className="p-2">Document</th>
                <th className="p-2">Document Type</th>
                <th className="p-2">Issue Timestamp</th>
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

export default IssuerDocuments;
