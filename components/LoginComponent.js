import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Input, CheckBox, Button, Icon} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl';


class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: '',
            remember:false
        };
    }

    static navigationOptions = {
        title:'Login',
        tabBarIcon: ({tintColor}) => {
            <Icon
            name='sign-in'
            type='font-awesome'
            iconStyle={{color: tintColor}}
        />
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo').
        then(userdata=>{
            const userinfo = JSON.parse(userdata);
            if ( userinfo ) {
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true});
            }
        }).
        catch(error => console.log('Could not retrieve user info', error));
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if ( this.state.remember ) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({username:this.state.username, password:this.state.password}))
            .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
            .catch(error => console.log('Could not delete user info', error));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={username=>this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.f}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{type:'font-awesome', name:'key'}}
                    onChangeText={password=>this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.f}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={()=>this.setState({remember:!this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor: '#5637DD'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='blue'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        titleStyle={{color: 'blue'}}
                    />
                </View>
            </View>
        );
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }

    static navigationOptions = {
        title:'Register',
        tabBarIcon: ({tintColor}) => {
            <Icon
            name='user-plus'
            type='font-awesome'
            iconStyle={{color: tintColor}}
        />
        }
    }

    getImageFromCamera = async() => {
        const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if ( cameraPermissions.status==='granted' && cameraRollPermissions.status==='granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if ( !capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri});
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if ( this.state.remember ) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({username:this.state.username, password:this.state.password}))
            .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
            .catch(error => console.log('Could not delete user info', error));
        }
    }

    render() {
        return(
            <ScrollView>

                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri:this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button 
                            title='camera'
                            onPress={this.getImageFromCamera}/>

                    </View>
                    <Input
                        placeholder='Username'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={username=>this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.f}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{type:'font-awesome', name:'key'}}
                        onChangeText={password=>this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.f}
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={firstName=>this.setState({firstName})}
                        value={this.state.firstName}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.f}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={lastName=>this.setState({lastName})}
                        value={this.state.lastName}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.f}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type:'font-awesome', name:'envolope-o'}}
                        onChangeText={email=>this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.f}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={()=>this.setState({remember:!this.state.remember})}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#5637DD'}}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
    
}

    
const Login = createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: {fontSize: 16}
        }
    }
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight:40,
        marginLeft:40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
})

export default Login;