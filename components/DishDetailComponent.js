import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native';
import { Card, Icon, Rating , Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { baseUrl } from '../shared/baseUrl';
import { postFavorite , postComment} from '../redux/ActionCreators';
import { Modal } from 'react-native';
import { Button } from 'react-native';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment : (dishId , rating , author , comment) => dispatch(postComment(dishId , rating , author , comment))
})

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorites: [],
            toggleModal: false,
            rating: 0,
            author : '',
            comment : ''
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleCommentSubmit = (dishId) => {
        this.props.addComment(dishId , this.state.rating , this.state.author , this.state.comment);
    }

    toggleModal = () => {
        this.setState({ 
            toggleModal: !this.state.toggleModal ,
            comment : '',
            author : '',
            rating : 0
         })
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    modalState={this.props.toggleModal}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType={"slide"} transparent={false} visible={this.state.toggleModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}>
                    <View>
                        <Rating ratingCount={5} fractions={1} showRating startingValue={3.5}
                            onFinishRating={value => this.setState({ rating: value })} />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            onChangeText={value => this.setState({author : value})}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            onChangeText={value => this.setState({comment : value})}

                        />
                        <Button color="#512DA7" onPress={() => {this.handleCommentSubmit(dishId) ; this.toggleModal()}} title={'Submit'} />
                        <View  style={StyleSheet.create({height :20})}></View>
                        <Button color="#808080" onPress={() => this.toggleModal()} title={'Cancel'} />
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

function RenderDish(props) {

    const dish = props.dish;

    if (dish != null) {
        return (
            <Card>
                <Card.Title >{dish.name}</Card.Title>
                <Image style={{ width: 350 }} source={{ uri: baseUrl + dish.image }} />
                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <View style={styles.Icons}>
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA7'
                        onPress={() => props.toggleModal()}
                    />
                </View>
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

const styles = StyleSheet.create({
    Icons: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);