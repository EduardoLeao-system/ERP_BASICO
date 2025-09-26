import React from 'react';

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-3xl backdrop-blur-lg bg-gray-800/50 shadow-lg">
    <table className="min-w-full text-white/90">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-white/80 glass-header">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-700 hover:bg-gray-800/60 transition-colors duration-300">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
