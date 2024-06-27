import Prompt from "@models/Prompt";
import  connectToDB  from "@utils/dbConnect";

export const GET = async (request) => {
    try {
        const isConnected = await connectToDB()
       

        const prompts = await Prompt.find({}).populate('creater')
        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 