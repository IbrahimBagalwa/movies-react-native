import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, FlatList } from 'react-native';
import films from '../helpers/filmData'
import FilmsItem from './FilmsItem';

class SearchScreen extends React.Component {
 render(){
     return(
         <View style={styles.main_container}>
             <TextInput style={styles.textInputSyle} placeholder="Titre du film..."/>
             <Button style={styles.buttonStyle} title="Search" onPress={()=>{}}/>
             <FlatList
                data={films}
                keyExtractor= {(item)=>item.id.toString()}
                renderItem={({item})=><FilmsItem film={item}/>}
             />
         </View>
     )
 }
}

const styles = StyleSheet.create({
    main_container:{
        marginTop:20,
        flex: 1,
    },
    textInputSyle:{
        marginLeft: 5,
        marginRight: 5,
        height: 30,
        borderColor: '#000000',
        borderWidth: 0.3,
        paddingLeft: 5
    },
    buttonStyle:{
        height: 50,
    }
})
export default SearchScreen
