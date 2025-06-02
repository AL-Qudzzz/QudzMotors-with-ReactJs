import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FilterSection.css';

const FilterSection = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = {
    brands: [
      'All',
      'Maserati',
      'Porsche',
      'Ferrari',
      'Lamborghini',
      'Bugatti',
      'McLaren',
      'Aston Martin',
      'Koenigsegg',
      'Rimac',
      'Pagani',
      'Nissan',
      'Toyota',
      'Honda',
      'Mazda',
      'Subaru',
      'Mitsubishi',
      'Dodge',
      'Chevrolet',
      'Ford',
      'Tesla'
    ],
    years: [
      '1947 - 2025',
      '2024',
      '2023',
      '2022',
      '2021',
      '2020',
      '2019',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      '2010',
      '2009',
      '2007',
      '2002',
      '2001',
      '1999',
      '1998'
    ],
    prices: [
      'All price options',
      '0 - $544,000',
      '$544,000 - $4,080,000'
    ],
    bodyTypes: [
      'All body types',
      'Coupe',
      'Convertible',
      'Sedan',
      'SUV',
      'Hatchback',
      'Pickup'
    ],
    driveTypes: [
      'All drive types',
      'AWD',
      'RWD',
      'FWD'
    ]
  };

  const bodyTypes = [
    { value: 'all', label: 'All body types' },
    { value: 'coupe', label: 'Coupe' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'convertible', label: 'Convertible' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'roadster', label: 'Roadster' }
  ];

  const driveTypes = [
    { value: 'all', label: 'All drive types' },
    { value: 'AWD', label: 'AWD' },
    { value: 'RWD', label: 'RWD' },
    { value: 'FWD', label: 'FWD' }
  ];

  const handleFilterChange = (type, value) => {
    console.log('FilterSection - handleFilterChange:', { type, value });
    
    switch (type) {
      case 'bodyType':
        if (value === 'all') {
          onFilterChange('bodyType', 'all');
        } else {
          onFilterChange('bodyType', value.toLowerCase());
        }
        break;
      case 'driveType':
        if (value === 'all') {
          onFilterChange('driveType', 'all');
        } else {
          onFilterChange('driveType', value);
        }
        break;
      default:
        onFilterChange(type, value);
    }
  };

  const filterVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className="filter-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <motion.button
        className={`filter-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Filters</span>
        <motion.span
          className="filter-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="filters"
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="filter-grid">
              <div className="filter-group">
                <label htmlFor="brands">Brands</label>
                <select
                  id="brands"
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                >
                  {filterOptions.brands.map((brand) => (
                    <option key={brand} value={brand === 'Aston Martin' ? 'astonmartin' : brand.toLowerCase()}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="years">Years</label>
                <select
                  id="years"
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                >
                  {filterOptions.years.map((year) => (
                    <option key={year} value={year.toLowerCase()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="price">Price</label>
                <select
                  id="price"
                  value={filters.price}
                  onChange={(e) => handleFilterChange('price', e.target.value)}
                >
                  {filterOptions.prices.map((price) => (
                    <option key={price} value={price.toLowerCase()}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="bodyType">Body Type</label>
                <select
                  id="bodyType"
                  value={filters.bodyType}
                  onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                >
                  {bodyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="driveType">Drive Type</label>
                <select
                  id="driveType"
                  value={filters.driveType}
                  onChange={(e) => handleFilterChange('driveType', e.target.value)}
                >
                  {driveTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterSection; 