"use client"
import Form from "@components/Form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [post, setpost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(()=>{
        const fetchSinglePrompt = async()=>{
            try {
                const res = await fetch(`/api/prompt/${promptId}`)
                const data = await res.json();
                setpost({prompt: data.prompt, tag: data.tag})
            } catch (error) {
                console.log('error in fetching prompt for reload in edit', error)
            }
        }
        if(promptId) fetchSinglePrompt()
    }, [promptId])

    const updatePrompt = async (e) =>{
        e.preventDefault()
        if(!promptId)
            console.log('prompt is not exist', promptId)
        try {
            setSubmitting(true)
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(res.ok){
                console.log('prompt patched')
                router.push('/')
            }
        } catch (error) {
            console.log('error in editing(submitting) prompt', error)
        }finally{
            setSubmitting(false)
        }
    }

  return (
    <div>
        <Form
        type= "Edit"
        submitting = {submitting}
        handleSubmit = {updatePrompt}
        post = {post}
        setpost = {setpost}
        />
    </div>
  )
}

export default Page