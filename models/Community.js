import mongoose from 'mongoose'
import { Snowflake } from "@theinternetfolks/snowflake";

const communitySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: Snowflake.generate(),
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    required: true,
  },
});

const Community = mongoose.model('Community', communitySchema);

export default Community;
