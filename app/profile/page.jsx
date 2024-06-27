'use client'
import { useEffect, useState } from "react"
import Profile from "@components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Page = () => {
    const {data: session, status} = useSession()
    const [posts, setposts] = useState([])
    const router = useRouter()

    useEffect(()=>{
        const fetchPosts = async() =>{
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()
            console.log(data)
            setposts(data)
         
        }
        if(session?.user.id) fetchPosts()
      
       },[])

    const handleEdit = (post) =>{
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) =>{

      const confirmDelete = confirm('do you really want to delete this prompt?')
if(confirmDelete){
      try {
        
         const res = await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE"
          })
          const filteredPosts = posts.filter((p)=> p._id !== post._id)
          setposts(filteredPosts)
          const r = res.json()
          console.log(r)
        
      } catch (error) {
        console.log(error)
      }
    }
    }
  return (
    <div>
        <Profile 
          name="My"
          desc = "welcome to your personilized profile page"
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          data={posts}
        />
    </div>
  )
}

export default Page