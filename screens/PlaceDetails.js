import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { fetchPlaceDetails } from '../util/database';

export const PlaceDetails = ({ route, navigation }) => {
  const [place, setPlace] = useState();
  const showOnMapHandler = () => {
    navigation.navigate('Map', {
        lat: place.location.lat,
        lng: place.location.lng
    })
  };

  const id = route.params.placeId;

  useEffect(() => {
    const loadData = async () => {
      const p = await fetchPlaceDetails(id);
      setPlace(p);
      navigation.setOptions({
        title: p.title,
      });
    };

    loadData();
  }, [id]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <Text style={styles.address}>{place.location.address}</Text>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
