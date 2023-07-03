import baseBackendApi from '../redux/Services/baseBackendApi';
const FCM_TOKEN_CONVERSION = 'https://iid.googleapis.com/iid/v1:batchImport';

export const convertFCMToken = async payload => {
  let response = await baseBackendApi.post(FCM_TOKEN_CONVERSION + payload);
  console.log('convertFCMToken.resposne=>', response);
  return response?.data;
};
