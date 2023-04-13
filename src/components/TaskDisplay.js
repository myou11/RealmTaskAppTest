import React from 'react';
import {FlatList, Text, View} from 'react-native';
import RealmContext from '../models';
import {Task} from '../models/Task';
import Button from './Button';
import SubtaskDisplay from './SubtaskDisplay';
const {useRealm, useObject} = RealmContext;

const TaskDisplay = ({taskId, idx}) => {
  const realm = useRealm();
  const task = useObject(Task, taskId);

  const handleAddSubtask = description => {
    realm.write(() => {
      const newSubtask = realm.create('Subtask', {description});
      task.subtasks.push(newSubtask);
    });
  };

  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  return (
    <View style={{borderWidth: 1, marginBottom: 4, padding: 4}}>
      <Text>Task #{idx}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="Add Subtask"
          onPress={() => handleAddSubtask('This is just a subtask')}
        />
        <Button title="delete" onPress={deleteTask} />
      </View>
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
