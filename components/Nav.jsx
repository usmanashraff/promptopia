"use client"
import Image from 'next/image'
import Link from 'next/link'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { useState, useEffect } from 'react';

const Nav = () => {

  const {data: session} = useSession()
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
      <Image 
      src="/assets/images/logo.svg"
      height={30}
      width={30}
      alt="promptia logo"
      className="object-contain"
      />
      <p className="logo_text">Promtopia</p>
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user?(
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt"
            className="black_btn"
            >
              create post
            </Link>

            <button type="button" className="outline_btn" onClick={signOut} >
              sign out
            </button>

            <Link href="/profile" >
            <Image 
            src={session?.user.image}
            height={37}
            width={37}
            alt="profile photo"
            className="rounded-full"
            />
            </Link>
          </div>
        ):(
          <>
         {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>



      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user? (
          <div className="flex">
            <Image 
            src={session?.user.image}
            height={37}
            width={37}
            alt="profile photo"
            className="rounded-full cursor-pointer"
            onClick={()=> settoggleDropdown((prev)=>!prev)}
            />
            {toggleDropdown? (
              <div className="dropdown">
              <Link
              href="/profile"
              className='dropdown_link'
              onClick={()=>settoggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
              href="/create-prompt"
              className='dropdown_link'
              onClick={()=>settoggleDropdown(false)}
              >
                create prompt
              </Link>

              <button
              type="button"
              onClick={()=>{
                settoggleDropdown(false);
                signOut()
              }}
              className='w-full mt-5 flex-center black_btn'
              > Sign out </button>
            </div>
            ): (
              <></>
            )}
          </div>
        ): (
          <>
          {providers &&
               Object.values(providers).map((provider) => (
                 <button
                   type='button'
                   key={provider.name}
                   onClick={() => {
                     signIn(provider.id);
                   }}
                   className='black_btn'
                 >
                   Sign in
                 </button>
               ))}
           </>
        )}
      </div>
    </nav>
  )
}

export default Nav