import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test/utils'
import { Tooltip } from './Tooltip'

// Mock createPortal to render tooltip content in test environment
const mockCreatePortal = vi.fn((children, container) => children)
vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode, container: Element) => children,
}))

describe('Tooltip', () => {
  beforeEach(() => {
    // Clear any existing tooltips
    document.body.innerHTML = ''
  })

  it('renders without crashing', () => {
    render(
      <Tooltip tooltipsText="Test tooltip">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.getByRole('button', { name: /hover me/i })).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    const testContent = 'Test button'
    render(
      <Tooltip tooltipsText="Test tooltip">
        <button>{testContent}</button>
      </Tooltip>
    )

    expect(screen.getByRole('button', { name: testContent })).toBeInTheDocument()
  })

  it('renders with default position (top)', () => {
    render(
      <Tooltip tooltipsText="Test tooltip">
        <button>Test</button>
      </Tooltip>
    )

    const trigger = screen.getByRole('button')
    expect(trigger.parentElement).toHaveClass('inline-block')
  })

  describe('tooltip visibility', () => {
    it('shows tooltip on mouse enter', async () => {
      render(
        <Tooltip tooltipsText="Show tooltip">
          <button>Hover target</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')

      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        expect(screen.getByText('Show tooltip')).toBeInTheDocument()
      })
    })

    it('hides tooltip on mouse leave', async () => {
      render(
        <Tooltip tooltipsText="Hide tooltip">
          <button>Hover target</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')

      fireEvent.mouseEnter(trigger)
      await waitFor(() => {
        expect(screen.getByText('Hide tooltip')).toBeInTheDocument()
      })

      fireEvent.mouseLeave(trigger)
      await waitFor(() => {
        expect(screen.queryByText('Hide tooltip')).not.toBeInTheDocument()
      })
    })

    it('does not show tooltip initially', () => {
      render(
        <Tooltip tooltipsText="Hidden tooltip">
          <button>Test</button>
        </Tooltip>
      )

      expect(screen.queryByText('Hidden tooltip')).not.toBeInTheDocument()
    })
  })

  describe('positions', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const

    positions.forEach(position => {
      it(`applies correct classes for ${position} position`, async () => {
        render(
          <Tooltip tooltipsText="Test tooltip" position={position}>
            <button>Test</button>
          </Tooltip>
        )

        const trigger = screen.getByRole('button')
        fireEvent.mouseEnter(trigger)

        await waitFor(() => {
          const tooltip = screen.getByText('Test tooltip')
          expect(tooltip).toHaveClass('max-w-[264px]', 'w-auto', 'z-50', 'text-wrap', 'rounded', 'bg-black', 'px-4', 'py-1.5', 'text-[13px]', 'font-regular', 'text-white', 'shadow-lg', 'fixed')
        })
      })
    })
  })

  describe('tooltip content', () => {
    it('displays correct tooltip text', async () => {
      const tooltipText = 'This is the tooltip content'
      render(
        <Tooltip tooltipsText={tooltipText}>
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        expect(screen.getByText(tooltipText)).toBeInTheDocument()
      })
    })

    it('handles long tooltip text', async () => {
      const longText = 'This is a very long tooltip text that should be displayed properly within the tooltip component with appropriate styling and positioning'
      render(
        <Tooltip tooltipsText={longText}>
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        expect(screen.getByText(longText)).toBeInTheDocument()
      })
    })

    it('handles special characters in tooltip text', async () => {
      const specialText = 'Tooltip with émojis 🎉 and spëcial chärs'
      render(
        <Tooltip tooltipsText={specialText}>
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        expect(screen.getByText(specialText)).toBeInTheDocument()
      })
    })
  })

  describe('styling and structure', () => {
    it('applies correct base classes to tooltip', async () => {
      render(
        <Tooltip tooltipsText="Test">
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        const tooltip = document.querySelector('.bg-black')
        expect(tooltip).toHaveClass('max-w-[264px]', 'w-auto', 'z-50', 'text-wrap', 'rounded', 'bg-black', 'px-4', 'py-1.5', 'text-[13px]', 'font-regular', 'text-white', 'shadow-lg', 'fixed')
      })
    })

    it('includes arrow element in tooltip', async () => {
      render(
        <Tooltip tooltipsText="Test">
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        // Arrow should be present as a span with absolute positioning
        const tooltip = document.querySelector('.bg-black')
        const arrow = tooltip?.querySelector('span')
        expect(arrow).toHaveClass('absolute', '-z-10')
      })
    })

    it('wraps children in inline-block container', () => {
      render(
        <Tooltip tooltipsText="Test">
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      const wrapper = trigger.parentElement
      expect(wrapper).toHaveClass('inline-block')
    })
  })

  describe('accessibility', () => {
    it('maintains keyboard navigation for children', () => {
      render(
        <Tooltip tooltipsText="Test">
          <button>Test</button>
        </Tooltip>
      )

      const button = screen.getByRole('button')
      button.focus()

      expect(document.activeElement).toBe(button)
    })

    it('does not interfere with child element attributes', () => {
      render(
        <Tooltip tooltipsText="Test">
          <button aria-label="Test button" disabled>Test</button>
        </Tooltip>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Test button')
      expect(button).toBeDisabled()
    })
  })

  describe('portal behavior', () => {
    it('renders tooltip content in document body', async () => {
      render(
        <Tooltip tooltipsText="Portal test">
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        // Since we're mocking createPortal, the tooltip should still be in the document
        expect(screen.getByText('Portal test')).toBeInTheDocument()
      })
    })
  })

  describe('edge cases', () => {
    it('handles empty tooltip text', () => {
      render(
        <Tooltip tooltipsText="">
          <button>Test</button>
        </Tooltip>
      )

      const trigger = screen.getByRole('button')
      fireEvent.mouseEnter(trigger)

      // Should still work but with empty content
      expect(trigger).toBeInTheDocument()
    })

    it('handles complex children', () => {
      render(
        <Tooltip tooltipsText="Complex children">
          <div>
            <span>Complex</span>
            <button>Nested button</button>
          </div>
        </Tooltip>
      )

      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /nested button/i })).toBeInTheDocument()
    })

    it('maintains stability across re-renders', () => {
      const { rerender } = render(
        <Tooltip tooltipsText="First tooltip">
          <button>First</button>
        </Tooltip>
      )

      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument()

      rerender(
        <Tooltip tooltipsText="Second tooltip">
          <button>Second</button>
        </Tooltip>
      )

      expect(screen.getByRole('button', { name: /second/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /first/i })).not.toBeInTheDocument()
    })
  })
})
