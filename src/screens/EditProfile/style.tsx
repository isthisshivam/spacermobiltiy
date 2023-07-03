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
    view: {
      height: 100,
      width: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: colors.gray,
      alignItems: 'center',
      justifyContent: 'center',
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
    access_: {paddingHorizontal: 20, paddingVertical: 20},
    kawasaki_: {
      height: 170,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dumm: {
      height: 100,
      width: 100,
      resizeMode: 'cover',
      borderRadius: 50,
      borderColor: colors.lightgray,
      borderWidth: 3,
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
    dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
    input: {
      alignSelf: 'center',
      height: 55,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
      backgroundColor: colors.lightgray,
    },
    input1: {
      backgroundColor: colors.lightgray,
      height: 55,
      margin: 20,
      paddingHorizontal: 20,
      fontSize: 17,
      fontFamily: 'Montserrat-Regular',
    },
    dropdown4BtnTxtStyle: {
      color: colors.black,
      textAlign: 'left',
      fontFamily: 'Montserrat-Regular',
    },
    dropdown4RowStyle: {
      backgroundColor: '#EFEFEF',
      borderBottomColor: '#C5C5C5',
    },
    dropdown4RowTxtStyle: {color: 'black', textAlign: 'left'},
    backimg: {
      height: 12,
      width: 12,
      resizeMode: 'contain',
      transform: [{rotate: '270deg'}],
    },
  });
};
export default useStyle;
