"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ journal }) => {
  const [value, setValue] = useState(journal.content);
  const [isLoading, setIsLoading] = useState(false);
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true);
      const updated = await updateEntry(journal.id, _value);
      setIsLoading(false);
    },
  });
  return (
    <div className="w-full h-full ">
      {isLoading && <div>...loading</div>}
      <textarea
        className="h-full w-full text-xl p-8 outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
function updatedEntry() {
  throw new Error("Function not implemented.");
}
