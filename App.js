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
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import Categories from './Components/Categories';
import Config from './Config/Config';
import Header from './Components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import ModalImage from './Components/ModalImage';
import Favourite from './Components/Favourite';


const App = () => {
  const[categories, setCategories] = useState([]);
  const[imageModal, setImageModal] = useState(false);
  const[imageData, setImageData] = useState("");
  const[imagePath, setImagePath] = useState("");
  const[visible, setVisible] = useState(false);
  const[selectedCate, setSelectedCate] = useState("");
  const[imageCateData, setImageCateData] = useState([]);
  const[categoryName, setCategoryName] = useState("");
  const[favVisible,setFavVisible] = useState(false);
  console.disableYellowBox = true;

  
  useEffect(() => {
      fetchCate()
  },[]);


  const photoFromGallery = async (type) => { 
        ImagePicker.openPicker({
        width: 300,
        height: 400,
        includeBase64:true,
        cropping: true
      }).then(image => {       
        setImageData(image.data);
        setImageModal(true);
        setImagePath({uri: image.path});

          });
        }
    

  const fetchCate = async () => {

    try {
      const response = await fetch(Config.apiLink+'/fetchcates.php',{
        method:'GET',
        headers:{
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
      },
        });
      
        const retrieved = await response.json(); 
        const categoryList = retrieved.info;
        setCategories(categoryList);
        console.log(categoryList);
    }
    catch(e) {
      console.log("Error");
    }
  
  }

  const fetchCateWiseImage = async (id) => {

    try {
      const response = await fetch(Config.apiLink+'/fetch_images.php',{
        method:'POST',
        headers:{
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
          cate_id : id
      })
        });
      
        const retrieved = await response.json(); 
        setImageCateData(retrieved.info);
        setVisible(true);

      }
    catch(e) {
      console.log("Error");
    }

  }


  const imageAdd = async () => {
      var path = imageData;
    try {
      let source = {uri: 'data:image/jpeg;base64,' + path};
      const response = await fetch(Config.apiLink+'/image_add.php',{
        method:'POST',
        headers:{
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
          cate_image : source.uri,
          cate_id : selectedCate
      })
        });
      
        const retrieved = await response.json(); 
        setImageModal(false);
        setSelectedCate("");
        alert("You have Upload Image Successfully !")
    }
    catch(e) {
      console.log("Error");
    }
  }

  const closeModal = () => {
    setVisible(false);
  }

  const closeFavModal = () => {
    setFavVisible(false);
  }

  const addCategory = async () => {
    
    try {
      const response = await fetch(Config.apiLink+'/add_cate.php',{
        method:'POST',
        headers:{
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
      },
      body : JSON.stringify({
          cate_name : categoryName
      })
        });
      
        const retrieved = await response.json(); 
        fetchCate();
        setCategoryName("");

      }
    catch(e) {
      console.log("Error");
    }

  }
  
  return (
    <>
      <Header onUpload={photoFromGallery} categories={"All Categories"} />
      {/* Fixed Category  */}
      <TouchableOpacity onPress={() => { setFavVisible(true)}}  style={{flexDirection:'row', backgroundColor:"#29B6F6",borderBottomWidth:1,borderBottomColor:"#ECEFF1",width:"100%",height:80,marginTop:5}}>
            <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                <Text style={{fontSize:20, textAlign:"center", color:"white"}} >My Favourites</Text>
            </View>
      </TouchableOpacity>
          {/* Fixed Category End  */}
      <Categories fetchData={fetchCateWiseImage} data={categories} />
      <ModalImage closeModal={closeModal} cateImageData={imageCateData}  visible={visible} />
      
      <Favourite closeFavModal={closeFavModal} favvisible={favVisible}  />
      <KeyboardAvoidingView behavior="position" >

      <Modal
            
            animationType="fade"
            transparent={true}
            visible={imageModal}
            onRequestClose={() => {
            setImageModal(false);
          }}
          >
            <View style={styles.centeredView}  >
              <View style={styles.modalView}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                  <Text style={{fontSize: 20}}>
                    Select Upload Option
                  </Text>
                  <Image source={imagePath} style={{height:100, width:100}}  />
                </View>

                <Text style={{fontSize:16, color:"black",  fontWeight:"bold"}} >Existing Categories</Text>
                <View style={{height:10}} />
                <View style={{height:80}} >
                <ScrollView  showsVerticalScrollIndicator={false} >
               
                {
                  categories.map((item,index) => {
                    return (
                      <TouchableOpacity style={{ paddingTop:8, paddingBottom:8, alignItems:"center", backgroundColor:"#B3E5FC" }}
                       key={item.id.toString()} 
                       onPress={() => { setSelectedCate(item.id)
                        }}>

                      <Text style={{fontSize: 15, color : selectedCate == item.id ? "red" : "black" }}>
                        {item.cate_name}
                      </Text>
                    </TouchableOpacity>
                    
                    )
                  })
                }
               
                </ScrollView>

                </View>
                <Button title='ADD' onPress={imageAdd} ></Button>

                
                <Text style={{fontSize:16, marginVertical:8, color:"black", fontWeight:"bold"}} >Create New Category</Text>

                <TextInput  style={{ height:40, width: "95%", borderColor: 'gray', borderWidth: 1,  marginBottom: 20 }}  placeholder={"Type new Category Here"}  value={categoryName} onChangeText={(cate) => { setCategoryName(cate) }} />
                <Button onPress={addCategory} title={"Add Category"}  />

               
              </View>
            </View>
          </Modal>
          </KeyboardAvoidingView>
    </>
  )
}



const styles = StyleSheet.create({
  mainTitle: {
    
    marginLeft:15,
    flexDirection:"row"
  },
  bodyTitle:{
    
  justifyContent:"flex-start",
   backgroundColor:"#f5f5f5",
   height:50,
   
  },
  bodyText:{
    marginHorizontal:10,
    justifyContent:"space-between",
    alignItems:"center",
    padding:8,
    flexDirection:"row",
  },
  text:{
    alignSelf:"center",
    marginLeft:20,
    fontSize:14,
  },

 
  centeredView:{

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    },

  modalView: {
   // justifyContent:"space-between",
   
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "grey",
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
    width:"90%",
    height:"85%",
    padding: 15,
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

export default App;
