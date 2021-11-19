import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Global, css } from '@emotion/react';

const IssuerDetails = () => {
  const objects = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 120; i++) {
    objects.push({
      id: i + 1,
      name: (Math.random() + 1).toString(36).substring(2),
      email: `${(Math.random() + 1).toString(36).substring(7)}@abc.com`,
      address: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      status: Math.round(Math.random()),
    });
  }

  // Original data
  const [originalData] = useState(objects);

  // Data shown at table
  const [tableData, setTableData] = useState(originalData);
  // Current Page Number
  const [pageNumber, setPageNumber] = useState(0);
  // Number of rows per page
  const dataPerPage = 6;
  // Number of pages visited
  const pagesVisited = pageNumber * dataPerPage;

  // JSX variable to show data in table page-wise
  const showData = tableData.slice(pagesVisited, pagesVisited + dataPerPage).map((val, index) => (
    <tr key={val.id} className={index % 2 !== 0 ? 'bg-blue-100 ' : 'bg-white'}>
      <td className="font-ubuntu">{val.id}</td>
      <td className="font-ubuntu">{val.name}</td>
      <td className="font-ubuntu">{val.email}</td>
      <td className="font-ubuntu">{val.address}</td>
      <td>
        {val.status ? (
          <div className="flex w-24 m-auto mt-3 bg-green-500 rounded-md px-2 py-1 mb-2 justify-center items-center">
            <div className="text-white mr-2 font-semibold text-sm">Verified</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="flex w-32 m-auto mt-3 bg-red-500 rounded-md px-2 py-1 mb-2 justify-center items-center">
            <div className="text-white mr-2 font-semibold text-sm">Not Verified</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </td>
    </tr>
  ));

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
      const filteredTable = originalData.filter((row) => row.name.toLowerCase().includes(searchTerm) || row.email.toLowerCase().includes(searchTerm) || row.address.toLowerCase().includes(searchTerm));
      setTableData(filteredTable);
    }
  };

  return (
    <div className="px-6 pb-10">
      <Global
        styles={css`
          .show-disabled-cursor {
            cursor: not-allowed;
          }
        `}
      />
      <div className="text-white flex justify-between items-center bg-blue-800 w-full text-xl p-4 mb-1.5">
        <div className="font-ubuntu">
          Manage
          {' '}
          <span className="font-bold">Issuers</span>
        </div>
        <div className="bg-white rounded-full text-black">
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
      <div className="flex flex-col justify-center items-center">
        <table className="w-full border border-black shadow-xl">
          <thead className="bg-black text-white">
            <tr>
              <th>SNo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Wallet Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center">{showData}</tbody>
        </table>
        {tableData.length === 0 ? (
          <div className="mt-10 font-mono text-2xl text-red-500">NO MATCHING RESULTS FOUND</div>
        ) : (
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={changePage}
            className="flex justify-center items-center list-none h-10 w-4/5 mt-10"
            pageClassName="p-2.5 m-0.5 rounded border border-prime text-prime hover:bg-prime hover:text-white"
            previousClassName="text-prime"
            previousLinkClassName="p-2.5 m-0.5 rounded border border-gray-500 hover:bg-prime hover:text-white"
            nextClassName="text-prime"
            nextLinkClassName="p-2.5 m-0.5 rounded border border-gray-500 hover:bg-prime hover:text-white"
            disabledClassName="text-white"
            disabledLinkClassName="show-disabled-cursor bg-gray-500 text-white"
            activeClassName="bg-prime"
            activeLinkClassName="text-white"
            breakClassName="p-2.5 m-0.5 rounded border border-prime text-prime hover:bg-prime hover:text-white"
          />
        )}
      </div>
    </div>
  );
};

export default IssuerDetails;
