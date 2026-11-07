export function formatCurrencyINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getDaysRemaining(deadlineStr: string): {
  days: number;
  label: string;
  isUrgent: boolean;
  isExpired: boolean;
} {
  try {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    // Normalize to date boundary
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        days: diffDays,
        label: 'Deadline closed',
        isUrgent: false,
        isExpired: true
      };
    }
    if (diffDays === 0) {
      return {
        days: 0,
        label: 'Last Day today!',
        isUrgent: true,
        isExpired: false
      };
    }
    if (diffDays === 1) {
      return {
        days: 1,
        label: '1 day remaining!',
        isUrgent: true,
        isExpired: false
      };
    }
    return {
      days: diffDays,
      label: `${diffDays} days left`,
      isUrgent: diffDays <= 7,
      isExpired: false
    };
  } catch {
    return {
      days: 30,
      label: 'Open',
      isUrgent: false,
      isExpired: false
    };
  }
}

export function formatDateReadable(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}
