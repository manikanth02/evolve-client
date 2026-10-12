import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  to,
  href,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'gold', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none tracking-wide';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-semibold shadow-lg',
  };

  const variantStyles = {
    primary: 'bg-forest-900 text-cream-50 hover:bg-forest-800 border border-forest-700/60 shadow-forest-deep focus:ring-forest-600',
    secondary: 'bg-gold-500 text-forest-950 hover:bg-gold-400 font-semibold shadow-gold-glow focus:ring-gold-400',
    gold: 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-forest-950 font-semibold shadow-gold-glow hover:brightness-105 focus:ring-gold-400',
    outline: 'bg-transparent text-cream-100 border border-gold-500/50 hover:bg-gold-500/10 hover:border-gold-400 focus:ring-gold-400',
    outlineDark: 'bg-transparent text-forest-900 border border-forest-800/40 hover:bg-forest-900/5 hover:border-forest-900 focus:ring-forest-700',
    ghost: 'bg-transparent text-forest-900 hover:bg-forest-900/10 focus:ring-forest-600'
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`group ${combinedClasses}`} {...props}>
      {content}
    </button>
  );
};
