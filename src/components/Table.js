import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'thumbnail', label: 'Thumbnail', minWidth: 100, html: 'img' },
    {
        id: 'price',
        label: 'Price',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'description',
        label: 'description',
        minWidth: 170,
        align: 'center',
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
        maxHeight: 560,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    // const dispatch = useDispatch();

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

    const products = useSelector((store) => store.cartReducer.products);

    const clickEdit = (data) => {
        console.log("this edit: ", data)
        navigate(`/products/${data}`,{state: { id: data }})
    };

    const clickDel = (data) => {
        console.log("this del: ", data)
    };

    function rowButtons(data) {
        return (
            <div>
                <Button onClick={() => clickEdit(data._id)}><EditIcon color="primary" /></Button>
                <Button onClick={() => clickDel(data._id)}><DeleteForeverIcon color="secondary" /></Button>
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
                    {/* dataCoffee.length < 0 ? console.log(dataCoffee.length) :  */}
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    {columns.map((column) => {
                                        const id  = column.id
                                        const value = row[id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.html === 'img' && <img src={value} alt="" width="150" height="150" />}
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
                {/* <div>
                    <input></input>
                </div> */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </Paper>
    );
}