import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import Main from 'components/MainScreen'


const Routes = {
  Main: {
    screen: Main,
  },
}

export default StackNavigator(Routes, {
  initialRouteName: 'Main',
})
