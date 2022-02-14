import {
    Routes,
    Route
} from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AllReducer from "./reducers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'

import LogIn from './admin/pages/LogIn';
import Dashboard from "./admin/pages/Dashboard";
import ProductList from "./admin/pages/ProductList";
import Product from "./admin/pages/Product";
import AddProduct from "./admin/pages/AddProduct";
import Detail from './pages/Detail'
import Orders from "./pages/Orders";
import AdminOrder from "./admin/pages/adminOrder";
import SignIn from "./pages/LogIn"

import "./css/header.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const persistedReducer = persistReducer(persistConfig, AllReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store)

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/Product/:ProductId" element={<Detail />} />
                    <Route path="/Orders" element={<Orders />} />

                    <Route path="/admin/" element={<Dashboard />} />
                    <Route path="/admin/Login" element={<LogIn />} />
                    <Route path="/admin/Products" element={<ProductList />}></Route>
                    <Route path="/admin/Products/:ProductId" element={<Product />} />
                    <Route path="/admin/Products/add" element={<AddProduct />} />
                    <Route path="/admin/orders" element={<AdminOrder />} />
                </Routes>
            </PersistGate>
        </Provider>
        
    );
}

export default App;
