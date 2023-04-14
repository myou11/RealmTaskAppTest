import { Realm } from "@realm/react";

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
