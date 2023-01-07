import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PlaceList from '../components/Places/PlaceList';
import { fetchPlaces } from '../util/database';

const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    const loadPlaces = async () => {
     const places =  await fetchPlaces();
     setLoadedPlaces(places);
    };

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <PlaceList places={loadedPlaces} />
    </View>
  );
};

export default AllPlaces;
