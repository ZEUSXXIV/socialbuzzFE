import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const CircularImageButton = ({ imageSource,size = 100 }) => {
  return (
    <TouchableOpacity onPress={()=> console.log("pressing")}>
      <View style={[styles.imageContainer, { width: size, height: size }]}>
        <Image
          source={{uri:imageSource}}
          style={[styles.image, { width: size, height: size }]}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 100, // Ensure the border radius is large enough to make the image circular
    overflow: 'hidden',
  },
  image: {
    borderRadius: 100, // Same as the container to ensure the image itself is circular
  },
});

export default CircularImageButton;
