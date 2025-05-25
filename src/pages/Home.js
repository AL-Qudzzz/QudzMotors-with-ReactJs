import React, { useState, useEffect } from 'react';
import carsData from '../assets/cars.json';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import CarGrid from '../components/CarGrid';
import CarPopup from '../components/CarPopup';
import '../styles/Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    brand: 'all',
    year: 'all',
    price: 'all',
    bodyType: 'all',
    driveType: 'all'
  });

  useEffect(() => {
    setCars(carsData);
    setFilteredCars(carsData);
  }, []);

  useEffect(() => {
    let filtered = [...cars];

    // FILTER
    if (filters.brand !== 'all') {
      filtered = filtered.filter(car => car.brand.replace(/\s/g, '').toLowerCase() === filters.brand.replace(/\s/g, '').toLowerCase());
    }

    if (filters.year !== 'all') {
      // Jika value year adalah '1947 - 2025', tampilkan semua
      if (!filters.year.includes('1947')) {
        filtered = filtered.filter(car => car.year === parseInt(filters.year));
      }
    }

    if (filters.price !== 'all') {
      const [min, max] = filters.price.replace(/[^0-9\-]/g, '').split('-').map(Number);
      filtered = filtered.filter(car => {
        if (max) {
          return car.price >= min && car.price <= max;
        }
        return car.price >= min;
      });
    }

    if (filters.bodyType !== 'all') {
      filtered = filtered.filter(car => car.body.toLowerCase() === filters.bodyType);
    }

    if (filters.driveType !== 'all') {
      filtered = filtered.filter(car => car.drivetrain === filters.driveType);
    }

    // SEARCH (setelah filter)
    if (filters.search) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  }, [filters, cars]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setIsPopupOpen(true);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  return (
    <motion.div
      className="home"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          DOMINATORS OF SPEED
        </motion.h1>
        <HeroSlider />
      </section>

      <SearchBar onSearch={handleSearch} value={filters.search} />

      <FilterSection
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <CarGrid
        cars={filteredCars}
        onCarClick={handleCarClick}
      />

      <AnimatePresence>
        {isPopupOpen && selectedCar && (
          <CarPopup
            car={selectedCar}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home; 