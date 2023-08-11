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

    // favorites list
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    // remove favorite product function 
    const handleRemoveProduct = (productId)=>{
        setFavoriteProducts(favoriteProducts.filter((item)=>item.id !== productId));
    }

    const addToFavorite = (productId, reason)=>{
        const copyFavoriteProducts = [...favoriteProducts];
        const index = copyFavoriteProducts.findIndex((item)=>item.id === productId);

        //console.log(products.filter((item)=>item.id===productId))

        if(index === -1){
            let getCurrentProductInfo = products.filter((item)=>item.id === productId); // also possible using find method
            // console.log(getCurrentProductInfo);
            copyFavoriteProducts.push({
                title: getCurrentProductInfo[0].title,
                id: productId,
                reason: reason
            })
        }else{
            copyFavoriteProducts.find((item)=>item.id === productId).reason = reason;
        }
        setFavoriteProducts(copyFavoriteProducts)
    }

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
    // console.log(favoriteProducts);

    return (
        <Context.Provider value={{products, loading, favoriteProducts, addToFavorite, handleRemoveProduct}}>
            {children}
        </Context.Provider>
    )
}

export default ProductContext;