import Link from 'next/link';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'white'
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  children,
  href,
  type = "button",
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200'
  
  const variants = {
    primary: 'bg-primary hover:bg-secondary text-white',
    white: 'bg-white hover:bg-gray-100 text-primary',
  }
  
  const styles = clsx(baseStyles, variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={styles} type={type}
      >
      {children}
    </button>
  )
}