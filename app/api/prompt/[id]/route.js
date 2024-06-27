import Prompt from "@models/Prompt";
import  connectToDB  from "@utils/dbConnect";
// GET: get a single prompt
export const GET = async (request, {params}) => {
    try {
        const isConnected = await connectToDB()
        const prompt = await Prompt.findById(params.id)
        if(!prompt){
            return new Response('prompt not found', {status: 404})
        }
        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch prompt", error , { status: 500 })
    }
} 

// PATCH: update prompt
export const PATCH = async (req, {params}) =>{

    const {prompt, tag } = await req.json()
    try {
        const isConnected = await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt){
            return new Response('content not found', {status: 204})
        }
        
            existingPrompt.prompt = prompt
            existingPrompt.tag = tag;

            await existingPrompt.save()
            return new Response(JSON.stringify(existingPrompt, {status: 200}))
        


    } catch (error) {
        return new Response('error in patching prompt', {status: 500})
    }
}


// DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};