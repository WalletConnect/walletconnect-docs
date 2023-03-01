import React from "react";

export const Table = ({ headers, data }) => {
  return (
    <table className="tableMatrix">
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={Object.keys(row)[0]}>
            {Object.values(row).map((cell) => (
              <td key={cell}>{cell.code ? <code>{cell.code}</code> : cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
