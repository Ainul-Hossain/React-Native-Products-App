import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProductListing from './screens/productListing/ProductListing';
import Favorites from './screens/favorites/Favorites';
import ProductDetails from './screens/productDetails/ProductDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductContext from './context/Context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = ()=>{
  return (
    <Tab.Navigator>
      <Tab.Screen options={{title: 'Product Lists', headerTitleAlign: 'center'}} name='ProductListing' component={ProductListing} />
      <Tab.Screen options={{title: 'Favorites'}} name='Favorites' component={Favorites} />
    </Tab.Navigator>
  )
}

export default function App() {
  console.log('Everything is fine...');

  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#fff' },
              contentStyle: {backgroundColor: '#097900'}
            }}
          >
            <Stack.Screen 
              options={{
                headerShown: false
              }} 
              name='BottomTabs' 
              component={BottomTabs} 
            />
            <Stack.Screen name='ProductDetails' component={ProductDetails} />
          </Stack.Navigator>

        </NavigationContainer>

      </View>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
