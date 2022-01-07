/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import {
   Modal,
   StyleSheet,
   TouchableOpacity,
   ToastAndroid,
   Image,
   Text,
   View,
   ScrollView,
   Button,
 } from 'react-native';
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import Config from '../Config/Config';
 
 
 const ModalImage = (props) => {

  const favouriteCheck = async (id) => {
    var userFav = await AsyncStorage.getItem('userfavs');
      let arrayFavs = (userFav && JSON.parse(userFav)) || []  
      arrayFavs = [...arrayFavs,id];
        try {

          await AsyncStorage.setItem('userfavs', JSON.stringify(arrayFavs));
          ToastAndroid.show(
            'Added To Favourite !',
            ToastAndroid.SHORT,
          );
        }
        catch(e) {
          ToastAndroid.show(
            'Something Went Wrong !',
            ToastAndroid.SHORT,
          );
        }
      }   
   return (
     <>
       <Modal
             animationType="fade"
             transparent={false}
             visible={props.visible}
             onRequestClose={() => {
             props.closeModal()
           }}
           >
               <View style={styles.modalView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        props.cateImageData.map((item,index) => {
                            return (
                              <TouchableOpacity onPress={() => {favouriteCheck(item.id)}} style={{marginTop:5, flex:1}}>
                              <Image key={item.id.toString()} source={{ uri : Config.imagePath + item.image_path }} style={{height:200,width:300, resizeMode:"stretch"}}  />
                              </TouchableOpacity>

                            )
                        })
                        
                    }
                    </ScrollView>
                 </View>  
           </Modal>
     </>
   );
 };
 
 
 const styles = StyleSheet.create({
 
   modalView: {
    // justifyContent:"space-between",
    
     backgroundColor: "white",
     borderRadius: 5,
     shadowColor: "grey",
     shadowOpacity: 1,
     shadowRadius: 100,
     elevation: 5,
    
     padding: 25,
     },
 
   modalViewImage: {
     justifyContent:"space-around",
     backgroundColor: "white",
     borderRadius: 10,
     shadowColor: "#04d9ff",
     shadowOpacity: 0.25,
     shadowRadius: 4,
     elevation: 5,
     width:"68%",
     height:"28%"
     },    
 
  
 });
 
 export default ModalImage;
 