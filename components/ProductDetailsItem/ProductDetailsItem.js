import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ProductDetailsItem = ({productDetailsData, backgroundColor}) => {
    console.log('This line is from Product Details Item...')
    // console.log(productDetailsData);

    const {rating, description, title, id, price, category} = productDetailsData;

    // console.log(`
    //     Brand: ${brand}
    //     DescriptIon: ${description}
    //     Name: ${title}
    //     Id: ${id}
    // `)

    return (
        <View style={[styles.container]}>
            <Text style={styles.textStyle}>{title}</Text>
            <Text style={styles.textStyle}>{description}</Text>
            <Text style={styles.textStyle}>{price}</Text>
            <Text style={styles.textStyle}>{rating}</Text>
            <Text style={styles.textStyle}>{category}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingHorizontal: 15,
        margin: 10,
        borderWidth: 1,
        borderColor: 'white',
    },

    textStyle: {
        fontSize: 20,
        paddingBottom: 12
    }
})

export default ProductDetailsItem;