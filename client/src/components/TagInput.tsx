"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type TagInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
};

export default function TagInput({ tags, setTags, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue === "") {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className="w-full border rounded-2xl p-2 flex flex-wrap items-center gap-2 shadow-sm">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center gap-1 px-3 py-1 rounded-full border text-sm"
        >
          <span>{tag}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:text-red-500"
            onClick={() => removeTag(index)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ))}
      <Input
        type="text"
        className={clsx(
          "border-none ring-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none pl-4 w-auto flex-1 min-w-[120px]"
        )}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Add tags..."}
      />
    </div>
  );
}
