/**
 * Utility function to merge class names
 * Similar to clsx or classnames
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

