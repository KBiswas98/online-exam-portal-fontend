import { useTable } from "react-table";

function Table({ _data }) {
    const data = React.useMemo(() => _data, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "ingredient_common_name",
            },
            {
                Header: "Mark",
                accessor: "Sanskrit_name",
            },
            {
                Header: "Exam date",
                accessor: "Variation",
            },
        ],
        []
    );

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
            {...getTableProps()}
            style={{
                border: "solid 1px #f6f6f6",
                width: "70vw",
                textAlign: "center",
                borderRadius: 5,
            }}
        >
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: "solid 3px red",
                                    background: "rgba(15, 107, 255, 0.42)",
                                    color: "#000",
                                    fontWeight: "700",
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    textAlign: "center",
                                    borderBottomWidth: 5,
                                    borderColor: "#1D76DA",
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
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px 20px",
                                            border: "solid 1px gray",
                                            // background: "papayawhip",
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
