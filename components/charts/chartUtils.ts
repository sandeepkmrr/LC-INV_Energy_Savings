const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export interface DeltaSummary {
  delta: number;
  deltaPct: number;
}

export function calculateDelta(baseline: number, inv: number): DeltaSummary {
  const delta = baseline - inv;
  const deltaPct = baseline === 0 ? 0 : (delta / baseline) * 100;
  return {
    delta,
    deltaPct,
  };
}

export function formatValueWithUnit(value: number, unit: string): string {
  if (unit === '$') {
    return currencyFormatter.format(value);
  }

  if (unit) {
    return `${numberFormatter.format(value)} ${unit}`;
  }

  return numberFormatter.format(value);
}

export function formatCompactValue(value: number): string {
  const absolute = Math.abs(value);

  if (absolute >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }

  if (absolute >= 1_000) {
    return `${Math.round(value / 1_000)}k`;
  }

  return `${value}`;
}

export function formatPercentage(value: number): string {
  return `${percentFormatter.format(value)}%`;
}
