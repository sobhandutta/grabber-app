import React, { Component } from 'react';
import {
    FlatList,
    SectionList,
    StyleSheet,
    View, Text, Image,
    Modal,
    Button,
    Alert,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

class ComponentThree extends Component {
    state = {
        data: [],
        modalVisible: false,
        selectedItem: {}
    };

    componentWillMount() {
        //this.fetchData();
        return fetch('https://randomuser.me/api/?results=10')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.results);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.results,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    setModalVisible(visible, item) {
        if(item){
            
            this.setState({
                        selectedItem: {lname: item.name.last, 
                        fname: item.name.first,
                        image: item.picture.large},
                        }, () => {
                            console.log(this.state.selectedItem, this.state.modalVisible)
                            this.setState({modalVisible: visible});
                        });
        }else{
            this.setState({modalVisible: visible});
        }
        
    }
    renderAvoter = (item) => {
        //console.log(item);
        return (<TouchableOpacity style={styles.container} 
                    onPress={() => {
                        //
                        this.setModalVisible(true, item);
                    }}>
                    <Image
                        style={styles.photo}
                        source={{uri: item.picture.thumbnail }}
                    />
                    <Text style={styles.titleText}>{item.name.last}, {item.name.first}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }


        return (
            <View>
                <Text>Third page</Text>

                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => this.renderAvoter(item)}
                    keyExtractor={({ id }, index) => id+index}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.pageStyle}>
                        <View style={styles.pageStyle}>
                        <Text>{this.state.selectedItem.fname}</Text>
                        <Image
                            style={styles.largephoto}
                            source={{uri: this.state.selectedItem.image }}
                        />
                        <Button
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible, null);
                            }} 
                            title="Hide Modal" />
                        </View>
                    </View>
                </Modal>
{/*
                <SectionList
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => <Text style={styles.itemSquare}> {item.key} </Text>}
                    renderSectionHeader={({ section }) => <Text> {section.title} </Text>}
                    sections={[
                        { title: "A", key: "A", data: [{ key: "Sana" }, { key: "Dahyun" }] },
                        { title: "B", key: "B", data: [{ key: "Nayeon" }, { key: "Momo" }, { key: "Tzuyu" }] },
                        { title: "C", key: "C", data: [{ key: "Chaeyoung" }, { key: "Jihyo" }] },
                        { title: "D", key: "D", data: [{ key: "Jeongyeon" }, { key: "Mina" }] },
                    ]}
                />
 */}
            </View>
        );
    }
}

export default ComponentThree;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#CCCCCC',
        borderBottomWidth:1,
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    largephoto: {
        height: 300,
        width: 300,
        borderRadius: 20,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
        padding: 20
    },
    listContainer: {
        flexDirection: 'column',
    },
    itemSquare: {
        textAlignVertical: "center",
        backgroundColor: '#CCC',
        margin: 5,
        height: 50
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});
