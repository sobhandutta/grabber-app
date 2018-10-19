import React, {Component} from 'react';
import {Button, 
    Modal, 
    Picker, 
    TouchableHighlight, 
    Alert, 
    ViewPagerAndroid, 
    StyleSheet, 
    Text, 
    View
} from 'react-native';

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
        width:'100%'

    }
  });

class ComponentTwo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            language:'english',
            modalVisible: false,
        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        return (
                <View style={styles.viewPager}>
                    <Text style={{fontSize: 20}}>Second page {this.props.language} </Text>

                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({language: itemValue})
                            this.props.setLanguage(itemValue)
                        }
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="JavaScript" />
                    </Picker>
                </View>
        );
    }
}

export default ComponentTwo;