import React from "react";
import { 
  Pressable, 
  Text, 
  Image, 
  StyleSheet, 
  GestureResponderEvent, 
  ImageSourcePropType 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomButton=  ({ title, icon, imageSource, onPress, type = "primary" }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, styles[type]]}>
      {imageSource ? (
        <Image source={imageSource} style={styles.imageIcon} />
      ) : icon ? (
        <Icon name={icon} size={20} color="white" style={styles.icon} />
      ) : null}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginVertical: 5,
  },
  primary: {
    backgroundColor: "#007bff", // Blue
  },
  secondary: {
    backgroundColor: "#6c757d", // Grey
  },
  hover: {
    backgroundColor: "#0056b3", // Darker blue
  },
  imageIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomButton;
