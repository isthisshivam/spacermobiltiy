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
import {dH} from '../../Utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import RecommendedTools from '../../components/RecommendedTools';

import BackHeader from '../../components/BackHeader';
import PrimaryButton from '../../components/PrimaryButton';
import {Vimeo} from 'react-native-vimeo-iframe';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import {extractVideoId, showToastMessage} from '../../Utils/utilities';
import ExpandableComponent from '../../components/ExpandableComponent';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
var isFav = false;
const OpenMobility = props => {
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
      .collection('Mobility')
      .doc(props.route.params.program_id)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          setProgramDetails(querySnapshot?._data);
          getWeeks(querySnapshot?._data?.week);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };

  const getWeeks = async weeks => {
    let weekArray = Object.entries(weeks).map(e => ({[e[0]]: e[1]}));
    console.log('getweeks===', weekArray);
    var completed_videos = [];
    var treatments = [];
    var daily_rehab = [];
    setWeeks(weekArray);
    await firestore()
      .collection('CompletedVideos')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            completed_videos.push({
              id: doc.id,
              video: doc.data(),
            });
            console.log('CompletedVideos.querySnapshot===', doc.data());
          });
        }
      });
    await firestore()
      .collection('Daily_Rehab')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              if (weeks[selectedWeekIndex]?.daily_rehab.includes(doc?.id)) {
                daily_rehab.push({
                  id: doc.id,
                  daily_rehab: doc.data(),
                  isExpanded: false,
                  isCompleted: completed_videos.some(
                    v =>
                      v.video.video_id == doc.id &&
                      v.video.user_id == global.Uid,
                  )
                    ? true
                    : false,
                });
              }
            }
            console.log('Daily_Rehab.querySnapshot===', daily_rehab);
          });
          setDailyRehab(daily_rehab);
        }
      });

    await firestore()
      .collection('Treatments')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              if (weeks[selectedWeekIndex]?.treatments.includes(doc?.id)) {
                treatments.push({
                  id: doc.id,
                  treatments: doc.data(),
                  isExpanded: false,
                  isCompleted: completed_videos.some(
                    v =>
                      v.video.video_id == doc.id &&
                      v.video.user_id == global.Uid,
                  )
                    ? true
                    : false,
                });
              }
            }
            console.log('treatments.querySnapshot===', doc);
          });
          setTreatment(treatments);
        }
      });

    programCompleted(weekArray, completed_videos);
  };

  const programCompleted = async (weekArray, completed_videos) => {
    var treatments = [];
    var daily_rehab = [];
    var is_completed = false;
    await firestore()
      .collection('Daily_Rehab')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              weekArray.forEach((item, i) => {
                console.log('weekArray.querySnapshot===', item[i]);
                if (item[i]?.daily_rehab.includes(doc?.id)) {
                  daily_rehab.push({
                    id: doc.id,
                    daily_rehab: doc.data(),
                    isExpanded: false,
                    isCompleted: completed_videos.some(
                      v =>
                        v.video.video_id == doc.id &&
                        v.video.user_id == global.Uid,
                    )
                      ? true
                      : false,
                  });
                }
              });
            }
          });
        }
      });
    await firestore()
      .collection('Treatments')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              weekArray.forEach((item, i) => {
                console.log('weekArray.treatments.querySnapshot===', item[i]);
                if (item[i]?.treatments.includes(doc?.id)) {
                  treatments.push({
                    id: doc.id,
                    treatments: doc.data(),
                    isExpanded: false,
                    isCompleted: completed_videos.some(
                      v =>
                        v.video.video_id == doc.id &&
                        v.video.user_id == global.Uid,
                    )
                      ? true
                      : false,
                  });
                }
              });
            }
            console.log(
              'daily_rehab.querySnapshot===',
              daily_rehab,
              treatments,
            );
          });
        }
      });
    treatment.forEach((item, i) => {
      if (item.isCompleted) {
        is_completed = true;
      } else {
        is_completed = false;
      }
    });
    daily_rehab.forEach((item, i) => {
      if (item.isCompleted) {
        is_completed = true;
      } else {
        is_completed = false;
      }
    });
    setTimeout(() => {
      if (is_completed) {
        isProgramAlreadyCompleted();
      }
    }, 3000);
  };

  const isProgramAlreadyCompleted = async () => {
    await firestore()
      .collection('CompletedPrograms')
      .where('program_id', '==', props.route.params.program_id)
      .where('user_id', '==', global.Uid)
      .onSnapshot(querySnapshot => {
        console.log('querySnapshot.size', querySnapshot.size);
        if (querySnapshot.size == 0) {
          completeAProgram();
        }
      });
  };
  const completeAProgram = async () => {
    await firestore()
      .collection('CompletedPrograms')
      .add({
        is_completed: true,
        program_id: props.route.params.program_id,
        user_id: global.Uid,
      })
      .then(() => {})
      .catch(() => {});
  };
  const markVideoAsCompleted = async item => {
    setLoading(true);
    console.log('markVideoAsCompleted==>', item);
    await firestore()
      .collection('CompletedVideos')
      .add({
        is_completed: true,
        video_id: item.id,
        user_id: global.Uid,
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
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
  const updateTreatmentLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...treatment];
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

    setTreatment(array);
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
          {item?.item[item?.index]?.title}
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
        <Text
          style={[
            style.recovery,
            {paddingHorizontal: 20, height: 50, marginTop: 20, fontSize: 20},
          ]}>
          {programDetails?.title}
        </Text>
        <View style={style.mask}></View>
        <WeekItems></WeekItems>
        <ScrollView>
          {dailyRehab.length > 0 && (
            <Text style={style.rehab}>{'Daily Rehab'}</Text>
          )}

          {dailyRehab.map((item, key) => (
            <ExpandableComponent
              key={item.id}
              onCompleteVideo={videoData => markVideoAsCompleted(item)}
              onClickFunction={data => {
                console.log('item==', item);
                updateDailyRehabLayout(key);
              }}
              isCompleted={item?.isCompleted}
              item={item?.daily_rehab}
              isExpanded={item.isExpanded}
            />
          ))}
          {treatment.length > 0 && (
            <Text style={[style.rehab, {marginTop: 20}]}>{'Treatment'}</Text>
          )}
          {treatment.map((item, key) => (
            <ExpandableComponent
              key={item.id}
              onClickFunction={() => {
                updateTreatmentLayout(key);
              }}
              isCompleted={item?.isCompleted}
              item={item?.treatments}
              isExpanded={item?.isExpanded}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpenMobility;
