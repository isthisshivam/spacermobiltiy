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
      fontSize: dW(14),
      marginTop: dW(0),
      lineHeight: 15,
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
      fontSize: dW(18),
      marginTop: 7,
      color: colors.white,
      fontFamily: 'Montserrat-Bold',
    },
    ground1: {
      //textAlign: 'center',
      fontSize: dW(12),
      // marginTop: 20,
      color: colors.lightgray,
      fontFamily: 'Montserrat-SemiBold',
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
    products: {
      height: 35,
      alignSelf: 'center',
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 5,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });
};
export default useStyle;
