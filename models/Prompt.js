import mongoose, {Schema} from "mongoose"

const PromptSchema = new Schema({
    creater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'prompt is required']
    }
})

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);

export default Prompt;