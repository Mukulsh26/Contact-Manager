import React from 'react';


interface Props {
  searchQuery: string; // searchQuery: input field ka current text
  setSearchQuery: (value: string) => void; // setSearchQuery: function jo input change hone pe state update karega
}


const SearchBar: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      className="search-input" 
      type="text" 
      placeholder="Search by name..." 
      value={searchQuery} 
      onChange={(e) => setSearchQuery(e.target.value)} 
    />
  );
};

export default SearchBar; 
