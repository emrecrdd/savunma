const Section = ({ children, title, subtitle, className = '' }) => {
  return (
    <section className={`section-padding ${className}`}>
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="animate-fade-in">{title}</h2>}
            {subtitle && <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section