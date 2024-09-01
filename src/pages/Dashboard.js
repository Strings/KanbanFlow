import React, { useState, useEffect } from 'react';
import { firestore as db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import useAuthStore from '../stores/authStore';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, 'boards'),
        where('owner', '==', currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setBoards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      return unsubscribe;
    }
  }, [currentUser]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      {boards.map((board) => (
        <div key={board.id}>
          <Link to={`/board/${board.id}`}>
            {board.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
