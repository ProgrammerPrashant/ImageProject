
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const Header = (props) => {
    return (
    <View  style={{height:56, elevation:6, backgroundColor:"blue"}}>
    <View style={{paddingHorizontal:7, top:15,flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{flexDirection:"row", flex:1, justifyContent:'space-between',alignItems:"center"}} >
        
    <Text style={{fontSize:20, color:"white", fontWeight:"900",bottom:1}}>{props.categories}</Text>
    <TouchableOpacity onPress={() => {  }}>
    <Text style={{marginHorizontal:10,fontSize:18, color:"white"}} onPress={props.onUpload} >Upload</Text>
    </TouchableOpacity> 
    </View> 
    </View> 
    </View>

  )
}


export default Header;