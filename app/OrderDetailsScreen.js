import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Picker,
  Image,
  Alert,
  Modal
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class OrderDetailsScreen extends Component {
    state = {
      data: [],
      selectedItem: {},
      isLoading: true,
      drinksize: 'tall',
      modalVisible: false,
    };

    componentWillMount() {
        //this.fetchData();
        return fetch('https://react-my-burger-529c9.firebaseio.com/menu.json')
            .then((response) => response.json())
            .then((responseJson) => {
                
                const fatchOrders = [];
                for( let key in responseJson ) {
                    fatchOrders.push( { ...responseJson[key], id:key });
                }
                console.log('componentWillMount', fatchOrders);
                this.setState({
                    isLoading: false,
                    dataSource: fatchOrders,
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderOrder = (item) => {
      return (<TouchableOpacity style={styles.container} >
                  <Image
                      style={styles.mainPhoto}
                      source={{uri: item.thumbnail }}
                      onPress={() => {
                          this.setModalVisible(true, item);
                      }}
                  />
                  <View style={styles.menuDetails}>
                    <Text style={styles.mainTitle}>{item.name}</Text>
                    <Text style={styles.subTitle}>${item.price}</Text>
                    <Text style={styles.inviteText}>Calories: {item.calories}</Text>
                    <Picker style={styles.picker}
                        selectedValue={this.state.drinksize}
                        onValueChange={(itemValue, itemIndex) =>  this.setOrderSize(itemValue) }>
                        <Picker.Item label="Short" value="short" />
                        <Picker.Item label="Tall" value="tall" />
                        <Picker.Item label="Grande" value="grande" />
                        <Picker.Item label="Venti" value="venti" />
                    </Picker>
                    <Text style={styles.btnOrder}
                        onPress={() => Alert.alert(
                            'Do you like to order this item?',
                            'Waiting time for this order is 30 min',
                            [
                            {text: 'Change size', onPress: () => console.log('Ask me later pressed')},
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => Actions.scarlet() },
                            ],
                            { cancelable: false }
                        )}> Select </Text>
                  </View>
            </TouchableOpacity>
        )
    }
    setOrderSize(size) {
        this.setState({drinksize: size});
        //Alert.alert(this.state.drinksize);
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
  render(){
    if (this.state.isLoading) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>
        )
    }
    
    return (
      <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => this.renderOrder(item)}
            keyExtractor={({ id }, index) => id+index}
          />
          <Modal 
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.Modal}>
                <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                </TouchableHighlight>
                </View>
            </View>
            </Modal>
          <Text style={styles.welcome}
            onPress={() => Actions.scarlet()} >
            Select a menu from here
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 12,
      paddingRight: 0,
      margin:10,
      marginLeft:20,
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      borderRadius:10,
      minHeight:120,
      shadowColor:'#666'
  },
  pageStyle: {
      flex: 1
  },
  text: {
      fontSize: 16,
  },
  mainPhoto:{
      height: 100,
      width: 100,
      borderRadius: 0,
      borderWidth:2,
  },
  menuDetails: {
      width: '70%',
  },
  mainTitle: {
      fontSize: 20,
      width: '100%',
      paddingLeft: 50,
      color:'orange',
      marginVertical:0,
  },
  subTitle: {
      fontSize: 20,
      width: '80%',
      paddingLeft: 50,
      color:'#666666',
      marginVertical:0,
  },
  inviteText:{
      paddingLeft: 50,
      color:'#999',
      marginVertical:0,
  },
  picker: {
      height: 50, 
      width: 100,
      marginLeft: 50,
  },
  Modal: {
    width:'90%',
    height:'60%',
    marginTop: '20%',
    minHeight:120,
    marginLeft:'5%',
    backgroundColor:'white',
    borderWidth:1,
    borderRadius:4,
    shadowColor: '#666',
    shadowOffset: { width: 0, height: 22 },
    shadowOpacity: 0.8,
    shadowRadius: 21,
    elevation: 2,
  },
  btnOrder:{
      position:"absolute",
      right:10,
      bottom:10,
      backgroundColor:'orange',
      fontWeight: 'bold',
      color:'white',
      height: 40,
      width: 80,
      textAlign:'center',
      padding:10,
      borderRadius: 20,
      margin:5
  },
});

export default OrderDetailsScreen;