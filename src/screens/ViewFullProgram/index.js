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
  Pressable,
  LayoutAnimation,
} from 'react-native';
import usePallete from '../../assets/Pallete';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';
import useStyle from './style';
import colors from '../../constants/colors';
import {extractVideoId, showToastMessage} from '../../Utils/utilities';
import {Vimeo} from 'react-native-vimeo-iframe';
import RecommendedTools from '../../components/RecommendedTools';
import BackHeader from '../../components/BackHeader';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
const ViewFullProgram = props => {
  console.log(
    'ViewFullProgram.props=',
    JSON.stringify(props.route.params.tool_id),
  );
  const pallete = usePallete();
  const navigation = useNavigation();
  const style = useStyle();
  const [loading, setLoading] = useState(false);
  const [toolDetails, setToolDetails] = useState(null);
  const [recommendedTools, setRecommendedTools] = useState([]);
  const [isFav, setFav] = useState(false);
  useEffect(() => {
    getRecommendedToolDetails(props?.route?.params?.tool_id);
  }, []);

  const getRecommendedToolDetails = async tool_id => {
    setLoading(true);
    await firestore()
      .collection('Tools')
      .doc(tool_id)
      .onSnapshot(querySnapshot => {
        setToolDetails(querySnapshot._data);
        getRecommendedTools(querySnapshot?._data?.recommended_tools);
        programFavStatus();
      });
  };
  const programFavStatus = async () => {
    await firestore()
      .collection('Favorite_Tools')
      .where('tool_id', '==', props.route.params.tool_id)
      .where('user_id', '==', global.Uid)
      .onSnapshot(querySnapshot => {
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            console.log('doc.data()===', doc.data());
            //isFav = true;
            setFav(true);
          });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
  };
  const makeProgramFav = async value => {
    setFav(value);
    // isFav = !isFav;

    if (value) {
      //like
      setLoading(true);
      await firestore()
        .collection('Favorite_Tools')
        .add({
          is_favorite: true,
          tool_id: props.route.params.tool_id,
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
        .collection('Favorite_Tools')
        .where('tool_id', '==', props.route.params.tool_id)
        .where('user_id', '==', global.Uid)
        .onSnapshot(querySnapshot => {
          let doc_id = '';
          if (querySnapshot) {
            querySnapshot.forEach(doc => {
              doc_id = doc.id;
              console.log('Favorite_Tools.data()===', doc.data());
            });
            setTimeout(() => {
              deleteFav(doc_id);
            }, 300);
          }
        });
    }
  };
  const deleteFav = async tool_id => {
    await firestore()
      .collection('Favorite_Tools')
      .doc(tool_id)
      .delete()
      .then(dataa => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(e => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

  return (
    <SafeAreaView style={[pallete.mainContainor, {paddingHorizontal: 0}]}>
      <BackHeader />
      <Loader isLoading={loading}></Loader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 5}}>
        <Vimeo
          style={{height: 220, width: '100%', flex: 1}}
          videoId={extractVideoId(toolDetails?.videoUrl)}
          params={'api=1&autoplay=0'}
          //handlers={videoCallbacks}
        />
        <View style={style.padding}>
          <View style={style.rockmat}>
            <Text numberOfLines={1} style={style.recovery}>
              {toolDetails?.title}
            </Text>
            <Pressable
              onPress={() => makeProgramFav(isFav ? false : true)}
              style={style.pdfV}>
              <Image
                style={{height: 22, width: 22, resizeMode: 'contain'}}
                source={isFav ? images.like : images.heart}></Image>
              <Text style={style.save}>Save</Text>
            </Pressable>
          </View>
          <Text style={style.ground1}>{toolDetails?.description}</Text>
        </View>

        <View style={style.empview}></View>

        <RecommendedTools
          onClick={id => getRecommendedToolDetails(id)}
          heading={'Recommended Tools'}
          data={recommendedTools}></RecommendedTools>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewFullProgram;
