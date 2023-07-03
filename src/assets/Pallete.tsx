import {StyleSheet} from 'react-native';
import {dW} from '../Utils/dynamicHeightWidth';

const usePallete = () => {
  return StyleSheet.create({
    mainContainor: {
      flex: 1,
      backgroundColor: 'white',
    },
    screen_container: {
      paddingHorizontal: dW(15),
      flex: 1,
    },
    inheritView: {
      height: '100%',
      width: '100%',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
export default usePallete;
