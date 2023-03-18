import React from 'react';
import {Text, View} from 'react-native';
import Realm from 'realm';
import RealmContext from '../models';
import Button from './Button';

const SubSubtaskDisplay = ({subtask, subSubtask, idx}) => {
  const {useRealm, useObject} = RealmContext;
  const realm = useRealm();

  console.log('RE-RENDER subSubtask');

  const randomizeDescription = () => {
    realm.write(() => {
      subSubtask.description = Math.random().toString();
    });
  };

  return (
    <View
      style={{
        marginLeft: 16,
        marginBottom: 4,
        padding: 4,
        borderWidth: 1,
        borderColor: 'green',
      }}>
      <Text>SubSubtask #{idx}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Description: {subSubtask.description}</Text>
        <Button title="randomize" onPress={randomizeDescription} />
      </View>
    </View>
  );
};

export default SubSubtaskDisplay;
