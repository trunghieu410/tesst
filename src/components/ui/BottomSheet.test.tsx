import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BottomSheet } from './BottomSheet'

// Mock the XIcon component
vi.mock('@/icon/XIcon', () => ({
  XIcon: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="x-icon" />
  ),
}))

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('BottomSheet', () => {
  const mockOnClose = vi.fn()

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: 'Test Bottom Sheet',
    children: <div>Test content</div>,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clean up any body styles
    document.body.style.overflow = ''
  })

  it('renders without crashing', async () => {
    render(<BottomSheet {...defaultProps} />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Bottom Sheet')).toBeInTheDocument()
    })
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(<BottomSheet {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Test Bottom Sheet')).not.toBeInTheDocument()
  })

  it('renders title correctly', async () => {
    render(<BottomSheet {...defaultProps} title="Custom Title" />)
    
    await waitFor(() => {
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
    })
  })

  it('renders children content', async () => {
    render(
      <BottomSheet {...defaultProps}>
        <div>Custom content</div>
      </BottomSheet>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Custom content')).toBeInTheDocument()
    })
  })

  it('renders close button with XIcon', async () => {
    render(<BottomSheet {...defaultProps} />)
    
    await waitFor(() => {
      const closeButton = screen.getByRole('button', { name: /close/i })
      expect(closeButton).toBeInTheDocument()
    })
    expect(screen.getByTestId('x-icon')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    const closeButton = screen.getByRole('button', { name: /close/i })
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup()
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Test Bottom Sheet')).toBeInTheDocument()
    })

    const overlay = document.querySelector('.bg-black\\/50')
    expect(overlay).toBeInTheDocument()
    
    if (overlay) {
      await user.click(overlay)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    }
  })

  it('does not call onClose when panel content is clicked', async () => {
    const user = userEvent.setup()
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    const content = screen.getByText('Test content')
    await user.click(content)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('renders rightAction when provided', async () => {
    const rightAction = <button>Action</button>
    render(<BottomSheet {...defaultProps} rightAction={rightAction} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
    })
  })

  it('does not render rightAction when not provided', async () => {
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
    })

    const actionButtons = screen.queryAllByRole('button')
    // Should only have the close button
    expect(actionButtons).toHaveLength(1)
  })

  it('renders footer when provided', async () => {
    const footer = <div>Footer content</div>
    render(<BottomSheet {...defaultProps} footer={footer} />)

    await waitFor(() => {
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })
  })

  it('does not render footer when not provided', async () => {
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      expect(screen.getByText('Test Bottom Sheet')).toBeInTheDocument()
    })

    expect(screen.queryByText('Footer content')).not.toBeInTheDocument()
  })

  it('prevents body scroll when open', async () => {
    render(<BottomSheet {...defaultProps} />)
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  it('restores body scroll when closed', async () => {
    const { rerender } = render(<BottomSheet {...defaultProps} />)
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })

    rerender(<BottomSheet {...defaultProps} isOpen={false} />)
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })

  it('restores body scroll on unmount', async () => {
    const { unmount } = render(<BottomSheet {...defaultProps} />)
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })

    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('renders with portal to document.body', async () => {
    render(<BottomSheet {...defaultProps} />)
    
    await waitFor(() => {
      const title = screen.getByText('Test Bottom Sheet')
      expect(title.closest('.fixed.inset-0')?.parentElement).toBe(document.body)
    })
  })

  it('has correct header structure', async () => {
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      const header = screen.getByText('Test Bottom Sheet').parentElement
      expect(header).toHaveClass('flex', 'items-center', 'justify-between', 'px-4', 'pt-4', 'pb-3', 'shrink-0')
    })
  })

  it('has correct body structure', async () => {
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      const content = screen.getByText('Test content')
      const body = content.parentElement
      expect(body).toHaveClass('flex-1', 'overflow-y-auto', 'p-4', 'min-h-[200px]')
    })
  })

  it('handles complex children', async () => {
    render(
      <BottomSheet {...defaultProps}>
        <div>
          <h3>Complex content</h3>
          <p>With multiple elements</p>
          <button>Action button</button>
        </div>
      </BottomSheet>
    )

    await waitFor(() => {
      expect(screen.getByText('Complex content')).toBeInTheDocument()
    })
    expect(screen.getByText('With multiple elements')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /action button/i })).toBeInTheDocument()
  })

  it('handles complex footer', async () => {
    const footer = (
      <div>
        <button>Cancel</button>
        <button>Confirm</button>
      </div>
    )
    
    render(<BottomSheet {...defaultProps} footer={footer} />)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument()
  })

  it('maintains stability across re-renders', async () => {
    const { rerender } = render(<BottomSheet {...defaultProps} title="First Title" />)

    await waitFor(() => {
      expect(screen.getByText('First Title')).toBeInTheDocument()
    })

    rerender(<BottomSheet {...defaultProps} title="Second Title" />)

    await waitFor(() => {
      expect(screen.getByText('Second Title')).toBeInTheDocument()
    })
    expect(screen.queryByText('First Title')).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', async () => {
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      const overlay = document.querySelector('.bg-black\\/50')
      expect(overlay).toHaveAttribute('aria-hidden', 'true')
    })

    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton).toHaveAttribute('aria-label', 'Close')
  })

  it('has correct title styling', async () => {
    render(<BottomSheet {...defaultProps} />)

    await waitFor(() => {
      const title = screen.getByText('Test Bottom Sheet')
      expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-900')
      expect(title.tagName.toLowerCase()).toBe('h2')
    })
  })
})
