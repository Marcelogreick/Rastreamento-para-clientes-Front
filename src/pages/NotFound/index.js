import React from "react";

import logoImg from "../../assets/logofb.png";

import "./styles.css";

export default function NotFound() {
  return (
    <div className="container-not">
      <img src={logoImg} alt="logo" />
      <h4>Page not found</h4>
    </div>
  );
}
