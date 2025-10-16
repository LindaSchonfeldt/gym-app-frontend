import { useState, useEffect } from 'react'

export const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
      aria-label='Toggle theme'
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
