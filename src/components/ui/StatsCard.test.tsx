import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import { StatsCard, CompactStatsCard } from './StatsCard'

// Mock the cn utility
vi.mock('@/lib/utils/common', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}))

describe('StatsCard', () => {
  describe('StatsCard component', () => {
    it('renders without crashing', () => {
      render(<StatsCard label="Test Label" value="42" />)
      expect(screen.getByText('Test Label')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders with required props', () => {
      const label = 'Total Users'
      const value = '1,234'

      render(<StatsCard label={label} value={value} />)

      expect(screen.getByText(label)).toBeInTheDocument()
      expect(screen.getByText(value)).toBeInTheDocument()
    })

    it('renders label with correct styling', () => {
      render(<StatsCard label="Test Label" value="42" />)

      const label = screen.getByText('Test Label')
      expect(label).toHaveClass('font-normal', 'leading-[16px]', 'text-[#021337]', 'text-[12px]', 'whitespace-nowrap')
    })

    it('renders value with correct styling', () => {
      render(<StatsCard label="Test" value="42" />)

      const value = screen.getByText('42')
      expect(value).toHaveClass('font-semibold', 'leading-[20px]', 'text-[14px]', 'whitespace-nowrap', 'text-[#021337]')
    })

    describe('value colors', () => {
      const colorTests = [
        { color: 'default', expectedClass: 'text-[#021337]' },
        { color: 'primary', expectedClass: 'text-[#ff3b34]' },
        { color: 'positive', expectedClass: 'text-[#00a349]' },
        { color: 'negative', expectedClass: 'text-[#e5240c]' }
      ] as const

      colorTests.forEach(({ color, expectedClass }) => {
        it(`renders ${color} color correctly`, () => {
          render(<StatsCard label="Test" value="42" valueColor={color} />)

          const value = screen.getByText('42')
          expect(value).toHaveClass(expectedClass)
        })
      })
    })

    it('renders with custom className', () => {
      const customClass = 'custom-stats-class'
      render(<StatsCard label="Test" value="42" className={customClass} />)

      const container = screen.getByText('Test').closest('div')
      expect(container).toHaveClass(customClass)
    })

    describe('border', () => {
      it('does not show border by default', () => {
        render(<StatsCard label="Test" value="42" />)

        const container = screen.getByText('Test').closest('div')
        expect(container).not.toHaveClass('border-l', 'border-[#cfd6de]')
      })

      it('shows border when showBorder is true', () => {
        render(<StatsCard label="Test" value="42" showBorder={true} />)

        const container = screen.getByText('Test').closest('div')
        expect(container).toHaveClass('border-l', 'border-[#cfd6de]')
      })
    })

    describe('container styling', () => {
      it('has correct base container classes', () => {
        render(<StatsCard label="Test" value="42" />)

        const container = screen.getByText('Test').closest('div')
        expect(container).toHaveClass(
          'flex',
          'gap-[8px]',
          'items-center',
          'px-[16px]',
          'py-[8px]',
          'shrink-0'
        )
      })
    })

    describe('value types', () => {
      it('renders string values', () => {
        render(<StatsCard label="Test" value="string value" />)
        expect(screen.getByText('string value')).toBeInTheDocument()
      })

      it('renders number values', () => {
        render(<StatsCard label="Test" value={42} />)
        expect(screen.getByText('42')).toBeInTheDocument()
      })

      it('renders zero values', () => {
        render(<StatsCard label="Test" value={0} />)
        expect(screen.getByText('0')).toBeInTheDocument()
      })
    })

    describe('conditional rendering', () => {
      it('renders label when provided', () => {
        render(<StatsCard label="Visible Label" value="42" />)
        expect(screen.getByText('Visible Label')).toBeInTheDocument()
      })

      it('does not render label when empty', () => {
        render(<StatsCard label="" value="42" />)
        // When label is empty string, it should not render a label element
        const labelElements = document.querySelectorAll('p')
        const hasEmptyLabel = Array.from(labelElements).some(el => el.textContent === '')
        expect(hasEmptyLabel).toBe(false)
      })

      it('renders value when provided', () => {
        render(<StatsCard label="Test" value="Visible Value" />)
        expect(screen.getByText('Visible Value')).toBeInTheDocument()
      })

      it('does not render value when empty string', () => {
        render(<StatsCard label="Test" value="" />)
        // When value is empty string, it should not render a value element
        const valueElements = document.querySelectorAll('p')
        const hasEmptyValue = Array.from(valueElements).some(el => el.textContent === '')
        expect(hasEmptyValue).toBe(false)
      })
    })
  })

  describe('CompactStatsCard component', () => {
    it('renders without crashing', () => {
      render(<CompactStatsCard label="Test Label" value="42" />)
      expect(screen.getByText('Test Label')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders with required props', () => {
      const label = 'Compact Label'
      const value = '99'

      render(<CompactStatsCard label={label} value={value} />)

      expect(screen.getByText(label)).toBeInTheDocument()
      expect(screen.getByText(value)).toBeInTheDocument()
    })

    it('renders label with correct styling', () => {
      render(<CompactStatsCard label="Test Label" value="42" />)

      const label = screen.getByText('Test Label')
      expect(label).toHaveClass('text-[10px]', 'font-normal', 'leading-[14px]', 'text-[#677187]', 'text-center', 'w-[83px]')
    })

    it('renders value with correct styling', () => {
      render(<CompactStatsCard label="Test" value="42" />)

      const value = screen.getByText('42')
      expect(value).toHaveClass('text-[18px]', 'font-semibold', 'leading-[26px]', 'w-[73px]', 'text-[#021337]')
    })

    describe('value colors', () => {
      const colorTests = [
        { color: 'default', expectedClass: 'text-[#021337]' },
        { color: 'positive', expectedClass: 'text-[#00a349]' },
        { color: 'warning', expectedClass: 'text-[#f59e0b]' },
        { color: 'negative', expectedClass: 'text-[#e5240c]' }
      ] as const

      colorTests.forEach(({ color, expectedClass }) => {
        it(`renders ${color} color correctly`, () => {
          render(<CompactStatsCard label="Test" value="42" valueColor={color} />)

          const value = screen.getByText('42')
          expect(value).toHaveClass(expectedClass)
        })
      })
    })

    describe('percentage', () => {
      it('does not render percentage by default', () => {
        render(<CompactStatsCard label="Test" value="42" />)

        const value = screen.getByText('42')
        expect(value.parentElement?.children).toHaveLength(1)
      })

      it('renders percentage when provided', () => {
        const percentage = '+15%'
        render(<CompactStatsCard label="Test" value="42" percentage={percentage} />)

        expect(screen.getByText(percentage)).toBeInTheDocument()
      })

      it('renders percentage with default color when valueColor is default', () => {
        render(<CompactStatsCard label="Test" value="42" percentage="+10%" valueColor="default" />)

        const percentage = screen.getByText('+10%')
        expect(percentage).toHaveClass('text-[#677187]')
      })

      it('renders percentage with matching color when valueColor is not default', () => {
        render(<CompactStatsCard label="Test" value="42" percentage="+10%" valueColor="positive" />)

        const percentage = screen.getByText('+10%')
        expect(percentage).toHaveClass('text-[#00a349]')
      })

      it('renders percentage with correct styling', () => {
        render(<CompactStatsCard label="Test" value="42" percentage="+10%" />)

        const percentage = screen.getByText('+10%')
        expect(percentage).toHaveClass('text-[12px]', 'font-normal', 'leading-4', 'text-center', 'whitespace-nowrap')
      })
    })

    it('renders with custom className', () => {
      const customClass = 'custom-compact-class'
      render(<CompactStatsCard label="Test" value="42" className={customClass} />)

      // Find the main container by its flex-col class
      const container = document.querySelector('.flex.flex-col.items-center.justify-center')
      expect(container).toHaveClass(customClass)
    })

    describe('container styling', () => {
      it('has correct base container classes', () => {
        render(<CompactStatsCard label="Test" value="42" />)

        const container = document.querySelector('.flex.flex-col.items-center.justify-center')
        expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center')
      })
    })

    describe('layout structure', () => {
      it('has panel section with correct styling', () => {
        render(<CompactStatsCard label="Test" value="42" />)

        const label = screen.getByText('Test')
        const panel = label.parentElement
        expect(panel).toHaveClass('flex', 'gap-2', 'items-center', 'justify-center', 'px-3', 'pt-2', 'pb-0', 'w-full', 'rounded-tl-md', 'rounded-tr-md')
      })

      it('has content section with correct styling', () => {
        render(<CompactStatsCard label="Test" value="42" />)

        const value = screen.getByText('42')
        const content = value.parentElement
        expect(content).toHaveClass('flex', 'flex-col', 'gap-1', 'items-center', 'justify-center', 'px-3', 'pt-0', 'pb-2', 'rounded-[5px]', 'w-full', 'overflow-hidden')
      })
    })

    describe('value types', () => {
      it('renders string values', () => {
        render(<CompactStatsCard label="Test" value="string value" />)
        expect(screen.getByText('string value')).toBeInTheDocument()
      })

      it('renders number values', () => {
        render(<CompactStatsCard label="Test" value={42} />)
        expect(screen.getByText('42')).toBeInTheDocument()
      })
    })
  })

  describe('edge cases', () => {
    describe('StatsCard', () => {
      it('handles empty label and value', () => {
        render(<StatsCard label="" value="" />)

        // Should render empty but still have structure
        const container = document.querySelector('.flex.gap-\\[8px\\]')
        expect(container).toBeInTheDocument()
      })

      it('handles long text content', () => {
        const longLabel = 'This is a very long label that should still render properly'
        const longValue = '1,234,567.89'

        render(<StatsCard label={longLabel} value={longValue} />)

        expect(screen.getByText(longLabel)).toBeInTheDocument()
        expect(screen.getByText(longValue)).toBeInTheDocument()
      })

      it('maintains stability across re-renders', () => {
        const { rerender } = render(<StatsCard label="First" value="100" />)

        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()

        rerender(<StatsCard label="Second" value="200" />)

        expect(screen.getByText('Second')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
      })
    })

    describe('CompactStatsCard', () => {
      it('handles empty percentage', () => {
        render(<CompactStatsCard label="Test" value="42" percentage="" />)

        const value = screen.getByText('42')
        expect(value.parentElement?.children).toHaveLength(1)
      })

      it('handles special characters in percentage', () => {
        render(<CompactStatsCard label="Test" value="42" percentage="↑ 15.5%" />)

        expect(screen.getByText('↑ 15.5%')).toBeInTheDocument()
      })

      it('maintains stability across re-renders', () => {
        const { rerender } = render(<CompactStatsCard label="First" value="100" />)

        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()

        rerender(<CompactStatsCard label="Second" value="200" percentage="+10%" />)

        expect(screen.getByText('Second')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()
        expect(screen.getByText('+10%')).toBeInTheDocument()
      })
    })
  })

  describe('accessibility', () => {
    it('StatsCard has proper text contrast', () => {
      render(<StatsCard label="Test Label" value="42" />)

      const label = screen.getByText('Test Label')
      const value = screen.getByText('42')

      // Elements should be visible (basic accessibility check)
      expect(label).toBeVisible()
      expect(value).toBeVisible()
    })

    it('CompactStatsCard has proper text hierarchy', () => {
      render(<CompactStatsCard label="Test Label" value="42" />)

      const label = screen.getByText('Test Label')
      const value = screen.getByText('42')

      expect(label).toBeVisible()
      expect(value).toBeVisible()
    })
  })
})
