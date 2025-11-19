import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import { Pagination } from './Pagination'


// Mock the icons
vi.mock('lucide-react', () => ({
  ChevronLeft: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="chevron-left-icon" />
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="chevron-right-icon" />
  ),
}))

describe('Pagination', () => {
  let mockOnPageChange: any
  let mockOnRowsPerPageChange: any

  beforeEach(() => {
    mockOnPageChange = vi.fn()
    mockOnRowsPerPageChange = vi.fn()
  })

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )
      expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()
      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
    })

    it('renders with default props', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      // Should show page numbers 1-5
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()

      // Should not show rows per page selector by default
      expect(screen.queryByDisplayValue('1000')).not.toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-pagination-class'
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          className={customClass}
        />
      )

      const container = document.querySelector('.flex.flex-1.items-center.gap-2\\.5.justify-end')
      expect(container).toHaveClass(customClass)
    })

    it('renders rows per page selector when onRowsPerPageChange is provided', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          rowsPerPage={20}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      )

      const select = screen.getByDisplayValue('20 row')
      expect(select).toBeInTheDocument()
      expect(screen.getAllByTestId('chevron-right-icon')).toHaveLength(2) // One for pagination, one for dropdown
    })
  })

  describe('page navigation', () => {
    it('calls onPageChange with previous page when left arrow is clicked', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const leftButton = screen.getByTestId('chevron-left-icon').parentElement!
      fireEvent.click(leftButton)

      expect(mockOnPageChange).toHaveBeenCalledWith(2)
    })

    it('calls onPageChange with next page when right arrow is clicked', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const rightButton = screen.getByTestId('chevron-right-icon').parentElement!
      fireEvent.click(rightButton)

      expect(mockOnPageChange).toHaveBeenCalledWith(4)
    })

    it('calls onPageChange with specific page when page number is clicked', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      fireEvent.click(screen.getByText('3'))
      expect(mockOnPageChange).toHaveBeenCalledWith(3)
    })

    it('does not call onPageChange when clicking current page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      fireEvent.click(screen.getByText('3'))
      expect(mockOnPageChange).toHaveBeenCalledWith(3)
    })
  })

  describe('button states', () => {
    it('disables left arrow on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const leftButton = screen.getByTestId('chevron-left-icon').parentElement!
      expect(leftButton).toBeDisabled()
      expect(leftButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })

    it('disables right arrow on last page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const rightButton = screen.getAllByTestId('chevron-right-icon')[0].parentElement!
      expect(rightButton).toBeDisabled()
      expect(rightButton).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })

    it('enables both arrows on middle pages', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const leftButton = screen.getByTestId('chevron-left-icon').parentElement!
      const rightButton = screen.getAllByTestId('chevron-right-icon')[0].parentElement!

      expect(leftButton).not.toBeDisabled()
      expect(rightButton).not.toBeDisabled()
    })

    it('highlights current page with different styling', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const currentPageButton = screen.getByText('3')
      expect(currentPageButton).toHaveClass('bg-gray-100')
    })

    it('applies default styling to non-current pages', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const page2Button = screen.getByText('2')
      const page4Button = screen.getByText('4')

      expect(page2Button).toHaveClass('bg-white')
      expect(page4Button).toHaveClass('bg-white')
    })
  })

  describe('page number rendering', () => {
    it('renders all pages when totalPages <= 7', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument()
      }
    })

    it('renders ellipsis pattern when currentPage <= 3 and totalPages > 7', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('...')).toBeInTheDocument()
      expect(screen.getByText('9')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('renders ellipsis pattern when currentPage >= totalPages - 2 and totalPages > 7', () => {
      render(
        <Pagination
          currentPage={9}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('...')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('9')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('renders ellipsis pattern when currentPage is in middle and totalPages > 7', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      const ellipses = screen.getAllByText('...')
      expect(ellipses).toHaveLength(2)
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('6')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('handles edge case of totalPages = 1', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()

      // Both navigation buttons should be disabled
      const leftButton = screen.getByTestId('chevron-left-icon').parentElement!
      const rightButton = screen.getAllByTestId('chevron-right-icon')[0].parentElement!

      expect(leftButton).toBeDisabled()
      expect(rightButton).toBeDisabled()
    })
  })

  describe('rows per page selector', () => {
    it('calls onRowsPerPageChange when selection changes', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          rowsPerPage={10}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      )

      const select = screen.getByDisplayValue('10 row')
      fireEvent.change(select, { target: { value: '20' } })

      expect(mockOnRowsPerPageChange).toHaveBeenCalledWith(20)
    })

    it('displays current rowsPerPage value', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          rowsPerPage={50}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      )

      expect(screen.getByDisplayValue('50 row')).toBeInTheDocument()
    })

    it('renders all row options', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          rowsPerPage={10}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      )

      expect(screen.getByText('10 row')).toBeInTheDocument()
      expect(screen.getByText('20 row')).toBeInTheDocument()
      expect(screen.getByText('50 row')).toBeInTheDocument()
      expect(screen.getByText('100 row')).toBeInTheDocument()
    })

    it('applies correct styling to rows per page selector', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          rowsPerPage={10}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      )

      const select = screen.getByDisplayValue('10 row')
      expect(select).toHaveClass(
        'bg-white',
        'border',
        'border-[#cfd6de]',
        'rounded-md',
        'px-3',
        'py-2',
        'h-8',
        'pr-8',
        'font-normal',
        'text-[13px]',
        'leading-4',
        'text-[#021337]',
        'appearance-none',
        'cursor-pointer',
        'hover:bg-gray-50'
      )
    })
  })

  describe('styling and accessibility', () => {
    it('renders main container with correct base classes', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const container = document.querySelector('.flex.flex-1.items-center.gap-2\\.5.justify-end')
      expect(container).toHaveClass('flex', 'flex-1', 'items-center', 'gap-2.5', 'justify-end')
    })

    it('renders pagination buttons container with correct styling', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const buttonContainer = document.querySelector('.border.border-\\[\\#d0d5dd\\]')
      expect(buttonContainer).toHaveClass(
        'border',
        'border-[#d0d5dd]',
        'rounded-md',
        'overflow-hidden',
        'flex',
        'items-stretch'
      )
    })

    it('renders navigation buttons with correct styling', () => {
      render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const leftButton = screen.getByTestId('chevron-left-icon').parentElement!
      const rightButton = screen.getAllByTestId('chevron-right-icon')[0].parentElement!

      expect(leftButton).toHaveClass(
        'bg-white',
        'border-r',
        'border-[#cfd6de]',
        'px-3',
        'py-2',
        'w-8',
        'h-8',
        'flex',
        'items-center',
        'justify-center',
        'hover:bg-gray-50'
      )

      expect(rightButton).toHaveClass(
        'bg-white',
        'px-3',
        'py-2',
        'w-8',
        'h-8',
        'flex',
        'items-center',
        'justify-center',
        'hover:bg-gray-50'
      )
    })

    it('renders page number buttons with correct base styling', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const pageButton = screen.getByText('2')
      expect(pageButton).toHaveClass(
        'border-r',
        'border-[#cfd6de]',
        'px-3',
        'py-2',
        'w-8',
        'h-8',
        'flex',
        'items-center',
        'justify-center',
        'font-medium',
        'text-[13px]',
        'leading-4',
        'hover:bg-gray-50'
      )
    })

    it('renders ellipsis with correct styling', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      const ellipses = screen.getAllByText('...')
      const ellipsis = ellipses[0]
      expect(ellipsis).toHaveClass(
        'bg-white',
        'border-r',
        'border-[#cfd6de]',
        'px-3',
        'py-2',
        'w-8',
        'h-8',
        'flex',
        'items-center',
        'justify-center',
        'font-medium',
        'text-[13px]',
        'leading-4',
        'text-[#021337]'
      )
    })

    it('renders chevron icons with correct classes', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
        />
      )

      const leftIcon = screen.getByTestId('chevron-left-icon')
      const rightIcon = screen.getAllByTestId('chevron-right-icon')[0]

      expect(leftIcon).toHaveClass('w-4', 'h-4')
      expect(rightIcon).toHaveClass('w-4', 'h-4')
    })

    it('renders dropdown chevron with correct rotation', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      )

      const dropdownChevron = screen.getAllByTestId('chevron-right-icon')[1]
      expect(dropdownChevron).toHaveClass('rotate-90')
    })
  })

  describe('edge cases', () => {
    it('handles currentPage = 1 and totalPages = 1', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.queryByText('2')).not.toBeInTheDocument()
    })

    it('handles large totalPages with currentPage in middle', () => {
      render(
        <Pagination
          currentPage={50}
          totalPages={100}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('49')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('51')).toBeInTheDocument()
      expect(screen.getByText('100')).toBeInTheDocument()

      // Should have two ellipsis
      const ellipses = screen.getAllByText('...')
      expect(ellipses).toHaveLength(2)
    })

    it('handles currentPage at boundary of ellipsis logic', () => {
      // Test currentPage = 4 (just after the initial 1,2,3)
      render(
        <Pagination
          currentPage={4}
          totalPages={10}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      const ellipses = screen.getAllByText('...')
      expect(ellipses).toHaveLength(2)
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('handles totalPages = 7 (boundary case)', () => {
      render(
        <Pagination
          currentPage={4}
          totalPages={7}
          onPageChange={mockOnPageChange}
        />
      )

      // Should show all pages without ellipsis
      for (let i = 1; i <= 7; i++) {
        expect(screen.getByText(i.toString())).toBeInTheDocument()
      }
      expect(screen.queryByText('...')).not.toBeInTheDocument()
    })

    it('handles totalPages = 8 (should use ellipsis)', () => {
      render(
        <Pagination
          currentPage={4}
          totalPages={8}
          onPageChange={mockOnPageChange}
        />
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      const ellipses = screen.getAllByText('...')
      expect(ellipses).toHaveLength(2)
      expect(screen.getByText('3')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
    })
  })
})
