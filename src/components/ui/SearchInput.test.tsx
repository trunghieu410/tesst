import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import { SearchInput } from './SearchInput'

// Mock lucide-react Search icon
vi.mock('lucide-react', () => ({
  Search: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="search-icon" />
  ),
}))

describe('SearchInput', () => {
  it('renders without crashing', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with default props', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('placeholder', 'Search...')
    expect(input).toHaveValue('')
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('renders with custom value', () => {
    const handleChange = vi.fn()
    const testValue = 'test search'
    render(<SearchInput value={testValue} onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue(testValue)
  })

  it('renders with custom placeholder', () => {
    const handleChange = vi.fn()
    const customPlaceholder = 'Find something...'
    render(<SearchInput value="" onChange={handleChange} placeholder={customPlaceholder} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', customPlaceholder)
  })

  it('renders with custom className', () => {
    const handleChange = vi.fn()
    const customClass = 'custom-search-class'
    render(<SearchInput value="" onChange={handleChange} className={customClass} />)

    const container = screen.getByRole('textbox').parentElement
    expect(container).toHaveClass(customClass)
  })

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    const newValue = 'new search value'

    fireEvent.change(input, { target: { value: newValue } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(newValue)
  })

  it('renders search icon with correct styling', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)

    const icon = screen.getByTestId('search-icon')
    expect(icon).toHaveClass('w-4', 'h-4', 'text-[#677187]')
  })

  it('renders input with correct styling', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'w-full',
      'h-8',
      'bg-white',
      'border',
      'border-[#cfd6de]',
      'rounded-md',
      'pl-9',
      'pr-3',
      'py-2',
      'font-normal',
      'text-[13px]',
      'leading-4',
      'text-[#021337]',
      'placeholder:text-[#677187]',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500/20',
      'focus:border-blue-500'
    )
  })

  it('renders icon container with correct positioning', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)

    const iconContainer = screen.getByTestId('search-icon').parentElement
    expect(iconContainer).toHaveClass(
      'absolute',
      'left-3',
      'top-1/2',
      '-translate-y-1/2',
      'pointer-events-none'
    )
  })

  it('renders container with correct styling', () => {
    const handleChange = vi.fn()
    render(<SearchInput value="" onChange={handleChange} />)

    const container = screen.getByRole('textbox').parentElement
    expect(container).toHaveClass('relative')
  })

  describe('accessibility', () => {
    it('has accessible label via placeholder', () => {
      const handleChange = vi.fn()
      render(<SearchInput value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Search...')
    })

    it('supports keyboard navigation', () => {
      const handleChange = vi.fn()
      render(<SearchInput value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      input.focus()

      expect(document.activeElement).toBe(input)
    })

    it('supports screen readers with role textbox', () => {
      const handleChange = vi.fn()
      render(<SearchInput value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      expect(input.tagName.toLowerCase()).toBe('input')
      expect(input).toHaveAttribute('type', 'text')
    })
  })

  describe('controlled component behavior', () => {
    it('updates value when prop changes', () => {
      const handleChange = vi.fn()
      const { rerender } = render(<SearchInput value="initial" onChange={handleChange} />)

      expect(screen.getByRole('textbox')).toHaveValue('initial')

      rerender(<SearchInput value="updated" onChange={handleChange} />)

      expect(screen.getByRole('textbox')).toHaveValue('updated')
    })

    it('does not update internal state independently', () => {
      const handleChange = vi.fn()
      render(<SearchInput value="controlled" onChange={handleChange} />)

      const input = screen.getByRole('textbox')

      // Even if we try to change it directly, it should remain controlled
      fireEvent.change(input, { target: { value: 'uncontrolled' } })

      // The input value should still reflect the controlled prop
      expect(input).toHaveValue('controlled')
      expect(handleChange).toHaveBeenCalledWith('uncontrolled')
    })
  })

  describe('edge cases', () => {
    it('handles empty string value', () => {
      const handleChange = vi.fn()
      render(<SearchInput value="" onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('handles long placeholder text', () => {
      const handleChange = vi.fn()
      const longPlaceholder = 'This is a very long placeholder text that should still be displayed properly in the search input component'
      render(<SearchInput value="" onChange={handleChange} placeholder={longPlaceholder} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', longPlaceholder)
    })

    it('handles special characters in value', () => {
      const handleChange = vi.fn()
      const specialValue = 'Search with émojis 🎉 and spëcial chärs'
      render(<SearchInput value={specialValue} onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue(specialValue)
    })
  })
})
