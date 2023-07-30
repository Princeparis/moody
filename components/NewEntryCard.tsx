'use client'
import { VscAdd } from 'react-icons/vsc'

import { createNewEntry } from '@/utils/api'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()

  const handleClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }
  return (
    <div
      className="w-full h-full cursor-pointer rounded-xl bg-white hover:border-2 border-purple-800 shadow hover:shadow-lg hover:scale-105 transition-all duration-200 ease-in-out"
      onClick={handleClick}
    >
      <div className="flex justify-center items-center w-full h-full px-4 py-5">
        <VscAdd size={'60px'} color="#6b21a8" />
      </div>
    </div>
  )
}

export default NewEntryCard
