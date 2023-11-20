// Path: src\interfaces\invitation.ts

import { Guest } from './guest';
import { ObjectId } from 'mongodb';

export interface Invitation {
  _id: ObjectId;
  invitationCode: string;
  address: string;
  guests: Guest[];
  lastVisit: Date;
}
