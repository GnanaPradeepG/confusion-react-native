import React, { Component } from 'react'
import { Text, View ,Image } from 'react-native';
import { Card } from 'react-native-elements';
import {DISHES} from '../shared/dishes';

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render(){
        // const dishId = this.props.navigation.getParam('dishId','');
        // console.log(this.props)
        const dishId = this.props.route.params;
        return(
            <RenderDish dish={this.state.dishes[+dishId]} />
        )
    }
}

function RenderDish(props) {


    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card>
                    <Card.Title >{dish.name}</Card.Title>
                    <Image style={{width:350}} source={require('./images/uthappizza.png')}/>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

export default Dishdetail;