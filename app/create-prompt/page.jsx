"use client"
import Form from "@components/Form"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

const page = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e) =>{
        e.preventDefault()
        try {
            setSubmitting(true)
            const res = await fetch('/api/prompt/new', {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(res.ok){
                console.log('prompt submitted')
                router.push('/')
            }
        } catch (error) {
            console.log('error in creating prompt', error)
        }finally{
            setSubmitting(false)
        }
    }

  return (
    <div>
        <Form
        type= "Create"
        submitting = {submitting}
        handleSubmit = {createPrompt}
        post = {post}
        setpost = {setpost}
        />
    </div>
  )
}

export default page