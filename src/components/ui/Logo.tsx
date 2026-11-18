interface LogoProps {
  className?: string
  light?: boolean
}

export default function Logo({ className = '', light }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className={`h-9 w-9 ${light ? 'text-white' : 'text-primary-600'}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M12 14L20 28L28 14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="14" r="2" fill="currentColor" />
      </svg>
      <span className={`font-headings text-lg font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
        Вояджър
      </span>
    </div>
  )
}
