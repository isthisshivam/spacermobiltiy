import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Platform,
  ImageBackground,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import {dH, dW, windowWidth} from '../../Utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import ProductItems from '../../components/ProductsItem';
import ProductHeader from '../../components/ProductHeader';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
const AllProductsTutorials = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const [productsss, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getProductsss();
    }, []),
  );
  const getProductsss = async () => {
    setLoading(true);
    await firestore()
      .collection('Products_Tutorials')
      .onSnapshot(querySnapshot => {
        let products = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            products.push({id: doc.id, products: doc.data()});
          });
          setProducts(products);
          setLoading(false);
        }
      });
  };

  function navigateToProgramsDetail(program_id) {
    navigation.navigate('ProductTutorialDetail', {program_id});
  }

  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <ProductHeader heading={'All Program Tutorials'} />
      <Loader isLoading={loading}></Loader>

      <ProductItems
        onClick={id => navigateToProgramsDetail(id)}
        data={productsss}></ProductItems>
    </SafeAreaView>
  );
};
export default AllProductsTutorials;
