import React, { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Create a custom render function that includes providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Create a new QueryClient for each test to avoid state leakage
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock implementations for common hooks and utilities
export const mockUseMobile = vi.fn().mockReturnValue({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
})

export const mockUseAuth = vi.fn().mockReturnValue({
  user: null,
  isAuthenticated: false,
  login: vi.fn(),
  logout: vi.fn(),
  isLoading: false,
})

// Mock window.matchMedia for responsive design tests
export const mockMatchMedia = (matches: boolean = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// Mock localStorage
export const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  })
  return localStorageMock
}

// Mock sessionStorage
export const mockSessionStorage = () => {
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  }
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  })
  return sessionStorageMock
}

// Utility to create mock props
export const createMockProps = <T extends Record<string, any>>(
  overrides: Partial<T> = {},
): T => {
  const defaultProps = {} as T
  return { ...defaultProps, ...overrides }
}

// Utility to wait for component updates
export const waitForComponentUpdate = () => new Promise(resolve => setTimeout(resolve, 0))

// Export everything
export * from '@testing-library/react'
export { customRender as render }
