import React, {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {Task} from './models/Task';
import RealmContext from './models';
import TaskDisplay from './components/TaskDisplay';
import Button from './components/Button';

const {useRealm, useQuery} = RealmContext;

export const App = () => {
  const realm = useRealm();
  const tasks = useQuery(Task);

  console.log('Realm file is located at: ' + realm.path);

  const handleAddTask = description => {
    realm.write(() => {
      realm.create(Task, {description});
    });
  };

  console.log('RE-RENDER Task');

  return (
    <View>
      <Button
        title="Create Task"
        onPress={() => handleAddTask('This is an example of a task')}
      />
      <FlatList
        data={tasks}
        keyExtractor={item => item._id.toString()}
        renderItem={({item, index}) => <TaskDisplay task={item} idx={index} />}
      />
    </View>
  );
};
