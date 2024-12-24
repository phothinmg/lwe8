import React from "react";
/**
 *
 * @param {{text?: string}} param0
 * @returns
 */
const PageView = ({ text }) => {
  const tx = text ?? "";
  return <div dangerouslySetInnerHTML={{ __html: tx }} />;
};

export default PageView;
