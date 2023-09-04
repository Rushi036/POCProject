import React from "react";

const PageHeading = (props: any) => {
  return (
    <div className="page-title-box">
      <h4 className="page-title">{props.title}</h4>
    </div>
  );
};

export default PageHeading;
