'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@clerk/nextjs'

const EntryCard = ({ entry }) => {
  const { user } = useUser()
  const date = new Date(entry.createdAt).toDateString()
  const summary =
    entry.analysis.summary.length > 100
      ? entry.analysis.summary.slice(0, 100) + '...'
      : entry.analysis.summary
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out">
      <div className="w-full">
        <div className="px-4 py-4 font-bold text-xl capitalize">
          {entry.analysis.subject}
        </div>
        <div className="px-4 py-2 h-[160px]">{summary}</div>
        <div className="flex justify-between items-center w-full px-4 py-2 text-sm">
          <p className="font-bold text-gray-700/70">{date}</p>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex justify-between items-center px-4 py-4"
          style={{
            backgroundColor:
              entry.analysis.mood === 'joyful'
                ? '#f56476'
                : entry.analysis.color,
          }}
        >
          <p className="capitalize font-bold text-white">
            {entry.analysis.mood}
          </p>
          <div className="flex justify-between gap-2 items-center rounded-full px-2 py-2 text-sm font-bold bg-white text-gray-500/70">
            <div
              className="rounded-full w-[16px] h-[16px]"
              style={{ backgroundColor: entry.analysis.color }}
            ></div>
            {entry.analysis.negative ? 'Negative' : 'Positive'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryCard
