import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux";
import { deleteOneProduct } from '../../reducers/productReducer';
import { deleteOneOrder } from '../../reducers/orderReducer';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
    },
    popup: {

        backgroundColor: theme.palette.background.paper,
        textAlign: 'center'
    },
    button: {
        margin: 10,

    },
    popupWrapper: {
        padding: theme.spacing(1),
        boxShadow: "0 0 50px #ccc",
    }
}));

export default function SimplePopper({ data }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const clickCancel = () => {
        setAnchorEl(null)
    };
    const clickDel = (data) => {
        dispatch(deleteOneProduct(data))
        console.log(data)
        clickCancel()
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <Button aria-describedby={id} type="button" onClick={handleClick}>
                <DeleteForeverIcon color="secondary" />
            </Button>
            <Popper className={classes.popup} id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.popupWrapper}>
                    <div className={classes.paper}>
                        <p style={{ color: '#DC004E' }}>Are you sure you want to delete this product?</p>
                        <p>{data.name}</p>
                    </div>
                    <div className={classes.buttons}>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={() => clickDel(data._id)}>
                            DELETE
                        </Button>
                        <Button className={classes.button} variant="contained" onClick={clickCancel}>CANCEL</Button>
                    </div>
                </div>
            </Popper>
        </div>
    );
}

export function OderPopper({ data }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    const clickCancel = () => {
        setAnchorEl(null)
    };
    const clickDel = (data) => {
        dispatch(deleteOneOrder(data))
        clickCancel()
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
            <Button aria-describedby={id} type="button" onClick={handleClick}>
                <DeleteForeverIcon color="secondary" />
            </Button>
            <Popper className={classes.popup} id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.popupWrapper}>
                    <div className={classes.paper}>
                        <p style={{ color: '#DC004E' }}>Are you sure you want to delete this order?</p>
                        <p>{data.name}</p>
                    </div>
                    <div className={classes.buttons}>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={() => clickDel(data)}>
                            DELETE
                        </Button>
                        <Button className={classes.button} variant="contained" onClick={clickCancel}>CANCEL</Button>
                    </div>
                </div>
            </Popper>
        </div>
    );
}