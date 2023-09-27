import React from "react";
import { createRealmContext } from "@realm/react";
import { Store, Task, Subtask, SubSubtask } from "./Schemas";

//https://www.mongodb.com/docs/realm/sdk/react-native/use-realm-react/

const RealmContext = createRealmContext({
  schema: [Store, Task, Subtask, SubSubtask],
  schemaVersion: 0,
});

export default RealmContext;
