import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { db } from "../db/index";
import { jobs, applications } from "../db/schema";
import { eq, desc, and, like } from "drizzle-orm";

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// Routes

// GET: Liste des postes actifs
app.get("/api/jobs", async (req, res) => {
  try {
    const { category, type, location, search } = req.query;
    
    let query = db.select().from(jobs).where(eq(jobs.isActive, 1));
    
    if (category) {
      query = query.where(eq(jobs.category, category as string));
    }
    
    if (type) {
      query = query.where(eq(jobs.type, type as string));
    }
    
    if (location) {
      query = query.where(like(jobs.location, `%${location}%`));
    }
    
    if (search) {
      const searchTerm = search as string;
      query = query.where(
        and(
          eq(jobs.isActive, 1),
          like(jobs.title, `%${searchTerm}%`)
        )
      );
    }
    
    const jobList = await query.orderBy(desc(jobs.postedAt));
    
    res.json(jobList);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET: Détails d'un poste
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await db.select().from(jobs).where(eq(jobs.id, parseInt(id))).limit(1);
    
    if (job.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.json(job[0]);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// POST: Soumettre une candidature
app.post("/api/applications", async (req, res) => {
  try {
    const { jobId, name, email, resumeUrl, message } = req.body;
    
    // Validation
    if (!name || !email || !resumeUrl) {
      return res.status(400).json({ error: "Name, email, and resume are required" });
    }
    
    const newApplication = await db.insert(applications).values({
      jobId: jobId ? parseInt(jobId) : null,
      name,
      email,
      resumeUrl,
      message: message || null,
    });
    
    res.status(201).json({
      id: newApplication[0].insertId,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
});

// GET: Liste des candidatures (admin)
app.get("/api/admin/applications", async (req, res) => {
  try {
    const allApplications = await db.select().from(applications).orderBy(desc(applications.appliedAt));
    res.json(allApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// GET: Liste des postes (admin)
app.get("/api/admin/jobs", async (req, res) => {
  try {
    const allJobs = await db.select().from(jobs).orderBy(desc(jobs.postedAt));
    res.json(allJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// POST: Créer un nouveau poste (admin)
app.post("/api/admin/jobs", async (req, res) => {
  try {
    const { title, category, type, location, description, requirements, salary } = req.body;
    
    // Validation
    if (!title || !category || !type || !location || !description || !requirements) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const newJob = await db.insert(jobs).values({
      title,
      category,
      type,
      location,
      description,
      requirements,
      salary: salary || null,
    });
    
    res.status(201).json({
      id: newJob[0].insertId,
      message: "Job created successfully",
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// PUT: Mettre à jour un poste (admin)
app.put("/api/admin/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, type, location, description, requirements, salary, isActive } = req.body;
    
    const updatedJob = await db
      .update(jobs)
      .set({
        title: title || undefined,
        category: category || undefined,
        type: type || undefined,
        location: location || undefined,
        description: description || undefined,
        requirements: requirements || undefined,
        salary: salary || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      })
      .where(eq(jobs.id, parseInt(id)));
    
    if (updatedJob.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// DELETE: Supprimer un poste (admin)
app.delete("/api/admin/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.delete(jobs).where(eq(jobs.id, parseInt(id)));
    
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// Middleware pour les erreurs
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
