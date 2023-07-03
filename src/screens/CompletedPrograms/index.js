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
import {useNavigation} from '@react-navigation/native';
import useStyle from './style';
import DrawerHeader from '../../components/DrawerHeader';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import colors from '../../constants/colors';
import CompletedItems from '../../components/completedPrograms';
const CompletedPrograms = props => {
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    getPrograms();
  }, []);
  const getPrograms = async () => {
    setLoading(true);
    let programsid = [];
    let programs = [];
    await firestore()
      .collection('CompletedPrograms')
      .where('user_id', '==', global.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            programsid.push(doc.data().program_id);
          });
        }
      });
    await firestore()
      .collection('programs')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (programsid.includes(doc.id)) {
              let value = {
                id: doc.id,
                programs: doc.data(),
              };
              programs.push(value);
            }
            console.log('docccc=', programs);
          });
          setPrograms(programs);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  function navigateToProgramDetail(program_id) {
    navigation.navigate('ProgramDetails', {program_id});
  }

  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <DrawerHeader onClick={() => props.navigation.openDrawer()} />
      <Loader isLoading={loading}></Loader>
      <CompletedItems
        onClick={navigateToProgramDetail}
        data={programs}></CompletedItems>
    </SafeAreaView>
  );
};
export default CompletedPrograms;
