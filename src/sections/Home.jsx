
import React, { useMemo, useState, useEffect } from 'react'
import ParticlesBackground from '../components/ParticalesBackground'
import { motion } from 'framer-motion'

const Home = () => {
  const roles = useMemo(
    () => ['Web Developer', 'Software Developer'],
    []
  )

  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  // Typing and deleting animation
  useEffect(() => {
    const current = roles[index]
    let timeout

    if (!deleting && subIndex < current.length) {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev + 1)
      }, 100)
    } else if (!deleting && subIndex === current.length) {
      timeout = setTimeout(() => {
        setDeleting(true)
      }, 1200)
    } else if (deleting && subIndex > 0) {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1)
      }, 40)
    } else if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting, roles])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-32 -top-32
            h-[70vw] w-[70vw]
            max-h-[600px] max-w-[600px]
            rounded-full
            bg-gradient-to-r
            from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
            opacity-30 blur-[100px] animate-pulse
            sm:h-[50vw] sm:w-[50vw]
            sm:opacity-20 sm:blur-[130px]
            md:h-[40vw] md:w-[40vw]
            md:opacity-10 md:blur-[150px]
          "
        />

        <div
          className="
            absolute -bottom-32 -right-32
            h-[60vw] w-[60vw]
            max-h-[500px] max-w-[500px]
            rounded-full
            bg-gradient-to-r
            from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
            opacity-20 blur-[100px] animate-pulse
          "
        />
      </div>

      {/* Main Content */}
      <div
        className="
          relative z-10 mx-auto grid h-full w-full
          max-w-7xl grid-cols-1 px-4
          lg:grid-cols-2
        "
      >
        <div
          className="
            relative flex h-full flex-col
            justify-center text-center
            lg:text-left
          "
        >
          <div className="mx-auto w-full max-w-[48rem] lg:mx-0 lg:pr-24">
            <motion.div
              className="
                mb-3 min-h-[1.6em] w-full
                text-xl font-semibold tracking-wide text-white
                sm:text-2xl md:text-3xl lg:text-4xl
              "
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>

              <span
                className={`ml-1 text-[#00bf8f] ${
                  blink ? 'opacity-100' : 'opacity-0'
                }`}
              >
                |
              </span>
            </motion.div>

            <h1>
              Hello I'm
              <br></br>
              <span className='text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:whitespace-nowrap  '>
                Vicky Varma
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
