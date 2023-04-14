import React, { useState, useCallback, useRef } from "react";
import { Dimensions, Text } from "react-native";
import { FlatList, View } from "react-native";
import { Task } from "./models/Task";
import RealmContext from "./models";
import TaskDisplay from "./components/TaskDisplay";
import Button from "./components/Button";
import { Subtask } from "./models/Subtask";
import { SubSubtask } from "./models/SubSubtask";

const { useRealm, useQuery } = RealmContext;

export const App = () => {
  const realm = useRealm();
  const tasks = useQuery(Task);

  // console.log("Realm file is located at: " + realm.path);

  const handleAddTask = (description: string) => {
    realm.write(() => {
      const newTask = realm.create(Task, { description });
      const subtask = realm.create(Subtask, { description: "This is an example of a subtask" });
      const subSubtask = realm.create(SubSubtask, { description: "This is an example of a subsubtask" });
      subtask.subSubtasks.push(subSubtask);
      newTask.subtasks.push(subtask);
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
      }
    });
  };

  const flatListRef = useRef<FlatList>(null);
  const [lastItemLayout, setLastItemLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null,
  );
  const lastItemRef = useRef<View>(null);

  const screenHeight = Dimensions.get("window").height;
  const measureLastItem = () => {
    lastItemRef.current?.measureInWindow((x, y, width, height) => {
      const yScrollBreakpoint = 0.75 * screenHeight;
      if (y >= yScrollBreakpoint) {
        const offset = getListHeight() + (screenHeight * 0.4) / 2;
        flatListRef.current?.scrollToOffset({ animated: true, offset });
      }
      setLastItemLayout({ x, y, width, height });
    });
  };

  const onItemLayout = useCallback((task: Task, height: number) => {
    if (task.height !== height) {
      realm.write(() => {
        // add margin to height
        task.height = height + 4;
      });
    }
  }, []);

  const getListHeight = () => {
    return tasks.reduce((acc, task) => acc + (task.height ?? 0), 0);
  };

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const isLastItem = index === tasks.length - 1;
    return (
      <TaskDisplay
        ref={isLastItem ? lastItemRef : null}
        taskId={item._id}
        idx={index}
        onLayout={(e) => onItemLayout(item, e.nativeEvent.layout.height)}
      />
    );
  };

  const itemListContainerStyle = { paddingVertical: 640 };

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button title="Create Task" onPress={() => handleAddTask("This is an example of a task")} />
        <Button title="Create 10 tasks" onPress={() => createXTasks(10)} />
      </View>
      <FlatList
        ref={flatListRef}
        data={tasks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={itemListContainerStyle}
        onContentSizeChange={measureLastItem}
      />
      {lastItemLayout && (
        <Text>
          Last item position: x={lastItemLayout.x}, y={lastItemLayout.y}, list height={getListHeight()}
        </Text>
      )}
    </View>
  );
};
