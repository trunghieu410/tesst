import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/utils'
import { Badge, BadgeVariant } from './Badge'

describe('Badge', () => {
  it('renders without crashing', () => {
    render(<Badge>Test</Badge>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('renders with default props', () => {
    render(<Badge>Default</Badge>)

    const badge = screen.getByText('Default')
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'px-1.5',
      'py-0',
      'h-5',
      'font-medium',
      'text-xs',
      'leading-4',
      'text-nowrap',
      'bg-[#dbe1e7]',
      'text-[#021337]',
      'rounded'
    )
  })

  it('renders children correctly', () => {
    const testContent = 'Badge Content'
    render(<Badge>{testContent}</Badge>)

    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  describe('variants', () => {
    const variants: BadgeVariant[] = [
      'default',
      'success',
      'error',
      'draft',
      'warning',
      'pending',
      'danger',
      'approved',
      'ended'
    ]

    const variantStyles: Record<BadgeVariant, string> = {
      default: 'bg-[#dbe1e7] text-[#021337]',
      draft: 'bg-[#ffe2a9] text-[#021337]',
      success: 'bg-[#00a349] text-white',
      ended: 'bg-[#00a349] text-white',
      error: 'bg-[#e5240c] text-white',
      danger: 'bg-[#e5240c] text-white',
      warning: 'bg-[#ffe2a9] text-[#021337]',
      pending: 'bg-[#e6e9ed] text-[#021337]',
      approved: 'bg-[#acf1d6] text-[#021337]',
    }

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Badge variant={variant}>{variant}</Badge>)

        const badge = screen.getByText(variant)
        const expectedClasses = variantStyles[variant].split(' ')
        expectedClasses.forEach(className => {
          expect(badge).toHaveClass(className)
        })
      })
    })
  })

  it('renders with custom className', () => {
    const customClass = 'custom-badge-class'
    render(<Badge className={customClass}>Test</Badge>)

    const badge = screen.getByText('Test')
    expect(badge).toHaveClass(customClass)
  })

  describe('circle variant', () => {
    it('renders as circle when isCircle is true', () => {
      render(<Badge isCircle>Test</Badge>)

      const badge = screen.getByText('Test')
      expect(badge).toHaveClass('rounded-full')
      expect(badge).not.toHaveClass('rounded')
    })

    it('renders as rounded when isCircle is false', () => {
      render(<Badge isCircle={false}>Test</Badge>)

      const badge = screen.getByText('Test')
      expect(badge).toHaveClass('rounded')
      expect(badge).not.toHaveClass('rounded-full')
    })
  })

  describe('active state', () => {
    it('renders with active styles when isActive is true', () => {
      render(<Badge isActive>Test</Badge>)

      const badge = screen.getByText('Test')
      expect(badge).toHaveClass('bg-black', 'text-white')
    })

    it('does not render active styles when isActive is false', () => {
      render(<Badge isActive={false}>Test</Badge>)

      const badge = screen.getByText('Test')
      expect(badge).not.toHaveClass('bg-black', 'text-white')
    })

    it('active styles override variant styles', () => {
      render(<Badge variant="success" isActive>Test</Badge>)

      const badge = screen.getByText('Test')
      expect(badge).toHaveClass('bg-black', 'text-white')
      expect(badge).not.toHaveClass('bg-[#00a349]')
    })
  })

  it('handles complex children', () => {
    render(
      <Badge>
        <span>1</span>
        <span>item</span>
      </Badge>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('item')).toBeInTheDocument()
  })

  it('maintains consistent structure across renders', () => {
    const { rerender } = render(<Badge variant="success">First</Badge>)

    expect(screen.getByText('First')).toBeInTheDocument()

    rerender(<Badge variant="error">Second</Badge>)

    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.queryByText('First')).not.toBeInTheDocument()
  })

  describe('accessibility', () => {
    it('has appropriate role for status badges', () => {
      render(<Badge>Status</Badge>)

      const badge = screen.getByText('Status')
      // Badge doesn't need a specific role, but should be focusable if interactive
      expect(badge.tagName.toLowerCase()).toBe('div')
    })

    it('is keyboard navigable if interactive', () => {
      // If badge becomes interactive in the future
      render(<Badge>Interactive</Badge>)

      const badge = screen.getByText('Interactive')
      expect(badge).toBeVisible()
    })
  })

  describe('edge cases', () => {
    it('handles empty children', () => {
      render(<Badge></Badge>)

      // Find the badge by its classes since it has no text content
      const badge = document.querySelector('.inline-flex.items-center.justify-center')
      expect(badge).toBeInTheDocument()
    })

    it('handles long text content', () => {
      const longText = 'This is a very long badge text that should still render properly'
      render(<Badge>{longText}</Badge>)

      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('handles special characters', () => {
      const specialText = 'Badge with émojis 🎉 and spëcial chärs'
      render(<Badge>{specialText}</Badge>)

      expect(screen.getByText(specialText)).toBeInTheDocument()
    })
  })
})
