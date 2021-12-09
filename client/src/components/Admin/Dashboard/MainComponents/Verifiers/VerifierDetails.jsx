import React, { useState } from 'react';

import Pagination from '../UI/Pagination';
import Table from '../UI/Table';

const VerifierDetails = () => {
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
      <div className="text-white flex justify-between items-center bg-blue-800 w-full text-xl p-4 mb-1.5">
        <div className="font-ubuntu">
          Manage
          <span className="font-bold">Verifiers</span>
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
          <tbody className="text-center">
            <Table tableData={tableData} pagesVisited={pagesVisited} dataPerPage={dataPerPage} />
          </tbody>
        </table>
        {tableData.length === 0 ? <div className="mt-10 font-mono text-2xl text-red-500">NO MATCHING RESULTS FOUND</div> : <Pagination pageCount={pageCount} changePage={changePage} />}
      </div>
    </div>
  );
};

export default VerifierDetails;
