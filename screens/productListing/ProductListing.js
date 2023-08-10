import React, { useContext } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, FlatList } from 'react-native';
import { Context } from '../../context/Context';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import { useNavigation } from '@react-navigation/native';

const createRandomColor = ()=>{
    let letters = '0123456789ABCDEF';
    let color = '#';

    for(let i = 0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }

    return color;
}

const ProductListing = () => {
    const {products, loading} = useContext(Context);

    if(loading){
        return <ActivityIndicator style={styles.loader} color='red' size="large"/>
    }

    const navigation = useNavigation();

    const handlePress = ()=>{
        navigation.navigate('ProductDetails')
    }
    
    return (
        <View>
            <FlatList
                data={products}
                renderItem={(itemData)=>(
                    <ProductListItem title={itemData.item.title} bgColor={createRandomColor()} onPress={handlePress}/>    
                )}
                keyExtractor={(itemData)=>itemData.id}
                numColumns={2}
            />
            <Text>Product Listing Page</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductListing;