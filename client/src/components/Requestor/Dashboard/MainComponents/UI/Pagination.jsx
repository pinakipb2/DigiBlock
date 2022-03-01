import React from 'react';

import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, changePage }) => (
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
    disabledLinkClassName="show-disabled-cursor-pagination bg-gray-500 text-white"
    activeClassName="bg-prime"
    activeLinkClassName="text-white"
    breakClassName="p-2.5 m-0.5 rounded border border-prime text-prime hover:bg-prime hover:text-white"
  />
);

export default Pagination;
