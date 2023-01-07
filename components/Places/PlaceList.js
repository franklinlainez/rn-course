import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import PlaceItem from './PlaceItem';

const PlaceList = ({ places }) => {

  const navigation = useNavigation();

  const selectPlaceHandler = (placeId) =>{
    navigation.navigate('PlaceDetails', {
      placeId
    })
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <PlaceItem place={itemData.item} onSelect={selectPlaceHandler} />}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
