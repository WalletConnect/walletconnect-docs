import React from 'react'

export const Table = ({ headers, data }) => {
  return (
    <table className="tableMatrix">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={`${index}-th-${header}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={`${index}-tr`}>
            {Object.values(row).map(cell => (
              <td key={`${index}-td-${cell.code ?? cell}`}>
                {cell.code ? (
                  <code>{cell.code}</code>
                ) : (
                  cell.split(/\r\n|\r|\n/g).map(line => (
                    <>
                      {line}
                      <br />
                    </>
                  ))
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
