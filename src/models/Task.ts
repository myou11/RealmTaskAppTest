import { Realm } from "@realm/react";
import { Subtask } from "./Subtask";

export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;
  subtasks!: Subtask[];
  height?: number;

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      description: "string",
      isComplete: { type: "bool", default: false },
      createdAt: { type: "date", default: () => new Date() },
      subtasks: { type: "Subtask[]", default: () => [] },
      height: "float?",
    },
  };
}
