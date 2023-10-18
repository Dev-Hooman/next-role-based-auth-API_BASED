import { connectToDB } from "@/utils/database"
import User from "@/model/user";

export const POST = async (req) => {
    const { firstName, lastName, role, username } = await req.json()

    try {
        await connectToDB();

        let roleArray = []
        roleArray.push(role)

        const url = new URL(req.url);
        const searchParams = new URLSearchParams(url.search);
        const email = searchParams.get("email");

        // Find and update the user document
        const updateUser = await User.findOneAndUpdate({ email },
            {
                firstName,
                lastName,
                username,
                role: roleArray
            }
        );

        if (updateUser) {
            return new Response(JSON.stringify({ message: "User Updated Success!" }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: "User not found or no changes made." }), { status: 400 });
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Failed to update the user." }), { status: 500 });
    }

}
