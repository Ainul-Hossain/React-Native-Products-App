import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Context } from '../../context/Context';

const FavoriteItem = ({ title, reason, id, handleRemoveProduct }) => {
  console.log('This line is from Favorite Item Single Component...');
  const { favoriteProducts } = useContext(Context);

  return (
    <View style={[styles.favoriteProductContainer, { borderRadius: 5 }]}>
      <Pressable onPress={()=>handleRemoveProduct(id)}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>{title}</Text>
        <Text style={styles.text}>{reason}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteProductContainer: {
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#0f2999',
    marginBottom: 10
  },

  text: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 10
  }
})

export default FavoriteItem;