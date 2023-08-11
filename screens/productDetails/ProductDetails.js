import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View, Modal, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ProductDetailsItem from '../../components/ProductDetailsItem/ProductDetailsItem';
import { Context } from '../../context/Context';

const ProductDetails = () => {
  console.log('This line is from Product Details Page...')

  // get data from previous screen
  const route = useRoute();
  const { productId, backgroundColor } = route.params;
  // console.log(productId);

  // maintaining our loading state
  const [loading, setLoading] = useState(false);

  // keeping api data
  const [productDetailsData, setProductDetailsData] = useState([]);

  // navigation button for modal from Product Details Page on the right side 
  const navigation = useNavigation();

  // modal visibility 
  const [modalVisible, setModalVisible] = useState(false);

  // reason - favorite
  const [reason, setReason] = useState('');

  // get addToFavorite function from context
  const {addToFavorite, favoriteProducts} = useContext(Context);

  const isCurrentProductOnFavoritePage = favoriteProducts.length>0 && favoriteProducts.find((item)=>item.id === productId) ? true: false;

  const handleOnChangeText = (e)=>{
    setReason(e);
  }

  useEffect(() => {
    setLoading(true);

    const getApiRes = async () => {
      const apiRes = await axios.get(`https://dummyjson.com/products/${productId}`);
      const apiResData = await apiRes.data;

      if (apiResData) {
        setProductDetailsData(apiResData);
        setLoading(false);
        // console.log(apiResData);
      }
    }

    getApiRes();
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button onPress={()=>setModalVisible(true)} title={isCurrentProductOnFavoritePage?'Update Favorites':'Add Favorites'} />
      }
    })
  }, [])

  if (loading) {
    return <ActivityIndicator color={'red'} size={'large'} />
  }

  // console.log(productDetailsData);

  return (
    <View>
      <ProductDetailsItem
        productDetailsData={productDetailsData}
        backgroundColor={backgroundColor}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.reasonTextInput} placeholder='Why You Like This Product?' onChangeText={handleOnChangeText} value={reason}/>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  addToFavorite(productId, reason);
                  setModalVisible(!modalVisible)
                }}>
                <Text style={styles.textStyle}>{isCurrentProductOnFavoritePage?'Update':'Add'}</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 2,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginRight: 5
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    marginTop: 10
  },
  reasonTextInput: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'green',
    padding: 5
  }
});

export default ProductDetails;