"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Chip from "@/components/Chip";
//Used Shadcn for the input component
import { Input } from "@/components/ui/input";
import { Suggestions } from "@/constants/Suggestions";

function Page() {
  const [chipItems, setChipItems] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsFocus(false);
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (item) => {
    setChipItems(chipItems.filter((i) => i !== item));
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    const filteredSuggestions = Suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        suggestion.email.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestion = (suggestion) => {
    const isExists = chipItems.some(
      (item) => item.name === suggestion.name && item.email === suggestion.email
    );
    if (!isExists) {
      setChipItems([...chipItems, suggestion]);
    }
    setInput("");

    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  function handleFocus() {
    setIsFocus(true);
    setSuggestions(Suggestions);
  }

  return (
    <section className="md:w-[50%] mx-auto md:mt-10 mt-5 w-full max-md:px-5">
      <div className="flex  min-h-[50px] flex-wrap items-center gap-1 rounded-xl px-4 py-2 bg-gray-100">
        <Image
          src="/assets/icons/search.svg"
          alt="Search Icon"
          width={20}
          height={20}
          className="cursor-pointer"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search by name or email"
          value={input}
          onChange={handleChange}
          onFocus={handleFocus}
          className="w-[80%] placeholder:font-medium max-md:placeholder:text-md border-none shadow-none outline-none bg-gray-100 focus-visible:right-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        {chipItems.map((item, index) => (
          <Chip
            key={index}
            name={item.name}
            email={item.email}
            onDelete={() => handleClick(item)}
          />
        ))}
      </div>
      {isFocus && (
        <div
          ref={suggestionRef}
          className="mt-5 lg:w-[60%] max-md:w-[90%] overflow-y-auto max-h-[20rem] custom-scrollbar"
        >
          {suggestions.length > 0 && (
            <ul className="bg-gray-50 rounded shadow-lg">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestion(suggestion)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                >
                  <span className="font-bold">{suggestion.name}</span> (
                  {suggestion.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export default Page;
