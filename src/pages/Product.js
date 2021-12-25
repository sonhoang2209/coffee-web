import React from 'react';
import { Image } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%"
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
    padding: {
        display: 'flex',
        width: "100%",
        flexDirection: "column",
        margin: theme.spacing(1)
    },
    input: {
        margin: 10
    }
    ,
    select: {
        width: 300
    }
}));

export default function Product() {
    const { state } = useLocation();
    const { id } = state;
    const classes = useStyles();

    const product = useSelector((store) => store.cartReducer.products.filter(word => word._id === id));
    const categories = useSelector((store) => store.cartReducer.categories);

    const [values, setValues] = React.useState(product[0]);

    const handleChange = (prop) => (event) => {
        prop === 'price' ? setValues({ ...values, [prop]: Number(event.target.value) }) : setValues({ ...values, [prop]: event.target.value })
    };
    const update = () => {
        console.log(values)
    };

    return (
        <div className={classes.root}>
            <Header title="Product Detail" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <form className={classes.padding} noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4} lg={3}>
                                    <img src={values.thumbnail ? values.thumbnail : "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"} width="300" height='305' />
                                    <TextField
                                        label="Thumbnail"
                                        fullWidth
                                        id="thumbnail"
                                        name="thumbnail"
                                        defaultValue={values.thumbnail}
                                        autoFocus
                                        required
                                        className={classes.input}
                                        onChange={handleChange('thumbnail')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={8} lg={9}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        id="name"
                                        name="name"
                                        defaultValue={values.name}
                                        autoFocus
                                        required
                                        className={classes.input}
                                    />
                                    <FormControl fullWidth className={classes.input}>
                                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                                        <Input
                                            type='number'
                                            id="standard-adornment-amount"
                                            defaultValue={values.price}
                                            onChange={handleChange('price')}
                                            startAdornment={<InputAdornment position="start">đ</InputAdornment>}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.input}>
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.type_id}
                                            onChange={handleChange('type_id')}
                                            className={classes.select}
                                        >
                                            {
                                                categories.map((e, i) => {
                                                    return <MenuItem value={e.type_id} key={i}>{e.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        id="description"
                                        name="description"
                                        defaultValue={values.description}
                                        autoFocus
                                        className={classes.input}
                                        multiline
                                        rows={3}
                                    />
                                    <TextField
                                        label="Slug"
                                        fullWidth
                                        id="slug"
                                        name="slug"
                                        defaultValue={values.slug}
                                        autoFocus
                                        className={classes.input}
                                    />
                                </Grid>
                            </Grid>


                        </form>
                        <Button variant="contained" color="primary" onClick={update} className={classes.input}>
                            Update
                        </Button>
                    </Grid>
                    <Footer />
                </Container>
            </main>
        </div>
    )
}
