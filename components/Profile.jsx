import React from 'react'
import PostCard from './PostCard'

const Profile = ({name, desc, data, handleDelete, handleEdit}) => {
  return (
    <section className='w-full'>
        <h1 className='head_text text-left'><span className='blue_gradient'>{name} Profile</span></h1>
        <p className='text-left desc'>{desc}</p>

        <div className="prompt_layout mt-10">
            {data?.map((post)=>{
                return <PostCard 
                     key={post._id}
                     post={post}
                     handleDelete={()=>{handleDelete && handleDelete(post)}}
                     handleEdit={()=>{handleEdit && handleEdit(post)}}
                />
            })}
        </div>
    </section>
  )
}

export default Profile