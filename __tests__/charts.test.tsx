import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  EnergyLineChart,
  calculateDelta,
} from '@/components/charts/EnergyLineChart';
import { LifecycleAreaChart } from '@/components/charts/LifecycleAreaChart';

const energySample = [
  { year: 1, baseline: 98000, inv: 75000 },
  { year: 2, baseline: 99960, inv: 76500 },
  { year: 3, baseline: 101959, inv: 78030 },
];

const lifecycleBaselineSample = [
  { year: 1, energy: 11760, maintenance: 800, capex: 0 },
  { year: 2, energy: 12000, maintenance: 800, capex: 0 },
];

const lifecycleInvSample = [
  { year: 1, energy: 9000, maintenance: 680, capex: 5000 },
  { year: 2, energy: 9180, maintenance: 680, capex: 0 },
];

describe('EnergyLineChart', () => {
  it('calculates delta and percent savings', () => {
    const { delta, deltaPct } = calculateDelta(1000, 750);
    expect(delta).toBe(250);
    expect(deltaPct).toBeCloseTo(25);
  });

  it('renders an accessible chart region', () => {
    render(
      <div style={{ width: 640, height: 320 }}>
        <EnergyLineChart
          data={energySample}
          metricLabel="Annual kWh"
          unit="kWh"
        />
      </div>
    );

    expect(
      screen.getByRole('img', {
        name: /Annual kWh/i,
      })
    ).toBeInTheDocument();
  });
});

describe('LifecycleAreaChart', () => {
  it('renders baseline and inverter compositions', () => {
    render(
      <div style={{ width: 640, height: 320 }}>
        <LifecycleAreaChart
          baselineData={lifecycleBaselineSample}
          invData={lifecycleInvSample}
          unit="$"
        />
      </div>
    );

    expect(
      screen.getByRole('img', {
        name: /Baseline System lifecycle cost composition/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', {
        name: /Daikin INV lifecycle cost composition/i,
      })
    ).toBeInTheDocument();
  });
});
