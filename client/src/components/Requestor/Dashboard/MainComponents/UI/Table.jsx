import React from 'react';

const Table = ({ tableData, pagesVisited, dataPerPage }) => {
  // JSX variable to show data in table page-wise
  const showData = tableData.slice(pagesVisited, pagesVisited + dataPerPage).map((val, index) => (
    <tr key={val.id} className={index % 2 !== 0 ? 'bg-blue-100' : 'bg-white'}>
      <td className="font-ubuntu py-3">{val.id}</td>
      <td className="font-ubuntu">{val.userAddress}</td>
      <td className="font-ubuntu">{val.docType}</td>
      <td className="font-ubuntu">{val.timestamp}</td>
    </tr>
  ));
  return <>{showData}</>;
};

export default Table;
