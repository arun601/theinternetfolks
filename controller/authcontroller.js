import bcrypt from 'bcrypt';
import User from '../models/User.js'
import Membership from '../models/Membership.js';
import Community from '../models/Community.js';

export const registerController=async (req, res) => {
    try {
      console.log("success");
      const { name, email, password } = req.body;
      
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // User Signin
  export const loginController=async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if the provided password matches the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'User signed in successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const CommunityController=async(req,res)=>{
    try {
        console.log('commnuity created')
        const { name, admin } = req.body;
    
        // Create the new community
        const newCommunity = new Community({ name, admin });
        await newCommunity.save();
    
        // Add the admin as a member with the 'Community Admin' role
        const membership = new Membership({ user: admin, community: newCommunity._id, role: 'Community Admin' });
        await membership.save();
    
        res.status(201).json({ message: 'Community created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  // List all communities
export const getallCommunityController=async (req, res) => {
    try {
      const communities = await Community.find();
      res.status(200).json(communities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const allCommunitymemberController = async (req, res) => {
    try {
      const communityId = req.params.communityId;
      const members = await Membership.find({ community: communityId });
      res.status(200).json(members);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const addmemebertocommunity=async (req, res) => {
    try {
      const { userId } = req.body;
      const communityId = req.params.communityId;
  
      // Check if the user is already a member
      const existingMember = await Membership.findOne({ user: userId, community: communityId });
      if (existingMember) {
        return res.status(400).json({ error: 'User is already a member of this community' });
      }
  
      // Add the user as a member with the 'Community Member' role
      const membership = new Membership({ user: userId, community: communityId, role: 'Community Member' });
      await membership.save();
  
      res.status(201).json({ message: 'User added as a member successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const deletemember=async(req,res)=>{
        try {
            console.log("removed user")
          const communityId = req.params.communityId;
          const userId = req.params.userId;
      
          // Remove the user from the community
          await Membership.deleteOne({ user: userId, community: communityId });
      
          res.status(200).json({ message: 'User removed from the community successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
  