import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { jobs, applications } from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/job_platform";
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);

async function seed() {
  console.log("Starting database seeding...");

  try {
    // Seed jobs
    const jobData = [
      {
        title: "Senior Software Engineer",
        category: "Engineering",
        type: "full-time",
        location: "Remote",
        description: "We are looking for an experienced Senior Software Engineer to join our team. You will be responsible for designing and implementing scalable solutions.",
        requirements: "- 5+ years of experience in software development\n- Strong knowledge of Node.js and TypeScript\n- Experience with React and modern frontend frameworks\n- Excellent problem-solving skills",
        salary: "$120,000 - $150,000 per year",
        isActive: 1,
      },
      {
        title: "Product Designer",
        category: "Design",
        type: "full-time",
        location: "San Francisco, CA",
        description: "Join our design team to create beautiful and intuitive user experiences. You will work closely with product managers and engineers.",
        requirements: "- 3+ years of product design experience\n- Proficiency in Figma and other design tools\n- Strong portfolio showcasing your work\n- Excellent communication skills",
        salary: "$90,000 - $110,000 per year",
        isActive: 1,
      },
      {
        title: "Marketing Manager",
        category: "Marketing",
        type: "full-time",
        location: "New York, NY",
        description: "Lead our marketing efforts and drive growth through innovative campaigns and strategies.",
        requirements: "- 5+ years of marketing experience\n- Proven track record of successful campaigns\n- Strong analytical and strategic thinking skills\n- Experience with digital marketing tools",
        salary: "$85,000 - $105,000 per year",
        isActive: 1,
      },
      {
        title: "Frontend Developer",
        category: "Engineering",
        type: "contract",
        location: "Remote",
        description: "Contract position for a skilled frontend developer to work on our new web application.",
        requirements: "- 3+ years of frontend development experience\n- Strong knowledge of React and TypeScript\n- Experience with Tailwind CSS\n- Ability to work independently",
        salary: "$60,000 - $80,000 per year",
        isActive: 1,
      },
      {
        title: "UX Researcher",
        category: "Design",
        type: "part-time",
        location: "Boston, MA",
        description: "Part-time position for a UX researcher to conduct user research and usability testing.",
        requirements: "- 2+ years of UX research experience\n- Strong analytical skills\n- Experience with research methodologies\n- Excellent communication skills",
        salary: "$40,000 - $50,000 per year",
        isActive: 1,
      },
    ];

    for (const job of jobData) {
      await db.insert(jobs).values(job);
    }

    // Seed applications
    const applicationData = [
      {
        jobId: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        resumeUrl: "https://example.com/resumes/john-doe.pdf",
        message: "I am excited about this opportunity and believe my experience aligns well with your requirements.",
        status: "pending",
      },
      {
        jobId: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        resumeUrl: "https://example.com/resumes/jane-smith.pdf",
        message: "I have extensive experience in product design and would love to contribute to your team.",
        status: "reviewed",
      },
      {
        jobId: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        resumeUrl: "https://example.com/resumes/bob-johnson.pdf",
        message: "I am passionate about marketing and have a proven track record of driving growth.",
        status: "accepted",
      },
      {
        jobId: 4,
        name: "Alice Brown",
        email: "alice.brown@example.com",
        resumeUrl: "https://example.com/resumes/alice-brown.pdf",
        message: "I am a skilled frontend developer with experience in React and TypeScript.",
        status: "rejected",
      },
    ];

    for (const application of applicationData) {
      await db.insert(applications).values(application);
    }

    console.log("✓ Database seeding completed successfully");
  } catch (error) {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
