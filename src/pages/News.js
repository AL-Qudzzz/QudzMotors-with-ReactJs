import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import newsData from '../assets/news.json';
import '../styles/News.css';

const filterOptions = [
  { label: 'All News', value: 'all' },
  { label: 'Latest Updates', value: 'api' },
  { label: 'Qudz Motors News', value: 'custom' }
];

const News = () => {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [popup, setPopup] = useState(null);
  const perPage = 6;

  // Filter logic
  const filteredNews = newsData.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'api') return n.source !== 'Qudz Motors';
    if (filter === 'custom') return n.source === 'Qudz Motors';
    return true;
  });
  const totalPages = Math.ceil(filteredNews.length / perPage);
  const pagedNews = filteredNews.slice((page-1)*perPage, page*perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [filter, totalPages]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 18 } },
    hover: { scale: 1.03, boxShadow: '0 8px 32px rgba(255,0,0,0.10)' }
  };

  return (
    <motion.section className="page-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="content-wrapper">
        <motion.h1 className="page-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Automotive News</motion.h1>
        <motion.div className="news-filters" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {filterOptions.map(opt => (
            <motion.button
              key={opt.value}
              className={`filter-btn${filter===opt.value?' active':''}`}
              onClick={()=>setFilter(opt.value)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </motion.div>
        <motion.div className="news-container" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="news-grid">
            <AnimatePresence>
              {pagedNews.map((news, idx) => (
                <motion.div
                  className="news-card"
                  key={news.title+news.publishedAt}
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                  onClick={() => setPopup(news)}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <motion.img src={news.imageUrl} alt={news.title} className="news-img" layoutId={news.imageUrl} />
                  <motion.h2>{news.title}</motion.h2>
                  <motion.div className="news-meta">
                    <span>{new Date(news.publishedAt).toLocaleDateString()}</span> | <span>{news.source}</span>
                  </motion.div>
                  <motion.p>{news.content.slice(0, 120)}...</motion.p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <motion.div className="news-pagination" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <button className="pagination-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>Previous</button>
          <span id="currentPage">Page {page} of {totalPages}</span>
          <button className="pagination-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
        </motion.div>
      </div>
      <AnimatePresence>
        {popup && (
          <motion.div className="news-popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={()=>setPopup(null)}>
            <motion.div className="news-popup" initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 40, opacity: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} onClick={e=>e.stopPropagation()}>
              <motion.img src={popup.imageUrl} alt={popup.title} className="popup-img" layoutId={popup.imageUrl} />
              <motion.h2>{popup.title}</motion.h2>
              <div className="news-meta">
                <span>{new Date(popup.publishedAt).toLocaleDateString()}</span> | <span>{popup.source}</span>
              </div>
              <motion.p>{popup.content}</motion.p>
              <a href={popup.url} target="_blank" rel="noopener noreferrer" className="read-more">Read Full Article</a>
              <motion.button className="close-btn" onClick={()=>setPopup(null)} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.95 }}>×</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default News; 