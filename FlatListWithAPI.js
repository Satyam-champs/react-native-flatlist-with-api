import React, { Component } from 'react';
import { FlatList, Image, Button, TouchableOpacity, View, Example, Text, StyleSheet } from 'react-native';

export default class FlatListBasics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.results : [...this.state.data, ...res.results],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    _handleRefresh = () => {
        this.setState(
            {
                page: this.state.page,
                seed: this.state.seed + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    _handleLoadMore = () => {
        this.setState(
            {
                seed: this.state.seed,
                page: this.state.page + 1,
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderItem = ({ item }) => {
        return (
            // Here you can customize whatever u want ,(item.name.first) & (item.name.last) (item.email) & (item.picture.thumbnail)
            // We are using only name for Showing.
            <View style={styles.row}>
                {/* <Image style={styles.thumbnail} source={item.picture.thumbnail}/> */}
                <Text >
                    {`${item.name.first} ${item.name.last}`}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flatListcontainer}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.email}
                    />
                </View>
                <View style={styles.bottm}>
                    <View style={styles.refreshflatListcontainer}>
                        <Button
                            onPress={this._handleRefresh}
                            title="Refresh"
                            color="#fb5b5a"
                            accessibilityLabel="Refresh Button"
                        />
                    </View>
                    <View style={styles.refreshCflatListcontainer}>
                        <Button style={styles.refreshCflatListcontainer}
                            onPress={this._handleLoadMore}
                            color='#465881'
                            title="More"
                            accessibilityLabel="More data Load"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListcontainer: {
        flex: 10,
        // color: red,
        // backgroundColor: pink,
    },
    bottm: {
        flex: 1,
        // height:50,
        // width: 150,
        // marginLeft: 10,
        // alignItems: 'center',
        padding: 2,
        borderEndColor: 'darkgrey',
        // justifyContent: 'space-between',
        flexDirection: 'row'
    },
    refreshflatListcontainer: {
        flex: 1,
        // height:50,
        // width: 150,
        // width:"80%",
        backgroundColor: "#fb5b5a",
        borderEndColor: 'darkgrey',
        // borderWidth:5,
        borderRadius: 15,
        // height:50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop:40,
        // marginBottom:10
    },
    refreshCflatListcontainer: {
        flex: 1,
        // borderBottomEndRadius: 10,
        backgroundColor: '#465881',
        color: '#465881',
        borderRadius: 15,
        // height:50,
        alignItems: "center",
        justifyContent: "center",
        // height:50,
        // width: 150,
        // flexDirection: 'row'
    },
    row: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue',
    },
    thumbnail: {
        width: 60, height: 60, borderWidth: 1, borderColor: '#aaa'
    },

})
