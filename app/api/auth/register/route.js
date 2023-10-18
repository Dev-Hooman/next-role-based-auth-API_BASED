import { connectToDB } from "@/utils/database"
import User from "@/model/user";
import Vendor from "@/model/vendor";
import bcrypt from 'bcryptjs';

import { extractUsername } from "@/utils/utilityFunction";

export const POST = async (req) => {
  const {
    password, image, email, firstName, lastName, role, language,
    /* other user data */
    mobileNumber,
    businessNumber,
    businessName,
    categories,
    country,
    city,
    postalCode,
    businessAddress,
    website,
  } = await req.json();

  try {
    const username = extractUsername(email)

    await connectToDB();

    const user = await User.findOne({ email });
    if (user !== null) {
      return new Response(JSON.stringify({ message: "Email Already Exists!" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      role: [role],
      language,
      password: hashedPassword,
      image,
    });

    await newUser.save();

    if (role === 'vendor') {

      const vendorData = {
        profileImage: image,
        vendorName: `${firstName} ${lastName}`,
        mobileNumber,
        businessNumber,
        businessName,
        categories,
        country,
        city,
        postalCode,
        businessAddress,
        website,
        userId: newUser._id,
      };

      const newVendor = new Vendor(vendorData);
      await newVendor.save();
    }

    return new Response(JSON.stringify({ message: "User Registered Success!" }), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Failed to create User" }), { status: 500 });
  }
};
