import '@testing-library/jest-dom';

class ResizeObserver {
  observe() {
    // no-op
  }

  unobserve() {
    // no-op
  }

  disconnect() {
    // no-op
  }
}

// @ts-expect-error Global assignment for jsdom environment
global.ResizeObserver = ResizeObserver;
