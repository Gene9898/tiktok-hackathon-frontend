import React, { useEffect, useState } from 'react';

const dummyData = [
  {
    id: 1,
    title: 'Report 1',
    user: 'User 1',
    dateCreated: '2023-09-07',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 2,
    title: 'Report 2',
    user: 'User 2',
    dateCreated: '2023-09-08',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 3,
    title: 'Report 3',
    user: 'User 3',
    dateCreated: '2023-09-09',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleRowClick = (report) => {
    setSelectedReport(report);
  };

  const closePopup = () => {
    setSelectedReport(null);
  };

  return (
    <div>
      {selectedReport && (
        <div className="text-black fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className='mb-2'>
                <h4>{selectedReport.title}</h4>
            </div>
            <p>User: {selectedReport.user}</p>
            <p>Date Created: {selectedReport.dateCreated}</p>
            <p>Description: {selectedReport.description}</p>
            <button
              className="mt-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <table className="min-w-full bg-gray-800 text-white">
        <thead className="bg-gray-700 text-left text-sm leading-4 font-medium uppercase">
          <tr>
            <th className="px-6 py-3">Report ID</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr
              className="bg-gray-600 text-black border border-gray-500 text-white hover:bg-slate-500 cursor-pointer"
              key={item.id}
              onClick={() => handleRowClick(item)}
            >
              <td className="px-6 py-4 whitespace-no-wrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.user}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{item.dateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
