import React from 'react';

const Info = () => {
  const data = [
    {
      id: 1,
      title: 'Register Yourself',
      color: '#1A1EC5',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20" fill="#1A1EC5">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" fillRule="evenodd" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Get Documents',
      color: '#f7992f',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20" fill="#f7992f">
          <path
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
            fillRule="evenodd"
          />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Search Documents',
      color: '#f2cf0a',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 20 20" fill="#f2cf0a">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
          <path d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Verify Yourself',
      color: '#f2480a',
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 20 20" fill="#f2480a">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          />
        </svg>
      )
    }
  ];
  return (
    <div className="text-center items-center bg-blue1 pt-20 pb-10 text-white">
      <h1 className="font-bold text-3xl mb-10 font-roboto">How It Works?</h1>
      <div className="flex justify-evenly items-center mb-6">
        {
          data.map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col justify-center items-center">
                <div className="rounded-full p-6 bg-gray-50 h-36 w-36 flex justify-center items-center shadow-2xl">
                  {item.svg}
                </div>
                <h1 className="text-lg title-font font-bold my-3 font-ubuntu">{item.title}</h1>
              </div>
              {
                item.id !== data.length ? <i className="fas fa-arrow-right text-3xl ml-24 mb-10" /> : null
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Info;
