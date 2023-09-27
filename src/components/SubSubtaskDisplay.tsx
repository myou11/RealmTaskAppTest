import React from "react";
import { Text, View } from "react-native";
import RealmContext from "../models";
import Button from "./Button";
import { Subtask, SubSubtask } from "../models/Schemas";

interface SubSubtaskDisplayProps {
  subSubtask: SubSubtask;
  idx: number;
}

const SubSubtaskDisplay = ({ subSubtask, idx }: SubSubtaskDisplayProps) => {
  const { useRealm } = RealmContext;
  const realm = useRealm();

  const randomizeDescription = () => {
    realm.write(() => {
      subSubtask.description = Math.random().toString();
    });
  };

  const deleteSubSubtask = () => {
    realm.write(() => {
      realm.delete(subSubtask);
    });
  };

  return (
    <View
      style={{
        marginLeft: 16,
        marginBottom: 4,
        padding: 4,
        borderWidth: 1,
        borderColor: "green",
      }}
    >
      <Text>SubSubtask #{idx}</Text>
      <Text>Description: {subSubtask.description}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="randomize" onPress={randomizeDescription} />
        <Button title="delete" onPress={deleteSubSubtask} />
      </View>
    </View>
  );
};

export default SubSubtaskDisplay;
