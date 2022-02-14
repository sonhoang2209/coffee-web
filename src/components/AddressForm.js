import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector } from "react-redux";



export default function AddressForm() {
    const dispatch = useDispatch();

    const information = useSelector((store) => store.userReducer.information);

    const [user, setUser] = useState({
        fullName: information[0].fullName,
        address: information[0].address,
        phone :information[0].phone,
        email:information[0].email
    })

    const handleChange = (prop) => (event) => {
        prop === 'phone' ? setUser({ ...user, [prop]: Number(event.target.value) }) : setUser({ ...user, [prop]: event.target.value })
        // console.log(user)
    };

    const handleConfirm = () => {
        dispatch({ type: "ADD_ADDRESS", data: user });
        // console.log(information)
    };
    function handleSubmit(event) {
        event.preventDefault();
        handleConfirm()
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="fullName"
                            name="fullName"
                            label="Full name"
                            fullWidth
                            autoComplete="given-name"
                            defaultValue={user.fullName}
                            onChange={handleChange('fullName')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address line"
                            fullWidth
                            autoComplete="shipping address-line"
                            defaultValue={user.address}
                            onChange={handleChange('address')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="Phone"
                            fullWidth
                            autoComplete="Phone"
                            type='number'
                            defaultValue={user.phone}
                            onChange={handleChange('phone')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="shipping postal-code"
                            type='email'
                            defaultValue={user.email}
                            onChange={handleChange('email')}
                        />
                    </Grid>
                    <button onClick={handleConfirm} type="submit" className="btn btn-primary mb-3">Confirm address</button>
                </Grid>
            </form>
        </React.Fragment>
    );
}