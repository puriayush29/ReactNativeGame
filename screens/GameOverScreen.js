import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';
import defaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
    return (
        <SafeAreaView>
        <ScrollView>
        <View style={styles.screen}>
            <Text style={defaultStyles.bodyText}>The Game is Over!!</Text>

            <Image style={styles.image}
                fadeDuration={1000}
                // source = {require('../assets/success.png')}
                source={{ uri: 'https://s14-eu5.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fimage.shutterstock.com%2Fimage-photo%2Fbusiness-success-leadership-achievement-people-260nw-411972601.jpg&sp=1588102714T58064d746cdffb38608eceae5ceafc62a0a9bc5d2afa5fc9c93e5b26bdfdca44' }}
                resizeMode="contain"
            />
            <View style={styles.resultContainer}>
            <Text style={defaultStyles.bodyText,styles.resultText}>
                <Text style={styles.highlight}> Your Phone needed </Text>
                 {props.returnRounds}
                <Text style={styles.highlight}> rounds to guess a number </Text>{props.userNumber}.
            </Text>
            </View>
            <MainButton onPress={props.onRestart} >Restart Game!!</MainButton>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:10
    },
    // For network images we always have to set the style to the image object
    image: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7 

    },
    highlight: {
        color:colors.accent,
        
    },
    resultContainer: {
        marginHorizontal:30,
        marginVertical:20
    },
    resultText: {
        textAlign:'center',
        fontSize:Dimensions.get('window').height < 400 ? 60 :20
    }
})
export default GameOverScreen;