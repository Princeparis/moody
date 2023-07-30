'use client'

import { askQuestion } from '@/utils/api'
import { useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex justify-between items-center pr-1 pl-2 py-1 bg-white rounded-full w-[430px]"
      >
        <input
          disabled={loading}
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Ask any question"
          className="px-4 py-3 text-lg w-full outline-none"
        />
        <button
          disabled={loading}
          type="submit"
          className="px-6 py-3 bg-purple-600 text-lg font-bold rounded-full text-white hover:bg-purple-700 transition-all duration-200 ease-in-out"
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div className="w-[560px]">{response}</div>}
    </div>
  )
}

export default Question
