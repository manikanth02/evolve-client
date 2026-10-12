import React from 'react';

export const FormField = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  options = [], // for type="select"
  rows = 4, // for type="textarea"
  helperText,
  disabled = false,
  className = ''
}) => {
  const baseInputStyles = `
    w-full px-4 py-3 rounded-xl bg-forest-950/70 border text-cream-50 placeholder-cream-200/40 text-sm
    focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500/80 focus:ring-red-400' : 'border-forest-700/80 hover:border-gold-500/50'}
  `;

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wider text-cream-200/90 flex items-center justify-between">
          <span>{label} {required && <span className="text-gold-400">*</span>}</span>
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${baseInputStyles} resize-y`}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={baseInputStyles}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} className="bg-forest-950 text-cream-50">
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputStyles}
        />
      )}

      {helperText && !error && (
        <p className="text-[11px] text-cream-200/50">
          {helperText}
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
