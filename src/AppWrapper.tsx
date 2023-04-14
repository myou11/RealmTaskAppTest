import React from "react";
import { SafeAreaView } from "react-native";
import { App } from "./App";
import RealmContext from "./models";

export const AppWrapper = () => {
  const { RealmProvider, useRealm, useObject, useQuery } = RealmContext;

  return (
    <SafeAreaView>
      <RealmProvider>
        <App />
      </RealmProvider>
    </SafeAreaView>
  );
};

export default AppWrapper;
