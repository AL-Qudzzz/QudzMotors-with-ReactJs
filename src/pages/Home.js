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
    console.log('Home - Filtering cars with filters:', filters);
    
    const filtered = cars.filter(car => {
      // Brand filter
      if (filters.brand && filters.brand !== 'all' && car.brand !== filters.brand) {
        return false;
      }

      // Year filter
      if (filters.year && filters.year !== 'all' && car.year !== parseInt(filters.year)) {
        return false;
      }

      // Price filter
      if (filters.price && filters.price !== 'all') {
        const [min, max] = filters.price.split('-').map(Number);
        if (car.price < min || car.price > max) {
          return false;
        }
      }

      // Body type filter
      if (filters.bodyType && filters.bodyType !== 'all') {
        console.log('Comparing body types:', {
          carBody: car.body,
          filterBody: filters.bodyType,
          carName: car.name
        });
        if (car.body !== filters.bodyType) {
          return false;
        }
      }

      // Drive type filter
      if (filters.driveType && filters.driveType !== 'all') {
        console.log('Comparing drive types:', {
          carDrivetrain: car.drivetrain,
          filterDrivetrain: filters.driveType,
          carName: car.name
        });
        if (car.drivetrain !== filters.driveType) {
          return false;
        }
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          car.name.toLowerCase().includes(searchTerm) ||
          car.brand.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });

    console.log('Home - Filtered cars count:', filtered.length);
    setFilteredCars(filtered);
  }, [cars, filters]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (filterType, value) => {
    console.log('Home - handleFilterChange:', { filterType, value }); // Debug log
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