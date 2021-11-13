import React, { useState } from 'react';
import Card from './Card';

const Stats = () => {
  const [stats] = useState([
    {
      id: 1,
      icon: 'fas fa-user-plus',
      color: 'bg-blue-500',
      text: 'Users',
      count: 100,
    },
    {
      id: 2,
      icon: 'fas fa-user-tie',
      color: 'bg-green-500',
      text: 'Issuers',
      count: 100,
    },
    {
      id: 3,
      icon: 'fas fa-user-check',
      color: 'bg-yellow-500',
      text: 'Verifiers',
      count: 100,
    },
    {
      id: 4,
      icon: 'fas fa-file-alt',
      color: 'bg-red-500',
      text: 'Documents',
      count: 100,
    },
  ]);
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
