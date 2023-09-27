import React from "react";
import { FlatList, Text, View } from "react-native";
import RealmContext from "../models";
import Button from "./Button";
import SubSubtaskDisplay from "./SubSubtaskDisplay";
import { SubSubtask, Subtask } from "../models/Schemas";

interface SubtaskDisplayProps {
  subtask: Subtask;
  idx: number;
}

const SubtaskDisplay = ({ subtask, idx }: SubtaskDisplayProps) => {
  const { useRealm } = RealmContext;
  const realm = useRealm();

  const handleAddSubSubtask = (description: string) => {
    realm.write(() => {
      const newSubSubtask = realm.create(SubSubtask, { description });
      subtask.subSubtasks.push(newSubSubtask);
    });
  };

  const deleteSubtask = () => {
    realm.write(() => {
      realm.delete(subtask);
    });
  };

  return (
    <View
      style={{
        marginLeft: 8,
        marginBottom: 4,
        padding: 4,
        borderWidth: 1,
        borderColor: "red",
      }}
    >
      <Text>Subtask #{idx}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Add SubSubtask" onPress={() => handleAddSubSubtask("This is just a subSubtask")} />
        <Button title="delete" onPress={deleteSubtask} />
      </View>
      {subtask.subSubtasks.map((subSubtask, index) => {
        return <SubSubtaskDisplay key={subSubtask._id.toHexString()} subSubtask={subSubtask} idx={index} />;
      })}
    </View>
  );
};

export default SubtaskDisplay;
