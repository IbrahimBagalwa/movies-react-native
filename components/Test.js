import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';

class Test extends React.Component{
    render(){
        return(
            <View style={styles.main_container}>
                <View style={styles.sub_container}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    sub_container:{
        ...Platform.select({
            ios:{
                backgroundColor:'blue'
            },
            android:{
                backgroundColor:'red'
            }
        }),
        height: 50,
        width: 50,
    }
})

export default Test