import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loader.css'; // Import the CSS file

const Loader = () => (
  <div className="loader">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;