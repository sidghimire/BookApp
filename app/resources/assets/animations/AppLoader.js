import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';

import LottieAnimation from "./loadingWhileAdding.json"

const AppLoader = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
            <LottieView source={LottieAnimation} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.7)',
        zIndex:1
    }
})

export default AppLoader
