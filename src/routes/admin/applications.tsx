import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch applications function
const fetchApplications = async () => {
  const response = await fetch('/api/admin/applications');
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  return response.json();
};

// Update application status function
const updateApplicationStatus = async (applicationId, status) => {
  const response = await fetch(`/api/admin/applications/${applicationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update application status');
  }
  return response.json();
};

export const Route = createFileRoute('/admin/applications')({
  component: AdminApplications,
});

function AdminApplications() {
  const queryClient = useQueryClient();
  const { data: applications, isLoading, error } = useQuery(['admin-applications'], fetchApplications);

  const updateMutation = useMutation(updateApplicationStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-applications']);
    },
  });

  const handleStatusChange = (applicationId, newStatus) => {
    updateMutation.mutate({
      applicationId,
      status: newStatus,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">View Applications</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {applications && (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Job ID</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Applied At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="border p-2">{application.id}</td>
                <td className="border p-2">{application.name}</td>
                <td className="border p-2">{application.email}</td>
                <td className="border p-2">{application.job_id || 'Spontaneous'}</td>
                <td className="border p-2">
                  <select
                    value={application.status}
                    onChange={(e) => handleStatusChange(application.id, e.target.value)}
                    className="p-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="border p-2">{application.message || 'N/A'}</td>
                <td className="border p-2">{new Date(application.applied_at).toLocaleString()}</td>
                <td className="border p-2">
                  <a href={application.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
