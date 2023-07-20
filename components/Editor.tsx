'use client'

import { updateEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

const Editor = ({ journal }) => {
  const [value, setValue] = useState(journal.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(journal.analysis)
  const { mood, summary, color, subject, negative } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(journal.id, _value)
      setAnalysis(updated.analysis)
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>...loading</div>}
        <textarea
          className="h-full w-full text-xl p-8 outline-none resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
      <div className="border-l border-black/10 col-span-1">
        <div className=" px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-3xl">Ai Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                key={data.name}
                className="flex justify-between items-center px-3 py-3 border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold ">{data.name}</span>
                <span>{data.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
// function updatedEntry() {
//   throw new Error('Function not implemented.')
// }
