import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
interface Props {
  children: React.ReactNode
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journals' },
]
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-black/10 ">
        <div className="p-4 text-xl font-bold">Moody</div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-3 py-3 text-lg">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)] w-[calc(100vw-200px)] overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
