import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '../test/utils'
import { CampaignLabels } from './CampaignLabels'
import { XCircleIcon } from '@/icon/XCircleIcon'
import { ChevronDownIcon } from 'lucide-react'

// Mock the icons
vi.mock('@/icon/XCircleIcon', () => ({
  XCircleIcon: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="x-circle-icon" />
  ),
}))

vi.mock('lucide-react', () => ({
  ChevronDownIcon: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="chevron-down-icon" />
  ),
}))

// Mock the useClickOutside hook
let useClickOutsideCallback: (() => void) | null = null
vi.mock('@/hooks/useClickOutside', () => ({
  default: vi.fn((callback, options) => {
    useClickOutsideCallback = callback
    const ref = { current: null }
    return ref
  }),
}))

describe('CampaignLabels', () => {
  let mockOnChange: any

  beforeEach(() => {
    mockOnChange = vi.fn()
    useClickOutsideCallback = null // Reset callback
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)
      expect(screen.getByText('Nhãn chiến dịch')).toBeInTheDocument()
    })

    it('renders with default props', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      // Check label and optional text
      expect(screen.getByText('Nhãn chiến dịch')).toBeInTheDocument()
      expect(screen.getByText('Không bắt buộc')).toBeInTheDocument()

      // Check placeholder input
      const input = screen.getByPlaceholderText('Chọn nhãn')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('readonly')

      // Check chevron icon
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument()

      // Check dropdown is closed
      expect(screen.queryByText('Hot')).not.toBeInTheDocument()
    })

    it('renders with custom props', () => {
      const customLabel = 'Custom Label'
      const customOptional = 'Optional Text'
      const customPlaceholder = 'Custom Placeholder'
      const customClass = 'custom-class'

      render(
        <CampaignLabels
          value={[]}
          onChange={mockOnChange}
          label={customLabel}
          optionalText={customOptional}
          placeholder={customPlaceholder}
          className={customClass}
        />
      )

      expect(screen.getByText(customLabel)).toBeInTheDocument()
      expect(screen.getByText(customOptional)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument()

      // Check custom class is applied
      const container = document.querySelector('.custom-class')
      expect(container).toBeInTheDocument()
    })

    it('renders with selected tags', () => {
      const selectedTags = ['Hot', 'VIP']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      // Check tags are displayed
      expect(screen.getByText('Hot')).toBeInTheDocument()
      expect(screen.getByText('VIP')).toBeInTheDocument()

      // Check remove buttons are present
      expect(screen.getAllByTestId('x-circle-icon')).toHaveLength(2)
    })

    it('renders empty when value is empty array', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      // Should not render any tag chips
      const tagContainers = document.querySelectorAll('.bg-\\[\\#e6e9ed\\]')
      expect(tagContainers).toHaveLength(0)
    })

    it('renders with custom availableTags', () => {
      const customTags = ['Custom1', 'Custom2', 'Custom3']
      render(
        <CampaignLabels
          value={[]}
          onChange={mockOnChange}
          availableTags={customTags}
        />
      )

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Check custom tags are displayed
      expect(screen.getByText('Custom1')).toBeInTheDocument()
      expect(screen.getByText('Custom2')).toBeInTheDocument()
      expect(screen.getByText('Custom3')).toBeInTheDocument()
    })
  })

  describe('dropdown behavior', () => {
    it('opens dropdown when clicked', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement

      // Initially closed
      expect(screen.queryByText('Hot')).not.toBeInTheDocument()

      // Click to open
      act(() => {
        fireEvent.click(trigger!)
      })

      // Now should be open
      expect(screen.getByText('Hot')).toBeInTheDocument()
      expect(screen.getByText('VIP')).toBeInTheDocument()
    })

    it('closes dropdown when clicked again', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement

      // Open dropdown
      act(() => {
        fireEvent.click(trigger!)
      })
      expect(screen.getByText('Hot')).toBeInTheDocument()

      // Click to close
      act(() => {
        fireEvent.click(trigger!)
      })
      expect(screen.queryByText('Hot')).not.toBeInTheDocument()
    })

    it('applies correct rotation to chevron icon when open', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      const chevronIcon = screen.getByTestId('chevron-down-icon')

      // Initially no rotation
      expect(chevronIcon).not.toHaveClass('rotate-180')

      // Open dropdown
      act(() => {
        fireEvent.click(trigger!)
      })
      expect(chevronIcon).toHaveClass('rotate-180')

      // Close dropdown
      act(() => {
        fireEvent.click(trigger!)
      })
      expect(chevronIcon).not.toHaveClass('rotate-180')
    })

    it('closes dropdown when clicking outside', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement

      // Open dropdown
      act(() => {
        fireEvent.click(trigger!)
      })
      expect(screen.getByText('Hot')).toBeInTheDocument()

      // Simulate click outside by calling the stored callback
      act(() => {
        useClickOutsideCallback?.()
      })

      expect(screen.queryByText('Hot')).not.toBeInTheDocument()
    })
  })

  describe('tag management', () => {
    it('adds tag when clicking unselected tag in dropdown', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Click on "Hot" tag
      act(() => {
        fireEvent.click(screen.getByText('Hot'))
      })

      expect(mockOnChange).toHaveBeenCalledWith(['Hot'])
    })

    it('removes tag when clicking selected tag in dropdown', () => {
      const selectedTags = ['Hot', 'VIP']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Click on "Hot" in dropdown (should remove it)
      // Find the dropdown button specifically (not the chip)
      const dropdownButtons = screen.getAllByText('Hot')
      const dropdownButton = dropdownButtons.find(button =>
        button.closest('.absolute.top-full')
      )
      act(() => {
        fireEvent.click(dropdownButton!)
      })

      expect(mockOnChange).toHaveBeenCalledWith(['VIP'])
    })

    it('removes tag when clicking X button on tag chip', () => {
      const selectedTags = ['Hot', 'VIP']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      // Find the first X button and click it
      const removeButtons = screen.getAllByTestId('x-circle-icon')
      act(() => {
        fireEvent.click(removeButtons[0].parentElement!) // Click the button containing the X icon
      })

      // Should remove "Hot" (first in array)
      expect(mockOnChange).toHaveBeenCalledWith(['VIP'])
    })

    it('removes tag when clicking on already selected tag (toggle behavior)', () => {
      const selectedTags = ['Hot']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Click on "Hot" again - should remove it (toggle behavior)
      const dropdownButtons = screen.getAllByText('Hot')
      const dropdownButton = dropdownButtons.find(button =>
        button.closest('.absolute.top-full')
      )
      act(() => {
        fireEvent.click(dropdownButton!)
      })

      // onChange should be called to remove the tag
      expect(mockOnChange).toHaveBeenCalledWith([])
    })

    it('stops event propagation when removing tag', () => {
      const selectedTags = ['Hot']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      // Click the X button - this should not open/close dropdown
      const removeButton = screen.getByTestId('x-circle-icon').parentElement!
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement

      // Click remove button
      act(() => {
        fireEvent.click(removeButton)
      })

      // Dropdown should still be closed (no toggle)
      expect(screen.queryByText('VIP')).not.toBeInTheDocument()
    })

    it('keeps dropdown open when adding/removing tags', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })
      expect(screen.getByText('Hot')).toBeInTheDocument()

      // Add a tag - dropdown should stay open
      act(() => {
        fireEvent.click(screen.getByText('Hot'))
      })
      expect(screen.getByText('VIP')).toBeInTheDocument() // Dropdown still open

      // Remove the tag - dropdown should stay open
      act(() => {
        fireEvent.click(screen.getByText('Hot'))
      })
      expect(screen.getByText('VIP')).toBeInTheDocument() // Dropdown still open
    })
  })

  describe('styling and accessibility', () => {
    it('renders selected tags with correct styling', () => {
      const selectedTags = ['Hot']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      const tagContainer = document.querySelector('.bg-\\[\\#e6e9ed\\]')
      expect(tagContainer).toHaveClass('bg-[#e6e9ed]', 'rounded', 'px-1.5', 'h-5', 'flex', 'items-center', 'gap-1')
    })

    it('renders dropdown items with correct styling', () => {
      const selectedTags = ['Hot']
      render(<CampaignLabels value={selectedTags} onChange={mockOnChange} />)

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Check selected item has red background - find dropdown button specifically
      const hotButtons = screen.getAllByText('Hot')
      const selectedDropdownButton = hotButtons.find(button =>
        button.closest('.absolute.top-full')
      )
      expect(selectedDropdownButton).toHaveClass('bg-[#ff3131]', 'text-white')

      // Check unselected item has default styling - find dropdown button specifically
      const vipButtons = screen.getAllByText('VIP')
      const unselectedDropdownButton = vipButtons.find(button =>
        button.closest('.absolute.top-full')
      )
      expect(unselectedDropdownButton).toHaveClass('text-[#021337]')
      expect(unselectedDropdownButton).not.toHaveClass('bg-[#ff3131]')
    })

    it('renders main container with correct base classes', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const mainContainer = document.querySelector('.flex.flex-col.gap-1')
      expect(mainContainer).toHaveClass('flex', 'flex-col', 'gap-1')
    })

    it('renders trigger area with correct styling', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const triggerArea = document.querySelector('.bg-white.border.border-\\[\\#cfd6de\\]')
      expect(triggerArea).toHaveClass(
        'bg-white',
        'border',
        'border-[#cfd6de]',
        'rounded-md',
        'px-2.5',
        'py-0',
        'flex',
        'items-center',
        'gap-2.5',
        'cursor-pointer'
      )
    })

    it('renders dropdown with correct styling', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      const dropdown = document.querySelector('.absolute.top-full')
      expect(dropdown).toHaveClass(
        'absolute',
        'top-full',
        'left-0',
        'right-0',
        'mt-1',
        'bg-white',
        'border',
        'border-[#cfd6de]',
        'rounded-md',
        'shadow-lg',
        'z-10',
        'max-h-48',
        'overflow-y-auto'
      )
    })

    it('renders label with correct typography', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const label = screen.getByText('Nhãn chiến dịch')
      expect(label).toHaveClass('font-medium', 'text-xs', 'leading-4', 'text-[#021337]')
    })

    it('renders optional text with correct typography', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const optionalText = screen.getByText('Không bắt buộc')
      expect(optionalText).toHaveClass('font-normal', 'text-xs', 'leading-4', 'text-[#677187]')
    })

    it('renders input with correct styling', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const input = screen.getByPlaceholderText('Chọn nhãn')
      expect(input).toHaveClass(
        'flex-1',
        'py-2',
        'text-[13px]',
        'leading-4',
        'text-[#021337]',
        'placeholder:text-[#677187]',
        'focus:outline-none',
        'cursor-pointer'
      )
    })

    it('has correct structure with label section and input section', () => {
      render(<CampaignLabels value={[]} onChange={mockOnChange} />)

      const mainContainer = document.querySelector('.flex.flex-col.gap-1')
      const labelSection = mainContainer?.children[0]
      const inputSection = mainContainer?.children[1]

      expect(labelSection).toHaveClass('flex', 'items-center', 'gap-2')
      expect(inputSection).toHaveClass('relative')
    })
  })

  describe('edge cases', () => {
    it('handles empty availableTags array', () => {
      render(
        <CampaignLabels
          value={[]}
          onChange={mockOnChange}
          availableTags={[]}
        />
      )

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Should not render any dropdown items
      const dropdownItems = document.querySelectorAll('button')
      const triggerButtons = document.querySelectorAll('.cursor-pointer button')
      expect(dropdownItems.length - triggerButtons.length).toBe(0)
    })

    it('handles undefined availableTags (falls back to default)', () => {
      render(
        <CampaignLabels
          value={[]}
          onChange={mockOnChange}
          availableTags={undefined as any}
        />
      )

      // Open dropdown
      const trigger = screen.getByPlaceholderText('Chọn nhãn').parentElement
      act(() => {
        fireEvent.click(trigger!)
      })

      // Should show default tags
      expect(screen.getByText('Hot')).toBeInTheDocument()
      expect(screen.getByText('VIP')).toBeInTheDocument()
    })

    it('handles undefined value prop (defaults to empty array)', () => {
      render(<CampaignLabels value={undefined as any} onChange={mockOnChange} />)

      // Should render empty
      const tagContainers = document.querySelectorAll('.bg-\\[\\#e6e9ed\\]')
      expect(tagContainers).toHaveLength(0)
    })
  })
})
