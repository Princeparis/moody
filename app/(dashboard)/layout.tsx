import MenuItem from '@/components/MenuItem'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
interface Props {
  children: React.ReactNode
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journals' },
  { href: '/history', label: 'History' },
]
const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-screen relative grid grid-cols-1 md:grid-cols-dashboard">
      <aside className="md:flex flex-col h-full w-[200px] border-r border-black/10 hidden">
        <div className="p-4 text-2xl font-bold h-[60px]">
          <span className="text-red-500">❤</span> &nbsp;Moody
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-2 px-4">
          {links.map((link) => (
            <Link href={link.href} key={link.label}>
              <MenuItem data={link} />
            </Link>
          ))}
        </ul>
      </aside>
      <div className="h-full">
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
