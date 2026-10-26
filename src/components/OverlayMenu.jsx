import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {FiX} from 'react-icons/fi';

const OverlayMenu = ({isOpen , onClose}) => {
  return (
   <AnimatePresence>
{
   isOpen && (
    <motion.div className='fixed inset-0 flex items-center justify-center z-50'>

      <button onClick={onClose}
      className='absolute top-6 right-6 text-white text-3xl'
      aria-level="Close Menu"
      >
        <FiX/>
      </button>

      <ul className='space-y-6 text-center'>

        {[
          "Home",
          "About",
          "Skills",
          "projects",
          "Experience",
          "Testimonials",
          "Contact"].map((item , index )=>(
            <motion.li  key={item}
            initial = {{opacity : 0, y:20}}
            animate= {{opacity: 1, y:0}}
            transition={{delay: 0.3  + index *0.1}}
            >
              <a href={`#${item.toLocaleLowerCase()}`}
              onClick={onClose}
              className='text-4xl text-white font-semibold hover:text-pink-400'
              
              >{item}</a>

            </motion.li>
          ))
          }

      </ul>

    </motion.div>
   )
}
   </AnimatePresence>
  )
}

export default OverlayMenu