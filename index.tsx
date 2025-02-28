// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
//
// type Props = {}
//
// const Page = (props: Props) => {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//     </View>
//   )
// }
//
// export default Page
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// })

import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
  { id: '1', name: 'Pizza', image: 'https://cdn-icons-png.flaticon.com/128/3595/3595453.png' },
  { id: '2', name: 'Burgers', image: 'https://cdn-icons-png.flaticon.com/128/3075/3075977.png' },
  { id: '3', name: 'Sushi', image: 'https://cdn-icons-png.flaticon.com/128/3051/3051181.png' },
  { id: '4', name: 'Desserts', image: 'https://cdn-icons-png.flaticon.com/128/415/415733.png' },
];

// const restaurants = [
//   { id: '1', name: "Joe's Pizza",     image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'
//   },
//   { id: '2', name: "Burger House", image: 'https://source.unsplash.com/400x300/?burger' },
//   { id: '3', name: "Sushi Express", image: 'https://source.unsplash.com/400x300/?sushi' },
// ];
const restaurants = [
  {
    id: '1',
    name: "Joe's Pizza",
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'
  },
  {
    id: '2',
    name: "Burger House",
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'
  },
  {
    id: '3',
    name: "Sushi Express",
    image: 'https://images.pexels.com/photos/3298688/pexels-photo-3298688.jpeg'
  },
];


const HomeScreen = () => {
  return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>🍕 Food Delivery</Text>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.categoryItem}>
                  <Image source={{ uri: item.image }} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
        />

        {/* Restaurants */}
        <Text style={styles.sectionTitle}>Popular Restaurants</Text>
        {restaurants.map((restaurant) => (
            <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
              <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#FF6347",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  restaurantCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3, // Shadow effect
  },
  restaurantImage: {
    width: "100%",
    height: 150,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
});
