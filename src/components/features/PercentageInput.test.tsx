import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import { PercentageInput } from './PercentageInput'

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('PercentageInput', () => {
  it('renders without crashing', () => {
    const handleChange = vi.fn()
    render(
      <PercentageInput
        label="Test Label"
        description="Test Description"
        value=""
        onChange={handleChange}
      />
    )
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders with required props', () => {
    const handleChange = vi.fn()
    render(
      <PercentageInput
        label="Percentage"
        description="Enter percentage value"
        value="25"
        onChange={handleChange}
      />
    )

    expect(screen.getByText('Percentage')).toBeInTheDocument()
    expect(screen.getByText('Enter percentage value')).toBeInTheDocument()
    expect(screen.getByDisplayValue('25')).toBeInTheDocument()
    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('renders label correctly', () => {
    const handleChange = vi.fn()
    const labelText = 'Discount Percentage'
    render(
      <PercentageInput
        label={labelText}
        description="Test"
        value=""
        onChange={handleChange}
      />
    )

    const label = screen.getByText(labelText)
    expect(label).toHaveClass('text-sm', 'font-normal', 'text-[#021337]', 'leading-4', 'whitespace-nowrap')
  })

  it('renders description correctly', () => {
    const handleChange = vi.fn()
    const descriptionText = 'This is a description for the percentage input'
    render(
      <PercentageInput
        label="Test"
        description={descriptionText}
        value=""
        onChange={handleChange}
      />
    )

    const description = screen.getByText(descriptionText)
    expect(description).toHaveClass('text-sm', 'font-normal', 'text-[#677187]', 'leading-4')
  })

  it('renders input with correct value', () => {
    const handleChange = vi.fn()
    const testValue = '42.5'
    render(
      <PercentageInput
        label="Test"
        description="Test"
        value={testValue}
        onChange={handleChange}
      />
    )

    const input = screen.getByDisplayValue(testValue)
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveValue(testValue)
  })

  it('renders percentage symbol', () => {
    const handleChange = vi.fn()
    render(
      <PercentageInput
        label="Test"
        description="Test"
        value=""
        onChange={handleChange}
      />
    )

    expect(screen.getByText('%')).toBeInTheDocument()
  })

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn()
    render(
      <PercentageInput
        label="Test"
        description="Test"
        value=""
        onChange={handleChange}
      />
    )

    const input = screen.getByRole('textbox')
    const newValue = '75'

    fireEvent.change(input, { target: { value: newValue } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(newValue)
  })

  it('renders with custom className', () => {
    const handleChange = vi.fn()
    const customClass = 'custom-percentage-input'
    const uniqueLabel = 'Unique Label for Test'
    render(
      <PercentageInput
        label={uniqueLabel}
        description="Test description"
        value=""
        onChange={handleChange}
        className={customClass}
      />
    )

    // Find the main container by the custom class
    const container = document.querySelector(`.${customClass}`)
    expect(container).toHaveClass(customClass)
  })

  it('renders input with correct styling', () => {
    const handleChange = vi.fn()
    render(
      <PercentageInput
        label="Test"
        description="Test"
        value=""
        onChange={handleChange}
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'flex-1',
      'text-sm',
      'font-normal',
      'text-[#021337]',
      'bg-transparent',
      'border-0',
      'outline-none'
    )
  })

  it('renders input container with correct styling', () => {
    const handleChange = vi.fn()
    render(
      <PercentageInput
        label="Test"
        description="Test"
        value=""
        onChange={handleChange}
      />
    )

    const inputContainer = screen.getByRole('textbox').parentElement
    expect(inputContainer).toHaveClass(
      'bg-white',
      'border',
      'border-[#cfd6de]',
      'rounded-lg',
      'h-10',
      'flex',
      'items-center',
      'px-3',
      'gap-2'
    )
  })

  it('renders main container with correct styling', () => {
    const handleChange = vi.fn()
    const uniqueLabel = 'Main Container Test Label'
    render(
      <PercentageInput
        label={uniqueLabel}
        description="Test description"
        value=""
        onChange={handleChange}
      />
    )

    // Find the main container by its border classes
    const mainContainer = document.querySelector('.border-b.border-\\[\\#cfd6de\\]')
    expect(mainContainer).toHaveClass(
      'border-b',
      'border-[#cfd6de]',
      'border-solid',
      'flex',
      'items-start',
      'p-4',
      'w-full',
      'gap-7'
    )
  })

  describe('layout structure', () => {
    it('has correct layout with label/description on left and input on right', () => {
      const handleChange = vi.fn()
      const uniqueLabel = 'Layout Test Label'
      render(
        <PercentageInput
          label={uniqueLabel}
          description="Description"
          value=""
          onChange={handleChange}
        />
      )

      const mainContainer = document.querySelector('.border-b.border-\\[\\#cfd6de\\]')
      expect(mainContainer).toHaveClass('flex', 'items-start', 'gap-7')

      // Label section should be flex-1
      const labelSection = screen.getByText(uniqueLabel).parentElement?.parentElement
      expect(labelSection).toHaveClass('flex-1', 'min-w-0')

      // Input section should be w-40 flex-shrink-0
      const inputSection = screen.getByRole('textbox').parentElement?.parentElement
      expect(inputSection).toHaveClass('w-40', 'flex-shrink-0')
    })

    it('positions percentage symbol before input', () => {
      const handleChange = vi.fn()
      render(
        <PercentageInput
          label="Test"
          description="Test"
          value=""
          onChange={handleChange}
        />
      )

      const inputContainer = screen.getByRole('textbox').parentElement
      const percentSymbol = screen.getByText('%')

      // Check that % comes before input in the DOM
      expect(inputContainer?.contains(percentSymbol)).toBe(true)
      expect(inputContainer?.contains(screen.getByRole('textbox'))).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('renders input as accessible textbox', () => {
      const handleChange = vi.fn()
      render(
        <PercentageInput
          label="Test Label"
          description="Test Description"
          value=""
          onChange={handleChange}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('input is focusable', () => {
      const handleChange = vi.fn()
      render(
        <PercentageInput
          label="Test"
          description="Test"
          value=""
          onChange={handleChange}
        />
      )

      const input = screen.getByRole('textbox')
      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('controlled component behavior', () => {
    it('updates value when prop changes', () => {
      const handleChange = vi.fn()
      const { rerender } = render(
        <PercentageInput
          label="Test"
          description="Test"
          value="10"
          onChange={handleChange}
        />
      )

      expect(screen.getByRole('textbox')).toHaveValue('10')

      rerender(
        <PercentageInput
          label="Test"
          description="Test"
          value="20"
          onChange={handleChange}
        />
      )

      expect(screen.getByRole('textbox')).toHaveValue('20')
    })

    it('does not update internal state independently', () => {
      const handleChange = vi.fn()
      render(
        <PercentageInput
          label="Test"
          description="Test"
          value="controlled"
          onChange={handleChange}
        />
      )

      const input = screen.getByRole('textbox')

      fireEvent.change(input, { target: { value: 'uncontrolled' } })

      expect(input).toHaveValue('controlled')
      expect(handleChange).toHaveBeenCalledWith('uncontrolled')
    })
  })

  describe('edge cases', () => {
    it('handles empty values', () => {
      const handleChange = vi.fn()
      render(
        <PercentageInput
          label="Test"
          description="Test"
          value=""
          onChange={handleChange}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('handles long text content', () => {
      const handleChange = vi.fn()
      const longLabel = 'This is a very long label that should still render properly'
      const longDescription = 'This is a very long description that provides detailed information about what this percentage input does and how it should be used in the application interface'

      render(
        <PercentageInput
          label={longLabel}
          description={longDescription}
          value=""
          onChange={handleChange}
        />
      )

      expect(screen.getByText(longLabel)).toBeInTheDocument()
      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })

    it('handles special characters in content', () => {
      const handleChange = vi.fn()
      const specialLabel = 'Percentage (0-100%)'
      const specialDescription = 'Enter a value between 0% and 100%'

      render(
        <PercentageInput
          label={specialLabel}
          description={specialDescription}
          value="75%"
          onChange={handleChange}
        />
      )

      expect(screen.getByText(specialLabel)).toBeInTheDocument()
      expect(screen.getByText(specialDescription)).toBeInTheDocument()
      expect(screen.getByDisplayValue('75%')).toBeInTheDocument()
    })

    it('maintains stability across re-renders', () => {
      const handleChange = vi.fn()
      const { rerender } = render(
        <PercentageInput
          label="First"
          description="First desc"
          value="10"
          onChange={handleChange}
        />
      )

      expect(screen.getByText('First')).toBeInTheDocument()
      expect(screen.getByDisplayValue('10')).toBeInTheDocument()

      rerender(
        <PercentageInput
          label="Second"
          description="Second desc"
          value="20"
          onChange={handleChange}
        />
      )

      expect(screen.getByText('Second')).toBeInTheDocument()
      expect(screen.getByDisplayValue('20')).toBeInTheDocument()
      expect(screen.queryByText('First')).not.toBeInTheDocument()
    })
  })
})
