import React from "react";
import { useTable } from "react-table";

function Table({ _data, column }) {
     const data = React.useMemo(() => _data, []);

     const columns = React.useMemo(() => column, []);

     const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
     } = useTable({ columns, data });

     // console.log(_data);
     return (
          <table
               className="card"
               {...getTableProps()}
               style={{
                    padding: 0,
                    borderColor: "rgba(0, 0, 0, 0.9)",
                    backgroundColor: "#fff",
                    width: "60vw",
                    textAlign: "center",
                    borderRadius: 5,
               }}
          >
               <thead
                    style={{
                         background: "rgba(0, 0, 0, 0.05)",
                         borderRadius: 4,
                    }}
               >
                    {headerGroups.map((headerGroup) => (
                         <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                   <th
                                        {...column.getHeaderProps()}
                                        style={{
                                             //  background: "rgba(0, 0, 0, 0.05)",
                                             color: "#000",
                                             fontWeight: "700",
                                             paddingTop: 10,
                                             paddingBottom: 10,
                                             textAlign: "center",
                                             minWidth: 150,
                                        }}
                                   >
                                        {column.render("Header")}
                                   </th>
                              ))}
                         </tr>
                    ))}
               </thead>
               <tbody {...getTableBodyProps()} style={{ minWidth: 1000 }}>
                    {rows.map((row, ind) => {
                         prepareRow(row);
                         return (
                              <tr {...row.getRowProps()}>
                                   {row.cells.map((cell, index) => {
                                        return (
                                             <td
                                                  {...cell.getCellProps()}
                                                  style={{
                                                       padding: "10px 20px",
                                                       fontWeight: "300",
                                                       fontSize: 14,
                                                       borderBottom:
                                                            "solid 1px rgba(0, 0, 0, 0.05)",
                                                  }}
                                             >
                                                  {cell.render("Cell")}
                                             </td>
                                        );
                                   })}
                              </tr>
                         );
                    })}
               </tbody>
          </table>
     );
}

export default Table;
