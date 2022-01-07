
import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Categories = (props) => {
  
  return (
    <View>
     <FlatList
      data={props.data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
       return (
         <TouchableOpacity onPress={() => {props.fetchData(item.id) }}  style={{flexDirection:'row', backgroundColor:"#29B6F6",borderBottomWidth:1,borderBottomColor:"#ECEFF1",width:"100%",height:80,marginTop:5}}>
           <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
                <Text style={{fontSize:20, textAlign:"center", color:"white"}} >{item.cate_name}</Text>
           </View>
         </TouchableOpacity>
       )
      }
    }
     />
    </View>
  );
};


export default Categories;
