import React, { Component } from 'react';
import { View, Text , StatusBar } from 'react-native';

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    };

    render() {
        return(
            <View>
                <Text>Home Component</Text>
                {/* <StatusBar
                // backgroundColor={'transparent'}
                // translucent={true}
            /> */}
                </View>
        );
    }
}

export default Home;