import { StyleSheet } from 'react-native';
import { dW ,dH,windowHeight,windowWidth} from '../../Utils/dynamicHeightWidth';
import assets from '../../assets/images/index';
import colors from '../../constants/colors';
const useStyle = () => {
return(
    StyleSheet.create({
       header_img:{height: dH(380), widht: '100%'},
       curve_img:{height: dH(15), marginTop: 15},
       recovery:{
          textAlign: 'center',
          fontSize: dW(24),
          marginTop: dW(30),
          lineHeight: 25,
          letterSpacing: 4,
          color: colors.primary,
          fontFamily: 'Montserrat-Bold',
        },
        ground:{
            textAlign: 'center',
            fontSize: dW(24),
            marginTop: dW(10),
            lineHeight: 25,
            letterSpacing: 3,
            color: colors.primary,
            fontFamily: 'Montserrat-Bold',
          },
          access:{
            textAlign: 'center',
            fontSize: dW(15),
            marginTop: dW(20),
            lineHeight: 19,
            letterSpacing: 0,
            color: colors.gray,
            fontFamily: 'Montserrat-Medium',
          },
          and:{
            textAlign: 'center',
            fontSize: dW(15),
            marginTop: dW(2),
            lineHeight: 19,
            letterSpacing: 0,
            padding: 0,
            color: 'gray',
            fontFamily: 'Montserrat-Medium',
          },
          have:{
            textAlign: 'center',
            fontSize: dW(15),
            marginTop: dW(15),
            lineHeight: 19,
            letterSpacing: 0,
            padding: 0,
            color: 'gray',
            fontFamily: 'Montserrat-Medium',
          },
          login:{
            textAlign: 'center',
            fontSize: dW(16),
            marginTop: dW(10),
            lineHeight: 19,
            letterSpacing: 0,
            padding: 0,
            color: 'gray',
            fontFamily: 'Montserrat-SemiBold',
          }
    })

);
};
export default useStyle;