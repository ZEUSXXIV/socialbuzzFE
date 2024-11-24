import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import CircularImageButton from './components/CircularImageButton';
import Api from './helper/Api';
import axios from 'axios';

const App = () => {

  const [room, setRoom] = useState()


  useEffect(() => {
    // Lock to landscape
    Orientation.lockToLandscape();

    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log("res-->>",json))

    getRoomDetails()
    // Cleanup function to unlock the orientation when the component unmounts
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const getRoomDetails = async()=>{

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // Parse the response JSON
      console.log(data); // Use the fetched data
    } catch (error) {
      console.error('Error:', JSON.stringify(error)); // Handle errors
    }

    try{
      const data = await Api.get("api/hotel/room/2")
      console.log("data==>>" , data)
    }
    catch(err)
    {
      console.log("err==>>" , JSON.stringify(err))
    }


    try{
      Api.get("api/hotel/roo/2").then((res)=>{
        console.log("room details==>>" , res.data[0][0])
        setRoom(res.data[0][0])
      })
    }
    catch(err)
    {
      console.log("err2==>>" , JSON.stringify(err))
    }
  }

  const Col = ({ children }) => {
    return (
      <View style={styles.col}>{children}</View>
    )
  }

  const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )

  return (
    <ImageBackground
      // source={{ uri: room?.image_url ? room?.image_url :'./assets/manager.jpg' }} 
      // source={require(room?.image_url ? room?.image_url :'./assets/manager.jpg')}

      source={room?.image_url ? {uri : room?.image_url} :require('./assets/manager.jpg') }
      style={styles.backgroundImage}
      resizeMode="cover"  
    >
      <View />
      <View style={{alignSelf:'flex-start' , marginLeft:100}}>
        <Text style={{ fontSize:30}} >Welcome,</Text>
        <Text style={{ fontSize:30}} >{room?.name ? room?.name : "Guest"}</Text>
      </View>
      <View style={styles.overlay}>
        <Row>
          <Col >
            <CircularImageButton imageSource='https://picsum.photos/200/300' />
          </Col>
          <Col>
            <CircularImageButton imageSource='https://picsum.photos/200/300' />
          </Col>
          <Col>
            <CircularImageButton imageSource='https://picsum.photos/200/300' />
          </Col>
        </Row>
      </View>
    </ImageBackground>

  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Takes the full height and width of the container
    justifyContent: 'space-between', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  overlay: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'

  },
  text: {
    color: '#fff',
    fontSize: 24,
  },

  row: {
    flexDirection: "row"
  },
  col: {
    flex: 1
  },
});


export default App;
