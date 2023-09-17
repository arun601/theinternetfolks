import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://arunyadav838481:838481ay@cluster0.b8jzxhq.mongodb.net/Internetfolks?retryWrites=true&w=majority");
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`)
  }
};

export default connectDB;
