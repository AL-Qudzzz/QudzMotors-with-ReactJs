import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1200);
  };
  return (
    <motion.section className="page-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="content-wrapper">
        <motion.h1 className="page-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}>
          Contact Us
        </motion.h1>
        <div className="contact-container">
          <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}>
            <h2>Get in Touch</h2>
            <p>
              Have a question or inquiry? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span role="img" aria-label="address">📍</span>
                <p>Jl. Jaksa No.14, RT.14/RW.2, Kb. Sirih, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10340</p>
              </div>
              <div className="contact-item">
                <span role="img" aria-label="phone">📞</span>
                <p>+62 858 7655 8888</p>
              </div>
              <div className="contact-item">
                <span role="img" aria-label="email">✉️</span>
                <p>contact@qudzmotors.com</p>
              </div>
            </div>
          </motion.div>

          {/* Map Section */}
          <motion.div className="contact-map" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}>
            <h2>Our Location</h2>
            {/* Replace with your actual map iframe URL */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.91262596134013!2d106.82932496277812!3d-6.183985145284854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42e2b3a3e8f%3A0x45f2e17f3a9b9e85!2sJl.%20Jaksa%20No.14%2C%20RT.14%2FRW.2%2C%20Kb.%20Sirih%2C%20Kec.%20Menteng%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010340!5e0!3m2!1sid!2sid!4v1748871315967!5m2!1sid!2sid" 
              width="600" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Our Location on Map">
            </iframe>
          </motion.div>

          <motion.form className="contact-form" onSubmit={handleSubmit} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, type: 'spring' }}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <motion.input type="text" id="name" name="name" value={form.name} onChange={handleChange} required whileFocus={{ scale: 1.03, borderColor: '#ff0000' }} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <motion.input type="email" id="email" name="email" value={form.email} onChange={handleChange} required whileFocus={{ scale: 1.03, borderColor: '#ff0000' }} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <motion.textarea id="message" name="message" value={form.message} onChange={handleChange} required whileFocus={{ scale: 1.03, borderColor: '#ff0000' }} />
            </div>
            <motion.button type="submit" className="submit-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} disabled={loading}>
              {loading ? <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}>Sending...</motion.span> : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact; 