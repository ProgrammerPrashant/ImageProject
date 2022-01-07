
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  View,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from '../Config/Config';
var myarr;
const Favourite = (props) => {

    const [favsAvailable, setFavsAvailable] = useState(false);
    const [favImages, setFavImages] = useState([]);
    useEffect(() => {
        getFavIds();
     
    },[favImages]);

    const getFavIds = async () => {

        const favs = await AsyncStorage.getItem('userfavs');

        if(favs == null) {
          myarr = [];
          setFavsAvailable(false);
        }
        else {
          myarr = JSON.parse(favs);
      
          let stringIds = myarr.join();
          fetchFavs(stringIds);

        }

    }

    const fetchFavs = async (ids) => {
     
        try {
            const response = await fetch(Config.apiLink+'/fetch_favs.php',{
              method:'POST',
              headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                image_ids : ids
            })
              });
            
              const retrieved = await response.json(); 
              const Images = retrieved.info;
              setFavImages(Images);
              setFavsAvailable(true);
          }
          catch(e) {
            console.log(e);
          }
    }
  
    return (
        <>
          <Modal
                animationType="fade"
                transparent={false}
                visible={props.favvisible}
                onRequestClose={() => {
                props.closeFavModal()
              }}
              >
                  <View style={styles.modalView}>
                      {
                          favsAvailable == true ? 
                          <ScrollView showsVerticalScrollIndicator={false}>
                          {
                              favImages.map((item,index) => {
                                  return (
                                    <View key={item.id.toString()} style={{marginTop:5, flex:1}}>
                                    <Image key={item.id} source={{ uri : Config.imagePath + item.image_path }} style={{height:200,width:300, resizeMode:"stretch"}}  />
                                    </View>
                                  )
                              }) 
                          }
                          </ScrollView>
                          :
                          <Text style={{fontSize:15,color: "black"}}>No Favourites Available</Text>
                      }
                      
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

export default Favourite;
