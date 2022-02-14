import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveIcon from '@material-ui/icons/Remove';

import { useSelector, useDispatch } from "react-redux";

const columns = [
    { id: 'thumbnail', label: 'Product', minWidth: 100, html: 'img' },
    { id: 'name', label: '', minWidth: 120 },
    {
        id: 'price',
        label: 'Price',
        minWidth: 120,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'quantity',
        label: 'Quantity',
        minWidth: 170,
        align: 'center',
        html: 'quantity'
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 170,
        html: 'total'
    },
    {
        id: 'delete',
        label: '',
        minWidth: 100,
        align: 'center',
        html: 'buttons'
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    buttons: {
        display: 'flex',
    },
    allTotal : {
        width: 200,
        margin : '0 0 0 auto',
        padding: 15
    }
});


export default function Carts() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [allTotal,setAlltotal] = useState(0)
    
    const products = useSelector((store) => store.cartReducer.cart);
    const clickDel = (data) => {
        dispatch({ type: 'REMOVE_CART', data: data })
        console.log(data)
    };

    function setAll() {
        var total = 0
        products.map(( value ) => {
            total = total + value.price * value.quantity
            return(
                <>
                </>
            )
        })
        setAlltotal(total)
    }
    
    React.useEffect(() => {
        setAll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    function rowButtons(data) {
        return (
            <div className={classes.buttons}>
                <Button onClick={() => clickDel(data)}><DeleteForeverIcon color="secondary" /></Button>
            </div>
        )
    }

    function rowTotal(data) {
        const total = data.quantity * data.price
        return (
            <div className={classes.total}>
                {total.toLocaleString('en-US') }
            </div>
        )
    }

    function rowQuantity(data) {
        return (
            <div>
                <Button onClick={() => clickReduce(data)}><RemoveIcon/></Button>
                <span>{data.quantity}</span>
                <Button onClick={() => clickIncrease(data)}><AddOutlinedIcon/></Button>
            </div>
        )
    }

    function clickIncrease(data) {
        dispatch({ type: 'INCREASE_QUANTITY', data: data })
    }

    function clickReduce(data) {
        dispatch({ type: 'REDUCE_QUANTITY', data: data })
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
                        {products.map((row, i) => {
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
                                                {column.html === 'total' && rowTotal(row)}
                                                {column.html === 'quantity' && rowQuantity(row)}
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
                <div className={classes.allTotal}>
                    <b>All total :</b> {allTotal.toLocaleString('en-US') }đ
                </div> 
            </div>
        </Paper>
    );
}