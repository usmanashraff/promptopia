'use client'
import Profile from "@components/Profile"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const page = ({params}) => {
    const [posts, setposts] = useState([])
    const searchParams = useSearchParams()
    const username = searchParams.get('name')


    useEffect(()=>{
       const fetchUserPrompts = async ()=>{
        try {
            const res = await fetch(`/api/users/${params?.id}/posts`)
            const data = await res.json()
            setposts(data)
        } catch (error) {
            console.log('error', error)
        }
       }

       if(params?.id) fetchUserPrompts()
    }, [])

  return (
    <div>
        <Profile 
          name={username}
          desc={`welcome to ${username} personilized profile page`}
          data={posts}
        
        />
    </div>
  )
}

export default page