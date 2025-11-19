import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import { SectionCard } from './SectionCard'
import { InfoIcon } from '@/icon/InfoIcon'

// Mock the InfoIcon component
vi.mock('@/icon/InfoIcon', () => ({
  InfoIcon: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="info-icon" />
  ),
}))

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('SectionCard', () => {
  it('renders without crashing', () => {
    render(
      <SectionCard title="Test Section">
        <div>Test content</div>
      </SectionCard>
    )
    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders with required props', () => {
    const title = 'Dashboard Overview'
    const content = 'Some dashboard content'

    render(
      <SectionCard title={title}>
        <p>{content}</p>
      </SectionCard>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(content)).toBeInTheDocument()
  })

  it('renders title correctly', () => {
    const title = 'User Statistics'
    render(
      <SectionCard title={title}>
        <div>Content</div>
      </SectionCard>
    )

    const titleElement = screen.getByText(title)
    expect(titleElement).toHaveClass('text-[14px]', 'font-medium', 'leading-5', 'text-[#021337]', 'm-0')
  })

  it('renders children content', () => {
    const content = 'Card content goes here'
    render(
      <SectionCard title="Test">
        <div>{content}</div>
      </SectionCard>
    )

    expect(screen.getByText(content)).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const customClass = 'custom-section-class'
    render(
      <SectionCard title="Test" className={customClass}>
        <div>Content</div>
      </SectionCard>
    )

    // Find the main container by its classes
    const card = document.querySelector('.bg-white.rounded-md')
    expect(card).toHaveClass(customClass)
  })

  it('renders with custom contentClassName', () => {
    const contentClass = 'custom-content-class'
    render(
      <SectionCard title="Test" contentClassName={contentClass}>
        <div>Content</div>
      </SectionCard>
    )

    const contentArea = screen.getByText('Content').parentElement
    expect(contentArea).toHaveClass('p-4', contentClass)
  })

  describe('info icon', () => {
    it('does not show info icon by default', () => {
      render(
        <SectionCard title="Test">
          <div>Content</div>
        </SectionCard>
      )

      expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument()
    })

    it('shows info icon when showInfoIcon is true', () => {
      render(
        <SectionCard title="Test" showInfoIcon={true}>
          <div>Content</div>
        </SectionCard>
      )

      expect(screen.getByTestId('info-icon')).toBeInTheDocument()
    })

    it('renders info icon with correct styling', () => {
      render(
        <SectionCard title="Test" showInfoIcon={true}>
          <div>Content</div>
        </SectionCard>
      )

      const iconContainer = screen.getByTestId('info-icon').parentElement
      expect(iconContainer).toHaveClass('w-4', 'h-4', 'text-[#a1abbf]', 'flex', 'items-center', 'justify-center')
    })
  })

  describe('header actions', () => {
    it('does not render header actions by default', () => {
      render(
        <SectionCard title="Test">
          <div>Content</div>
        </SectionCard>
      )

      // Header should only contain title and optional info icon, no actions container
      const header = document.querySelector('.flex.items-center.justify-between')
      const actionsInHeader = header?.querySelectorAll('.flex.items-center')
      expect(actionsInHeader?.length).toBe(1) // Only the title container
    })

    it('renders header actions when provided', () => {
      const actionButton = <button>Edit</button>
      render(
        <SectionCard title="Test" headerActions={actionButton}>
          <div>Content</div>
        </SectionCard>
      )

      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    })

    it('renders header actions with correct styling', () => {
      const actionButton = <button>Delete</button>
      render(
        <SectionCard title="Test" headerActions={actionButton}>
          <div>Content</div>
        </SectionCard>
      )

      const actionsContainer = screen.getByRole('button', { name: /delete/i }).parentElement
      expect(actionsContainer).toHaveClass('flex', 'items-center')
    })
  })

  describe('layout structure', () => {
    it('has correct main container structure', () => {
      render(
        <SectionCard title="Test">
          <div>Content</div>
        </SectionCard>
      )

      const mainContainer = document.querySelector('.bg-white.rounded-md')
      expect(mainContainer).toHaveClass('bg-white', 'rounded-md', 'overflow-hidden', 'flex', 'flex-col')
    })

    it('has correct header structure', () => {
      render(
        <SectionCard title="Test">
          <div>Content</div>
        </SectionCard>
      )

      const header = screen.getByText('Test').parentElement?.parentElement
      expect(header).toHaveClass('flex', 'items-center', 'justify-between', 'gap-2', 'px-4', 'py-3')
    })

    it('has correct content area structure', () => {
      render(
        <SectionCard title="Test">
          <div>Content</div>
        </SectionCard>
      )

      const contentArea = screen.getByText('Content').parentElement
      expect(contentArea).toHaveClass('p-4')
    })

    it('positions title and info icon correctly', () => {
      render(
        <SectionCard title="Test" showInfoIcon={true}>
          <div>Content</div>
        </SectionCard>
      )

      const titleContainer = screen.getByText('Test').parentElement
      expect(titleContainer).toHaveClass('flex', 'items-center', 'gap-2')
    })
  })

  describe('accessibility', () => {
    it('renders semantic heading for title', () => {
      render(
        <SectionCard title="Test Section">
          <div>Content</div>
        </SectionCard>
      )

      const titleElement = screen.getByText('Test Section')
      expect(titleElement.tagName.toLowerCase()).toBe('h3')
    })

    it('has proper heading hierarchy', () => {
      render(
        <SectionCard title="Section Title">
          <div>Content</div>
        </SectionCard>
      )

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Section Title')
    })
  })

  describe('edge cases', () => {
    it('handles empty title', () => {
      render(
        <SectionCard title="">
          <div>Content</div>
        </SectionCard>
      )

      const titleElement = screen.getByRole('heading')
      expect(titleElement).toHaveTextContent('')
    })

    it('handles long title text', () => {
      const longTitle = 'This is a very long section title that should still render properly within the component'
      render(
        <SectionCard title={longTitle}>
          <div>Content</div>
        </SectionCard>
      )

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    it('handles complex children', () => {
      render(
        <SectionCard title="Test">
          <div>
            <h4>Complex content</h4>
            <p>With multiple elements</p>
            <button>Action</button>
          </div>
        </SectionCard>
      )

      expect(screen.getByText('Complex content')).toBeInTheDocument()
      expect(screen.getByText('With multiple elements')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
    })

    it('handles multiple header actions', () => {
      const actions = (
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )

      render(
        <SectionCard title="Test" headerActions={actions}>
          <div>Content</div>
        </SectionCard>
      )

      expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    })

    it('maintains stability across re-renders', () => {
      const { rerender } = render(
        <SectionCard title="First Title">
          <div>First content</div>
        </SectionCard>
      )

      expect(screen.getByText('First Title')).toBeInTheDocument()
      expect(screen.getByText('First content')).toBeInTheDocument()

      rerender(
        <SectionCard title="Second Title">
          <div>Second content</div>
        </SectionCard>
      )

      expect(screen.getByText('Second Title')).toBeInTheDocument()
      expect(screen.getByText('Second content')).toBeInTheDocument()
      expect(screen.queryByText('First Title')).not.toBeInTheDocument()
      expect(screen.queryByText('First content')).not.toBeInTheDocument()
    })
  })
})
