import React, { useState } from 'react';
import Card from './Card';

const Documents = () => {
  const [documents] = useState([
    {
      id: 1,
      image: '/assets/birthCertificate.png',
    },
    {
      id: 2,
      image: '/assets/XIICertificate.png',
    },
    {
      id: 3,
      image: '/assets/voterID.png',
    },
    {
      id: 4,
      image: '/assets/deathCertificate.png',
    },
  ]);
  return (
    <section className="text-gray-600 body-font">
      <div className="text-center pt-16 mb-3 text-4xl font-bold text-prime font-roboto">Documents</div>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {
              documents.map((doc) => <Card key={doc.id} image={doc.image} />)
          }
        </div>
      </div>
    </section>
  );
};
export default Documents;
