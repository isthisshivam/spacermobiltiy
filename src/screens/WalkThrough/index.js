import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, Animated} from 'react-native';
import usePallete from '../../assets/Pallete';
import images from '../../assets/images';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {
  dW,
  dH,
  windowWidth,
  windowHeight,
} from '../../Utils/dynamicHeightWidth';
import colors from '../../constants/colors';
import PrimaryButton from '../../components/PrimaryButton';
import {useNavigation} from '@react-navigation/native';
import PrimaryHeader from '../../components/PrimaryHeader';
import TutorialsWalkThrough from '../../components/TutorialsWalkThrough';
import ProgramsWalkThrough from '../../components/ProgramWalkThrough';
import MobilityWalkThrough from '../../components/MobilityWalkThrough';
import StoreWalkThrough from '../../components/StoreWalkThrough';
import useStyle from './style';
import {CommonActions} from '@react-navigation/native';
var i = 1;
const WalkThrough = props => {
  const styles = useStyle();
  const pallete = usePallete();
  const navigation = useNavigation();
  let flatListRef = React.useRef(null);
  const [initialPage, setinitialPage] = useState(0);
  var scrollX = React.useRef(new Animated.Value(0)).current;
  const onViewRef = React.useRef(({viewableItems}: any) => {
    //setinitialPage(viewableItems[0].index);
  });
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  function navigateToHome() {
    i = 1;
    setTimeout(() => {
      // navigation.navigate('HomeStack', {
      //   screen: 'Home',
      // });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: `HomeStack`}],
        }),
      );
    }, 300);
  }

  const animate = value => {
    if (i < 5) {
      flatListRef.current.scrollToIndex({
        index: value,
        animated: true,
      });
    } else {
      navigateToHome();
    }
  };

  const steps = [
    <TutorialsWalkThrough />,
    <ProgramsWalkThrough />,
    <MobilityWalkThrough />,
    <StoreWalkThrough />,
  ];
  const ViewPager = () => {
    return (
      <Animated.FlatList
        scrollEnabled={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={steps}
        renderItem={(item, index) => {
          return item.item;
        }}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
    );
  };
  return (
    <SafeAreaView style={[pallete.mainContainor]}>
      <PrimaryHeader onClick={() => navigateToHome()} />
      <ViewPager />
      <View style={{height: '10%'}}>
        <ExpandingDot
          data={steps}
          expandingDotWidth={40}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          inActiveDotColor={'gray'}
          activeDotColor={colors.primary}
          dotStyle={styles.dots}
          containerStyle={{
            top: dW(30),
          }}
        />
      </View>

      <PrimaryButton
        heading={'NEXT'}
        e_style={{marginBottom: 20}}
        onClick={() => animate(i++)}></PrimaryButton>
    </SafeAreaView>
  );
};

export default WalkThrough;
