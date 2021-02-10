import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import AboutUs from './AboutComponent';

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({ navigation }) {
    return(
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
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({ navigation }) {
  return(
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
          />         
      </HomeNavigator.Navigator>
  );
}

const AboutUsNavigator = createStackNavigator();

function AboutUsNavigatorScreen({ navigation }) {
  return(
      <AboutUsNavigator.Navigator
      initialRouteName='About Us'
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
          <AboutUsNavigator.Screen
              name="About Us"
              component={AboutUs}
          />         
      </AboutUsNavigator.Navigator>
  );
}

const ContactUsNavigator = createStackNavigator();

function ContactUsNavigatorScreen({ navigation }) {
  return(
      <ContactUsNavigator.Navigator
      initialRouteName='Contact Us'
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
          <ContactUsNavigator.Screen
              name="Contact Us"
              component={ContactUs}
          />         
      </ContactUsNavigator.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainNavigator({ navigation }) {
    return(

        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeNavigatorScreen} />
          <Drawer.Screen name="Menu" component={MenuNavigatorScreen} />
          <Drawer.Screen name="About Us" component={AboutUsNavigatorScreen} />
          <Drawer.Screen name="Contact Us" component={ContactUsNavigatorScreen} />
        </Drawer.Navigator>

    );
}
  
class Main extends Component {

  render() {
 
    return (
      <NavigationContainer>   
        <MainNavigator />
      </NavigationContainer>
    );
  }
};
  
export default Main;