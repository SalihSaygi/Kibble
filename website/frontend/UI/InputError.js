import React from "react";


// @todo verify with designer what color this should be
export const InputErrorMsg = ({ children }) => {
  return (
    <div className={`flex text-secondary`}>
      {children}
    </div>
  );
};