import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import OrderDetailsScreen from './OrderDetailsScreen';
import OrderScreen from './OrderScreen';
import BlueScreen from './BlueScreen';
import MaizeScreen from './MaizeScreen';
import GoldScreen from './GoldScreen';
import BlackScreen from './BlackScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const TabIcon = ({ selected, title }) => {
    return (
      <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
      //<Icon name={title} size={20} color={selected ? 'red' :'black'} />
    );
}

const App = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar={true} >
        {/* Tab Container */}
        <Scene 
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Tab and it's scenes */}
          <Scene key="osu" title="Orders" hideNavBar={true} icon={TabIcon}>
            <Scene key="scarlet"
              component={OrderScreen}
            />
            <Scene
              key="gray"
              component={OrderDetailsScreen}
              title="Order Details"
            />
          </Scene>

          {/* Tab and it's scenes */}
          <Scene key="um" title="Menu" icon={TabIcon}>
            <Scene
              key="blue"
              component={BlueScreen}
              title="Menu"
            />
            <Scene
              key="maize"
              component={MaizeScreen}
              title="Menu"
            />
          </Scene>

          {/* Tab and it's scenes */}
          <Scene key="vu" title="Message" icon={TabIcon}>
            <Scene
              key="gold"
              component={GoldScreen}
              title="Message"
            />
            <Scene
              key="black"
              component={BlackScreen}
              title="Call"
            />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;