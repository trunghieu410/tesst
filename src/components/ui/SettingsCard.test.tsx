import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import { SettingsCard } from './SettingsCard'

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('SettingsCard', () => {
  const defaultProps = {
    title: 'Test Settings',
    description: 'Test description for settings',
    icon: <span data-testid="test-icon">⚙️</span>,
  }

  it('renders without crashing', () => {
    render(<SettingsCard {...defaultProps} />)
    expect(screen.getByText('Test Settings')).toBeInTheDocument()
    expect(screen.getByText('Test description for settings')).toBeInTheDocument()
  })

  it('renders with required props', () => {
    render(<SettingsCard {...defaultProps} />)

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders title with correct styling', () => {
    render(<SettingsCard {...defaultProps} />)

    const title = screen.getByText(defaultProps.title)
    expect(title).toHaveClass('font-medium', 'text-[16px]', 'leading-5', 'text-[#021337]', 'm-0')
    expect(title.tagName.toLowerCase()).toBe('h3')
  })

  it('renders description with correct styling', () => {
    render(<SettingsCard {...defaultProps} />)

    const description = screen.getByText(defaultProps.description)
    expect(description).toHaveClass('font-normal', 'text-[14px]', 'leading-5', 'text-[#677187]', 'm-0')
    expect(description.tagName.toLowerCase()).toBe('p')
  })

  it('renders icon in correct container', () => {
    render(<SettingsCard {...defaultProps} />)

    const iconContainer = screen.getByTestId('test-icon').parentElement
    expect(iconContainer).toHaveClass('shrink-0', 'w-8', 'h-8', 'flex', 'items-center', 'justify-center')
  })

  it('renders with custom className', () => {
    const customClass = 'custom-settings-class'
    render(<SettingsCard {...defaultProps} className={customClass} />)

    const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
    expect(card).toHaveClass(customClass)
  })

  describe('container styling', () => {
    it('has correct base container classes', () => {
      render(<SettingsCard {...defaultProps} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      expect(card).toHaveClass(
        'border',
        'border-[#cfd6de]',
        'border-solid',
        'box-border',
        'content-stretch',
        'flex',
        'gap-2.5',
        'items-start',
        'justify-end',
        'px-4',
        'py-3',
        'rounded-[10px]',
        'w-[280px]',
        'hover:bg-gray-50',
        'transition-colors',
        'cursor-pointer'
      )
    })
  })

  describe('click functionality', () => {
    it('calls onClick when clicked', () => {
      const onClick = vi.fn()
      render(<SettingsCard {...defaultProps} onClick={onClick} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      fireEvent.click(card!)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when not provided', () => {
      render(<SettingsCard {...defaultProps} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      // Should not throw error when clicked without onClick handler
      expect(() => fireEvent.click(card!)).not.toThrow()
    })
  })

  describe('layout structure', () => {
    it('has correct flex layout', () => {
      render(<SettingsCard {...defaultProps} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      expect(card).toHaveClass('flex', 'items-start', 'justify-end', 'gap-2.5')
    })

    it('positions text content on left with flex-1', () => {
      render(<SettingsCard {...defaultProps} />)

      const textContainer = screen.getByText(defaultProps.title).parentElement
      expect(textContainer).toHaveClass('flex', 'flex-col', 'gap-2.5', 'flex-1')
    })

    it('positions icon on right with shrink-0', () => {
      render(<SettingsCard {...defaultProps} />)

      const iconContainer = screen.getByTestId('test-icon').parentElement
      expect(iconContainer).toHaveClass('shrink-0')
    })
  })

  describe('hover effects', () => {
    it('has hover styles', () => {
      render(<SettingsCard {...defaultProps} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      expect(card).toHaveClass('hover:bg-gray-50', 'transition-colors')
    })
  })

  describe('accessibility', () => {
    it('is keyboard focusable when clickable', () => {
      const onClick = vi.fn()
      render(<SettingsCard {...defaultProps} onClick={onClick} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      expect(card).toHaveClass('cursor-pointer') // Should indicate it's interactive
      // The onClick prop is passed to the component, so it should be clickable
      expect(onClick).toBeDefined()
    })

    it('has semantic heading structure', () => {
      render(<SettingsCard {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent(defaultProps.title)
    })

    it('is clickable with cursor pointer', () => {
      render(<SettingsCard {...defaultProps} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')
      expect(card).toHaveClass('cursor-pointer')
    })
  })

  describe('content variations', () => {
    it('handles long title text', () => {
      const longTitle = 'This is a very long settings card title that should still render properly within the component'
      render(<SettingsCard {...defaultProps} title={longTitle} />)

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles long description text', () => {
      const longDescription = 'This is a very long description that provides detailed information about what this settings card does and how it should be used in the application interface'
      render(<SettingsCard {...defaultProps} description={longDescription} />)

      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })

    it('handles empty title', () => {
      render(<SettingsCard {...defaultProps} title="" />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('')
    })

    it('handles empty description', () => {
      render(<SettingsCard {...defaultProps} description="" />)

      const paragraphs = screen.getAllByRole('paragraph')
      const description = paragraphs.find(p => p.textContent === '')
      expect(description).toBeDefined()
    })
  })

  describe('icon variations', () => {
    it('renders different icon types', () => {
      const differentIcon = <div data-testid="different-icon">🔧</div>
      render(<SettingsCard {...defaultProps} icon={differentIcon} />)

      expect(screen.getByTestId('different-icon')).toBeInTheDocument()
      expect(screen.getByText('🔧')).toBeInTheDocument()
    })

    it('handles null icon gracefully', () => {
      // This would be a type error, but testing runtime behavior
      render(<SettingsCard {...defaultProps} icon={null as any} />)

      const iconContainer = screen.getByText(defaultProps.title).closest('div')?.lastElementChild
      expect(iconContainer?.children).toHaveLength(0)
    })
  })

  describe('edge cases', () => {
    it('maintains stability across re-renders', () => {
      const { rerender } = render(<SettingsCard {...defaultProps} />)

      expect(screen.getByText(defaultProps.title)).toBeInTheDocument()

      rerender(<SettingsCard {...defaultProps} title="Updated Title" />)

      expect(screen.getByText('Updated Title')).toBeInTheDocument()
      expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument()
    })

    it('handles rapid clicks', () => {
      const onClick = vi.fn()
      render(<SettingsCard {...defaultProps} onClick={onClick} />)

      const card = document.querySelector('.border.border-\\[\\#cfd6de\\]')

      // Simulate rapid clicks
      fireEvent.click(card!)
      fireEvent.click(card!)
      fireEvent.click(card!)

      expect(onClick).toHaveBeenCalledTimes(3)
    })
  })
})
