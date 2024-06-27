"use client"
import Image from "next/image"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

const PostCard = ({post, handleTagClick, handleDelete, handleEdit}) => {
    const router = useRouter()
    const {data: session} = useSession()
    const pathName = usePathname()
    const [copied, setcopied] = useState('')
    const handleCopy = () =>{
        setcopied(post.prompt);
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => {
            setcopied('')
        }, 3000);
    }

    const handleUserProfile = ( ) =>{
        if(session?.user.id === post.creater._id)
            router.push('/profile')
        router.push(`/profile/${post.creater._id}?name=${post.creater.username}`);
        //else
       // router.push(`/profile/${post.creater._id}?username=${post.creater.username}`)
    }

  return (
    <div className='prompt_card'>
        <div className="flex justify-between items-center gap-5">
            <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleUserProfile}>
                <Image 
                  src={post.creater.image}
                  alt="user_image"
                  width={40}
                  height={40}
                  className='rounded-full object-contain'
                />
                <div className="flex flex-col">
                    <h1 className="font-satoshi font-semibold text-gray-700 hover:underline underline-offset-1">{post.creater.username}</h1>
                    <p className="font-inter text-sm text-gray-500 hover:underline underline-offset-1">{post.creater.email}</p>
                </div>
            </div>
            <div className="copy_btn" onClick={handleCopy}>
                <Image src={copied === post.prompt? 'assets/icons/tick.svg': '/assets/icons/copy.svg'}
                width={12}
                alt=""
                height={12} />
            </div>
        </div>
        <p className="font-satoshi text-gray-700 text-sm my-4" >{post.prompt}</p>
        <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={()=>{
             handleTagClick(post.tag)
        }}>#{post.tag}</p>
        {session?.user.id === post.creater._id && pathName == '/profile' && (
            <div className="mt-5 flex gap-4 flex-center border-t border-gray-100 pt-3">
                <p className="text-sm green_gradient font-inter cursor-pointer"
                onClick={handleEdit}
                >Edit</p>
                <p className="text-sm orange_gradient font-inter cursor-pointer" onClick={handleDelete}>Delete</p>
            </div>
        ) }
    </div>
  )
}

export default PostCard