import { Schema, model, models } from 'mongoose';

const VendorSchema = new Schema({
    profileImage: { type: String }, // URL to the vendor's profile image
    vendorName: { type: String, required: true },
    mobileNumber: { type: String },
    businessNumber: { type: String },
    businessName: { type: String },
    categories: { type: [String], required: true }, // Array of categories the vendor belongs to
    country: { type: String },
    city: { type: String },
    postalCode: { type: String },
    businessAddress: { type: String },
    website: { type: String }, // URL to the vendor's website
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the associated User
},
    {
        timestamps: true,
        versionKey: false
    },

);

const Vendor = models?.Vendor || model('Vendor', VendorSchema);


export default Vendor;

