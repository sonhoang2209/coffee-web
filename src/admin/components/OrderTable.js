import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { OderPopper } from './Popup';
import { getOrderList } from '../../reducers/orderReducer';

const columns = [
    { id: 'fullName', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100},
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'date',
        label: 'date',
        minWidth: 200,
        align: 'center',
        // format: (value) => value.toString(),
    },
    {
        id: 'delete',
        label: '',
        minWidth: 200,
        align: 'center',
        html: 'buttons'
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 550,
    },
    buttons: {
        display: 'flex',
    }
});

function OrderTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    let navigate = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const orders = useSelector((store) => store.orderReducer.order);

    const clickEdit = (data) => {
        navigate(`/admin/order/${data}`, { state: { id: data } })
    };

    useEffect(() => {
        dispatch(getOrderList())
    },[]) 

    function rowButtons(data) {
        return (
            <div className={classes.buttons}>
                <Button onClick={() => clickEdit(data._id)}><EditIcon color="primary" /></Button>
                <OderPopper data={data} />
            </div>
        )
    }

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    {columns.map((column) => {
                                        const id = column.id
                                        const value = row[id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' && column.format(value)}
                                                {!column.html && !column.format && value}
                                                {column.html === 'buttons' && rowButtons(row)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </Paper>
    );
}

export default OrderTable;