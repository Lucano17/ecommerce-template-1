import React from 'react'

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({title, subtitle, className}:Props) => {
  return (
    <div>
      <h1>{title}</h1>
      {
        subtitle && (
          <h3>{subtitle}</h3>
        )
      }
    </div>
  )
}
