import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  _id: String, // Set _id as a string type

  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: { type: String, index: true },
  // email: {
  //   type: String,
  //   unique: [true, 'Email already exists!'],
  // },
  username: {
    type: String,
    // match: [/^(?=.{1,3}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  password: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  provider: {
    type: String,
    default: "credentials"
  },
  role: {
    type: Array,
    default: ["user"]
  },
  twoFactorAuthStatus: {
    type: Boolean,
    default: false
  },
  country: {
    type: String
  },
  language: {
    type: String,
    default: "en-US"
  },
},
  {
    timestamps: true,
    versionKey: false
  },

);


const User = models?.User || model("User", UserSchema);

export default User;

