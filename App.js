import React from 'react';
import { YellowBox } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

//Not proud of this
YellowBox.ignoreWarnings(['Remote debugger']);

export default function App() {
  console.log('Hello fiends');
  
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
