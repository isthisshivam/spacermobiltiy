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
    header_img: {height: 120, width: '100%'},
    welcome_back: {
      textAlign: 'left',
      fontSize: dW(17),
      marginTop: dW(30),
      lineHeight: 21,
      letterSpacing: 1,
      color: colors.black,
      fontFamily: 'Montserrat-Bold',
    },
    input: {
      height: 55,
      backgroundColor: colors.lightgray,
      width: '100%',
      borderRadius: 6,
      marginTop: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      fontFamily: 'Montserrat-Regular',
    },
    inputqq: {
      height: 55,
      backgroundColor: colors.lightgray,
      width: '100%',
      borderRadius: 6,
      marginTop: 10,
      paddingHorizontal: 13,
      fontSize: 16,
      fontFamily: 'Montserrat-Regular',
    },
    forgot: {
      marginTop: dH(30),
      color: colors.primary,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      letterSpacing: 1,
    },
    have_acc: {
      textAlign: 'center',
      fontSize: dW(15),
      marginTop: dW(50),
      lineHeight: 19,
      letterSpacing: 0,
      padding: 0,
      color: 'gray',
      fontFamily: 'Montserrat-Medium',
    },
    new_one: {
      textAlign: 'center',
      fontSize: dW(16),
      marginTop: dW(10),
      lineHeight: 19,
      letterSpacing: 0,
      padding: 0,
      color: colors.primary,
      fontFamily: 'Montserrat-SemiBold',
    },
    tc: {
      color: colors.primary,
      textAlign: 'center',
      marginTop: 5,
      fontFamily: 'Montserrat-Medium',
      letterSpacing: 1,
    },
    login: {
      textAlign: 'center',
      fontSize: dW(16),
      marginTop: dW(10),
      lineHeight: 19,
      letterSpacing: 0,
      padding: 0,
      color: colors.primary,
      fontFamily: 'Montserrat-SemiBold',
    },
    dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
    // input: {
    //   alignSelf: 'center',
    //   height: 55,
    //   width: '90%',
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 7,
    //   },
    //   shadowOpacity: 0.41,
    //   shadowRadius: 9.11,

    //   elevation: 14,
    //   backgroundColor: colors.lightgray,
    // },
    input1: {
      backgroundColor: colors.lightgray,
      height: 55,
      margin: 20,
      paddingHorizontal: 20,
      fontSize: 17,
      fontFamily: 'Montserrat-Regular',
    },
    dropdown4BtnTxtStyle: {
      color: colors.gray,
      textAlign: 'left',
      fontSize: 17,
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
