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
  StyleSheet,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import colors from '../../constants/colors';
import RecommendedTools from '../../components/RecommendedTools';
import BackHeader from '../../components/BackHeader';
import PrimaryButton from '../../components/PrimaryButton';
import {Vimeo} from 'react-native-vimeo-iframe';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import {extractVideoId, showToastMessage} from '../../Utils/utilities';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MobilityExpandableComponent from '../../components/MobitliyExpandable';
var isFav = false;
const Mobility = props => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [multiSelect, setMultiSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendedTools, setRecommendedTools] = useState([]);
  const [programDetails, setProgramDetails] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [dailyRehab, setDailyRehab] = useState([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  useEffect(() => {
    getProgramDetails();
  }, [props, selectedWeekIndex]);

  const getProgramDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('programs')
      .doc(props.route.params.program_id)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          setProgramDetails(querySnapshot?._data);
          programFavStatus();
          getRecommendedTools(querySnapshot?._data?.recommended_tools);
          getWeeks(querySnapshot?._data?.week);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };
  const programFavStatus = async () => {
    setLoading(true);
    await firestore()
      .collection('Favorite_Programs')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (
              props.route.params.program_id == doc.data().program_id &&
              global.Uid == doc.data().user_id
            ) {
              isFav = true;
            } else {
            }
          });
        }
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };
  const makeProgramFav = async () => {
    isFav = !isFav;

    if (isFav) {
      //like
      setLoading(true);
      await firestore()
        .collection('Favorite_Programs')
        .add({
          is_favorite: true,
          program_id: props.route.params.program_id,
          user_id: global.Uid,
        })
        .then(() => {
          showToastMessage('Saved');
          setLoading(false);
        })
        .catch(() => {
          showToastMessage('Failed');
          setLoading(false);
        });
    } else {
      //dislike
      setLoading(true);
      await firestore()
        .collection('Favorite_Programs')
        .onSnapshot(querySnapshot => {
          if (querySnapshot) {
            querySnapshot.forEach(doc => {
              console.log('Favorite_Programs.data()===', doc.data());
              if (
                props.route.params.program_id == doc.data().program_id &&
                global.Uid == doc.data().user_id
              ) {
                let program_id = doc.id;
                deleteFav(program_id);
              }
            });
          }
          setLoading(false);
        });
    }
  };
  const deleteFav = async program_id => {
    await firestore()
      .collection('Favorite_Programs')
      .doc(program_id)
      .delete()
      .then(dataa => {
        console.log('deleted===', dataa);
      })
      .catch(e => {
        console.log('deleted.error===', e);
      });
  };
  const getRecommendedTools = async tools => {
    await firestore()
      .collection('Tools')
      .onSnapshot(querySnapshot => {
        let recommendedtools = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            console.log('alltools==', tools);
            if (tools?.includes(doc.id)) {
              recommendedtools.push({
                id: doc.id,
                recommended_tools: doc.data(),
              });
            }
          });
          setRecommendedTools(recommendedtools);
        }
      });
  };
  const getWeeks = async weeks => {
    setWeeks(Object.entries(weeks).map(e => ({[e[0]]: e[1]})));

    await firestore()
      .collection('Daily_Rehab')
      .onSnapshot(querySnapshot => {
        let daily_rehab = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              if (weeks[selectedWeekIndex].daily_rehab.includes(doc?.id)) {
                daily_rehab.push({
                  id: doc.id,
                  daily_rehab: doc.data(),
                  isExpanded: false,
                });
              }
            }
            console.log('Daily_Rehab.querySnapshot===', doc);
          });
          setDailyRehab(daily_rehab);
        }
      });

    await firestore()
      .collection('Treatments')
      .onSnapshot(querySnapshot => {
        let treatments = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              if (weeks[selectedWeekIndex].treatments.includes(doc?.id)) {
                treatments.push({
                  id: doc.id,
                  treatments: doc.data(),
                  isExpanded: false,
                });
              }
            }
            console.log('treatments.querySnapshot===', doc);
          });
          setTreatment(treatments);
        }
      });
  };
  const updateDailyRehabLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...dailyRehab];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }

    setDailyRehab(array);
  };

  const WeekItems = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{padding: 20}}
        horizontal
        data={weeks}
        renderItem={renderWeeks}></FlatList>
    );
  };
  const renderWeeks = item => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedWeekIndex(item.index)}
        style={{
          margin: 6,
          height: 35,
          width: 100,
          borderRadius: 5,
          backgroundColor:
            selectedWeekIndex == item.index ? colors.primary : colors.creamis,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={[
            style.ground0,
            {
              color:
                selectedWeekIndex == item.index ? colors.white : colors.primary,
            },
          ]}>
          {item.item[item.index].title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <BackHeader />
      <Loader isLoading={loading}></Loader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.paddingV}>
        <Vimeo
          style={{height: 220, width: '100%', flex: 1}}
          videoId={extractVideoId(programDetails?.videoUrl)}
          params={'api=1&autoplay=0'}
          // handlers={videoCallbacks}
        />
        <View style={{padding: 20}}>
          <Text style={style.recovery}>{programDetails?.title}</Text>
          <Text style={style.ground1}>{programDetails?.description}</Text>
        </View>
        <View style={style.details}>
          <View style={style.dot}>
            <Image style={style.pdf} source={images.pdf}></Image>
            <Text style={style.ground2}>PDF Training Guide</Text>
          </View>
          <Pressable onPress={() => makeProgramFav()} style={style.pdfV}>
            <Image
              style={{height: 22, width: 22, resizeMode: 'contain'}}
              source={isFav ? images.like : images.heart}></Image>
            <Text style={style.save}>Save</Text>
          </Pressable>
        </View>
        <View style={style.emp}></View>

        <View style={style.mask}></View>
        <WeekItems></WeekItems>
        <ScrollView>
          {dailyRehab.map((item, key) => (
            <MobilityExpandableComponent
              key={item.id}
              onClickFunction={() => {
                updateDailyRehabLayout(key);
              }}
              item={item?.daily_rehab}
              isExpanded={item.isExpanded}
            />
          ))}
        </ScrollView>
        <RecommendedTools
          heading={'Best Seller'}
          data={recommendedTools}></RecommendedTools>
        <PrimaryButton
          onClick={() => navigation.navigate('ViewFullProgram')}
          heading={`START PROGRAM`}></PrimaryButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Mobility;
