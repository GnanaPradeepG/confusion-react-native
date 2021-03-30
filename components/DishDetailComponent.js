import React, { Component } from 'react'
import { Text, View, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
  }

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites : []
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }

    render() {
        const dishId = this.props.route.params.dishId;
        console.log(this.props.dishes)

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes[+dishId]}
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

function RenderDish(props) {
    // console.log(props)
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card>
                <Card.Title >{dish.name}</Card.Title>
                <Image style={{ width: 350 }} source={{uri : baseUrl + item.image}} />
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        )
    }

    return (
        <Card>
            <Card.Title>Comments</Card.Title>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

export default connect(mapStateToProps)(Dishdetail);