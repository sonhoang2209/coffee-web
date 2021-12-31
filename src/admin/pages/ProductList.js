import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StickyHeadTable from '../components/Table';

import { useDispatch } from "react-redux";

import { getProductList, getCategoryList } from '../../reducers/cartReducer'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
    
}));

export default function ProductList() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductList())
        dispatch(getCategoryList())
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.root}>
            <Header title="Products" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <StickyHeadTable />
                    </Grid>
                    <Footer />
                </Container>
            </main>
        </div>
    )
}
