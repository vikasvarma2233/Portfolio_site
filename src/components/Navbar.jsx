
import React, { useEffect, useRef, useState } from 'react';
import OverlayMenu from './OverlayMenu';
import Logo from '../assets/Logo.png';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  // Show navbar on the Home section
  useEffect(() => {
    const homeSection = document.querySelector('#home');

    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  // Hide navbar while scrolling down; show it when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (forceVisible || menuOpen) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;

      clearTimeout(timerId.current);

      timerId.current = setTimeout(() => {
        setVisible(true);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timerId.current);
    };
  }, [forceVisible, menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-transform duration-300 ${
          visible || menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Vicky logo" className="h-8 w-8" />

          <div className="hidden text-2xl font-bold text-white sm:block">
            Vicky
          </div>
        </div>

        {/* Menu Button */}
        <div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer text-3xl text-white focus:outline-none"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <FiMenu />
          </button>
        </div>

        {/* Contact Button */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-5 py-2 font-medium text-white shadow-lg transition-opacity duration-300 hover:opacity-90"
          >
            Reach Out
          </a>
        </div>
      </nav>

      <OverlayMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
