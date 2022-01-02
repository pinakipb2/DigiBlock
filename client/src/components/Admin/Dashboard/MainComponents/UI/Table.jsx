import React from 'react';

const Table = ({ tableData, pagesVisited, dataPerPage, user, issuer }) => {
  // JSX variable to show data in table page-wise
  const showData = tableData.slice(pagesVisited, pagesVisited + dataPerPage).map((val, index) => (
    <tr key={val.id} className={index % 2 !== 0 ? 'bg-blue-100 ' : 'bg-white'}>
      <td className="font-ubuntu">{val.id}</td>
      <td className="font-ubuntu">{val.name}</td>
      {/* user doesn't require master key so no email required */}
      {user ? null : <td className="font-ubuntu">{val.email}</td>}
      <td className="font-ubuntu">{val.address}</td>
      {
        !issuer && (
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
        )
      }
    </tr>
  ));
  return <>{showData}</>;
};

export default Table;
