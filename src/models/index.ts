import React from "react";
import { createRealmContext } from "@realm/react";
import { Task } from "./Task";
import { Subtask } from "./Subtask";
import { SubSubtask } from "./SubSubtask";

//https://www.mongodb.com/docs/realm/sdk/react-native/use-realm-react/

const RealmContext = createRealmContext({
  schema: [Task, Subtask, SubSubtask],
  schemaVersion: 0,
});

export default RealmContext;
