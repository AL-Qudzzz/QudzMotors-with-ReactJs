import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CarPopup.css';

const CarPopup = ({ car, onClose }) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="popup-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={handleOverlayClick}
      >
        <motion.div
          className="popup-content"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            className="close-button"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>

          <motion.div
            className="popup-image"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img src={car.image} alt={car.name} />
          </motion.div>

          <motion.div
            className="popup-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {car.name}
            </motion.h2>

            <motion.div
              className="specs-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="spec-item">
                <span className="spec-label">Engine</span>
                <span className="spec-value">{car.specs.engine}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Horsepower</span>
                <span className="spec-value">{car.specs.horsepower}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Top Speed</span>
                <span className="spec-value">{car.specs.topSpeed}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Acceleration</span>
                <span className="spec-value">{car.specs.acceleration}</span>
              </div>
            </motion.div>

            <motion.div
              className="additional-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="info-item">
                <span className="info-label">Price</span>
                <span className="info-value">$ {car.price.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Year</span>
                <span className="info-value">{car.year}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Body Type</span>
                <span className="info-value">{car.body}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Drive Type</span>
                <span className="info-value">{car.drivetrain}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarPopup; 