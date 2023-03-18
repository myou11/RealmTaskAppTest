import React, {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import Realm from 'realm';
import RealmContext from '../models';
import Button from './Button';
import SubtaskDisplay from './SubtaskDisplay';
const {useRealm, useObject} = RealmContext;

const TaskDisplay = ({task, idx}) => {
  const realm = useRealm();

  console.log('RE-RENDER subtask');

  const handleAddSubtask = description => {
    realm.write(() => {
      const newSubtask = realm.create('Subtask', {description});
      task.subtasks.push(newSubtask);
    });
  };

  return (
    <View style={{borderWidth: 1, marginBottom: 4, padding: 4}}>
      <Text>Task #{idx}</Text>
      <Button
        title="Add Subtask"
        onPress={() => handleAddSubtask('This is just a subtask')}
      />
      <FlatList
        data={task.subtasks}
        keyExtractor={item => item._id}
        renderItem={({item, index}) => (
          <SubtaskDisplay task={task} subtask={item} idx={index} />
        )}
      />
    </View>
  );
};

//NOTE: Adding the below line causes the code to rerender
//{task ? task.subtasks.map((subtask,i)=><Text key={i}>{subtask.description}</Text>) : null}

export default TaskDisplay;
