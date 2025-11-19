import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../test/utils'
import { Button } from './Button'

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('renders with default props', () => {
    render(<Button>Default Button</Button>)

    const button = screen.getByRole('button', { name: /default button/i })
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'cursor-pointer',
      'h-10',
      'px-4',
      'text-sm',
      'bg-[#0066ff]',
      'text-white',
      'rounded',
      'hover:bg-[#0052cc]',
      'focus-visible:ring-[#0066ff]'
    )
  })

  it('renders children correctly', () => {
    const buttonText = 'Submit Form'
    render(<Button>{buttonText}</Button>)

    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
  })

  describe('variants', () => {
    const variants = ['primary', 'secondary', 'danger', 'success', 'ghost', 'outline', 'tab'] as const

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant}>{variant} Button</Button>)

        const button = screen.getByRole('button', { name: new RegExp(variant, 'i') })
        expect(button).toBeInTheDocument()

        // Basic structure check - detailed variant styles are tested via className
        expect(button).toHaveAttribute('type', 'button')
      })
    })
  })

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size}>{size} Button</Button>)

        const button = screen.getByRole('button', { name: new RegExp(size, 'i') })
        expect(button).toBeInTheDocument()
      })
    })

    it('applies correct size classes for non-tab variants', () => {
      render(<Button size="sm">Small</Button>)

      const button = screen.getByRole('button', { name: /small/i })
      expect(button).toHaveClass('h-8', 'px-3', 'text-[13px]', 'leading-4')
    })

    it('does not apply size classes for tab variant', () => {
      render(<Button variant="tab" size="lg">Tab Button</Button>)

      const button = screen.getByRole('button', { name: /tab button/i })
      expect(button).not.toHaveClass('h-12', 'px-6', 'text-base')
    })
  })

  describe('loading state', () => {
    it('shows loading spinner and text when isLoading is true', () => {
      render(<Button isLoading>Save</Button>)

      expect(screen.getByText('Loading...')).toBeInTheDocument()

      // Check for spinner (animated div)
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('w-4', 'h-4', 'border-2', 'border-current', 'border-t-transparent', 'rounded-full')
    })

    it('hides children when loading', () => {
      render(<Button isLoading>Save Changes</Button>)

      expect(screen.queryByText('Save Changes')).not.toBeInTheDocument()
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('disables button when loading', () => {
      render(<Button isLoading>Save</Button>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('icons', () => {
    it('renders left icon correctly', () => {
      const leftIcon = <span data-testid="left-icon">←</span>
      render(<Button leftIcon={leftIcon}>With Left Icon</Button>)

      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByText('←')).toBeInTheDocument()
    })

    it('renders right icon correctly', () => {
      const rightIcon = <span data-testid="right-icon">→</span>
      render(<Button rightIcon={rightIcon}>With Right Icon</Button>)

      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
      expect(screen.getByText('→')).toBeInTheDocument()
    })

    it('renders both icons correctly', () => {
      const leftIcon = <span data-testid="left-icon">←</span>
      const rightIcon = <span data-testid="right-icon">→</span>

      render(
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Both Icons
        </Button>
      )

      expect(screen.getByTestId('left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    })

    it('applies shrink-0 class to icon containers', () => {
      const leftIcon = <span data-testid="left-icon">←</span>
      render(<Button leftIcon={leftIcon}>With Icon</Button>)

      const iconSpan = screen.getByTestId('left-icon').parentElement
      expect(iconSpan).toHaveClass('shrink-0')
    })
  })

  describe('tab variant', () => {
    it('renders tab variant with correct base styles', () => {
      render(<Button variant="tab">Tab</Button>)

      const button = screen.getByRole('button', { name: /tab/i })
      expect(button).toHaveClass(
        'h-10',
        'px-4',
        'bg-transparent',
        'border-0',
        'rounded-none',
        'text-[13px]',
        'leading-4'
      )
    })

    it('renders active tab with correct styles', () => {
      render(<Button variant="tab" isActive>Active Tab</Button>)

      const button = screen.getByRole('button', { name: /active tab/i })
      expect(button).toHaveClass('text-[#021337]', 'border-b-2', 'border-[#021337]')
    })

    it('renders inactive tab with correct styles', () => {
      render(<Button variant="tab" isActive={false}>Inactive Tab</Button>)

      const button = screen.getByRole('button', { name: /inactive tab/i })
      expect(button).toHaveClass('text-[#4e5a73]')
    })
  })

  describe('custom className', () => {
    it('applies custom className', () => {
      const customClass = 'custom-button-class'
      render(<Button className={customClass}>Custom</Button>)

      const button = screen.getByRole('button', { name: /custom/i })
      expect(button).toHaveClass(customClass)
    })
  })

  describe('button attributes', () => {
    it('passes through button HTML attributes', () => {
      render(
        <Button type="submit" aria-label="Submit form">
          Submit
        </Button>
      )

      const button = screen.getByRole('button', { name: /submit/i })
      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('aria-label', 'Submit form')
    })

    it('handles onClick correctly', () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click Me</Button>)

      const button = screen.getByRole('button', { name: /click me/i })
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('respects disabled attribute', () => {
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      )

      const button = screen.getByRole('button', { name: /disabled/i })
      expect(button).toBeDisabled()

      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('has correct default type attribute', () => {
      render(<Button>Button</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('supports aria attributes', () => {
      render(
        <Button aria-expanded="true" aria-haspopup="menu">
          Menu Button
        </Button>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
      expect(button).toHaveAttribute('aria-haspopup', 'menu')
    })

    it('maintains focus visibility styles', () => {
      render(<Button>Focusable</Button>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-offset-2')
    })
  })

  describe('edge cases', () => {
    it('handles empty children', () => {
      render(<Button></Button>)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('handles complex children', () => {
      render(
        <Button>
          <span>Icon</span>
          <strong>Bold Text</strong>
        </Button>
      )

      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Bold Text')).toBeInTheDocument()
    })

    it('maintains stability across re-renders', () => {
      const { rerender } = render(<Button>First</Button>)

      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument()

      rerender(<Button>Second</Button>)

      expect(screen.getByRole('button', { name: /second/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /first/i })).not.toBeInTheDocument()
    })
  })
})
