import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '../../test/utils'
import { Dropdown } from './Dropdown'
import { ChevronDown } from 'lucide-react'

// Mock the icons
vi.mock('lucide-react', () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="chevron-down-icon" />
  ),
}))

// Mock the Button component
vi.mock('./Button', () => ({
  Button: ({
    children,
    variant,
    size,
    onClick,
    disabled,
    className,
    rightIcon,
    ...props
  }: any) => (
    <button
      data-testid={variant === 'outline' ? 'dropdown-trigger' : 'dropdown-option'}
      data-variant={variant}
      data-size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
      {rightIcon && <span data-testid="right-icon">{rightIcon}</span>}
    </button>
  ),
}))

// Mock the useClickOutside hook
let useClickOutsideCallback: (() => void) | null = null
vi.mock('@/hooks/useClickOutside', () => ({
  default: vi.fn((callback) => {
    useClickOutsideCallback = callback
    return { current: null }
  }),
}))

describe('Dropdown', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  let mockOnChange: any

  beforeEach(() => {
    mockOnChange = vi.fn()
    useClickOutsideCallback = null
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
    })

    it('renders with default props', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      expect(button).toHaveTextContent('Select...')
      expect(button).toHaveAttribute('data-variant', 'outline')
      expect(button).toHaveAttribute('data-size', 'sm')
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()
    })

    it('renders with selected value', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      )

      // Check that the trigger shows the selected value
      const trigger = screen.getByTestId('dropdown-trigger')
      expect(trigger).toHaveTextContent('Option 2')
    })

    it('renders with custom placeholder', () => {
      const customPlaceholder = 'Choose an option'
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          placeholder={customPlaceholder}
        />
      )

      expect(screen.getByText(customPlaceholder)).toBeInTheDocument()
    })

    it('renders with custom children', () => {
      const customContent = 'Custom Trigger'
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        >
          {customContent}
        </Dropdown>
      )

      expect(screen.getByText(customContent)).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-dropdown-class'
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          className={customClass}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      expect(button).toHaveClass(customClass)
    })

    it('renders as disabled when disabled prop is true', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          disabled={true}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      expect(button).toBeDisabled()
    })
  })

  describe('dropdown behavior', () => {
    it('opens dropdown when button is clicked', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      // Initially closed - check dropdown has invisible class
      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('invisible', 'opacity-0')

      // Click to open
      act(() => {
        fireEvent.click(button)
      })

      // Should be open - check dropdown has visible class
      expect(dropdown).toHaveClass('visible', 'opacity-100')
      expect(dropdown).not.toHaveClass('invisible', 'opacity-0')
    })

    it('closes dropdown when button is clicked again', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      // Open dropdown
      act(() => {
        fireEvent.click(button)
      })
      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('visible', 'opacity-100')

      // Click again to close
      act(() => {
        fireEvent.click(button)
      })
      expect(dropdown).toHaveClass('invisible', 'opacity-0')
    })

    it('does not open dropdown when disabled', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
          disabled={true}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      act(() => {
        fireEvent.click(button)
      })

      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('invisible', 'opacity-0')
    })

    it('closes dropdown when clicking outside', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      // Open dropdown
      act(() => {
        fireEvent.click(button)
      })
      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('visible', 'opacity-100')

      // Simulate click outside
      act(() => {
        useClickOutsideCallback?.()
      })

      expect(dropdown).toHaveClass('invisible', 'opacity-0')
    })
  })

  describe('option selection', () => {
    it('calls onChange and closes dropdown when option is selected', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      // Open dropdown
      act(() => {
        fireEvent.click(button)
      })

      // Click on option
      act(() => {
        fireEvent.click(screen.getByText('Option 2'))
      })

      expect(mockOnChange).toHaveBeenCalledWith('option2')

      // Dropdown should be closed
      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('invisible', 'opacity-0')
    })

    it('closes dropdown even when selecting the same option', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      // Open dropdown
      act(() => {
        fireEvent.click(button)
      })

      // Click on already selected option (the dropdown option, not the trigger)
      const optionButtons = screen.getAllByText('Option 2')
      const dropdownOption = optionButtons.find(button =>
        button.closest('.absolute.right-0')
      )
      act(() => {
        fireEvent.click(dropdownOption!)
      })

      expect(mockOnChange).toHaveBeenCalledWith('option2')

      // Dropdown should be closed
      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('invisible', 'opacity-0')
    })

    it('allows selecting different options sequentially', () => {
      const { rerender } = render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')

      // Select first option
      act(() => {
        fireEvent.click(button)
      })
      act(() => {
        fireEvent.click(screen.getByText('Option 1'))
      })
      expect(mockOnChange).toHaveBeenCalledWith('option1')

      // Re-render with new value
      rerender(
        <Dropdown
          options={mockOptions}
          value="option1"
          onChange={mockOnChange}
        />
      )

      // Select second option
      const optionButtons = screen.getAllByTestId('dropdown-option')
      const option2Button = optionButtons.find(button => button.textContent === 'Option 2')
      act(() => {
        fireEvent.click(option2Button!)
      })
      expect(mockOnChange).toHaveBeenCalledWith('option2')
    })
  })

  describe('styling and accessibility', () => {
    it('applies correct rotation to chevron icon when open', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const chevronIcon = screen.getByTestId('chevron-down-icon')

      // Initially no rotation
      expect(chevronIcon).not.toHaveClass('rotate-180')

      // Open dropdown
      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })
      expect(chevronIcon).toHaveClass('rotate-180')

      // Close dropdown
      act(() => {
        fireEvent.click(button)
      })
      expect(chevronIcon).not.toHaveClass('rotate-180')
    })

    it('renders dropdown menu with correct base classes', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass(
        'absolute',
        'right-0',
        'mt-1',
        'w-48',
        'bg-white',
        'rounded-lg',
        'shadow-lg',
        'border',
        'border-gray-200',
        'py-1',
        'z-50',
        'transition-all',
        'duration-200'
      )
    })

    it('renders dropdown menu with correct visibility classes when open', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('top-full', 'opacity-100', 'visible')
      expect(dropdown).not.toHaveClass('top-[110%]', 'invisible', 'opacity-0')
    })

    it('renders dropdown menu with correct visibility classes when closed', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown).toHaveClass('top-[110%]', 'invisible', 'opacity-0')
      expect(dropdown).not.toHaveClass('top-full', 'opacity-100', 'visible')
    })

    it('renders selected option with correct styling', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      // Find the selected option button (Option 2)
      const optionButtons = screen.getAllByTestId('dropdown-option')
      const selectedOption = optionButtons.find(button =>
        button.textContent?.includes('Option 2')
      )
      expect(selectedOption).toHaveClass('bg-[#ff3131]!', 'text-white')
    })

    it('renders unselected options with default styling', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      // Find unselected option buttons
      const optionButtons = screen.getAllByTestId('dropdown-option')
      const unselectedOption = optionButtons.find(button =>
        button.textContent?.includes('Option 1')
      )
      expect(unselectedOption).not.toHaveClass('bg-[#ff3131]!')
      expect(unselectedOption).toHaveClass('hover:bg-[#f1caca]')
    })

    it('renders trigger button with correct base classes', () => {
      render(
        <Dropdown
          options={mockOptions}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      expect(button).toHaveClass(
        'justify-between',
        'min-w-[120px]',
        'bg-white',
        'border-[#cfd6de]',
        'text-[#021337]',
        'hover:bg-gray-50'
      )
    })
  })

  describe('edge cases', () => {
    it('handles empty options array', () => {
      render(
        <Dropdown
          options={[]}
          value=""
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      // Should not crash, just show empty dropdown
      const dropdown = document.querySelector('.absolute.right-0')
      expect(dropdown?.children).toHaveLength(0)
    })

    it('handles value not found in options', () => {
      render(
        <Dropdown
          options={mockOptions}
          value="nonexistent"
          onChange={mockOnChange}
        />
      )

      // Should show placeholder when value not found
      expect(screen.getByText('Select...')).toBeInTheDocument()
    })

    it('handles options with duplicate values', () => {
      const duplicateOptions = [
        { value: 'same', label: 'First' },
        { value: 'same', label: 'Second' },
        { value: 'different', label: 'Third' },
      ]

      render(
        <Dropdown
          options={duplicateOptions}
          value="same"
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      // Should handle duplicate values - both "First" options should be selected
      const firstButtons = screen.getAllByText('First')
      expect(firstButtons).toHaveLength(2) // Both options with value "same" show "First"
      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByText('Third')).toBeInTheDocument()
    })

    it('handles options with empty labels', () => {
      const optionsWithEmptyLabels = [
        { value: 'empty', label: '' },
        { value: 'normal', label: 'Normal' },
      ]

      render(
        <Dropdown
          options={optionsWithEmptyLabels}
          value="empty"
          onChange={mockOnChange}
        />
      )

      const button = screen.getByTestId('dropdown-trigger')
      act(() => {
        fireEvent.click(button)
      })

      // Empty label should still be selectable
      const optionButtons = screen.getAllByTestId('dropdown-option')
      const emptyOption = optionButtons.find(button => button.textContent === '')
      expect(emptyOption).toBeInTheDocument()
    })
  })
})
