import Link from 'next/link'
import React from 'react'

const Form = ({type, submitting ,handleSubmit ,post, setpost ,}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left '> 
            <span className="blue_gradient">{type} Post</span>
             </h1>
             <p className='desc text-left'>{type} and Share amazing prompts with world, and let your imagination wild with AI Powerd Platform</p>

             <form 
              onSubmit={handleSubmit}
              className='mt-5 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
             >
                {/* prompt */}
                <label htmlFor='textarea'>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
                </label>
                <textarea name="" id="textarea" className='form_textarea'
                value={post.prompt}
                onChange={(e)=>setpost({...post, prompt: e.target.value})}
                placeholder='write your prompt here...'
                required
                ></textarea>

                {/* tag */}
                <label htmlFor="tag">
                    <span className='font-satoshi font-semibold text-base text-gray-700'>#tag <span className='font-normal'>e.g #development #idea #trending</span></span>
                </label>
                <input name="" id="tag" className='form_input'
                type='text'
                value={post.tag}
                onChange={(e)=>setpost({...post, tag: e.target.value})}
                placeholder='#tag...'
                required
                ></input>

                {/* cancel btn */}
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href='/'
                    className='text-gray-500 text-sm'>
                        cancel
                    </Link>

                    <button 
                type="submit"
                disabled={submitting}
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                > 
                {submitting? '...':type}
                </button>
                </div>

                
             </form>
    </section>
  )
}

export default Form