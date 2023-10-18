import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  roleName: {
    type: String,
    default: ""
  },
  roleDescription : {
    type : String,
    default : ""
  },
  isActive:  {
    type: Boolean,
  }

},
  {
    timestamps: true,
    versionKey: false
  },

);


const Role = models?.Role || model("Role", UserSchema);

export default Role;

