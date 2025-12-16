import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Area</h1>
      <Outlet />
    </div>
  );
}
