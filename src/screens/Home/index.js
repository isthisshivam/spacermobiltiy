import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import {dH, dW} from '../../Utils/dynamicHeightWidth';
import useStyle from './style';
import LinearGradient from 'react-native-linear-gradient';
import Items from '../../components/Items';
import ProgressiveImage from '../../components/ProgressiveImage';
import DrawerHeader from '../../components/DrawerHeader';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import colors from '../../constants/colors';
import {
  requestPurchase,
  useIAP,
  clearProductsIOS,
  clearTransactionIOS,
} from 'react-native-iap';
const program_sku_developp1 = Platform.select({
  ios: ['com.spacermobility.develop.p1'],
});
const program_sku_developp2 = Platform.select({
  ios: ['com.spacermobility.develop.p2'],
});
const program_sku_developp3 = Platform.select({
  ios: ['com.spacermobility.develop.p3'],
});
var purchasedPrograms = [];
const Home = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [productsss, setProducts] = useState([]);
  const [program_id, setProgramId] = useState('');
  //const [purchasedPrograms, setPurchasedPrograms] = useState([]);
  const [sku, setSku] = useState('com.spacermobility.develop.p1');
  const [called, setCalled] = useState(false);
  useEffect(() => {}, []);

  const {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistories,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistories,
  } = useIAP();

  const handlePurchase = async sku => {
    /// setLoading(true);
    console.log('handlePurchase', sku);
    await requestPurchase({sku: sku})
      .then(res => {
        updatePurchaseInformation(res);
        console.log('handlePurchase.resposese', res);
      })
      .catch(e => {
        getProducts(getSku(sku));
        console.log('catch.e', e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updatePurchaseInformation = async res => {
    purchasedPrograms.push(res);
    console.log('purchasedPrograms===>', purchasedPrograms);
    await firestore()
      .collection('Users')
      .doc(global.Uid)
      .update({
        purchased_programs: purchasedPrograms,
      })
      .then(resp => {
        console.log('updatePurchaseInformation.resp', resp);
        setLoading(false);
        navigation.navigate('ProgramDetails', {program_id});
      })
      .catch(e => {
        console.log('updatePurchaseInformation.catch', e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getSku = e => {
    let sku = 'com.spacermobility.develop.p1';
    switch (e) {
      case 'com.spacermobility.develop.p1':
        sku = {
          skus: program_sku_developp1,
        };
        break;
      case 'com.spacermobility.develop.p2':
        sku = {
          skus: program_sku_developp2,
        };
        break;
      case 'com.spacermobility.develop.p3':
        sku = {
          skus: program_sku_developp3,
        };
        break;
      default:
    }
    return sku;
  };

  useEffect(() => {
    if (program_id && sku) {
      setLoading(true);
      getProducts(getSku(sku)).then(() => {
        console.log('products==', products);
        isAlreadyPurchased();
      });
    }
  }, [program_id, sku, called]);

  const isAlreadyPurchased = async () => {
    setLoading(true);
    let programs = [];
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .get()
      .then(data => {
        console.log(
          'isAlreadyPurchased.programs==',
          data.data().purchased_programs,
        );
        programs = data.data()?.purchased_programs;
        purchasedPrograms = programs;
        if (data.data()?.purchased_programs.some(val => val.productId == sku)) {
          setLoading(false);
          navigation.navigate('ProgramDetails', {program_id});
        } else {
          handlePurchase(sku);
        }
      });
  };

  useEffect(() => {
    console.log(
      `... listen to currentPurchaseError, to check if any error happened`,
    );
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  useEffect(() => {
    console.log(
      `... listen to currentPurchase, to check if the purchase went through`,
    );
    // ... listen to currentPurchase, to check if the purchase went through
  }, [currentPurchase]);

  useEffect(() => {
    getPrograms();
    getProductsss();
  }, []);

  const getPrograms = async () => {
    setLoading(true);
    await firestore()
      .collection('programs')
      .onSnapshot(querySnapshot => {
        let programs = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            programs.push({id: doc.id, programs: doc.data()});
          });
          setPrograms(programs);
        }
        setLoading(false);
      });
  };
  const getMobility = async () => {
    setLoading(true);
    await firestore()
      .collection('Mobility')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            navigation.navigate('MobilityDetails', {program_id: doc.id});
          });
        }
        setLoading(false);
      });
  };
  const getProductsss = async () => {
    await firestore()
      .collection('Products_Tutorials')
      .onSnapshot(querySnapshot => {
        let products = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            products.push({id: doc.id, products: doc.data()});
          });
          setProducts(products);
        }
      });
  };

  function navigateToProductDetail(program_id) {
    navigation.navigate('ProductTutorialDetail', {program_id});
  }

  function navigateToWalkThrough() {
    navigation.navigate('AuthStack', {
      screen: 'WalkThrough',
    });
  }
  //   <LinearGradient
  //   colors={['transparent', 'rgba(0,0,0,0.5)']}
  //   style={style.items_lane_inner}>
  //   <Text
  //     numberOfLines={1}
  //     style={[style.heading_a4, {marginTop: 110}]}>
  //     {data?.programs?.title}
  //   </Text>
  //   <Text
  //     numberOfLines={1}
  //     style={[style.ground1, {color: colors.lightgray}]}>
  //     {data?.programs?.description}
  //   </Text>
  // </LinearGradient>
  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <DrawerHeader onClick={() => props.navigation.openDrawer()} />
      <Loader isLoading={loading}></Loader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}>
        <TouchableOpacity onPress={navigateToWalkThrough} style={style.btnn}>
          <View style={style.curve_btn}>
            <ImageBackground
              resizeMode="contain"
              style={style.center}
              source={images.curve}></ImageBackground>
          </View>
          <View style={style.done}>
            <View style={style.center_}>
              <Text style={style.recovery}>WELCOME!</Text>
              <Text style={style.ground}>
                Would you like a quick walkthrough?
              </Text>
            </View>
            <View style={style.transfom_}>
              <ImageBackground
                resizeMode="contain"
                style={style.contain}
                source={images.back}></ImageBackground>
            </View>
          </View>
        </TouchableOpacity>
        <View style={style.gra}>
          {/* <ImageBackground source={images.gradientBlack} style={style.imagea}>
            <ImageBackground source={images.gradient} style={style.container}>
              <Text style={style.ground1}>LET’S TEST YOUR MOBILITY</Text>
              <Text style={style.ground2}>MOBILITY TESTING</Text>
              <Text style={style.ground3}>Get description </Text>
              <Text style={[style.ground3, style.mt_2]}>from Meryl</Text>
              <TouchableOpacity
                onPress={() => getMobility()}
                style={{
                  backgroundColor: colors.white,
                  height: 30,
                  marginTop: 20,
                  borderRadius: 15,
                  width: 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    color: colors.primary,
                  }}>
                  Start
                </Text>

                <ImageBackground
                  resizeMode="contain"
                  style={{
                    height: dH(8),
                    marginRight: 10,
                    width: dW(8),
                    transform: [{rotate: '180deg'}],
                  }}
                  source={images.back}></ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
          </ImageBackground> */}
          <ImageBackground source={images.gradientBlack} style={style.imagea}>
            <LinearGradient
              style={{
                width: '100%',
                height: '100%',
                alignSelf: 'flex-end',
                //marginTop: 110,
                paddingHorizontal: 10,
                //  borderRadius: 6,
                alignItems: 'flex-start',
                justifyContent: 'center',
                opacity: 1,
              }}
              start={{x: 3, y: 1}}
              end={{x: 0.33, y: 1}}
              locations={[1, 0.9, 0.6]}
              colors={['black', 'transparent', 'transparent']}>
              <Text style={style.ground1}>LET’S TEST YOUR MOBILITY</Text>
              <Text style={style.ground2}>MOBILITY TESTING</Text>
              <Text style={style.ground3}>Get description </Text>
              <Text style={[style.ground3, style.mt_2]}>from Meryl</Text>
              <TouchableOpacity
                onPress={() => getMobility()}
                style={{
                  backgroundColor: colors.white,
                  height: 30,
                  marginTop: 20,
                  borderRadius: 15,
                  width: 100,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    color: colors.primary,
                  }}>
                  Start
                </Text>

                <ImageBackground
                  resizeMode="contain"
                  style={{
                    height: dH(8),
                    marginRight: 10,
                    width: dW(8),
                    transform: [{rotate: '180deg'}],
                  }}
                  source={images.back}></ImageBackground>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </View>
        {programs.length > 0 && (
          <Items
            viewAll
            viewAllClick={() => navigation.navigate('AllPrograms')}
            onClick={(program_id, sku) => [
              setProgramId(program_id),
              setSku(sku),
              setCalled(!called),
            ]}
            heading={'Programs'}
            data={programs}></Items>
        )}
        {productsss.length > 0 && (
          <Items
            viewAllClick={() => navigation.navigate('AllProductsTutorials')}
            viewAll
            onClick={navigateToProductDetail}
            heading={'Product Tutorials'}
            data={productsss}></Items>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
