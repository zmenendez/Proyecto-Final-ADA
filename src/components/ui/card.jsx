export function Card({ children, className = "" }) {
  return <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ children, className = "" }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-semibold leading-tight ${className}`}>{children}</h3>
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = "" }) {
  return <div className={`p-4 border-t ${className}`}>{children}</div>
}
