import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
// import {ScreenOrientaion} from 'expo-screen-orientation';
const randomGenerateNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndm = Math.floor(Math.random() * (max - min) + min);
    if (rndm === exclude) {
        return randomGenerateNumber(min, max, exclude);
    }
    else {
        return rndm;
    }
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <Text>#{numOfRound}</Text>
        <Text>{value}</Text>
    </View>
);
const GameScreen = props => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    const initialGuess = randomGenerateNumber(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceWidth,setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width

    );
    const [availableDeviceHeight,setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const { userChoice, onGameOver } = props; // Object Destructring

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change',updateLayout);

        return () => {
            Dimensions.removeEventListener('change',updateLayout);
        }
    });
    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'higher' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        }
        else if (direction === 'higher') {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = randomGenerateNumber(currentLow.current, currentHigh.current, currentGuess);
        console.log(nextNumber);
        setCurrentGuess(nextNumber);
        // setRounds(curRound => curRound + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);

    };
    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.landscape}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
                </View>
                <View style={styles.listContainer}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>
        );

    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,

        width: 300,
        maxWidth: '90%'
    },
    list: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listContainer: {
        flex: 1,
        width: Dimensions.get('window').height > 350 ? '60%' : '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 5,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    landscape: {
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-around',
        alignItems:'center'
    }
})

export default GameScreen;