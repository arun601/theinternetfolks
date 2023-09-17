import mongoose from 'mongoose'
import { Snowflake } from "@theinternetfolks/snowflake";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: Snowflake.generate(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
