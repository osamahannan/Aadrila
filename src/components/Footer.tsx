const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white py-10 relative overflow-hidden">
      {/* Curved wave at top */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 Q360,20 720,50 T1440,30 L1440,0 L0,0 Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-8">
        {/* Copyright and Company Info */}
        <div className="space-y-4">
          <p className="text-[14px] text-white/90">
            © 2025 by Aadrila Technologies Private Limited CIN U74999UP2017PTC094688
          </p>
          <div className="text-[14px] text-white/80 leading-relaxed">
            <p>Registered Address: B-1, 127/K, Sector- K Aliganj, Lucknow, Lucknow,</p>
            <p>Uttar Pradesh, India. 226024</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
