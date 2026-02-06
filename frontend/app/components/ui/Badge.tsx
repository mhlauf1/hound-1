type BadgeProps = {
  children: React.ReactNode
  className?: string
}

export default function Badge({children, className = ''}: BadgeProps) {
  return (
    <span
      className={`font-sans font-medium text-[13px] leading-none tracking-[0.1em] uppercase ${className}`}
    >
      {children}
    </span>
  )
}
