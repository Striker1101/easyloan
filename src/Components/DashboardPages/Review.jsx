import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Review = () => {
  return (
    <div className="review d-none d-md-block">
      <div className="card border-primary mt-5" style={{ maxWidth: '18rem' }}>
        <div className="card-header bg-primary text-white">Reviews</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Review 1</li>
          <li className="list-group-item">Review 2</li>
          <li className="list-group-item">Review 3</li>
          {/* Add more reviews here */}
        </ul>
      </div>
    </div>
  );
};

export default Review;
