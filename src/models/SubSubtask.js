import {Realm} from '@realm/react';

export const SubSubtask = {
  name: 'SubSubtask',
  primaryKey: '_id',
  properties: {
    _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
    description: 'string',
    isComplete: {type: 'bool', default: false},
  },
};
