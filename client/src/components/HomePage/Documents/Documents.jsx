import React, { useState } from 'react';
import Card from './Card';

const Documents = () => {
  const [documents] = useState([
    {
      id: 1,
      title: 'Title 1',
      sub: 'Sub Title 1',
      description: 'Fingerstache flexitarian street art 8-bit waistcoat.Distillery hexagon disrupt edison bulbche.',
    },
    {
      id: 2,
      title: 'Title 2',
      sub: 'Sub Title 2',
      description: 'Fingerstache flexitarian street art 8-bit waistcoat.Distillery hexagon disrupt edison bulbche.',
    },
    {
      id: 3,
      title: 'Title 3',
      sub: 'Sub Title 3',
      description: 'Fingerstache flexitarian street art 8-bit waistcoat.Distillery hexagon disrupt edison bulbche.',
    },
    {
      id: 4,
      title: 'Title 4',
      sub: 'Sub Title 4',
      description: 'Fingerstache flexitarian street art 8-bit waistcoat.Distillery hexagon disrupt edison bulbche.',
    },
  ]);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {
              documents.map((doc) => <Card key={doc.id} title={doc.title} sub={doc.sub} description={doc.description} />)
          }
        </div>
      </div>
    </section>
  );
};
export default Documents;
