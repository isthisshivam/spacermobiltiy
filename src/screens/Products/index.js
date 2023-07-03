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
const Products = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [will, setWill] = useState(true);
  const [allPrograms, setAllPrograms] = useState([]);
  const [allMobility, setAllMobility] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [mobility, setMobility] = useState([]);
  const [allTools, setAllTools] = useState([]);
  const [tools, setTools] = useState([]);
  const [purchasedPrograms, setPurchasedPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      pullUserPersonalInfo();
    }, []),
  );
  const pullUserPersonalInfo = async () => {
    setLoading(true);
    await firestore()
      .collection('Users')
      .doc(global?.Uid)
      .get()
      .then(querySnapshot => {
        let purchased_programs_skuid = [];
        let purchased_programs = [];
        let data = querySnapshot?.data()?.purchased_programs;
        data.forEach(item => {
          purchased_programs_skuid.push(item.sku_id);
        });

        if (querySnapshot) {
          allPrograms.forEach((item, i) => {
            if (purchased_programs_skuid.includes(item.sku_id)) {
              let data = {
                id: item.id,
                programs: item.all_programs,
              };

              purchased_programs.push(data);
            }
            console.log('purchased_programs=>', purchased_programs);
          });
        }
        setPurchasedPrograms(purchased_programs);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    getAllPrograms();
    getAllTools();
    getMobility();
    getProductsss();
  }, []);

  useEffect(() => {
    if (allPrograms) {
      getProgramDetails();
      pullUserPersonalInfo();
    }
  }, [allPrograms]);

  useEffect(() => {
    if (allMobility) {
      getMobilityDetails();
    }
  }, [allMobility]);
  useEffect(() => {
    if (allProducts) {
      getProductsssDetails();
    }
  }, [allProducts]);
  const getProductsss = async () => {
    await firestore()
      .collection('Products_Tutorials')
      .onSnapshot(querySnapshot => {
        let all_products = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            let data = {
              id: doc.id,
              all_programs: doc.data(),
            };
            all_products.push(data);
          });
          console.log('all_products=>', all_products);
          setAllProducts(all_products);
        }
      });
  };

  const getProductsssDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('Favorite_Product_Tutorials')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          let _programs = [];
          querySnapshot.forEach(doc => {
            for (let i = 0; i < allProducts.length; i++) {
              if (
                allProducts[i].id == doc.data().program_id &&
                global.Uid == doc.data().user_id
              ) {
                _programs.push({
                  id: allProducts[i].id,
                  products: allProducts[i].all_programs,
                });
                console.log('_programs===>', _programs);
              }
            }
          });

          setProducts(_programs);
        }
      });
  };
  const getMobility = async () => {
    await firestore()
      .collection('Mobility')
      .onSnapshot(querySnapshot => {
        let all_mobility = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            let data = {
              id: doc.id,
              all_programs: doc.data(),
            };
            all_mobility.push(data);
          });
          console.log('all_mobility=>', all_mobility);
          setAllMobility(all_mobility);
        }
      });
  };
  const getMobilityDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('Favorite_Mobility')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          let _programs = [];
          querySnapshot.forEach(doc => {
            for (let i = 0; i < allMobility.length; i++) {
              if (
                allMobility[i].id == doc.data().program_id &&
                global.Uid == doc.data().user_id
              ) {
                _programs.push({
                  id: allMobility[i].id,
                  mobility: allMobility[i].all_programs,
                });
                console.log('sassasasasasasa===>', _programs);
              }
            }
          });

          setMobility(_programs);
        }
      });
  };

  const getAllPrograms = async () => {
    await firestore()
      .collection('programs')
      .onSnapshot(querySnapshot => {
        let all_programs = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            let data = {
              id: doc.id,
              all_programs: doc.data(),
            };
            all_programs.push(data);
          });
          console.log('all_programs=>', all_programs);
          setAllPrograms(all_programs);
        }
      });
  };
  const getProgramDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('Favorite_Programs')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          let _programs = [];
          querySnapshot.forEach(doc => {
            for (let i = 0; i < allPrograms.length; i++) {
              if (
                allPrograms[i].id == doc.data().program_id &&
                global.Uid == doc.data().user_id
              ) {
                _programs.push({
                  id: allPrograms[i].id,
                  programs: allPrograms[i].all_programs,
                });
              }
            }
          });
          console.log('_programs===>', _programs);
          setPrograms(_programs);
        }
      });
  };
  useEffect(() => {
    if (allTools) {
      getToolDetails();
    }
  }, [allTools]);
  const getAllTools = async () => {
    await firestore()
      .collection('Tools')
      .onSnapshot(querySnapshot => {
        let all_tools = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            let data = {
              id: doc.id,
              all_tools: doc.data(),
            };
            all_tools.push(data);
          });
          setAllTools(all_tools);
        }
      });
  };
  const getToolDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('Favorite_Tools')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          let _tools = [];
          querySnapshot.forEach(doc => {
            for (let i = 0; i < allTools.length; i++) {
              if (
                allTools[i].id == doc.data().tool_id &&
                global.Uid == doc.data().user_id
              ) {
                _tools.push({
                  id: allTools[i].id,
                  tools: allTools[i].all_tools,
                });
              }
            }
          });
          console.log('tools===>', _tools);

          setTools(_tools);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  function navigateToProgramsDetail(program_id) {
    navigation.navigate('ProgramDetails', {program_id});
  }

  function navigateToToolsDetail(program_id) {
    navigation.navigate('ProductTutorialDetail', {program_id});
  }
  const arr = [programs, tools, mobility, products];
  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <ProductHeader heading={'Purchased / Saved'} />
      <Loader isLoading={loading}></Loader>
      <View style={style.products}>
        <TouchableOpacity
          onPress={() => setWill(true)}
          style={{
            flex: 0.5,
            backgroundColor: will ? colors.primary : colors.white,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: !will ? colors.primary : colors.white,
              fontFamily: 'Montserrat-Medium',
            }}>
            Purchased
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setWill(false)}
          style={{
            flex: 0.5,
            backgroundColor: !will ? colors.primary : colors.white,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: will ? colors.primary : colors.white,
              fontFamily: 'Montserrat-Medium',
            }}>
            Saved
          </Text>
        </TouchableOpacity>
      </View>
      {will ? (
        <ProductItems
          onProgramClick={id => navigateToProgramsDetail(id)}
          data={purchasedPrograms}></ProductItems>
      ) : (
        <ProductItems
          onMobilityClick={id => navigateToMobilityDetail(id)}
          onProgramClick={id => navigateToProgramsDetail(id)}
          onClick={id => navigateToToolsDetail(id)}
          data={arr.flat()}></ProductItems>
      )}
    </SafeAreaView>
  );
};
export default Products;
