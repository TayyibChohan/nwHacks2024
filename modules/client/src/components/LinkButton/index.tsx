import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonProps } from 'reshaped'

export function LinkButton({
  children,
  to,
  linkClass,
  ...props
}: { to: string; linkClass?: string } & ButtonProps): ReactElement {
  return (
    <Link className={linkClass} to={to}>
      <Button {...props}>{children}</Button>
    </Link>
  )
}
