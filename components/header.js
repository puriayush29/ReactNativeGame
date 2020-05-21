import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors';

const Header = props => {
return (
    <View style = {{...styles.headerBase,...Platform.select({
        ios:styles.headerIOS,
        android:styles.headerAndroid
    })}}> 
        <Text style = {styles.headerTitle}>{props.title}</Text>
    </View>
)
}
const styles = StyleSheet.create({
    headerBase : {
        width:'100%',
        height:90,
        padding:36,
        alignItems:'center',
        justifyContent:'center',
       
       
    },
    headerIOS: {
        backgroundColor:'white',
        borderBottomColor:'#ccc',
        borderBottomWidth:1
    },
    headerAndroid: {
        backgroundColor: '#f7287b',
        borderBottomColor:'yellow',
        borderBottomWidth:2
    },
    headerTitle : {
        color:Platform.OS === 'android' ? 'yellow': Colors.primary,
        fontSize:18,
        textAlign:'center',
        marginTop:20
    }
});

export default Header;