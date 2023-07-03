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
const AllPrograms = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getPrograms();
    }, []),
  );
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

  function navigateToProgramsDetail(program_id) {
    navigation.navigate('ProgramDetails', {program_id});
  }

  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <ProductHeader heading={'All Program'} />
      <Loader isLoading={loading}></Loader>

      <ProductItems
        onProgramClick={id => navigateToProgramsDetail(id)}
        data={programs}></ProductItems>
    </SafeAreaView>
  );
};
export default AllPrograms;
