import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import {Tile} from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
    
            return (

                <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{ uri: baseUrl + item.image}}
                />
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>{this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }
    }
}


export default connect(mapStateToProps)(Favorites);