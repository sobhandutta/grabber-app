import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View, Image,
    Modal,
    Alert,
    Button, 
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import Icon from 'react-native-vector-icons/Ionicons';

const customTextButton = (
  <Icon.Button backgroundColor="orange" size={40} >
    <Text style={{fontFamily: 'Arial', fontSize: 16}}>Order</Text>
  </Icon.Button>
);
const myIcon = (<Icon name="phone" size={40} color="green" />)
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 9);
const imageWidth = dimensions.width;

class OrderScreen extends Component {
    state = {
        data: [],
        modalVisible: false,
        selectedItem: {},
        isLoading: true,
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
        console.log('setModalVisible', visible, item);
        if(item){
            this.setState({
                selectedItem: {
                    lname: item.name.last.toUpperCase(), 
                    fname: item.name.first.toUpperCase(),
                    image: item.picture.large},
                }, () => {
                    //console.log(this.state.selectedItem, this.state.modalVisible)
                    this.setState({modalVisible: visible});
                });
        }else{
            this.setState({modalVisible: visible});
        }
    }
    renderOrder = (item) => {
        //console.log(item);
        return (<TouchableOpacity style={styles.container} >
                        <Image
                            style={styles.mainPhoto}
                            source={{uri: item.picture.thumbnail }}
                            onPress={() => {
                                this.setModalVisible(true, item);
                            }}
                        />
                        <Text style={styles.mainTitle}
                            onPress={() => {
                                this.setModalVisible(true, item);
                            }}
                        >{item.name.last.toUpperCase()} IS TAKING ORDERS</Text>
                        <Text style={styles.subTitle}>Starbucks</Text>
                        <Text style={styles.delayText}>in 25 to 30 minutes anywhere</Text>
                        <Text style={styles.inviteText}>invite friends only</Text>
                        <View style={styles.avatars}>
                            <Image
                                style={styles.photo}
                                source={{uri: item.picture.thumbnail }}
                            />
                            <Image
                                style={styles.photo}
                                source={{uri: item.picture.thumbnail }}
                            />
                            <Text style={styles.btnOrder}
                            onPress={() => Actions.gray()}> Order </Text>
                        </View>
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
            <View style={styles.orderScreenContainer}>
                
                <FlatList style={styles.flatList}
                    data={this.state.dataSource}
                    renderItem={({ item }) => this.renderOrder(item)}
                    keyExtractor={({ id }, index) => id+index}
                />
                <View style={styles.requestBtnContainer}>
                    <Text style={styles.btnRequestOrder}
                                onPress={() => Actions.gray()}> Request a Run</Text>
                    <Text style={styles.btnRequestOrder}
                                onPress={() => Actions.gray()}> Start a Run</Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal has been closed.');
                    }}>
                    <View style={styles.pageStyle}>
                        <View style={styles.pageStyle}>
                        <Image
                            style={{ height: imageHeight, width: imageWidth }}
                            source={{uri: this.state.selectedItem.image }}
                        />

                        <Text style={styles.mainTitle}>
                            {this.state.selectedItem.fname} 
                            {this.state.selectedItem.lname}</Text>

                        <Text style={styles.delayText}>Connected via</Text>
                        
                        <View style={styles.socialContainer}>
                            <View style={styles.socialBotton} >{myIcon}</View>
                            <View style={styles.socialBotton} >{myIcon}</View>
                        </View>

                        <Button
                            icon={{
                                name: 'arrow-left',
                                size: 15,
                                color: 'white'
                              }}
                            title=" Back "
                            loading
                            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={{
                                backgroundColor: "rgba(92, 99,216, 1)",
                                width: 300,
                                height: 75,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                            containerStyle={{ marginTop: 20 }}
                            onPress={() => {
                                this.setModalVisible(false, null);
                            }} 
                            />

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

export default OrderScreen;


const styles = StyleSheet.create({
    orderScreenContainer:{
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        padding: 12,
        margin:10,
        marginLeft:20,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius:20,
        minHeight:200,
        shadowColor:'#666'
    },
    pageStyle: {
        flex: 1
    },
    text: {
        fontSize: 16,
    },
    requestBtnContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        textAlign:'center',
        justifyContent: 'center',
        alignItems: 'center',
        height:60,
        position:"absolute",
        top:1,
        width:'100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 22 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,


    },
    flatList: {
        paddingTop:70,
        backgroundColor:'#efefef',
    },
    mainPhoto:{
        position:"absolute",
        height: 60,
        width: 60,
        top:-10,
        left:-10,
        borderRadius: 30,
        borderColor:'orange',
        borderWidth:2,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
        margin:5
    },
    mainTitle: {
        fontSize: 20,
        width: '100%',
        paddingLeft: 50,
        color:'orange',
        marginVertical:0,
        
    },
    subTitle: {
        fontSize: 30,
        width: '80%',
        paddingLeft: 50,
        color:'#666666',
        marginVertical:0,
    },
    delayText:{
        paddingLeft: 50,
        color:'#666666',
        marginVertical:0,
    },
    inviteText:{
        paddingLeft: 50,
        color:'#999',
        marginVertical:0,
    },
    avatars:{
        flex: 1,
        padding: 0,
        margin:10,
        flexDirection: 'row',
    },
    btnRequestOrder: {
        backgroundColor:'orange',
        fontWeight: 'bold',
        color:'white',
        height: 40,
        width: 140,
        textAlign:'center',
        padding:10,
        borderRadius: 20,
        margin:5
    },
    btnOrder:{
        position:"absolute",
        right:10,
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
    socialContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:0,
        paddingLeft: 50,
    },
    socialBotton:{
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: '#efefef',
        padding:10,
        marginHorizontal:10,
        marginVertical:0,
        borderColor:'orange',
        borderWidth:2
    },
    largeButton: {
        height:70,

    },
    largephoto: {
        height: 300,
        width: 300,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
        padding: 20,
        marginVertical:0,
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
