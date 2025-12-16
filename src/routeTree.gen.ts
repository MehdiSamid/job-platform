import { rootRoute } from './routes/__root'
import { jobsRoute } from './routes/jobs'
import { jobsJobIdRoute } from './routes/jobs/$jobId'
import { applyRoute } from './routes/apply'
import { adminRoute } from './routes/admin'
import { adminJobsRoute } from './routes/admin/jobs'
import { adminApplicationsRoute } from './routes/admin/applications'

export const routeTree = rootRoute.addChildren([
  jobsRoute.addChildren([jobsJobIdRoute]),
  applyRoute,
  adminRoute.addChildren([adminJobsRoute, adminApplicationsRoute]),
])
