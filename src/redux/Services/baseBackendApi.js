import axios from 'axios';
const FCM_TOKEN_CONVERSION = 'https://iid.googleapis.com/iid/v1:batchImport';
const CONTENT_TYPE = 'application/json';
const SERVER_KEY =
  'AAAANUpTvgc:APA91bEB-_VzVZqMCbZBpGqAUuJ2TgtP8A5HGwEAOHnTvLRHJ8qBPvoHOCsjnALPPZnOgXzyMdUfHrvfzY1caytt6uRVN602AfyDzngzurjlsIgmf06rP0b_ylEkxpnpz2spOv-bnoKZ';

const headerParams = {
  'Content-Type': CONTENT_TYPE,
  Authorization: 'key=' + SERVER_KEY,
};
const baseBackendApi = new axios.create({
  baseURL: FCM_TOKEN_CONVERSION,
  timeout: 50000,
  headars: headerParams,
});

export default baseBackendApi;
