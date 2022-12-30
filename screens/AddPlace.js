import React from 'react';
import { View } from 'react-native';
import PlaceForm from '../components/Places/PlaceForm';

const AddPlace = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', {
      place,
    });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
