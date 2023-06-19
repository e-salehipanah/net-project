import React from 'react';
import { useAsync } from 'react-use';
import { useTable } from 'react-table';
import './table.scss';

function MyTable() {
    const { loading, error, value: data } = useAsync(async () => {
        const response = await fetch('http://localhost:5000/api/form');
        return response.json();
    });

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Email',
                accessor: 'email'
            },
            {
                Header: 'Address',
                accessor: 'address'
            }
        ],
        []
    );

    const tableInstance = useTable({
        columns,
        data: data ?? []
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div className='my-5'>
            <h1 className='my-5'>latest signup</h1>
            {(data && data.length > 0) &&
                < div >
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return <tr {...row.getRowProps()}>{row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}</tr>;
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div >
    );
}

export default MyTable;
