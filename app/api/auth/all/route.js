import { connectToDB } from "@/utils/database"
import User from "@/model/user";


export const GET = async (req) => {

    try {
        await connectToDB();
        const allUser = await User.find({})
        console.log(allUser)

        return new Response(JSON.stringify({ allUser: allUser }), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Unable to find" }), { status: 500 });
    }

}
