import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "password must be greater than 5 char"],
  },
  topics: {
    type: [
      {
        title: { type: String},
        description: [
          {
            word: { type: String },
            delimeter: {
              type: String,
            },
            value: {
              type: Number,
              enum: [0, 1, 2, 3],
              default: 0,
            },
          },
        ],
        percentage:Number
      },
    ],
    default: [],
  },
});

// userSchema.pre('save',async function(next){
//     //hash password
//     const salt=await bcrypt.genSalt(10);
//     const hashedPassword=await bcrypt.hash(this.password,salt)
//     this.password=hashedPassword;
//     next()
// })

const userModel = mongoose.model("users", userSchema);

export default userModel;
