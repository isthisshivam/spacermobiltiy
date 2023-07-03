import {requestPurchase, useIAP} from 'react-native-iap';
import React, {useState, useEffect, useRef, useCallback} from 'react';
const program_sku_developp1 = Platform.select({
  ios: ['com.spacermobility.develop.p1'],
});
const program_sku_developp2 = Platform.select({
  ios: ['com.spacermobility.develop.p2'],
});
const program_sku_developp3 = Platform.select({
  ios: ['com.spacermobility.develop.p3'],
});
const {
  connected,
  products,
  promotedProductsIOS,
  subscriptions,
  purchaseHistories,
  availablePurchases,
  currentPurchase,
  currentPurchaseError,
  initConnectionError,
  finishTransaction,
  getProducts,
  getSubscriptions,
  getAvailablePurchases,
  getPurchaseHistories,
} = useIAP();

export const getIapProducts = async skus => {
  return getProducts({skus: skus});
};
export const isIapConnected = async () => {
  return connected;
};
export const returnProducts = async () => {
  return products;
};
export const returnCurrentPurchase = async () => {
  return currentPurchase;
};

export const handlePurchase = async sku => {
  console.log('handlePurchase', sku);
  await requestPurchase({sku: sku})
    .then(res => {
      console.log('res.e', res);
      // updatePurchaseInformation(res);
      return res;
    })
    .catch(e => {
      console.log('catch.e', e);
    });
};
