import { Realm } from "@realm/react";
import { SubSubtask } from "./SubSubtask";

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
