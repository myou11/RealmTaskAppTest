import { Realm } from "@realm/react";

export class Store extends Realm.Object {
  _id!: number;
  tasks!: Realm.List<Task>;

  static schema = {
    name: "Store",
    primaryKey: "_id",
    properties: {
      _id: "int",
      tasks: "Task[]",
    },
  };
}

export class Task extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  createdAt!: Date;
  subtasks!: Subtask[];

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      description: "string",
      isComplete: { type: "bool", default: false },
      createdAt: { type: "date", default: () => new Date() },
      subtasks: { type: "Subtask[]", default: () => [] },
    },
  };
}

export class Subtask extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;
  subSubtasks!: SubSubtask[];

  static schema = {
    name: "Subtask",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      description: "string",
      isComplete: { type: "bool", default: false },
      subSubtasks: "SubSubtask[]",
    },
  };
}

export class SubSubtask extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  description!: string;
  isComplete!: boolean;

  static schema = {
    name: "SubSubtask",
    primaryKey: "_id",
    properties: {
      _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
      description: "string",
      isComplete: { type: "bool", default: false },
    },
  };
}
