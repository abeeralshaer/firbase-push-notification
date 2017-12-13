import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Config from 'react-native-config'

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
  picker: {
    width: 100,
  },
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.registerUserHandler = this.registerUserHandler.bind(this)
    this.setBadgeHanldler = this.setBadgeHanldler.bind(this)
    this.recieveNotificationHandler = this.recieveNotificationHandler.bind(this)
  }
  componentDidMount() {
    // firebase.messaging().scheduleLocalNotification({
    //   fire_date: new Date().getTime() + 5000, // RN's converter is used, accept epoch time and whatever that converter supports
    //   id: '0', // REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
    //   body: 'fdkjf',
    //   title: 'Your title',
    //   show_in_foreground: true,
    // })
    this.registerUserHandler()
    this.recieveNotificationHandler()
  }
  setBadgeHanldler(num) {
    firebase.messaging().setBadgeNumber(num)
  }
  registerUserHandler() {
    const androidConfig = {
      clientId: Config.CLIENT_ID,
      appId: Config.APP_ID,
      apiKey: Config.API_KEY,
      databaseURL: Config.DB_URL,
      storageBucket: Config.STORAGE_BUCKET,
      messagingSenderId: Config.SENDER_ID,
      projectId: Config.FIRBASE_PROJ_ID,
      persistence: true,
    }
    const FIRPushNotificationProject = firebase.initializeApp(
      Platform.OS === 'ios' ? null : androidConfig,
      'FIRPushNotificationProject',
    )
    FIRPushNotificationProject.onReady().then(() => {
      firebase.app('FIRPushNotificationProject').auth().signInAnonymously().then((user) => {
        console.log('FIRPushNotificationProject user ->', user.toJSON())
      })
    })
  }
  recieveNotificationHandler() {
    firebase.messaging().onMessage((msg) => {
      if (msg) {
        this.setBadgeHanldler(1)
        const { title, body, tag } = msg.fcm
        console.log(msg)
        firebase.messaging().createLocalNotification({
          title: title,                                      // as FCM payload
          body: body,                                         // as FCM payload (required)
          sound: 'jingle_bells.mp3',                                   // as FCM payload
          priority: 'high',                                   // as FCM payload
          vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
          tag: tag,                                 // Android only
          lights: true,                                       // Android only, LED blinking (default false)
          show_in_foreground: true,
          click_action: "fcm.ACTION.HELLO",
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          You wil get your notification
        </Text>
      </View>
    )
  }
}
