import { useMemo, useState } from 'react'
import { getColumnWidth } from './utils';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import fakeData from './fakeProductsData';
import { Box } from '@mui/material';
import { Link } from 'react-router';
import { Button } from 'antd';

function Products() {

    const tableKey = 'productsTable';
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columnSizing, setColumnSizing] = useState({
        'name': getColumnWidth(tableKey, 'name', 180),
        'price': getColumnWidth(tableKey, 'price', 180),

        'country': getColumnWidth(tableKey, 'country', 180),
        'city': getColumnWidth(tableKey, 'city', 180),
        'company': getColumnWidth(tableKey, 'company', 180),

    });


    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',

            },
            {
                accessorKey: 'price',
                header: 'Price',

            },
            {
                accessorKey: 'country', //normal accessorKey
                header: 'Country',

            },
            {
                accessorKey: 'city',
                header: 'City',

            },
            {
                accessorKey: 'company',
                header: 'Company',

            },
            {
                accessorKey: 'company',
                header: 'Company',

            },
        ],
        [],
    );

    const handleColumnSizingChange = (tableKey, updater) => {
        setColumnSizing((prevSizing) => {
            const newSizing = typeof updater === 'function' ? updater(prevSizing) : updater;

            // Obtener los tamaños previamente guardados de localStorage para el tableKey especificado
            const savedWidths = JSON.parse(localStorage.getItem(tableKey) || '{}');

            // Actualizar los tamaños de las columnas
            Object.entries(newSizing).forEach(([columnKey, width]) => {
                savedWidths[columnKey] = { size: width }; // Guardar el tamaño de la columna en el formato deseado
            });

            // Guardar el objeto actualizado en localStorage usando el tableKey
            localStorage.setItem(tableKey, JSON.stringify(savedWidths));

            return newSizing;
        });
    };

    const table = useMaterialReactTable({
        columns,
        enableRowNumbers:true,
        data: fakeData,
        enableGlobalFilter: true,
        muiTableBodyCellProps: {
            sx: {
                whiteSpace: 'normal', // Enables text wrapping
                wordWrap: 'break-word', // Wraps long words if necessary
            },
        },

        enableColumnPinning: true,

        enableGlobalFilterModes: true,
        onColumnSizingChange: (updater) => handleColumnSizingChange(tableKey, updater),
        onPaginationChange: setPagination,
        initialState: {
            columnSizing,
            pagination: { pageSize: 30, pageIndex: 0 },
            showGlobalFilter: true,
            columnVisibility: { createdAt: false },
            density: 'compact'
        },

        enableColumnResizing: true,

        state: { pagination, columnSizing },
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: 'center',
                        gap: "24px",
                        padding: "8px",
                        flexWrap: "wrap",

                    }}
                >


                    <a href='/products' ><Button>Recargar Página</Button></a>
                    <Link to={'/'}><Button type="primary">
                        Ir a Empleados
                    </Button></Link>

                </Box>
            );
        },

        muiPaginationProps: {
            rowsPerPageOptions: [10, 30, 50, 80, 100, 150, 180],

        },
    });

    return (
        <>
            <div className='p-12' >
                <div>
                    <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-white">Lista de Productos</h1>
                </div>
                <div className="mt-6">
                    <MaterialReactTable table={table}></MaterialReactTable>
                </div>
            </div>
        </>
    )
}

export default Products