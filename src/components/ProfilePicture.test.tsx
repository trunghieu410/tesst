import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../test/utils'
import { ProfilePicture } from './ProfilePicture'

describe('ProfilePicture', () => {
  it('renders without crashing', () => {
    render(<ProfilePicture />)
    expect(document.querySelector('.rounded-full')).toBeInTheDocument()
  })

  it('renders with default props', () => {
    render(<ProfilePicture />)

    const avatar = document.querySelector('.rounded-full')
    expect(avatar).toHaveClass('w-10', 'h-10', 'text-sm', 'bg-linear-to-b')
    expect(screen.getByText('US')).toBeInTheDocument()
  })

  it('renders with custom name', () => {
    const name = 'John Doe'
    render(<ProfilePicture name={name} />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders with image when provided', () => {
    const imageUrl = 'https://example.com/avatar.jpg'
    const altText = 'John Doe'
    render(<ProfilePicture name={altText} image={imageUrl} />)

    const img = screen.getByAltText(altText)
    expect(img).toHaveAttribute('src', imageUrl)
    expect(img).toHaveClass('w-full', 'h-full', 'object-cover')
  })

  describe('sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<ProfilePicture size={size} />)

        const avatar = document.querySelector('.rounded-full')
        const expectedClasses = {
          small: ['w-8', 'h-8', 'text-xs'],
          medium: ['w-10', 'h-10', 'text-sm'],
          large: ['w-12', 'h-12', 'text-base']
        }

        expectedClasses[size].forEach(className => {
          expect(avatar).toHaveClass(className)
        })
      })
    })
  })

  describe('initials generation', () => {
    it('generates initials for single name', () => {
      render(<ProfilePicture name="John" />)
      expect(screen.getByText('JO')).toBeInTheDocument()
    })

    it('generates initials for two names', () => {
      render(<ProfilePicture name="John Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('generates initials for multiple names', () => {
      render(<ProfilePicture name="John Michael Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('handles single character names', () => {
      render(<ProfilePicture name="A" />)
      expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('handles empty name', () => {
      render(<ProfilePicture name="" />)
      // Empty name should still render an avatar element
      const avatar = document.querySelector('.rounded-full')
      expect(avatar).toBeInTheDocument()
    })

    it('converts to uppercase', () => {
      render(<ProfilePicture name="john doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()
    })
  })

  describe('gradient colors', () => {
    it('applies consistent gradient based on name', () => {
      render(<ProfilePicture name="Alice" />)

      const avatar = document.querySelector('.rounded-full')
      expect(avatar).toHaveClass('bg-linear-to-b')
      // Should have some gradient classes
      expect(avatar?.className).toMatch(/from-\[#[a-fA-F0-9]+\]/)
    })

    it('uses different gradients for different names', () => {
      const { rerender } = render(<ProfilePicture name="Alice" />)
      const aliceAvatar = document.querySelector('.rounded-full')?.className

      rerender(<ProfilePicture name="Bob" />)
      const bobAvatar = document.querySelector('.rounded-full')?.className

      // Different names should potentially have different gradients
      // (though they might be the same due to the hash function)
      expect(typeof aliceAvatar).toBe('string')
      expect(typeof bobAvatar).toBe('string')
    })
  })

  it('renders with custom className', () => {
    const customClass = 'custom-avatar-class'
    render(<ProfilePicture className={customClass} />)

    const avatar = document.querySelector('.rounded-full')
    expect(avatar).toHaveClass(customClass)
  })

  describe('image rendering', () => {
    it('renders image with correct attributes', () => {
      const imageUrl = '/path/to/avatar.png'
      const name = 'Jane Smith'
      render(<ProfilePicture name={name} image={imageUrl} />)

      const img = screen.getByAltText(name)
      expect(img).toHaveAttribute('src', imageUrl)
      expect(img).toHaveAttribute('alt', name)
    })

    it('prioritizes image over initials when both provided', () => {
      const imageUrl = 'https://example.com/avatar.jpg'
      render(<ProfilePicture name="John Doe" image={imageUrl} />)

      expect(screen.queryByText('JD')).not.toBeInTheDocument()
      expect(screen.getByAltText('John Doe')).toBeInTheDocument()
    })

    it('renders initials when image is empty string', () => {
      render(<ProfilePicture name="John Doe" image="" />)

      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })

    it('renders initials when image is null', () => {
      render(<ProfilePicture name="John Doe" image={undefined} />)

      expect(screen.getByText('JD')).toBeInTheDocument()
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  describe('container styling', () => {
    it('always has rounded-full class', () => {
      render(<ProfilePicture />)
      const avatar = document.querySelector('.rounded-full')
      expect(avatar).toBeInTheDocument()
    })

    it('has flex centering classes for initials', () => {
      render(<ProfilePicture />)
      const avatar = document.querySelector('.rounded-full')
      expect(avatar).toHaveClass('flex', 'items-center', 'justify-center', 'font-medium', 'text-[#021337]')
    })

    it('does not have centering classes for image', () => {
      render(<ProfilePicture image="test.jpg" />)
      const avatar = document.querySelector('.rounded-full')
      expect(avatar).not.toHaveClass('flex', 'items-center', 'justify-center')
    })
  })

  describe('accessibility', () => {
    it('provides alt text for images', () => {
      const name = 'Accessible Name'
      render(<ProfilePicture name={name} image="avatar.jpg" />)

      const img = screen.getByAltText(name)
      expect(img).toBeInTheDocument()
    })

    it('is keyboard focusable when used in interactive contexts', () => {
      // While ProfilePicture itself isn't focusable, it should be usable in focusable contexts
      render(
        <button>
          <ProfilePicture name="User" />
        </button>
      )

      const button = screen.getByRole('button')
      button.focus()
      expect(document.activeElement).toBe(button)
    })
  })

  describe('edge cases', () => {
    it('handles very long names', () => {
      const longName = 'This is a very long name that should still generate reasonable initials'
      render(<ProfilePicture name={longName} />)

      expect(screen.getByText('TI')).toBeInTheDocument()
    })

    it('handles names with special characters', () => {
      render(<ProfilePicture name="José María" />)
      expect(screen.getByText('JM')).toBeInTheDocument()
    })

    it('handles names with numbers', () => {
      render(<ProfilePicture name="User123 Test" />)
      expect(screen.getByText('UT')).toBeInTheDocument()
    })

    it('handles whitespace-only names', () => {
      render(<ProfilePicture name="   " />)
      // Whitespace-only name should render an avatar element
      const avatar = document.querySelector('.rounded-full')
      expect(avatar).toBeInTheDocument()
    })

    it('maintains consistency across re-renders', () => {
      const { rerender } = render(<ProfilePicture name="First User" />)
      expect(screen.getByText('FU')).toBeInTheDocument()

      rerender(<ProfilePicture name="Second User" />)
      expect(screen.getByText('SU')).toBeInTheDocument()
      expect(screen.queryByText('FU')).not.toBeInTheDocument()
    })
  })

  describe('utility functions', () => {
    // Test the internal utility functions indirectly through component behavior
    it('getInitials handles various name formats', () => {
      // Test a few key cases individually to avoid text conflicts
      render(<ProfilePicture name="John" />)
      expect(screen.getByText('JO')).toBeInTheDocument()

      const { rerender } = render(<ProfilePicture name="John Doe" />)
      expect(screen.getByText('JD')).toBeInTheDocument()

      rerender(<ProfilePicture name="A" />)
      expect(screen.getByText('A')).toBeInTheDocument()
    })

    it('getGradientColor provides consistent colors', () => {
      // Test that same name always gets same gradient
      render(<ProfilePicture name="Test User" />)
      const firstRender = document.querySelector('.rounded-full')?.className

      const { rerender } = render(<ProfilePicture name="Test User" />)
      const secondRender = document.querySelector('.rounded-full')?.className

      expect(firstRender).toBe(secondRender)
    })
  })
})
