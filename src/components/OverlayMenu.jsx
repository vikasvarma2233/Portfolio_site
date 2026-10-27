
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const OverlayMenu = ({ isOpen, onClose }) => {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 1024;

  const origin = isMobile ? '95% 8%' : '50% 8%';

  const menuItems = [
    'Home',
    'About',
    'Skills',
    'Projects',
    'Experience',
    'Testimonials',
    'Contact',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-3xl text-white hover:text-pink-400 transition-colors"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-4xl font-semibold text-white transition-colors duration-300 hover:text-pink-400"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayMenu;
