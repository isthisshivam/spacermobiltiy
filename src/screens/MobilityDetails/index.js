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
import SafariView from 'react-native-safari-view';
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
var weekArray = [];
var completed_videos = [];
const MobilityDetails = props => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [multiSelect, setMultiSelect] = useState(false);
  const [allVideosCompleted, setAllVideosCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendedTools, setRecommendedTools] = useState([]);
  const [programDetails, setProgramDetails] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [treatment, setTreatment] = useState([]);
  const [dailyRehab, setDailyRehab] = useState([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const program_id = props.route.params.program_id;
  useEffect(() => {
    getProgramDetails();
  }, [props, selectedWeekIndex]);

  const getProgramDetails = async () => {
    console.log('props.route.params.program_id', props.route.params.program_id);
    setLoading(true);
    await firestore()
      .collection('Mobility')
      .doc(props.route.params.program_id)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          console.log('MobilityDetails==', querySnapshot.data());
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
    console.log('isFav=>', isFav);
    setLoading(true);
    await firestore()
      .collection('Favorite_Mobility')
      .where('program_id', '==', props.route.params.program_id)
      .where('user_id', '==', global?.Uid)
      .get()
      .then(response => {
        console.log('programFavStatus=>', response.docs.length);
        if (response.docs.length > 0) isFav = true;
        else isFav = false;
      });
  };
  const makeProgramFav = async () => {
    isFav = !isFav;

    if (isFav) {
      //like
      setLoading(true);
      await firestore()
        .collection('Favorite_Mobility')
        .add({
          is_favorite: true,
          program_id: props.route.params.program_id,
          user_id: global.Uid,
        })
        .then(() => {
          console.log('Saved=');
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
        .collection('Favorite_Mobility')
        .get()
        .then(querySnapshot => {
          if (querySnapshot) {
            querySnapshot?.docs.forEach(doc => {
              console.log('querySnapshot.data()===', doc.data());
              if (
                props.route.params.program_id == doc.data().program_id &&
                global.Uid == doc.data().user_id
              ) {
                let program_id = doc.id;
                deleteFav(program_id);
              }
            });
          }
        });

      // await firestore()
      //   .collection('Favorite_Mobility')
      //   .onSnapshot(querySnapshot => {
      //     if (querySnapshot) {
      //       querySnapshot.forEach(doc => {
      //         console.log('Favorite_Programs.data()===', doc.data());
      //         if (
      //           props.route.params.program_id == doc.data().program_id &&
      //           global.Uid == doc.data().user_id
      //         ) {
      //           let program_id = doc.id;
      //           deleteFav(program_id);
      //         }
      //       });
      //     }
      //     setLoading(false);
      //   });
    }
  };
  const deleteFav = async program_id => {
    await firestore()
      .collection('Favorite_Mobility')
      .doc(program_id)
      .delete()
      .then(() => {
        setLoading(false);
        console.log('deleted===');
      })
      .catch(e => {
        setLoading(false);
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
            if (tools != '') {
              if (tools?.includes(doc.id)) {
                recommendedtools.push({
                  id: doc.id,
                  recommended_tools: doc.data(),
                });
              }
            }
          });
          setRecommendedTools(recommendedtools);
        }
      });
  };
  const getWeeks = async weeks => {
    weekArray = Object.entries(weeks).map(e => ({[e[0]]: e[1]}));
    console.log('getweeks===', weekArray);
    completed_videos = [];
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
          });
          setTreatment(treatments);
        }
      });

    setTimeout(() => {
      programCompleted(weekArray, completed_videos);
    }, 1000);
  };

  const programCompleted = async (weekArray, completed_videos) => {
    var treatments = [];
    var daily_rehab = [];
    await firestore()
      .collection('Daily_Rehab')
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            if (doc) {
              weekArray.forEach((item, i) => {
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
          });
        }
      });
    setTimeout(() => {
      let all = treatments.concat(daily_rehab);
      all.some(e => console.log('iscssddsddsdsall=', e.isCompleted));
      if (all.some(e => e.isCompleted == false)) {
        setAllVideosCompleted(false);
      } else {
        setAllVideosCompleted(true);
      }
    }, 1500);
  };
  useEffect(() => {
    console.log('all video is completed or not?=>', allVideosCompleted);
    if (allVideosCompleted) {
      isProgramAlreadyCompleted();
    }
  }, [allVideosCompleted]);

  const isProgramAlreadyCompleted = async () => {
    console.log('isProgramAlreadyCompleted===');

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
      .then(() => {
        getProgramDetails();
      })
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
        getProgramDetails();
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
  const openPdfView = () => {
    if (programDetails?.PDF_TrainingGuide) {
      SafariView.isAvailable()
        .then(
          SafariView.show({
            url: programDetails?.PDF_TrainingGuide,
          }),
        )
        .catch(error => {
          // Fallback WebView code for iOS 8 and earlier
        });
    }
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
        <Vimeo
          style={{height: 220, width: '100%', flex: 1}}
          videoId={extractVideoId(programDetails?.videoUrl)}
          params={'api=1&autoplay=0'}
          // handlers={videoCallbacks}
        />
        <View style={{padding: 30}}>
          <Text style={style.recovery}>{programDetails?.title}</Text>
          <Text style={style.ground1}>{programDetails?.description}</Text>
        </View>
        {programDetails?.PDF_TrainingGuide != '' ? (
          <View style={style.details}>
            <Pressable onPress={() => openPdfView()} style={style.dot}>
              <Image style={style.pdf} source={images.pdf}></Image>
              <Text style={style.ground2}>PDF Training Guide</Text>
            </Pressable>
            <Pressable
              onPress={() => makeProgramFav()}
              style={[style.pdfV, {alignSelf: 'flex-end'}]}>
              <Image
                style={{height: 22, width: 22, resizeMode: 'contain'}}
                source={isFav ? images.like : images.heart}></Image>
              <Text style={style.save}>Save</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => makeProgramFav()}
            style={[
              style.pdfV,
              {alignSelf: 'flex-end', paddingHorizontal: 20},
            ]}>
            <Image
              style={{height: 22, width: 22, resizeMode: 'contain'}}
              source={isFav ? images.like : images.heart}></Image>
            <Text style={style.save}>Save</Text>
          </Pressable>
        )}

        <View style={style.emp}></View>

        {recommendedTools.length > 0 && <View style={style.emp}></View>}

        {recommendedTools.length > 0 && (
          <RecommendedTools
            heading={'Recommended Tools'}
            data={recommendedTools}></RecommendedTools>
        )}
        {recommendedTools.length > 0 && <View style={style.mask}></View>}

        {programDetails?.isWeek && (
          <View>
            <WeekItems></WeekItems>
            <ScrollView>
              {dailyRehab.length > 0 && (
                <Text style={style.rehab}>{'Daily Rehab'}</Text>
              )}

              {dailyRehab.length > 0 &&
                dailyRehab.map((item, key) => (
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
                <Text style={[style.rehab, {marginTop: 20}]}>
                  {'Treatment'}
                </Text>
              )}
              {treatment.length > 0 &&
                treatment.map((item, key) => (
                  <ExpandableComponent
                    onCompleteVideo={videoData => markVideoAsCompleted(item)}
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
          </View>
        )}
      </ScrollView>
      <PrimaryButton
        e_style={{marginBottom: dH(10)}}
        heading={'VIEW FULL PROGRAM'}
        onClick={() =>
          navigation.navigate('OpenMobility', {program_id})
        }></PrimaryButton>
    </SafeAreaView>
  );
};

export default MobilityDetails;
