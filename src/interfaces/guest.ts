// Path: src\interfaces\guest.ts

import { ObjectId } from 'mongodb';
import { Invitation } from './invitation';

export interface Guest {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  allergies: string;
  rsvp: boolean;
  invitation: Invitation;
}
