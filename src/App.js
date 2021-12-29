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

import LogIn from './pages/LogIn';
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";

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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Login" element={<LogIn />} />
                    <Route path="/Products" element={<ProductList />}></Route>
                    <Route path="/Products/:ProductId" element={<Product />} />
                    <Route path="/Products/add" element={<AddProduct />} />
                </Routes>
            </PersistGate>
        </Provider>
        
    );
}

export default App;
