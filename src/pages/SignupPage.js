import React, { useState } from 'react';
import useAuthStore from '../stores/authStore';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signup = useAuthStore((state) => state.signup);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Attempting to sign up with:', email, password);

    try {
      await signup(email, password);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed: ' + error.message);
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
