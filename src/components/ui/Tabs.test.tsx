import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import { Tabs } from './Tabs'

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

// Mock Button component
vi.mock('./Button', () => ({
  Button: ({ children, variant, isActive, onClick, ...props }: any) => (
    <button
      data-testid={`tab-button-${children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
      data-variant={variant}
      data-active={isActive}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}))

describe('Tabs', () => {
  const mockTabs = [
    { id: 'tab1', label: 'First Tab' },
    { id: 'tab2', label: 'Second Tab' },
    { id: 'tab3', label: 'Third Tab' },
  ]

  const mockChildren = vi.fn((activeTab: string) => (
    <div data-testid="tab-content">{`Content for ${activeTab}`}</div>
  ))

  const defaultProps = {
    tabs: mockTabs,
    defaultTab: 'tab1',
    children: mockChildren,
  }

  beforeEach(() => {
    mockChildren.mockClear()
  })

  it('renders without crashing', () => {
    render(<Tabs {...defaultProps} />)
    expect(screen.getByTestId('tab-button-first-tab')).toBeInTheDocument()
    expect(screen.getByText('Content for tab1')).toBeInTheDocument()
  })

  it('renders all tabs', () => {
    render(<Tabs {...defaultProps} />)

    expect(screen.getByTestId('tab-button-first-tab')).toBeInTheDocument()
    expect(screen.getByTestId('tab-button-second-tab')).toBeInTheDocument()
    expect(screen.getByTestId('tab-button-third-tab')).toBeInTheDocument()
  })

  it('sets default tab as active', () => {
    render(<Tabs {...defaultProps} />)

    const firstTab = screen.getByTestId('tab-button-first-tab')
    expect(firstTab).toHaveAttribute('data-active', 'true')
    expect(firstTab).toHaveAttribute('data-variant', 'tab')
  })

  it('renders tab content with correct active tab', () => {
    render(<Tabs {...defaultProps} />)

    expect(screen.getByText('Content for tab1')).toBeInTheDocument()
    expect(mockChildren).toHaveBeenCalledWith('tab1')
  })

  it('switches active tab when clicked', () => {
    render(<Tabs {...defaultProps} />)

    const secondTab = screen.getByTestId('tab-button-second-tab')
    fireEvent.click(secondTab)

    expect(secondTab).toHaveAttribute('data-active', 'true')
    expect(screen.getByText('Content for tab2')).toBeInTheDocument()
    expect(mockChildren).toHaveBeenCalledWith('tab2')
  })

  it('only one tab is active at a time', () => {
    render(<Tabs {...defaultProps} />)

    const firstTab = screen.getByTestId('tab-button-first-tab')
    const secondTab = screen.getByTestId('tab-button-second-tab')
    const thirdTab = screen.getByTestId('tab-button-third-tab')

    // Initially first tab is active
    expect(firstTab).toHaveAttribute('data-active', 'true')
    expect(secondTab).toHaveAttribute('data-active', 'false')
    expect(thirdTab).toHaveAttribute('data-active', 'false')

    // Click second tab
    fireEvent.click(secondTab)
    expect(firstTab).toHaveAttribute('data-active', 'false')
    expect(secondTab).toHaveAttribute('data-active', 'true')
    expect(thirdTab).toHaveAttribute('data-active', 'false')
  })

  it('renders tab labels correctly', () => {
    render(<Tabs {...defaultProps} />)

    expect(screen.getByText('First Tab')).toBeInTheDocument()
    expect(screen.getByText('Second Tab')).toBeInTheDocument()
    expect(screen.getByText('Third Tab')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const customClass = 'custom-tabs-class'
    render(<Tabs {...defaultProps} className={customClass} />)

    const container = document.querySelector('.flex.flex-col.items-start.w-full')
    expect(container).toHaveClass(customClass)
  })

  describe('container styling', () => {
    it('has correct base container classes', () => {
      render(<Tabs {...defaultProps} />)

    const container = document.querySelector('.flex.flex-col.items-start.w-full')
    expect(container).toHaveClass('flex', 'flex-col', 'items-start', 'w-full')
    })

    it('has correct tab container classes', () => {
      render(<Tabs {...defaultProps} />)

      const tabContainer = screen.getByTestId('tab-button-first-tab').parentElement
      expect(tabContainer).toHaveClass('flex', 'px-4', 'w-full')
    })
  })

  describe('tab interactions', () => {
    it('calls handleTabChange when tab is clicked', () => {
      render(<Tabs {...defaultProps} />)

      const secondTab = screen.getByTestId('tab-button-second-tab')
      fireEvent.click(secondTab)

      expect(mockChildren).toHaveBeenLastCalledWith('tab2')
    })

    it('maintains tab state after multiple clicks', () => {
      render(<Tabs {...defaultProps} />)

      const firstTab = screen.getByTestId('tab-button-first-tab')
      const secondTab = screen.getByTestId('tab-button-second-tab')

      // Click second tab
      fireEvent.click(secondTab)
      expect(screen.getByText('Content for tab2')).toBeInTheDocument()

      // Click first tab again
      fireEvent.click(firstTab)
      expect(screen.getByText('Content for tab1')).toBeInTheDocument()

      // Click second tab again
      fireEvent.click(secondTab)
      expect(screen.getByText('Content for tab2')).toBeInTheDocument()
    })
  })

  describe('icon badges', () => {
    it('renders icon badge when provided', () => {
      const tabsWithIcon = [
        {
          id: 'tab1',
          label: 'Tab with Icon',
          iconBadge: () => <span data-testid="icon-badge">🔥</span>
        },
      ]

      render(
        <Tabs
          tabs={tabsWithIcon}
          defaultTab="tab1"
          children={mockChildren}
        />
      )

      expect(screen.getByTestId('icon-badge')).toBeInTheDocument()
      expect(screen.getByText('🔥')).toBeInTheDocument()
    })

    it('does not render icon badge when not provided', () => {
      render(<Tabs {...defaultProps} />)

      expect(screen.queryByTestId('icon-badge')).not.toBeInTheDocument()
    })

    it('calls iconBadge function when rendering', () => {
      const iconBadgeMock = vi.fn(() => <span>Icon</span>)

      const tabsWithIcon = [
        {
          id: 'tab1',
          label: 'Tab with Icon',
          iconBadge: iconBadgeMock
        },
      ]

      render(
        <Tabs
          tabs={tabsWithIcon}
          defaultTab="tab1"
          children={mockChildren}
        />
      )

      expect(iconBadgeMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('edge cases', () => {
    it('handles empty tabs array', () => {
      render(
        <Tabs
          tabs={[]}
          defaultTab=""
          children={mockChildren}
        />
      )

      // Should still render container but no tabs
      const container = document.querySelector('.flex.flex-col')
      expect(container).toBeInTheDocument()

      expect(mockChildren).toHaveBeenCalledWith('')
    })

    it('handles single tab', () => {
      const singleTab = [{ id: 'only', label: 'Only Tab' }]

      render(
        <Tabs
          tabs={singleTab}
          defaultTab="only"
          children={mockChildren}
        />
      )

      expect(screen.getByTestId('tab-button-only-tab')).toBeInTheDocument()
      expect(screen.getByText('Content for only')).toBeInTheDocument()
    })

    it('handles tabs with same label', () => {
      const sameLabelTabs = [
        { id: 'tab1', label: 'Same Label' },
        { id: 'tab2', label: 'Same Label' },
      ]

      render(
        <Tabs
          tabs={sameLabelTabs}
          defaultTab="tab1"
          children={mockChildren}
        />
      )

      const tabs = screen.getAllByText('Same Label')
      expect(tabs).toHaveLength(2)
    })

    it('maintains active tab state across re-renders', () => {
      const { rerender } = render(<Tabs {...defaultProps} />)

      // Click on second tab
      const secondTab = screen.getByTestId('tab-button-second-tab')
      fireEvent.click(secondTab)

      expect(screen.getByText('Content for tab2')).toBeInTheDocument()

      // Re-render with same props
      rerender(<Tabs {...defaultProps} />)

      // Should still show second tab content
      expect(screen.getByText('Content for tab2')).toBeInTheDocument()
    })

    it('handles defaultTab not in tabs array', () => {
      render(
        <Tabs
          tabs={mockTabs}
          defaultTab="nonexistent"
          children={mockChildren}
        />
      )

      // Should still render and call children with the defaultTab value
      expect(mockChildren).toHaveBeenCalledWith('nonexistent')
    })
  })

  describe('accessibility', () => {
    it('uses Button component for tabs (already tested for accessibility)', () => {
      render(<Tabs {...defaultProps} />)

      const tabs = screen.getAllByRole('button')
      expect(tabs).toHaveLength(3)
    })

    it('maintains tab order', () => {
      render(<Tabs {...defaultProps} />)

      const tabContainer = screen.getByTestId('tab-button-first-tab').parentElement
      const tabButtons = tabContainer?.querySelectorAll('button')

      expect(tabButtons).toHaveLength(3)
      expect(tabButtons?.[0]).toHaveAttribute('data-testid', 'tab-button-first-tab')
      expect(tabButtons?.[1]).toHaveAttribute('data-testid', 'tab-button-second-tab')
      expect(tabButtons?.[2]).toHaveAttribute('data-testid', 'tab-button-third-tab')
    })
  })

  describe('children function', () => {
    it('passes activeTab to children function', () => {
      render(<Tabs {...defaultProps} />)

      expect(mockChildren).toHaveBeenCalledWith('tab1')
      expect(mockChildren).toHaveBeenCalledTimes(1)
    })

    it('calls children function when tab changes', () => {
      render(<Tabs {...defaultProps} />)

      const secondTab = screen.getByTestId('tab-button-second-tab')
      fireEvent.click(secondTab)

      expect(mockChildren).toHaveBeenLastCalledWith('tab2')
      expect(mockChildren).toHaveBeenCalledTimes(2)
    })

    it('renders children function result', () => {
      const customChildren = (activeTab: string) => (
        <div data-testid="custom-content">
          <h2>Active: {activeTab}</h2>
          <p>This is custom content</p>
        </div>
      )

      render(
        <Tabs
          tabs={mockTabs}
          defaultTab="tab1"
          children={customChildren}
        />
      )

      expect(screen.getByText('Active: tab1')).toBeInTheDocument()
      expect(screen.getByText('This is custom content')).toBeInTheDocument()
    })
  })
})
