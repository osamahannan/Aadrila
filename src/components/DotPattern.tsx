const DotPattern = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`dot-grid ${className}`}>
      {Array.from({ length: 36 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}

export default DotPattern
