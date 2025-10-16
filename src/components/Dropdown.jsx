import { useState, useRef, useEffect } from 'react'

export const Dropdown = ({
  placeholder = 'Select an option',
  selectedValue = null,
  displayKey = 'label',
  valueKey = 'value',
  options = [],
  onSelect,
  onOpen,
  onClose,
  width = 'w-48', // Tailwind width class
  bgColor = 'bg-gray-50',
  borderColor = 'border-gray-300',
  borderRadius = 'rounded',
  padding = 'p-2.5',
  hoverColor = 'hover:bg-gray-200',
  maxHeight = 'max-h-72',
  zIndex = 'z-50',
  disabled = false,
  searchable = false,
  multiple = false,
  customButton,
  customItem,
  className = '',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('') // Reset search when closing
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const toggleDropdown = () => {
    if (disabled) return

    const newIsOpen = !isOpen
    setIsOpen(newIsOpen)

    if (newIsOpen) {
      onOpen?.()
    } else {
      setSearchTerm('')
      onClose?.()
    }
  }

  const handleItemClick = (option) => {
    if (multiple) {
      onSelect?.(option)
    } else {
      onSelect?.(option)
      setIsOpen(false)
      setSearchTerm('')
      onClose?.()
    }
  }

  // Improved filtering with error handling
  const filteredOptions = searchable
    ? options.filter((option) => {
        try {
          const searchValue =
            typeof option === 'string'
              ? option
              : (option[displayKey] || '').toString()

          return searchValue.toLowerCase().includes(searchTerm.toLowerCase())
        } catch (error) {
          console.warn('Error filtering option:', option, error)
          return false
        }
      })
    : options

  const getDisplayValue = () => {
    if (selectedValue === null || selectedValue === undefined) {
      return placeholder
    }

    if (typeof selectedValue === 'string') {
      return selectedValue
    }

    return selectedValue[displayKey] || selectedValue[valueKey] || 'Unknown'
  }

  const renderButton = () => {
    if (customButton) {
      return customButton({ isOpen, selectedValue, toggleDropdown })
    }

    const buttonClasses = `
      ${bgColor} border ${borderColor} ${borderRadius} shadow-sm ${padding} 
      cursor-pointer flex justify-between items-center select-none
      ${hoverColor} transition-colors duration-200
      ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
    `.trim()

    return (
      <div onClick={toggleDropdown} className={buttonClasses}>
        <span>{getDisplayValue()}</span>
        <span
          className={`text-xs transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          ▼
        </span>
      </div>
    )
  }

  const renderItem = (option, index) => {
    if (customItem) {
      return customItem({
        option,
        index,
        onSelect: () => handleItemClick(option)
      })
    }

    const displayValue =
      typeof option === 'string'
        ? option
        : option[displayKey] || option[valueKey] || 'Unknown'

    // Improved key generation
    const itemKey =
      typeof option === 'string'
        ? `${option}-${index}`
        : option[valueKey] || `option-${index}`

    return (
      <div
        key={itemKey}
        onClick={() => handleItemClick(option)}
        className='px-4 py-2.5 cursor-pointer border-b border-gray-100 hover:bg-gray-50 last:border-b-0'
      >
        {displayValue}
      </div>
    )
  }

  const containerClasses =
    `relative inline-block ${width} ${zIndex} ${className}`.trim()
  const menuClasses = `
    absolute top-full left-0 right-0 bg-white border border-gray-300 
    ${borderRadius} shadow-lg ${maxHeight} overflow-y-auto mt-0.5
    ${isOpen ? 'block' : 'hidden'}
  `.trim()

  return (
    <div ref={dropdownRef} className={containerClasses} {...rest}>
      {renderButton()}

      <div className={menuClasses}>
        {searchable && (
          <div className='p-2.5 border-b border-gray-100'>
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className='w-full px-2 py-1.5 border border-gray-300 rounded text-sm box-border focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
            />
          </div>
        )}

        {filteredOptions.length === 0 ? (
          <div className='px-4 py-2.5 cursor-pointer border-b border-gray-100 last:border-b-0'>
            {searchTerm ? 'No matching options' : 'No options available'}
          </div>
        ) : (
          filteredOptions.map((option, index) => renderItem(option, index))
        )}
      </div>
    </div>
  )
}
