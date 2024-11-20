import React from 'react'
import Link from 'next/link'
import Navbar from './Navbar'

function Header() {
  return (
    <header className='bg-background/30 fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl px-8 shadow-sm saturate-100 transition-colors'>
      <Link href='/' className='flex items-center justify-center gap-1'>
        <span className="text-[24px] font-bold italic tracking-[-0.3px] p-1 hover:underline active:bg-transparent">
          Seungwoo.
        </span>
      </Link>
      <div className='flex items-center gap-2'>
        <Navbar />
        {/* <ThemeToggle /> */}
      </div>
    </header>
  )
}

export default Header
