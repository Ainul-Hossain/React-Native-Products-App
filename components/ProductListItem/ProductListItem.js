import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

const ProductListItem = ({title, onPress, bgColor}) => {
    return (
        <View style={[styles.productItemOuterContainer, {backgroundColor: bgColor}]}>
            <Pressable android_ripple={{color:'#ced474'}} onPress={onPress} style={[styles.pressableView]}>
                <View style={styles.productItemInnerContainer}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    productItemOuterContainer: {
        flex: 1,
        margin: 16,
        height: 160, 
        borderRadius: 8
    }, 

    pressableView: {
        flex: 1,  
    },

    productItemInnerContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    }
})

export default ProductListItem;