'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { TbBooks, TbHistory, TbHomeHeart } from 'react-icons/tb'

const MenuItem = ({ data }) => {
  const currentPath = usePathname()
  return (
    <li
      className={
        currentPath === data.href
          ? 'flex items-center gap-3 px-2 py-2 bg-purple-200/30 rounded-xl text-slate-800/80 font-bold transition-all duration-200 ease-in-out'
          : 'flex items-center gap-3 px-2 py-2 hover:bg-purple-100/30 rounded-xl text-slate-700 hover:text-purple-800/60 transition-all duration-200 ease-in-out'
      }
    >
      {data.label === 'Home' ? (
        <TbHomeHeart size={20} color="#6b21a8" />
      ) : data.label === 'Journals' ? (
        <TbBooks size={20} color="#6b21a8" />
      ) : data.label === 'History' ? (
        <TbHistory size={20} color="#6b21a8" />
      ) : null}
      {data.label}
    </li>
  )
}

export default MenuItem
