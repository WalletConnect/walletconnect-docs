import React from 'react';
import SearchBar from '@theme-original/SearchBar';
import AskCookbook from '@cookbookdev/docsbot/react'

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWNlNzU4MWZiMDBlZWUyNThjNmUxMmUiLCJpYXQiOjE3MDgwMjkzMTMsImV4cCI6MjAyMzYwNTMxM30.LtNLWb3f7DY5L9FK8Wnx8iMvgGdZ60KPRI-nLNEBOos";

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
      <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  );
}
