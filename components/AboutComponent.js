import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import { Text, ScrollView, Image, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
<<<<<<< HEAD
// import { LEADERS } from '../shared/leaders';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }
=======
import { LEADERS } from '../shared/leaders';

>>>>>>> 1bc3b570956119194ee25ceba0f0697f7e379379

const History = () => {
    return(
        <Card>
        <Card.Title>
            <Text>Our History</Text>
        </Card.Title>
        <Card.Divider />

        <Text>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
        {"\n"}
        </Text>
        
        <Text>
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
        </Text>
    </Card>
    );
}



class AboutUs extends Component {

<<<<<<< HEAD
=======
    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        }
    }

>>>>>>> 1bc3b570956119194ee25ceba0f0697f7e379379
    static navigationOptions = {
        title: 'About Us'
    }

    render() {

<<<<<<< HEAD
        const renderLeader = ({ item }) => {
            return (
                <ListItem>
                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{uri: baseUrl + item.image}} />
=======
        const renderLeader = ({ item, index }) => {
            return (
                <ListItem>
                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./images/alberto.png')} />
>>>>>>> 1bc3b570956119194ee25ceba0f0697f7e379379
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        }

        return (

            <ScrollView>

                <History />
                <Card>
                    <FlatList
<<<<<<< HEAD
                        data={this.props.leaders.leaders}
=======
                        data={this.state.leaders}
>>>>>>> 1bc3b570956119194ee25ceba0f0697f7e379379
                        renderItem={renderLeader}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}
<<<<<<< HEAD
export default connect(mapStateToProps)(AboutUs);
=======
export default AboutUs;
>>>>>>> 1bc3b570956119194ee25ceba0f0697f7e379379
