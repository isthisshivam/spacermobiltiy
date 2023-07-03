import { StyleSheet } from 'react-native';
import { dW ,dH,windowHeight,windowWidth} from '../../Utils/dynamicHeightWidth';
import assets from '../../assets/images/index';
import colors from '../../constants/colors';
const useStyle = () => {
return(
    StyleSheet.create({
       header_img:{height: 120, width: '100%'},
       welcome_back:{
        textAlign: 'left',
        fontSize: dW(17),
        marginTop: dW(30),
        lineHeight: 21,
        letterSpacing: 1,
        color: colors.black,
        fontFamily: 'Montserrat-Bold',
      },
      input:{
        height: 55,
        backgroundColor: colors.lightgray,
        width: '100%',
        borderRadius: 6,
        marginTop: 20,
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
      },
      forgot:{
        marginTop: dH(30),
        color: colors.primary,
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        letterSpacing: 1,
      },
      have_acc:{
        textAlign: 'center',
        fontSize: dW(15),
        marginTop: dW(220),
        lineHeight: 19,
        letterSpacing: 0,
        padding: 0,
        color: 'gray',
        fontFamily: 'Montserrat-Medium',
      },
      new_one:{
        textAlign: 'center',
        fontSize: dW(16),
        marginTop: dW(10),
        lineHeight: 19,
        letterSpacing: 0,
        padding: 0,
        color: colors.primary,
        fontFamily: 'Montserrat-SemiBold',
      }
    })

);
};
export default useStyle;