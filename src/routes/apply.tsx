import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

// Submit application function
const submitApplication = async (applicationData) => {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    throw new Error('Failed to submit application');
  }
  return response.json();
};

export const Route = createFileRoute('/apply')({
  component: Apply,
});

function Apply() {
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    resumeUrl: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitApplication(applicationData);
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Spontaneous Application</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={applicationData.name}
          onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={applicationData.email}
          onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          type="text"
          name="resumeUrl"
          placeholder="Resume URL (PDF)"
          value={applicationData.resumeUrl}
          onChange={(e) => setApplicationData({ ...applicationData, resumeUrl: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <textarea
          name="message"
          placeholder="Cover letter (optional)"
          value={applicationData.message}
          onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
          className="border p-2 rounded mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
}
