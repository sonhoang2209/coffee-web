import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Item } from '../components/ListItem';
import axios from 'axios';

const DATA =[
    {
        "id":1,
        "title":"ca phe sua da chai fresh 250ML",
        "introduction":"Van la huong vi ca phe sua dam da quen thuoc cua chung toi nhung khoac len minh bo quna ao moi tien loi hon, tiet kiem va phu hop hon voi nhieu nguoi",
        "price":79000,
        "image":require('../../images/products/coffee-250ml.jpg')
    },
    {
        "id":2,
        "title":"ca phe den chai fresh 250ML",
        "introduction":"Van la huong vi ca phe sua dam da quen thuoc cua chung toi nhung khoac len minh bo quna ao moi tien loi hon, tiet kiem va phu hop hon voi nhieu nguoi",
        "price":78000,
        "image":require('../../images/products/coffee-250ml.jpg')
    },
    {
        "id":3,
        "title":"ca phe den chai fresh 250ML",
        "introduction":"Van la huong vi ca phe sua dam da quen thuoc cua chung toi nhung khoac len minh bo quna ao moi tien loi hon, tiet kiem va phu hop hon voi nhieu nguoi",
        "price":78000,
        "image":require('../../images/products/coffee-250ml.jpg')
    },
    {
        "id":4,
        "title":"ca phe den chai fresh 250ML",
        "introduction":"Van la huong vi ca phe sua dam da quen thuoc cua chung toi nhung khoac len minh bo quna ao moi tien loi hon, tiet kiem va phu hop hon voi nhieu nguoi",
        "price":78000,
        "image":require('../../images/products/coffee-250ml.jpg')
    },
    {
        "id":5,
        "title":"ca phe den chai fresh 250ML",
        "introduction":"Van la huong vi ca phe sua dam da quen thuoc cua chung toi nhung khoac len minh bo quna ao moi tien loi hon, tiet kiem va phu hop hon voi nhieu nguoi",
        "price":78000,
        "image":require('../../images/products/coffee-250ml.jpg')
    },
    {
        "id":6,
        "title":"ca phe den chai fresh 250ML",
        "introduction":"Van la huong vi ca phe sua dam da quen thuoc cua chung toi nhung khoac len minh bo quna ao moi tien loi hon, tiet kiem va phu hop hon voi nhieu nguoi",
        "price":78000,
        "image":require('../../images/products/coffee-250ml.jpg')
    }
]

const Search = () => {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        const getProductList = async () => {
          try {
            const response = await axios.get('https://api.thecoffeehouse.com/api/v5/stores/all');
          } catch (error) {
            console.error(error);
          }
        }
        getProductList()
    }, [])

    useEffect(() => {
        setFilteredDataSource(DATA);
        setMasterDataSource(DATA);
    }, []);

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    function itemS({item, index}) { 
        return(
            <TouchableOpacity key={index} style={styles.itemBox}>
                <View style={styles.itemContent}>
                    <Text numberOfLines={1} style={styles.itemTitle}>{item?.title}</Text>
                    <Text numberOfLines={2} style={styles.itemIntro}>{item?.introduction}</Text>
                    <Text style={styles.itemPrice}>{item?.price}đ</Text>
                </View>
                <Image source={item.image} style={styles.itemImage} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <View style={styles.search}>
                        <View  style={styles.iconWrapper}>
                            <Image 
                                source={require('../../images/icons/search.png')}
                                style={styles.btnImage}
                            />
                        </View>
                        <TextInput
                        style={styles.textInputStyle}
                        onChangeText={(text) => searchFilterFunction(text)}
                        value={search}
                        underlineColorAndroid="transparent"
                        placeholder="Tim Kiem"
                        />
                    </View>
                    <TouchableOpacity style={styles.btnExit}>
                        <Text style={styles.exitText}>Dong</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={itemS}
                    style={styles.scroll}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        backgroundColor: 'transparent',
        flex:4,
        fontSize:18
    },
    scroll: {
        padding:15,
        backgroundColor:"#eee",
        paddingBottom:50
    },
    searchBox: {
        padding:15,
        flexDirection:'row',
        justifyContent:'space-between',
        
    },
    btnExit: {
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    exitText: {
        fontSize:15,
        fontWeight:'900',
        color:"red",
        
    },
    btnImage: {
        width:16,
        height:16,
    },
    search:{
        flexDirection:'row',
        marginRight:10,
        flex:5,
        backgroundColor:"#eee",
        borderRadius:5
    },
    iconWrapper: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});

export default Search;