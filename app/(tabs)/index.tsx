import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
  { id: '1', name: 'Haircuts', image: 'https://cdn-icons-png.flaticon.com/128/2867/2867310.png' },
  { id: '2', name: 'Spa', image: 'https://cdn-icons-png.flaticon.com/128/2921/2921811.png' },
  { id: '3', name: 'Nail Care', image: 'https://cdn-icons-png.flaticon.com/128/1164/1164964.png' },
  { id: '4', name: 'Facials', image: 'https://cdn-icons-png.flaticon.com/128/2641/2641457.png' },
];

const salons = [
  {
    id: '1',
    name: "Luxury Hair Studio",
    image: 'https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg',
    address: "123 Main Street, NY"
  },
  {
    id: '2',
    name: "Glow Beauty Spa",
    image: 'https://images.pexels.com/photos/3997997/pexels-photo-3997997.jpeg',
    address: "456 Park Avenue, LA"
  },
  {
    id: '3',
    name: "Elite Nail Care",
    image: 'https://images.pexels.com/photos/3997995/pexels-photo-3997995.jpeg',
    address: "789 Sunset Blvd, CA"
  },
];

const HomeScreen = () => {
  return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>💇‍♀️ Salon Management</Text>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Services</Text>
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

        {/* Salons */}
        <Text style={styles.sectionTitle}>Popular Salons</Text>
        {salons.map((salon) => (
            <TouchableOpacity key={salon.id} style={styles.salonCard}>
              <Image source={{ uri: salon.image }} style={styles.salonImage} />
              <View style={styles.salonInfo}>
                <Text style={styles.salonName}>{salon.name}</Text>
                <Text style={styles.salonAddress}>{salon.address}</Text>
              </View>
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
    color: "#FF69B4",
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
  salonCard: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3, // Shadow effect
    flexDirection: "row",
    alignItems: "center",
  },
  salonImage: {
    width: 100,
    height: 100,
  },
  salonInfo: {
    padding: 10,
  },
  salonName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  salonAddress: {
    fontSize: 12,
    color: "gray",
  },
});
