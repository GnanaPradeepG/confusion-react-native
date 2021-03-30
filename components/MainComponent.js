import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Icon } from 'react-native-elements';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import About from "./AboutComponent";
import Contact from "./ContactComponent";

import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

  const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })

const StackNavigatorIcon = ({ navigation }) => {
    return (
        <Icon
            iconStyle={{ padding: 15 }}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    )
}

const DrawerNavigatorIcon = ({ name, size }) => {
    return (
        <Icon
            name={name}
            type='font-awesome'
            size={size ? size : 24}
        />
    )
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 1.75 }}>
                    <Text style={styles.drawerHeaderText} >Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
);

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return (
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#31B76C"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail" }}
            />
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
    return (
        <HomeNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </HomeNavigator.Navigator>
    );
}


const AboutNavigator = createStackNavigator();

function AboutNavigatorScreen({ navigation }) {
    return (
        <AboutNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <AboutNavigator.Screen
                name="About"
                component={About}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </AboutNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen({ navigation }) {
    return (
        <ContactNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact"
                component={Contact}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </ContactNavigator.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainNavigator({ navigation }) {
    return (

        <Drawer.Navigator initialRouteName="Home"
            drawerStyle={{
                backgroundColor: "#D1C4E9"
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='home' />
                }}
            />
            <Drawer.Screen name="Menu" component={MenuNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='list' />
                }}
            />
            <Drawer.Screen name="About" component={AboutNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='info-circle' />
                }}
            />
            <Drawer.Screen name="Contact" component={ContactNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='address-card' />
                }}
            />
        </Drawer.Navigator>

    );
}

class Main extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

    render() {

        return (

            <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight }}>
                <NavigationContainer>
                    <MainNavigator />
                </NavigationContainer>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);