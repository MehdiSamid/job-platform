import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch jobs function
const fetchJobs = async () => {
  const response = await fetch('/api/admin/jobs');
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
};

// Create job function
const createJob = async (jobData) => {
  const response = await fetch('/api/admin/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error('Failed to create job');
  }
  return response.json();
};

// Update job function
const updateJob = async (jobId, jobData) => {
  const response = await fetch(`/api/admin/jobs/${jobId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) {
    throw new Error('Failed to update job');
  }
  return response.json();
};

// Delete job function
const deleteJob = async (jobId) => {
  const response = await fetch(`/api/admin/jobs/${jobId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
  return response.json();
};

export const Route = createFileRoute('/admin/jobs')({
  component: AdminJobs,
});

function AdminJobs() {
  const queryClient = useQueryClient();
  const { data: jobs, isLoading, error } = useQuery(['admin-jobs'], fetchJobs);

  const createMutation = useMutation(createJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-jobs']);
    },
  });

  const updateMutation = useMutation(updateJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-jobs']);
    },
  });

  const deleteMutation = useMutation(deleteJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-jobs']);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const jobData = {
      title: formData.get('title'),
      category: formData.get('category'),
      type: formData.get('type'),
      location: formData.get('location'),
      description: formData.get('description'),
      requirements: formData.get('requirements'),
      salary: formData.get('salary'),
    };
    createMutation.mutate(jobData);
  };

  const handleUpdate = (jobId, isActive) => {
    updateMutation.mutate({
      jobId,
      isActive: isActive ? 0 : 1,
    });
  };

  const handleDelete = (jobId) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteMutation.mutate(jobId);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Jobs</h2>
      <form onSubmit={handleCreate} className="border p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Create New Job</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g., full-time)"
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          className="border p-2 rounded mb-2 w-full"
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary (optional)"
          className="border p-2 rounded mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Job
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-2">Job List</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {jobs && (
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Active</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="border p-2">{job.id}</td>
                  <td className="border p-2">{job.title}</td>
                  <td className="border p-2">{job.category}</td>
                  <td className="border p-2">{job.type}</td>
                  <td className="border p-2">{job.location}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleUpdate(job.id, job.is_active)}
                      className={`p-1 rounded ${job.is_active ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {job.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
