import {Realm} from '@realm/react';

export class Task extends Realm.Object {
  static schema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      description: 'string',
      isComplete: {type: 'bool', default: false},
      createdAt: {type: 'date', default: () => new Date()},
      subtasks: {type: 'Subtask[]', default: () => []},
    },
  };
}
