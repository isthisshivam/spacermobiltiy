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
    header_img: {height: dH(380), widht: '100%'},
    curve_img: {height: dH(15), marginTop: 15},
    recovery: {
      //textAlign: 'center',
      fontSize: dW(17),
      marginTop: dW(0),
      lineHeight: 20,
      letterSpacing: 1,
      color: colors.primary,
      fontFamily: 'Montserrat-Bold',
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
    details: {
      height: 190,
      width: '100%',
    },
    padding: {padding: 20},
    rockmat: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    heart: {height: 22, width: 22, resizeMode: 'contain'},
    save: {
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
      color: 'gray',
    },
    empview: {
      backgroundColor: colors.lightgray,
      height: 1,
      width: '90%',
      alignSelf: 'center',
      marginTop: 10,
    },
  });
};
export default useStyle;
