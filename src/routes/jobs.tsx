import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Fetch jobs function
const fetchJobs = async (filters) => {
  const response = await fetch(`/api/jobs?${new URLSearchParams(filters)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
};

export const Route = createFileRoute('/jobs')({
  component: Jobs,
});

function Jobs() {
  const [filters, setFilters] = useState({});
  const { data: jobs, isLoading, error } = useQuery(['jobs', filters], () => fetchJobs(filters));

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Open Positions</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <select name="category" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
        <select name="type" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* Job List */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {jobs && (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.category} - {job.type}</p>
              <p className="text-gray-500">{job.location}</p>
              <a href={`/jobs/${job.id}`} className="text-blue-500 hover:underline mt-2 inline-block">View Details</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
