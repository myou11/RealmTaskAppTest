import React from "react";
import { Text, View, ViewProps } from "react-native";
import RealmContext from "../models";
import { Store, Task } from "../models/Schemas";
import Button from "./Button";
import SubtaskDisplay from "./SubtaskDisplay";
import { Subtask } from "../models/Schemas";
const { useRealm, useObject } = RealmContext;

interface TaskDisplayProps extends Pick<ViewProps, "onLayout"> {
  task: Task;
  idx: number;
}

const TaskDisplay = React.forwardRef(({ task, idx, onLayout }: TaskDisplayProps, ref: React.Ref<View>) => {
  const realm = useRealm();

  const handleAddTaskAbove = (idxToAddAt: number, description: string) => {
    const store = realm.objectForPrimaryKey(Store, 0);
    if (!store) return;

    realm.write(() => {
      const newTask = realm.create(Task, { description });
      store.tasks.splice(idxToAddAt, 0, newTask);
    });
  };

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
        <View style={{ flexDirection: "row" }}>
          <Button title="Add Subtask" onPress={() => handleAddSubtask("This is just a subtask")} />
          <Button title="Add Subtask Above" onPress={() => handleAddTaskAbove(idx, "This is just a subtask")} />
        </View>
        <Button title="delete" onPress={deleteTask} />
      </View>
      {task.subtasks.map((subtask, index) => {
        return <SubtaskDisplay key={subtask._id.toHexString()} subtask={subtask} idx={index} />;
      })}
    </View>
  );
});

//NOTE: Adding the below line causes the code to rerender
//{task ? task.subtasks.map((subtask,i)=><Text key={i}>{subtask.description}</Text>) : null}

export default React.memo(TaskDisplay);
