import React from 'react';
import { useParams } from 'react-router-dom';

function BoardView() {
  const { boardId } = useParams();

  return (
    <div>
      <h1>Board View</h1>
      <p>You are viewing board: {boardId}</p>
    </div>
  );
}

export default BoardView;
