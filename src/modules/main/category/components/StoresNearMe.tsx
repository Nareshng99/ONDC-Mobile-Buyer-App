import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import useNetworkHandling from '../../../../hooks/useNetworkHandling';
import useNetworkErrorHandling from '../../../../hooks/useNetworkErrorHandling';
import {API_BASE_URL, LOCATIONS} from '../../../../utils/apiActions';
import {skeletonList} from '../../../../utils/utils';
import {FB_DOMAIN} from '../../../../utils/constants';

interface StoresNearMe {
  domain: string;
}

interface StoreImage {
  source: any;
}

const CancelToken = axios.CancelToken;

const BrandSkeleton = () => {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  return (
    <View style={styles.brand}>
      <SkeletonPlaceholder>
        <View style={styles.brandSkeleton} />
      </SkeletonPlaceholder>
    </View>
  );
};

const NoImageAvailable = require('../../../../assets/noImage.png');

const StoreImage: React.FC<StoreImage> = ({source}) => {
  const [imageSource, setImageSource] = useState(source);
  const styles = makeStyles();

  return (
    <FastImage
      source={imageSource}
      style={styles.brandImage}
      onError={() => setImageSource(NoImageAvailable)}
    />
  );
};

const StoresNearMe: React.FC<StoresNearMe> = ({domain}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {address} = useSelector(({addressReducer}) => addressReducer);
  const source = useRef<any>(null);
  const styles = makeStyles();
  const [locations, setLocations] = useState<any[]>([]);
  const [apiRequested, setApiRequested] = useState<boolean>(true);
  const {getDataWithAuth} = useNetworkHandling();
  const {handleApiError} = useNetworkErrorHandling();

  const getAllLocations = async () => {
    try {
      setApiRequested(true);
      source.current = CancelToken.source();
      const {data} = await getDataWithAuth(
        `${API_BASE_URL}${LOCATIONS}?domain=${domain}&latitude=${address.address.lat}&longitude=${address.address.lng}&radius=100`,
        source.current.token,
      );
      setLocations(data.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setApiRequested(false);
    }
  };

  const navigateToDetails = (store: any) => {
    const routeParams: any = {
      brandId: store.provider,
    };

    if (store.domain === FB_DOMAIN) {
      routeParams.outletId = store.id;
    }
    navigation.navigate('BrandDetails', routeParams);
  };

  useEffect(() => {
    getAllLocations().then(() => {});

    return () => {
      if (source.current) {
        source.current.cancel();
      }
    };
  }, [domain]);

  return (
    <View style={styles.container}>
      <Text variant={'titleSmall'} style={styles.title}>
        Stores near me
      </Text>
      {apiRequested ? (
        <FlatList
          horizontal
          data={skeletonList}
          renderItem={() => <BrandSkeleton />}
          keyExtractor={item => item.id}
        />
      ) : (
        <FlatList
          horizontal
          data={locations}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.brand}
              onPress={() => navigateToDetails(item)}>
              <StoreImage
                source={
                  item?.provider_descriptor?.images.length > 0
                    ? {uri: item?.provider_descriptor?.images[0]}
                    : NoImageAvailable
                }
              />
              <Text variant={'bodyMedium'}>
                {item?.provider_descriptor?.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    container: {
      paddingTop: 40,
      paddingLeft: 16,
    },
    title: {
      marginBottom: 12,
    },
    brand: {
      width: 160,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandImage: {
      padding: 16,
      borderRadius: 10,
      width: 160,
      height: 160,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EDEDED',
      marginBottom: 12,
    },
    brandSkeleton: {
      width: 160,
      height: 160,
      marginRight: 20,
    },
  });

export default StoresNearMe;
