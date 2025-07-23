import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: ${(props) => props.zIndex || 1000};
  width: ${(props) => props.width || '200px'};
`

const DropdownButton = styled.div`
  background-color: ${(props) => props.bgColor || '#f9f9f9'};
  border: 1px solid ${(props) => props.borderColor || '#ccc'};
  border-radius: ${(props) => props.borderRadius || '4px'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.padding || '10px'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#e9e9e9'};
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: ${(props) => props.maxHeight || '300px'};
  overflow-y: auto;
  z-index: ${(props) => props.zIndex || 1001};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  margin-top: 2px;
`

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }
`

const ArrowIcon = styled.span`
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
  font-size: 12px;
`

const SearchContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

export const Dropdown = ({
  placeholder = 'Select an option',
  selectedValue = null,
  displayKey = 'label',
  valueKey = 'value',
  options = [],
  onSelect,
  onOpen,
  onClose,
  width = '200px',
  bgColor,
  borderColor,
  borderRadius,
  padding,
  hoverColor,
  maxHeight,
  zIndex,
  disabled = false,
  searchable = false,
  clearable = false,
  multiple = false,
  customButton,
  customItem,
  className,
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

    return (
      <DropdownButton
        onClick={toggleDropdown}
        bgColor={bgColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        padding={padding}
        hoverColor={hoverColor}
        style={{
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        <span>{getDisplayValue()}</span>
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </DropdownButton>
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
      <DropdownItem key={itemKey} onClick={() => handleItemClick(option)}>
        {displayValue}
      </DropdownItem>
    )
  }

  return (
    <DropdownContainer
      ref={dropdownRef}
      width={width}
      zIndex={zIndex}
      className={className}
      {...rest}
    >
      {renderButton()}

      <DropdownMenu isOpen={isOpen} maxHeight={maxHeight} zIndex={zIndex}>
        {searchable && (
          <SearchContainer>
            <SearchInput
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </SearchContainer>
        )}

        {filteredOptions.length === 0 ? (
          <DropdownItem>
            {searchTerm ? 'No matching options' : 'No options available'}
          </DropdownItem>
        ) : (
          filteredOptions.map((option, index) => renderItem(option, index))
        )}
      </DropdownMenu>
    </DropdownContainer>
  )
}
