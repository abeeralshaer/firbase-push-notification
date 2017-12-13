import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import AppNavigator from './navigator'
import store from './store'

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('FirbasePushNotificationApp', () => App)
