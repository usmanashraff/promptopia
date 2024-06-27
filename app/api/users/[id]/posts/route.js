import Prompt from "@models/Prompt";
import  connectToDB  from "@utils/dbConnect";

export const GET = async (request, {params}) => {
    try {
        const isConnected = await connectToDB()
        if(isConnected){
            console.log('true')
            const prompts = await Prompt.find({creater: params.id}).populate('creater')
            return new Response(JSON.stringify(prompts), { status: 200 })
        }

    } catch (error) {
        return new Response("Failed to fetch profile prompts", { status: 500 })
    }
} 