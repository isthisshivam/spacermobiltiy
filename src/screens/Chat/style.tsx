import {StyleSheet} from 'react-native';
import {
  dW,
  dH,
  windowHeight,
  windowWidth,
} from '../../Utils/dynamicHeightWidth';
import assets from '../../assets/images/index';
import colors from '../../constants/colors';

const useStyle = () => {
  return StyleSheet.create({
    imageBack: {
      width: '100%',
      height: '100%',
    },
    header_view: {
      paddingHorizontal: 20,
      height: 55,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    back_click: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    img_20: {
      height: 20,
      width: 20,
      resizeMode: 'contain',
      transform: [{rotate: '90deg'}],
    },

    header_heading: {
      marginRight: dW(10),
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      color: colors.white,
      fontSize: dW(16),
      letterSpacing: 0,
    },
    flex1: {flex: 1},
    paddingHorizontal: {paddingVertical: 20, paddingHorizontal: 20},
    key: {
      height: 60,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    input: {
      paddingHorizontal: 20,
      borderRadius: 20,
      height: 45,
      backgroundColor: colors.white,
      width: '85%',
    },
    touch: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    },
    header_img: {height: dH(380), widht: '100%'},
    curve_img: {height: dH(15), marginTop: 15},
    logout_: {
      height: 34,
      width: 80,
      borderRadius: 5,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    back: {
      height: 15,
      width: 15,
      resizeMode: 'contain',
      transform: [{rotate: '180deg'}],
    },
    lnee: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 10,
    },
    lane1: {
      flex: 0.9,
      flexDirection: 'row',
      paddingLeft: 20,
      alignItems: 'center',
    },
    laneimg: {
      height: 30,
      width: 30,
      resizeMode: 'cover',
    },
    lane: {
      height: 55,
      backgroundColor: colors.lightgray,
      flexDirection: 'row',
      marginTop: 12,
      borderRadius: 5,
    },
    pading: {paddingHorizontal: 20, paddingVertical: 20},
    scroll: {
      height: 200,
      backgroundColor: colors.profileback,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scroll_img: {
      height: 100,
      width: 100,
      resizeMode: 'cover',
      borderRadius: 50,
      borderColor: colors.white,
      borderWidth: 3,
    },
    cancle: {
      color: 'black',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
    },
    invisi: {
      height: 34,
      width: 80,
      borderRadius: 5,
      backgroundColor: colors.lightgray,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    recovery: {
      //textAlign: 'center',
      fontSize: dW(17),
      marginTop: dW(0),
      lineHeight: 20,
      letterSpacing: 1,
      color: colors.primary,
      fontFamily: 'Montserrat-Bold',
    },
    visible: {
      flexDirection: 'row',
      height: 100,
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    miss: {
      marginTop: 10,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Montserrat-Thin',
    },
    logout: {
      marginTop: 20,
      fontSize: 17,
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold',
    },
    contane: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
      height: 160,
      width: 300,
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'center',

      marginTop: dH(240),
      borderRadius: 10,
    },

    contaner: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
      height: 180,
      width: 320,
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'center',

      marginTop: dH(240),
      borderRadius: 10,
    },
    mt_2: {
      marginTop: 2,
    },
    ground3: {
      //textAlign: 'center',
      fontSize: dW(15),
      marginTop: 7,
      color: colors.white,
      fontFamily: 'Montserrat-Regular',
    },
    ground2: {
      //textAlign: 'center',
      fontSize: dW(16),
      marginLeft: 7,
      color: colors.black,
      fontFamily: 'Montserrat-Medium',
    },
    ground1: {
      //textAlign: 'center',
      fontSize: dW(12),
      marginTop: 10,
      color: colors.gray,
      fontFamily: 'Montserrat-Regular',
    },
    ground0: {
      //textAlign: 'center',
      fontSize: dW(13),
      marginTop: 0,
      color: colors.white,
      fontFamily: 'Montserrat-Medium',
    },
    ground: {
      //textAlign: 'center',
      fontSize: dW(12),

      color: colors.gray,
      fontFamily: 'Montserrat-Regular',
    },
    access: {
      textAlign: 'center',
      fontSize: dW(15),
      marginTop: dW(20),
      lineHeight: 19,
      letterSpacing: 0,
      color: colors.gray,
      fontFamily: 'Montserrat-Medium',
    },
    and: {
      textAlign: 'center',
      fontSize: dW(15),
      marginTop: dW(2),
      lineHeight: 19,
      letterSpacing: 0,
      padding: 0,
      color: 'gray',
      fontFamily: 'Montserrat-Medium',
    },
    have: {
      textAlign: 'center',
      fontSize: dW(15),
      marginTop: dW(15),
      lineHeight: 19,
      letterSpacing: 0,
      padding: 0,
      color: 'gray',
      fontFamily: 'Montserrat-Medium',
    },
    login: {
      textAlign: 'center',
      fontSize: dW(16),
      marginTop: dW(10),
      lineHeight: 19,
      letterSpacing: 0,
      padding: 0,
      color: 'gray',
      fontFamily: 'Montserrat-SemiBold',
    },
  });
};
export default useStyle;
