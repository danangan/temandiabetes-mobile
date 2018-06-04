import React, { Component } from 'react';
import { Spinner } from '../../components/Spinner';

export default class AppLoader extends Component {
  render() {
    return (
      <Spinner
      color="red"
      size="large"
      containerStyle={{ backgroundColor: 'white' }}
      textStyle={{ color: 'gray' }}
      text="Memuat aplikasi Teman Diabetes..."
    />
    )
  }
}
