import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const aboutText = [
  `Qudz Motors is a premier destination for luxury and high-performance vehicles. Established in 2010, we have been dedicated to bringing the finest cars from around the world to enthusiasts and collectors alike. Our curated selection includes iconic brands such as Ferrari, Lamborghini, Porsche, and more, each chosen for their exceptional design, engineering, and performance.`,
  `Our mission is to provide an unparalleled experience for car enthusiasts, offering not just vehicles, but a lifestyle. Whether you're looking for a supercar to dominate the track or a luxurious ride for your daily commute, Qudz Motors has something for everyone. We pride ourselves on our expertise, customer service, and passion for automobiles.`,
  `Join us on this journey as we continue to celebrate the art and science of automotive excellence.`
];

const About = () => (
  <motion.section className="page-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="content-wrapper">
      <motion.h1 className="page-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}>
        About Qudz Motors
      </motion.h1>
      <div className="about-content">
        <motion.div className="about-text" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.25 } } }}>
          {aboutText.map((text, idx) => (
            <motion.p
              key={idx}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' } } }}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + idx * 0.2 }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
        <motion.div className="about-image" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}>
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1483&q=80" alt="Luxury Car Showroom" />
        </motion.div>
      </div>

      {/* Mission and Vision Section */}
      <div className="mission-vision">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}>
          Our Mission and Vision
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7, type: 'spring' }}>
          {/* Placeholder text for Mission and Vision */}
          Mission: To be the leading provider of exceptional luxury and high-performance vehicles, offering an unparalleled customer experience.
        </motion.p>
         <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.7, type: 'spring' }}>
          Vision: To create a community of passionate car enthusiasts and set new standards in the automotive industry.
        </motion.p>
      </div>

      {/* Our Team Section */}
      <div className="our-team">
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.7, type: 'spring' }}>
          Our Team
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.7, type: 'spring' }}>
          {/* Placeholder text for Our Team */}
          Meet the dedicated team behind Qudz Motors. Our experts are passionate about cars and committed to providing you with the best service.
        </motion.p>
        {/* You can add team member components here */} 
      </div>

    </div>
  </motion.section>
);

export default About; 