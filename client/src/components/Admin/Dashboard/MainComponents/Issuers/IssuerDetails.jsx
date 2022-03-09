import React, { useState, useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { allIssuers } from '../../../../../api/Issuer/index';
import Loading from '../../../../Common/Loading/Loading';
import AddIssuerDrawer from '../UI/AddIssuerDrawer';
import Pagination from '../UI/Pagination';
import Table from '../UI/Table';

const IssuerDetails = () => {
  const objects = [];
  const instance = useSelector((state) => state.contract.instance);
  // Data shown at table
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState(originalData);
  const [isComponentLoading, setIsComponentLoading] = useState(true);

  useEffect(() => {
    const func = async () => {
      const issuers = await allIssuers();
      for (let i = 0; i < issuers.data.length; i++) {
        objects.push({
          id: i + 1,
          name: issuers.data[i].orgName,
          address: issuers.data[i].address,
          docType: issuers.data[i].docType,
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

  const { isOpen: isOpenAddIssuer, onOpen: onOpenAddIssuer, onClose: onCloseAddIssuer } = useDisclosure();

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
        (row) => row.name.toLowerCase().includes(searchTerm) || row.address.toLowerCase().includes(searchTerm) || row.docType.filter((docs) => docs.toLowerCase().includes(searchTerm)).length > 0
      );
      setTableData(filteredTable);
    }
  };

  return (
    <div className="px-6 pb-10">
      <div className="text-white flex justify-between items-center bg-gray-800 w-full text-xl p-4 mb-1.5">
        <div className="font-ubuntu">
          Manage
          <span className="font-bold">Issuers</span>
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
          <div role="button" className="flex bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-md px-2 py-1 justify-center items-center" onClick={onOpenAddIssuer}>
            <i className="fas fa-plus-circle mr-3 p-1" />
            <div className="text-white mr-2 font-semibold text-base">Add Issuer</div>
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
                <th>SNo</th>
                <th>Organization Name</th>
                <th>Wallet Address</th>
                <th>Document Types</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <Table tableData={tableData} pagesVisited={pagesVisited} dataPerPage={dataPerPage} issuer />
            </tbody>
          </table>
          {tableData.length === 0 ? <div className="mt-10 font-mono text-2xl text-red-500">NO MATCHING RESULTS FOUND</div> : <Pagination pageCount={pageCount} changePage={changePage} />}
        </div>
      )}
      <AddIssuerDrawer isOpenAddIssuer={isOpenAddIssuer} onCloseAddIssuer={onCloseAddIssuer} />
    </div>
  );
};

export default IssuerDetails;
