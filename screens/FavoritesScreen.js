import { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList/MealList';
import { MEALS } from '../data/dummy-data';
import { FavoritesContext } from '../store/context/favorites-context';

function FavoritesScreen() {
  // const ctx = useContext(FavoritesContext);

  const favoriteMealsIds =  useSelector((state)=> state.favoriteMeals.ids);

  // const favoriteMeals = MEALS.filter((meal) => ctx.ids.includes(meal.id));
  const favoriteMeals = MEALS.filter((meal) => favoriteMealsIds.includes(meal.id));

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
