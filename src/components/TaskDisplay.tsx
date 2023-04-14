import React from "react";
import { FlatList, Text, View, ViewProps } from "react-native";
import RealmContext from "../models";
import { Task } from "../models/Task";
import Button from "./Button";
import SubtaskDisplay from "./SubtaskDisplay";
import { Subtask } from "../models/Subtask";
const { useRealm, useObject } = RealmContext;

interface TaskDisplayProps extends Pick<ViewProps, "onLayout"> {
  taskId: Realm.BSON.ObjectId;
  idx: number;
}

const TaskDisplay = React.forwardRef(({ taskId, idx, onLayout }: TaskDisplayProps, ref: React.Ref<View>) => {
  const realm = useRealm();
  const task = useObject(Task, taskId);

  const handleAddSubtask = (description: string) => {
    realm.write(() => {
      const newSubtask = realm.create(Subtask, { description });
      task?.subtasks.push(newSubtask);
    });
  };

  const deleteTask = () => {
    realm.write(() => {
      realm.delete(task);
    });
  };

  return (
    <View ref={ref} onLayout={onLayout} style={{ borderWidth: 1, marginBottom: 4, padding: 4 }}>
      <Text>Task #{idx}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Add Subtask" onPress={() => handleAddSubtask("This is just a subtask")} />
        <Button title="delete" onPress={deleteTask} />
      </View>
      <FlatList
        data={task?.subtasks}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item, index }) => <SubtaskDisplay subtask={item} idx={index} />}
      />
    </View>
  );
});

//NOTE: Adding the below line causes the code to rerender
//{task ? task.subtasks.map((subtask,i)=><Text key={i}>{subtask.description}</Text>) : null}

export default TaskDisplay;
