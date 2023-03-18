import React from 'react';
import {SafeAreaView} from 'react-native';
import {RealmProvider} from './models';
import {App} from './App';

export const AppWrapper = () => {
  // If we are logged in, add the sync configuration the the RealmProvider and render the app
  return (
    <SafeAreaView>
      <RealmProvider>
        <App />
      </RealmProvider>
    </SafeAreaView>
  );
};

export default AppWrapper;
