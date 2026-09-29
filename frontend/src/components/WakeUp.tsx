'use client';
import { useEffect } from 'react';

export default function WakeUpBackend() {
  useEffect(() => {
    fetch('https://deeppr.onrender.com/api/v1/health')
      .then((res) => res.json())
      .then((data) => console.log('Backend is awake:', data))
      .catch((err) => console.log('Backend waking up...'));
  }, []);
  return null;
}
