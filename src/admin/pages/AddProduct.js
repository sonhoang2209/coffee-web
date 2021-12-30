import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from "react-redux";

import { addOneProduct } from '../../reducers/cartReducer';

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
    },
    select: {
        width: 300
    },
    thumbnail: {
        width:300,
        height:310
    }
}));

export default function AddProduct() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const categories = useSelector((store) => store.cartReducer.categories);

    const [values, setValues] = React.useState({
        name:"",
        price:'',
        description:'',
        slug:'',
        thumbnail:'',
        type_id: 0,
        images: []
    });

    const handleChange = (prop) => (event) => {
        prop === 'price' ? setValues({ ...values, [prop]: Number(event.target.value) }) : setValues({ ...values, [prop]: event.target.value })
        console.log(values)
    };
    const update = () => {
        dispatch(addOneProduct({values}));
        // updateProduct(values)
        
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
                                    <div className={classes.thumbnail}>
                                        <img src={values.thumbnail ? values.thumbnail : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADdCAMAAACc/C7aAAAAaVBMVEXDw8MAAADGxsaXl5fJycnMzMxSUlKRkZF1dXV5eXnCwsIFBQWlpaV+fn66urqurq5dXV1sbGxMTEyKiopXV1czMzOcnJwaGhqoqKiEhIQlJSUrKysODg5mZmZHR0ezs7M7OzsVFRU5OTmFwHepAAAC+klEQVR4nO3bi1KjMBSAYXIarIbea2uttVXf/yE36Q0qobrITHP0/2Z2Zt2xDP+GQEDMMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQ56dCtY+JcZge9zgzsrXvipGc61EtzLO29KbpKLMx9mkPpI83H410XFiblyGFufy7Ph0lHPnSya/aByFuqRv7sSqchUvwV83k4EHFtt6QhcrwOl4GXZdv9VBApq3CdK/w1c9nykNUQ+XK6pG/abin5SFmWy5Z+u6FMP7K6unttt6cKIqflSE4a9tQd/zRtKflI6ZeRw6Y9deFS2ryl5COzUXkzMWoIcZm45bixUkGkfd6PormyyBMZPxkzaVouKIjM7PAwjtPm/XRP4Rse8/hgaoh0djzdbl9XeePJxc7CUBdmHi/REOkPx3Bb2DTlnOwP6L34vNQReZ3szqffRXRa/oJIcetzpJnksS2pj3T5pPrIqmfr6wL9kbZvynWf/8uuPi21Rzrxa4WijCzMW/0j6iKdV/lSZPH5Ges0V3+4flqi+uV77Ql07QmCtkg7GlcumM4uI0/ZC+UjGe67FpVl+qhWGGw/f0pRpIS99aeWjTtV2rdopBleTktNkZkMwvmzMHf20BCaY42FWV3MXFWR2eZY8ezvpY/N8aF8UhuZz84jtV+Iu/d4YfiGu+oHFUX6e43i1LDODs1FfCT9P8+lXN7piZRxNWOS23nTOB7syvsRPZHZ+qKhv2uckMfBLqelmsjLew1/anlpOlbLwT5vSUeks/2rQVG9U5eSyLC0+f+3JE53XToiRT6+OjhjPjRFunz6dVHM9DAtVURG7zW+ZbAfSw2R0mpCHvi1vFMRabctC/1/zdaKisjTTwnaRIYfhCmIdHbQunF/Rl5J8pEizfca37Pxkzr5yNnXHdfNJPGRHNrRvP9D81HqkbnNO5D2W5K//X1XFyK7kuyby3/iHXTp8rcJVmk2/onfCwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALi1f4DsKck70eEzAAAAAElFTkSuQmCC"} width="300" height='305' alt={values.name} />
                                    </div>
                                    <TextField
                                        label="Thumbnail"
                                        fullWidth
                                        id="thumbnail"
                                        name="thumbnail"
                                        defaultValue={values.thumbnail}
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
                                        onChange={handleChange('name')}
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
                                        
                                        className={classes.input}
                                        multiline
                                        rows={3}
                                        onChange={handleChange('description')}
                                    />
                                    <TextField
                                        label="Slug"
                                        fullWidth
                                        id="slug"
                                        name="slug"
                                        defaultValue={values.slug}
                                        
                                        className={classes.input}
                                        onChange={handleChange('slug')}
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
