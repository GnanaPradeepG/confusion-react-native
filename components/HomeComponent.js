import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

function RenderItem(props) {

    const item = props.item;
    
    if (item != null) {
        return (
            <Card>
                <Image style={{ width: 350 }} source={{uri: baseUrl + item.image}} />
                <Card.FeaturedTitle style={{color:"#000"}}>{item.name}</Card.FeaturedTitle>
                {item.designation ? <Card.FeaturedSubtitle style={{color:"#000"}}>{item.designation}</Card.FeaturedSubtitle> : null}
                <Text
                    style={{ margin: 10 }}>
                    {item.description}</Text>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home',
    };

    render() {

        return (
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);