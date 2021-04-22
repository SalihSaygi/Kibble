import React, { forwardRef } from "react";

export const Input = forwardRef(
  ({ className, textarea, error, transparent, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-700`;
    const ring = error ? `ring-1 ring-secondary` : "";
    const cn = `w-full py-2 px-4 rounded-8 text-primary-100 placeholder-primary-300 focus:outline-none ${bg} ${ring} ${className} `;

    return textarea ? (
      <textarea
        ref={ref}
        className={cn}
        {...(props)}
        data-testid="textarea"
      />
    ) : (
      <input ref={ref} className={cn} {...props} data-testid="input" />
    );
  }
);

Input.displayName = "Input";