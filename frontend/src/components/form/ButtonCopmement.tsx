import React from 'react'

export default function ButtonComponent({ type, children, className, onClick }: { type?: "button" | "submit", children: React.ReactNode, className?: string, onClick?: (e: any) => void }) {
  return (
    <button type={type} onClick={(e) => onClick && onClick(e)} className={`p-3 rounded-lg hover:cursor-pointer shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.5)] ${className ? className : 'bg-blue-500 text-white hover:bg-blue-600 '}`}>
      {children}
    </button>
  )
}
