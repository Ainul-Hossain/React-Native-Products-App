import { useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Context } from '../../context/Context';
import FavoriteItem from '../../components/FavoriteItem/FavoriteItem';

const Favorites = () => {
    const {favoriteProducts, handleRemoveProduct} = useContext(Context);
    // console.log(favoriteProducts);

    if(!favoriteProducts){
        return (
            <View style={styles.noFavorites}>
                <Text style={styles.noFavoritesText}> 
                    No Favorite Products Added!
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.favoriteMainContainer}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={favoriteProducts}
                renderItem={(itemData)=><FavoriteItem handleRemoveProduct={handleRemoveProduct} id={itemData.item.id} title={itemData.item.title} reason={itemData.item.reason}/>}
                keyExtractor={(itemData)=>itemData.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    noFavorites: {
        padding: 20,
        alignItems: 'center'
    },

    noFavoritesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },

    favoriteMainContainer: {
        paddingHorizontal: 25,
        paddingVertical: 16
    }
})

export default Favorites;