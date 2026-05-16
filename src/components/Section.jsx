const Section = ({ children, title, subtitle, className = '', id = '' }) => {
  return (
    <section 
      className={`section-padding ${className}`} 
      id={id}
      aria-label={title ? undefined : "İçerik bölümü"}
    >
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fade-in">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-400 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

export default Section