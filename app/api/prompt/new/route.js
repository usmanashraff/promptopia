import connectToDB from "@utils/dbConnect"
import Prompt from "@models/Prompt"
export const POST = async (req) =>{

    const {userId, prompt, tag} = await req.json()
    try {
        const isConnected = await connectToDB() 
        if(isConnected){
            const newPrompt = new Prompt({
                creater: userId,
                prompt,
                tag,
            })

            await newPrompt.save()
            return new Response(JSON.stringify({newPrompt}, {status: 201}))
        }
    } catch (error) {
        console.log('error in creating prompt in api side')
        return new Response('failed to load prompt', {status: 500})
    }

}
