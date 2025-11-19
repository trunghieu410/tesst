import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableHeader,
} from './Table'

describe('Table', () => {
  describe('Table component', () => {
    it('renders without crashing', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )
      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('renders with default props', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const table = screen.getByRole('table')
      expect(table).toHaveClass('w-full', 'text-left', 'table-auto', 'min-w-max')
    })

    it('renders with custom className', () => {
      const customClass = 'custom-table-class'
      render(
        <Table className={customClass}>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const container = document.querySelector('.relative.flex.flex-col')
      expect(container).toHaveClass(customClass)
    })

    it('renders with horizontal scroll disabled by default', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const container = document.querySelector('.relative.flex.flex-col')
      expect(container).toHaveClass(
        'relative',
        'flex',
        'flex-col',
        'w-full',
        'h-full',
        'overflow-x-auto'
      )
      expect(container?.querySelector('table')).toHaveClass('w-full', 'text-left', 'table-auto', 'min-w-max')
    })

    it('renders with horizontal scroll and sticky columns enabled', () => {
      render(
        <Table horizontalScrollWithStickyColumns={true}>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const outerContainer = document.querySelector('.w-full.relative')
      expect(outerContainer).toBeInTheDocument()

      const scrollContainer = outerContainer?.querySelector('.overflow-x-auto')
      expect(scrollContainer).toBeInTheDocument()

      const tableWrapper = scrollContainer?.querySelector('.min-w-max.inline-flex')
      expect(tableWrapper).toBeInTheDocument()

      const table = tableWrapper?.querySelector('table')
      expect(table).toHaveClass('w-full', 'text-left', 'table-auto')
    })
  })

  describe('TableHead component', () => {
    it('renders thead element', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const thead = document.querySelector('thead')
      expect(thead).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-thead-class'
      render(
        <Table>
          <TableHead className={customClass}>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const thead = document.querySelector('thead')
      expect(thead).toHaveClass(customClass)
    })

    it('renders children correctly', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header 1</TableHeaderCell>
              <TableHeaderCell>Header 2</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      expect(screen.getByText('Header 1')).toBeInTheDocument()
      expect(screen.getByText('Header 2')).toBeInTheDocument()
    })
  })

  describe('TableBody component', () => {
    it('renders tbody element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tbody = document.querySelector('tbody')
      expect(tbody).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-tbody-class'
      render(
        <Table>
          <TableBody className={customClass}>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tbody = document.querySelector('tbody')
      expect(tbody).toHaveClass(customClass)
    })

    it('renders children correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cell 3</TableCell>
              <TableCell>Cell 4</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByText('Cell 1')).toBeInTheDocument()
      expect(screen.getByText('Cell 2')).toBeInTheDocument()
      expect(screen.getByText('Cell 3')).toBeInTheDocument()
      expect(screen.getByText('Cell 4')).toBeInTheDocument()
    })
  })

  describe('TableRow component', () => {
    it('renders tr element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tr = document.querySelector('tr')
      expect(tr).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      const customClass = 'custom-row-class'
      render(
        <Table>
          <TableBody>
            <TableRow className={customClass}>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tr = document.querySelector('tr')
      expect(tr).toHaveClass('transition-colors', 'hover:bg-gray-50', customClass)
    })

    it('adds cursor pointer when onClick is provided', () => {
      const mockOnClick = vi.fn()
      render(
        <Table>
          <TableBody>
            <TableRow onClick={mockOnClick}>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tr = document.querySelector('tr')
      expect(tr).toHaveClass('cursor-pointer')
    })

    it('does not add cursor pointer when onClick is not provided', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tr = document.querySelector('tr')
      expect(tr).not.toHaveClass('cursor-pointer')
    })

    it('calls onClick when clicked', () => {
      const mockOnClick = vi.fn()
      render(
        <Table>
          <TableBody>
            <TableRow onClick={mockOnClick}>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const tr = document.querySelector('tr')!
      fireEvent.click(tr)

      expect(mockOnClick).toHaveBeenCalled()
    })

    it('renders children correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      expect(screen.getByText('Cell 1')).toBeInTheDocument()
      expect(screen.getByText('Cell 2')).toBeInTheDocument()
    })
  })

  describe('TableHeaderCell component', () => {
    it('renders th element', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toBeInTheDocument()
    })

    it('renders with left alignment by default', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass('text-left')
    })

    it('renders with center alignment', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="center">Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass('text-center')
      expect(th).not.toHaveClass('text-left', 'text-right')
    })

    it('renders with right alignment', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell align="right">Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass('text-right')
      expect(th).not.toHaveClass('text-left', 'text-center')
    })

    it('renders with custom className', () => {
      const customClass = 'custom-header-class'
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className={customClass}>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass(customClass)
    })

    it('renders with base styling', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass(
        'h-8',
        'px-2.5',
        'py-2',
        'bg-white',
        'border-b',
        'border-[#cfd6de]',
        'text-left'
      )
    })

    it('renders sticky left-1 correctly', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell data-sticky="left-1">Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass('sticky', 'left-0', 'z-30', 'bg-white')
      expect(th).toHaveAttribute('data-sticky', 'left-1')
    })

    it('renders sticky left-2 correctly', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell data-sticky="left-2">Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass('sticky', 'left-[70px]', 'z-30', 'bg-white')
      // Check that the gradient shadow pseudo-element classes are applied
      expect(th?.className).toContain('after:bg-gradient-to-r')
      expect(th).toHaveAttribute('data-sticky', 'left-2')
    })

    it('renders sticky right correctly', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell data-sticky="right">Header</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const th = document.querySelector('th')
      expect(th).toHaveClass('sticky', 'right-0', 'z-30', 'bg-white')
      // Check that the gradient shadow pseudo-element classes are applied
      expect(th?.className).toContain('before:bg-gradient-to-l')
      expect(th).toHaveAttribute('data-sticky', 'right')
    })

    it('renders children with correct typography', () => {
      render(
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Header Text</TableHeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      )

      const textDiv = document.querySelector('th div')
      expect(textDiv).toHaveClass('font-medium', 'text-xs', 'leading-4', 'text-[#021337]')
      expect(textDiv).toHaveTextContent('Header Text')
    })
  })

  describe('TableCell component', () => {
    it('renders td element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toBeInTheDocument()
    })

    it('renders with left alignment by default', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('text-left')
    })

    it('renders with center alignment', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('text-center')
      expect(td).not.toHaveClass('text-left', 'text-right')
    })

    it('renders with right alignment', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('text-right')
      expect(td).not.toHaveClass('text-left', 'text-center')
    })

    it('renders with custom className', () => {
      const customClass = 'custom-cell-class'
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={customClass}>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass(customClass)
    })

    it('renders with base styling', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass(
        'h-9',
        'px-2.5',
        'py-2',
        'bg-white',
        '[tr:not(:last-child)_&]:border-b',
        '[tr:not(:last-child)_&]:border-[#cfd6de]',
        'text-left'
      )
    })

    it('adds cursor pointer when onClick is provided', () => {
      const mockOnClick = vi.fn()
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell onClick={mockOnClick}>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('cursor-pointer')
    })

    it('does not add cursor pointer when onClick is not provided', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).not.toHaveClass('cursor-pointer')
    })

    it('calls onClick when clicked', () => {
      const mockOnClick = vi.fn()
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell onClick={mockOnClick}>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')!
      fireEvent.click(td)

      expect(mockOnClick).toHaveBeenCalled()
    })

    it('renders sticky left-1 correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-sticky="left-1">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('sticky', 'left-0', 'z-30', 'bg-white')
      expect(td).toHaveAttribute('data-sticky', 'left-1')
    })

    it('renders sticky left-2 correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-sticky="left-2">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('sticky', 'left-[70px]', 'z-30', 'bg-white')
      // Check that the gradient shadow pseudo-element classes are applied
      expect(td?.className).toContain('after:bg-gradient-to-r')
      expect(td).toHaveAttribute('data-sticky', 'left-2')
    })

    it('renders sticky right correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-sticky="right">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const td = document.querySelector('td')
      expect(td).toHaveClass('sticky', 'right-0', 'z-30', 'bg-white')
      // Check that the gradient shadow pseudo-element classes are applied
      expect(td?.className).toContain('before:bg-gradient-to-l')
      expect(td).toHaveAttribute('data-sticky', 'right')
    })

    it('renders children with correct typography', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell Text</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      const textDiv = document.querySelector('td div')
      expect(textDiv).toHaveClass('font-normal', 'text-sm', 'leading-5', 'text-[#021337]')
      expect(textDiv).toHaveTextContent('Cell Text')
    })
  })

  describe('TableHeader legacy export', () => {
    it('TableHeader is an alias for TableHeaderCell', () => {
      expect(TableHeader).toBe(TableHeaderCell)
    })
  })

  describe('complex table scenarios', () => {
    it('renders a complete table with all components', () => {
      render(
        <Table horizontalScrollWithStickyColumns={true}>
          <TableHead>
            <TableRow>
              <TableHeaderCell data-sticky="left-1">Sticky Header</TableHeaderCell>
              <TableHeaderCell>Header 1</TableHeaderCell>
              <TableHeaderCell align="center">Header 2</TableHeaderCell>
              <TableHeaderCell align="right" data-sticky="right">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow onClick={() => {}}>
              <TableCell data-sticky="left-1">Sticky Cell</TableCell>
              <TableCell>Data 1</TableCell>
              <TableCell align="center">Data 2</TableCell>
              <TableCell align="right" onClick={() => {}} data-sticky="right">Action</TableCell>
            </TableRow>
            <TableRow>
              <TableCell data-sticky="left-1">Sticky Cell 2</TableCell>
              <TableCell>Data 3</TableCell>
              <TableCell align="center">Data 4</TableCell>
              <TableCell align="right" data-sticky="right">Action 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )

      // Check that all elements are rendered
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(document.querySelector('thead')).toBeInTheDocument()
      expect(document.querySelector('tbody')).toBeInTheDocument()
      expect(document.querySelectorAll('tr')).toHaveLength(3) // 1 header + 2 data rows
      expect(document.querySelectorAll('th')).toHaveLength(4)
      expect(document.querySelectorAll('td')).toHaveLength(8) // 4 cells per row × 2 rows

      // Check sticky attributes are applied
      const stickyElements = document.querySelectorAll('[data-sticky]')
      expect(stickyElements).toHaveLength(6) // 3 headers + 3 cells with sticky

      // Check alignments are applied
      expect(screen.getByText('Header 2').closest('th')).toHaveClass('text-center')
      expect(screen.getByText('Data 2').closest('td')).toHaveClass('text-center')
      expect(screen.getByText('Actions').closest('th')).toHaveClass('text-right')
      expect(screen.getByText('Action').closest('td')).toHaveClass('text-right')
    })

    it('handles multiple rows with different click handlers', () => {
      const row1Click = vi.fn()
      const row2Click = vi.fn()
      const cellClick = vi.fn()

      render(
        <Table>
          <TableBody>
            <TableRow onClick={row1Click}>
              <TableCell>Row 1 Cell 1</TableCell>
              <TableCell onClick={cellClick}>Row 1 Cell 2</TableCell>
            </TableRow>
            <TableRow onClick={row2Click}>
              <TableCell>Row 2 Cell 1</TableCell>
              <TableCell>Row 2 Cell 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )


      const rows = document.querySelectorAll('tr')
      const cells = document.querySelectorAll('td')

      // Click row 1
      fireEvent.click(rows[0])
      expect(row1Click).toHaveBeenCalled()

      // Click cell with its own handler (should still trigger row click too in real DOM)
      fireEvent.click(cells[1])
      expect(cellClick).toHaveBeenCalled()

      // Click row 2
      fireEvent.click(rows[1])
      expect(row2Click).toHaveBeenCalled()
    })

    it('handles empty table gracefully', () => {
      render(<Table><tbody><tr><td>Test</td></tr></tbody></Table>)

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(document.querySelector('thead')).not.toBeInTheDocument()
      expect(document.querySelector('tbody')).toBeInTheDocument()
    })
  })
})
