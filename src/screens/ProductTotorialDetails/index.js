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
import SafariView from 'react-native-safari-view';
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
var weekArray = [];
var completed_videos = [];
const ProductTutorialDetail = props => {
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
  }, [props]);
  console.log('props.route.params.program_id==', props.route.params.program_id);
  const getProgramDetails = async () => {
    setLoading(true);
    await firestore()
      .collection('Products_Tutorials')
      .doc(props.route.params.program_id)
      .get()
      .then(doc => {
        console.log('getProgramDetails==', doc.data());
        setProgramDetails(doc.data());
        programFavStatus();
        getRecommendedTools(doc.data()?.recommended_tools);
        // getWeeks(doc.data()?.week);
      });
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // });
  };

  const getRecommendedTools = async tools => {
    await firestore()
      .collection('Tools')
      .onSnapshot(querySnapshot => {
        let recommendedtools = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            console.log('alltools==', doc);
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
  const programFavStatus = async () => {
    console.log('isFav=>', isFav);
    setLoading(true);
    await firestore()
      .collection('Favorite_Product_Tutorials')
      .where('program_id', '==', props.route.params.program_id)
      .where('user_id', '==', global?.Uid)
      .get()
      .then(response => {
        if (response.docs.length > 0) isFav = true;
        else isFav = false;
        console.log('programFavStatus=>', response.docs.length, isFav);
      });
  };
  const makeProgramFav = async () => {
    isFav = !isFav;

    if (isFav) {
      //like
      setLoading(true);
      await firestore()
        .collection('Favorite_Product_Tutorials')
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
        .collection('Favorite_Product_Tutorials')
        .get()
        .then(querySnapshot => {
          if (querySnapshot) {
            querySnapshot?.docs.forEach(doc => {
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
      .collection('Favorite_Product_Tutorials')
      .doc(program_id)
      .delete()
      .then(dataa => {
        console.log('deleted===', dataa);
      })
      .catch(e => {
        console.log('deleted.error===', e);
      });
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.recovery}>{programDetails?.title}</Text>
            <Pressable
              onPress={() => makeProgramFav()}
              style={[style.pdfV, {alignSelf: 'flex-end'}]}>
              <Image
                style={{height: 22, width: 22, resizeMode: 'contain'}}
                source={isFav ? images.like : images.heart}></Image>
              <Text style={style.save}>Save</Text>
            </Pressable>
          </View>
          <Text style={style.ground1}>{programDetails?.description}</Text>
        </View>
        <View style={style.details}>
          {/* {programDetails?.PDF_TrainingGuide != '' ? (
            <Pressable onPress={() => openPdfView()} style={style.dot}>
              <Image style={style.pdf} source={images.pdf}></Image>
              <Text style={style.ground2}>PDF Training Guide</Text>
            </Pressable>
          ) : (
            <View style={style.dot}>
              <Image style={style.pdf} source={images.pdf}></Image>
              <Text style={style.ground2}>No Training Guide</Text>
            </View>
          )}

          <Pressable
            onPress={() => makeProgramFav()}
            style={[style.pdfV, {alignSelf: 'flex-end'}]}>
            <Image
              style={{height: 22, width: 22, resizeMode: 'contain'}}
              source={isFav ? images.like : images.heart}></Image>
            <Text style={style.save}>Save</Text>
          </Pressable> */}
        </View>
        {recommendedTools.length > 0 && <View style={style.emp}></View>}

        {recommendedTools.length > 0 && (
          <RecommendedTools
            heading={'Recommended Tools'}
            data={recommendedTools}></RecommendedTools>
        )}
        {recommendedTools.length > 0 && <View style={style.mask}></View>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductTutorialDetail;
