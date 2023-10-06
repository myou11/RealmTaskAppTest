import React from "react";
import { FlatList, View } from "react-native";
import { Task, Subtask, SubSubtask, Store } from "./models/Schemas";
import RealmContext from "./models";
import TaskDisplay from "./components/TaskDisplay";
import Button from "./components/Button";

const { useRealm, useObject, useQuery } = RealmContext;

export const App = () => {
  const realm = useRealm();
  const store = useObject(Store, 0);

  console.log("Realm file is located at: " + realm.path);

  const createStore = () => {
    if (!store) {
      realm.write(() => {
        realm.create(Store, { _id: 0 });
      });
    }
  };
  const handleAddTask = (description: string) => {
    realm.write(() => {
      const newTask = realm.create(Task, { description });
      const subtask = realm.create(Subtask, { description: "This is an example of a subtask" });
      const subSubtask = realm.create(SubSubtask, { description: "This is an example of a subsubtask" });
      subtask.subSubtasks.push(subSubtask);
      newTask.subtasks.push(subtask);
      store?.tasks.push(newTask);
    });
  };

  const createXTasks = (numTasks: number) => {
    realm.write(() => {
      for (let i = 0; i < numTasks; i++) {
        const newTask = realm.create(Task, { description: `This is task created in bulk` });
        const subtask = realm.create(Subtask, { description: `This is subtask created in bulk` });
        const subSubtask = realm.create(SubSubtask, { description: `This is subsubtask created in bulk` });
        subtask.subSubtasks.push(subSubtask);
        newTask.subtasks.push(subtask);
        store?.tasks.push(newTask);
      }
    });
  };

  const clearData = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    return <TaskDisplay task={item} idx={index} />;
  };

  const itemListContainerStyle = { paddingVertical: 640 };

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        {!store ? (
          <Button title="Create Store" onPress={createStore} />
        ) : (
          <>
            <Button title="Create Task" onPress={() => handleAddTask("This is an example of a task")} />
            <Button title="Create 10 tasks" onPress={() => createXTasks(10)} />
            <Button title="Clear data" onPress={clearData} />
          </>
        )}
      </View>
      {store && (
        <View style={{ height: "100%", width: "100%" }}>
          <FlatList
            data={store.tasks}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            contentContainerStyle={itemListContainerStyle}
          />
        </View>
      )}
    </View>
  );
};
