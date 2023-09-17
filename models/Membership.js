import mongoose from 'mongoose'
 

const membershipSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  community: {
    type: String,
    ref: 'Community',
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.String,
    ref: 'Role',
    required: true,
  },
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;