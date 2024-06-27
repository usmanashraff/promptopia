'use client'

import PostCard from "./PostCard"
import { useState, useEffect } from "react";

const PromptCardList = ({data, handleTagClick}) =>{
  return <div className="mt-16 prompt_layout">
    {data?.map((post)=>{
      return <PostCard
         key={post._id}
         post={post}
         handleTagClick={handleTagClick}
       />
    })}
  </div>
}
const Feed = () => {
  const [posts, setposts] = useState([])

  // for search function
  const [searchText, setSearchText] = useState('')
  const [searchResults, setsearchResults] = useState([])
  const [searchTimeOut, setsearchTimeOut] = useState(null)

  useEffect(()=>{
    const fetchPosts = async() =>{
     const res = await fetch('/api/prompt')
     const data = await res.json()
     setposts(data)
     
    }
    fetchPosts()
   },[])

   const filterPrompts = () =>{
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creater.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
   }

   const handleSearchChange = (e) =>{
    clearTimeout(searchTimeOut)
    setSearchText(e.target.value);

   setsearchTimeOut(setTimeout(() => {
    const searchres = filterPrompts(e.target.value)
    setsearchResults(searchres)
   }, 500))
  }
 


  const handleTagClick = (tag) =>{

    
    setSearchText(tag)
    const searchres = filterPrompts(tag)
console.log(searchres)
    setsearchResults(searchres)
  }

 
  return (
    <section className="feed">
      <form className="relative w-full flex-center" >
        <input type="text"
        placeholder="search for a tag or username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />
      </form>
     
      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}


    </section>
  )
}

export default Feed