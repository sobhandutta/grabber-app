import React, {Component} from 'react';
import {Button, Modal, Picker, 
    FlatList,
    SectionList,
    TouchableHighlight, Alert, ViewPagerAndroid, StyleSheet, Text, View} from 'react-native';
import ComponentTwo from './ComponentTwo';
import ComponentThree from './ComponentThree';

const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewPager: {
        flex: 1,
        width:'100%',
    },
    pageStyle: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    pageStyleOne: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#CC6666',
        color:'white'
    },
    pageStyleTwo: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#66CC66',
        color:'white'
    },
    pageStyleTwo: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#6666CC',
        color:'white'
    }
  });

class ComponentOne extends Component{
    constructor() {
        super();
        this.state = {
            language:'Bengali',
            modalVisible: false,
        };
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    setLangage(l){
        this.setState({language: l});
    }

    render(){
        
        return (
                <View style={styles.viewPager}>
                    <ViewPagerAndroid
                        style={styles.viewPager}
                        initialPage={0}>

                        <View key="1" style={styles.pageStyleOne}  >
                            <Text style={styles.titleText}>First page {this.state.language}</Text>
                            <Button
                                onPress={() => {
                                    this.setModalVisible(true);
                                    //Alert.alert('You tapped the button!');
                                }}
                                title="Open Drawer"
                                />

                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    //Alert.alert('Modal has been closed.');
                                }}>
                                <View style={styles.pageStyle}>
                                    <View style={styles.pageStyle}>
                                    <Text>Hello World!</Text>

                                    <Button
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        }} 
                                        title="Hide Modal" />
                                    </View>
                                </View>
                            </Modal>
                            

                        </View>

                        <View key="2" style={styles.pageStyleTwo}> 
                            <ComponentTwo 
                                language={this.state.language} 
                                setLanguage={l => this.setLangage(l)} />
                        </View>

                        <View key="3" style={styles.pageStyleThree}>
                            <ComponentThree />
                        </View>
                    </ViewPagerAndroid>

                </View>

                
        );
    }
}

export default ComponentOne;