import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../test/utils'
import { Select } from './Select'
import { ChevronDown } from 'lucide-react'

// Mock the icons
vi.mock('lucide-react', () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="chevron-down-icon" />
  ),
}))

describe('Select', () => {
  let mockOnChange: any

  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  beforeEach(() => {
    mockOnChange = vi.fn()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    it('renders with default props', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveValue('')
      expect(screen.getByText('Select...')).toBeInTheDocument()
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()
    })

    it('renders with selected value', () => {
      render(
        <Select
          value="option2"
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveValue('option2')
      expect(select).toHaveTextContent('Option 2')
    })

    it('renders with custom placeholder', () => {
      const customPlaceholder = 'Choose an option'
      render(
        <Select
          value=""
          onChange={mockOnChange}
          placeholder={customPlaceholder}
          options={mockOptions}
        />
      )

      expect(screen.getByText(customPlaceholder)).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-select-class'
      render(
        <Select
          value=""
          onChange={mockOnChange}
          className={customClass}
          options={mockOptions}
        />
      )

      const container = document.querySelector('.relative')
      expect(container).toHaveClass(customClass)
    })

    it('renders with icon', () => {
      const testIcon = <span data-testid="test-icon">🔍</span>
      render(
        <Select
          value=""
          onChange={mockOnChange}
          icon={testIcon}
          options={mockOptions}
        />
      )

      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders all options', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      // Check that all options are rendered (including the disabled placeholder)
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(4) // placeholder + 3 options

      expect(screen.getByRole('option', { name: 'Select...' })).toBeDisabled()
      expect(screen.getByRole('option', { name: 'Option 1' })).toBeEnabled()
      expect(screen.getByRole('option', { name: 'Option 2' })).toBeEnabled()
      expect(screen.getByRole('option', { name: 'Option 3' })).toBeEnabled()
    })

    it('renders with empty options array', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={[]}
        />
      )

      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(1) // only placeholder
      expect(screen.getByRole('option', { name: 'Select...' })).toBeDisabled()
    })
  })

  describe('functionality', () => {
    it('calls onChange when option is selected', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'option2' } })

      expect(mockOnChange).toHaveBeenCalledWith('option2')
    })

    it('allows changing from one value to another', () => {
      const { rerender } = render(
        <Select
          value="option1"
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveValue('option1')

      fireEvent.change(select, { target: { value: 'option3' } })
      expect(mockOnChange).toHaveBeenCalledWith('option3')
    })

    it('allows selecting the same value multiple times', () => {
      render(
        <Select
          value="option2"
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'option2' } })

      expect(mockOnChange).toHaveBeenCalledWith('option2')
    })
  })

  describe('styling and accessibility', () => {
    it('renders select with correct base classes', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveClass(
        'w-full',
        'h-8',
        'bg-white',
        'border',
        'border-[#cfd6de]',
        'rounded-md',
        'pl-3',
        'pr-8',
        'py-2',
        'font-normal',
        'text-[13px]',
        'leading-4',
        'appearance-none',
        'cursor-pointer',
        'hover:bg-gray-50',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500/20',
        'focus:border-blue-500'
      )
    })

    it('renders select with icon-adjusted padding', () => {
      const testIcon = <span>🔍</span>
      render(
        <Select
          value=""
          onChange={mockOnChange}
          icon={testIcon}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('pl-9')
      expect(select).not.toHaveClass('pl-3')
    })

    it('renders select with selected value text color', () => {
      render(
        <Select
          value="option1"
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('text-[#021337]')
      expect(select).not.toHaveClass('text-[#677187]')
    })

    it('renders select with placeholder text color when no value selected', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('text-[#677187]')
      expect(select).not.toHaveClass('text-[#021337]')
    })

    it('renders container with correct classes', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const container = document.querySelector('.relative')
      expect(container).toHaveClass('relative')
    })

    it('renders icon container with correct positioning when icon is provided', () => {
      const testIcon = <span>🔍</span>
      render(
        <Select
          value=""
          onChange={mockOnChange}
          icon={testIcon}
          options={mockOptions}
        />
      )

      const iconContainer = document.querySelector('.absolute.left-3')
      expect(iconContainer).toHaveClass(
        'absolute',
        'left-3',
        'top-1/2',
        '-translate-y-1/2',
        'pointer-events-none'
      )
    })

    it('renders chevron icon with correct positioning', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const chevronIcon = screen.getByTestId('chevron-down-icon')
      expect(chevronIcon).toHaveClass(
        'w-4',
        'h-4',
        'absolute',
        'right-3',
        'top-1/2',
        '-translate-y-1/2',
        'pointer-events-none',
        'text-[#677187]'
      )
    })

    it('does not render icon container when no icon is provided', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const iconContainer = document.querySelector('.absolute.left-3')
      expect(iconContainer).not.toBeInTheDocument()
    })

    it('renders options with correct values and labels', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const option1 = screen.getByRole('option', { name: 'Option 1' })
      const option2 = screen.getByRole('option', { name: 'Option 2' })
      const option3 = screen.getByRole('option', { name: 'Option 3' })

      expect(option1).toHaveValue('option1')
      expect(option2).toHaveValue('option2')
      expect(option3).toHaveValue('option3')
    })

    it('has correct role for accessibility', () => {
      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
      // HTML select elements automatically get the combobox role
    })
  })

  describe('edge cases', () => {
    it('handles value not in options gracefully', () => {
      render(
        <Select
          value="nonexistent"
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      const select = screen.getByRole('combobox')
      // When value is not in options, browser may show empty or first option
      // The component still accepts the value prop without crashing
      expect(select).toBeInTheDocument()
      expect(mockOnChange).not.toHaveBeenCalled()
    })

    it('handles options with duplicate values', () => {
      const duplicateOptions = [
        { value: 'same', label: 'First' },
        { value: 'same', label: 'Second' },
        { value: 'different', label: 'Third' },
      ]

      render(
        <Select
          value="same"
          onChange={mockOnChange}
          options={duplicateOptions}
        />
      )

      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(4) // placeholder + 3 options, but 2 have same value

      const sameValueOptions = options.filter(option => option.value === 'same')
      expect(sameValueOptions).toHaveLength(2)
    })

    it('handles options with empty labels', () => {
      const optionsWithEmptyLabels = [
        { value: 'empty', label: '' },
        { value: 'normal', label: 'Normal' },
      ]

      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={optionsWithEmptyLabels}
        />
      )

      const emptyOption = screen.getByRole('option', { name: '' })
      expect(emptyOption).toHaveValue('empty')
    })

    it('handles options with special characters in labels', () => {
      const specialOptions = [
        { value: 'special1', label: 'Option & Special' },
        { value: 'special2', label: 'Option "Quote"' },
        { value: 'special3', label: "Option 'Apostrophe'" },
      ]

      render(
        <Select
          value=""
          onChange={mockOnChange}
          options={specialOptions}
        />
      )

      expect(screen.getByRole('option', { name: 'Option & Special' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'Option "Quote"' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: "Option 'Apostrophe'" })).toBeInTheDocument()
    })

    it('maintains selected value when options change', () => {
      const { rerender } = render(
        <Select
          value="option1"
          onChange={mockOnChange}
          options={mockOptions}
        />
      )

      expect(screen.getByRole('combobox')).toHaveValue('option1')

      // Change options but keep the selected value
      const newOptions = [
        { value: 'option1', label: 'Updated Option 1' },
        { value: 'newoption', label: 'New Option' },
      ]

      rerender(
        <Select
          value="option1"
          onChange={mockOnChange}
          options={newOptions}
        />
      )

      expect(screen.getByRole('combobox')).toHaveValue('option1')
      expect(screen.getByText('Updated Option 1')).toBeInTheDocument()
    })
  })
})
