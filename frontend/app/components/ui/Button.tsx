import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: ButtonVariant
  className?: string
  onClick?: () => void
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-yellow text-green border-green hover:brightness-95 hover:scale-[1.02]',
  secondary:
    'bg-green text-cream border-green hover:opacity-90',
  outline:
    'bg-transparent text-green border-green hover:bg-green hover:text-cream',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium text-base tracking-[0.02em] px-8 py-3.5 rounded-full border transition-all duration-200'

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  )
}
