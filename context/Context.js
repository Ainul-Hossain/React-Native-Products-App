// create the context
// provide the context
// consume the context

import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const Context = createContext(null);

const ProductContext = ({children})=>{
    console.log('This line is from Product Context...');

    // list of products 
    const [products, setProducts] = useState([]);

    // maintaining our loading state
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);

        const getApiData = async ()=>{
            const apiResponse = await axios.get('https://dummyjson.com/products');
            const apiResponseData = await apiResponse.data;

            if(apiResponseData){
                setProducts(apiResponseData['products']);
                setLoading(false);
            }
        }

        getApiData();
    }, [])

    // console.log(products);

    return (
        <Context.Provider value={{products, loading}}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext;