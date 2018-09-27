import * as React from "react";
import { Link } from "react-router-dom";
import { BackButtonProps } from "./back-button.props";
const BackButton = ({ label, path }: BackButtonProps) => {
  return (
    <Link to={path} className="btn btn-danger ">
      {label}
    </Link>
  );
};

export default BackButton;
