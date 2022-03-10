import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Card from './Card';

const Stats = () => {
  const [count, setCount] = useState({
    users: 0,
    issuers: 0,
    requestors: 0,
    admins: 0,
  });
  const instance = useSelector((state) => state.contract.instance);
  useEffect(() => {
    const getCount = async () => {
      const userCount = await instance?.methods.usersCount().call();
      const issuerCount = await instance?.methods.issuersCount().call();
      const requestorCount = await instance?.methods.requestorsCount().call();
      const adminCount = await instance?.methods.adminsCount().call();
      setCount({ ...count, users: parseInt(userCount, 10), issuers: parseInt(issuerCount, 10), requestors: parseInt(requestorCount, 10), admins: parseInt(adminCount, 10) });
    };
    if (instance.methods.usersCount && instance.methods.issuersCount && instance.methods.requestorsCount && instance.methods.adminsCount) {
      getCount();
    }
  }, [instance]);
  const stats = [
    {
      id: 1,
      icon: 'fas fa-user-plus',
      color: 'bg-blue-500',
      text: 'Users',
      count: count.users,
    },
    {
      id: 2,
      icon: 'fas fa-user-tie',
      color: 'bg-green-500',
      text: 'Issuers',
      count: count.issuers,
    },
    {
      id: 3,
      icon: 'fas fa-user-check',
      color: 'bg-yellow-500',
      text: 'Requestors',
      count: count.requestors,
    },
    {
      id: 4,
      icon: 'fas fa-file-alt',
      color: 'bg-red-500',
      text: 'Admins',
      count: count.admins,
    },
  ];
  return (
    <section className="text-gray-600 body-font px-6">
      <div className="container">
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center">
          {stats.map(({ id, ...otherProps }) => (
            <Card key={id} {...otherProps} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Stats;
