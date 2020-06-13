import mongoose, { Document } from 'mongoose';

import { IUser } from './types';

type DBUser = IUser & Document;

/*email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [80, 'Email can not be longer than 80 characters'],
  },*/

const UserSchema = new mongoose.Schema({
  twitchID: {
    type: String,
    required: [true, 'Twitch ID is required'],
  },
});

const User = mongoose.model<DBUser>('User', UserSchema);
export default User;
