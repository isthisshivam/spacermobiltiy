import { StyleSheet } from 'react-native';
import { dW ,dH,windowHeight,windowWidth} from '../../Utils/dynamicHeightWidth';
import assets from '../../assets/images/index';
import colors from '../../constants/colors';
const useStyle = () => {
return(
    StyleSheet.create({
       header_img:{height: 200, width: '100%'},
       
    })

);
};
export default useStyle;