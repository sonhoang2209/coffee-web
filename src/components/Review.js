import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();
    const [allTotal,setAlltotal] = React.useState(0)

    const products = useSelector((store) => store.cartReducer.cart);
    const information = useSelector((store) => store.userReducer.information);

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

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {products.map((product) => {
                    const total = product.price * product.quantity
                    return (
                        <ListItem className={classes.listItem} key={product.name}>
                            <ListItemText primary={product.name} secondary={product.price + 'đ / quantity:' + product.quantity} />
                            <Typography variant="body2">{total.toLocaleString('en-US')} đ</Typography>
                        </ListItem>
                    )
                })}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {allTotal.toLocaleString('en-US')} đ
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{information[0].fullName}</Typography>
                    <Typography gutterBottom>{information[0].address}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Payment details
                    </Typography>
                    <Grid container>
                        Cash
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}