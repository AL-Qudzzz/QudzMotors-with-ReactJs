import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, value }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  const handleIconClick = () => {
    onSearch(value);
  };

  return (
    <motion.section
      className="search-bar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div
        className={`search-container ${isFocused ? 'focused' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.input
          type="text"
          placeholder="Search cars by name..."
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.02 }}
          value={value}
        />
        <motion.div
          className="search-icon"
          animate={{
            scale: isFocused ? 1.1 : 1,
            rotate: isFocused ? 360 : 0
          }}
          transition={{ duration: 0.3 }}
          onClick={handleIconClick}
          style={{ cursor: 'pointer' }}
        >
          🔍
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SearchBar; 