import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import DoctorItem from "../components/DoctorItem";
import { SearchBar } from "react-native-elements";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState("false");

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading("false");
    if (query.length > 2) {
      try {
        const response = await fetch(
          `http://192.168.100.7:3000/doctor?q=${query}`
        );
        const data = await response.json();
        setSearchResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, []);

  const renderDoctor = ({ item }) => {
    return <DoctorItem doctor={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Specializations, Doctors ..."
        onChangeText={handleSearch}
        value={searchQuery}
        round
        containerStyle={styles.search}
        inputContainerStyle={styles.input}
      />
      {/* Render the search results if they are defined */}

      <FlatList
        data={searchResults}
        renderItem={renderDoctor}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    height: 35,
  },
});

export default SearchScreen;
