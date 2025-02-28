import React from "react";
import { View, Text, ScrollView, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../../utils/components/Button";

// Sample product data
const products = [
  {
    id: "1",
    name: "Nike Air Max",
    price: "$120",
    image: require("../../../assets/shoes.png"),
  },
  {
    id: "2",
    name: "Adidas Ultraboost",
    price: "$150",
    image: require("../../../assets/shoes2.png"),
  },
  {
    id: "3",
    name: "Puma Sneakers",
    price: "$90",
    image: require("../../../assets/shoes3.png"),
  },
];

const categories = [
  { id: "1", name: "Sneakers", icon: "shoe-prints" },
  { id: "2", name: "Watches", icon: "clock-o" },
  { id: "3", name: "Bags", icon: "shopping-bag" },
  { id: "4", name: "Accessories", icon: "diamond" },
];

const Home = () => {

    const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* 🔹 Navbar */}
      <View className="p-4 bg-blue-600 flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">ShopEasy</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Icon name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          Login
        </TouchableOpacity>
      </View>

      {/* 🔹 Search Bar */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-200 px-3 py-2 rounded-lg">
          <Icon name="search" size={20} color="gray" className="mr-2" />
          <TextInput placeholder="Search products..." className="flex-1 text-base" />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* 🔹 Categories */}
        <Text className="text-lg font-semibold px-4 mt-2">Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-3 bg-gray-100 mx-2 rounded-lg items-center">
              <Icon name={item.icon} size={20} color="black" />
              <Text className="text-sm mt-1">{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
        />

        {/* 🔹 Featured Products */}
        <Text className="text-lg font-semibold px-4 mt-4">Featured Products</Text>
        <FlatList
          data={products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-gray-100 p-4 rounded-lg m-2 w-44">
              <Image source={item.image} className="w-32 h-32 mx-auto" />
              <Text className="text-sm font-semibold text-center mt-2">{item.name}</Text>
              <Text className="text-blue-600 text-center font-medium">{item.price}</Text>
              <CustomButton title="Buy Now" onPress={() => console.log("Buying")} type="primary" />
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </ScrollView>

      {/* 🔹 Login Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-4 pb-5 self-center"
      >
        <Text className="text-blue-500 font-semibold">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default styled(Home);
