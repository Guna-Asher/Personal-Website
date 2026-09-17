export type ProjectStatus = "shipped" | "building";

export type Project = {
  index: string;
  title: string;
  type: string;
  oneLiner: string;
  description: string;
  tech: string[];
  github: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Strangers Club",
    type: "Product — Full-Stack Application",
    oneLiner: "A real-world cricket match platform.",
    description:
      "A full-stack platform for organizing cricket matches, teams, waitlists, and payments handled end to end behind an authenticated REST API.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Authentication", "Payments"],
    github: "https://github.com/Guna-Asher/Stranger-Club",
    status: "shipped",
  },
  {
    index: "02",
    title: "Self-Service Deployment Portal",
    type: "Platform — Internal Tooling",
    oneLiner: "An internal platform for deploying versioned Docker images.",
    description:
      "A web interface for registering applications and Docker image versions, deploying them on demand, rolling back safely, and keeping an audit trail of every action.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Docker Compose", "Rollback", "Audit Logging"],
    github: "https://github.com/Guna-Asher/Self-Service-Deployment-Portal",
    status: "shipped",
  },
  {
    index: "03",
    title: "AWS Log Monitoring & Archival System",
    type: "Automation — Cloud Pipeline",
    oneLiner: "Processing, extracting, and archiving logs on AWS.",
    description:
      "A practical AWS and Linux project that processes application logs, extracts errors for visibility, and archives log artifacts to S3 on a schedule.",
    tech: ["AWS EC2", "AWS S3", "AWS IAM", "Python", "Bash", "Linux", "Docker", "GitHub Actions"],
    github: "https://github.com/Guna-Asher/aws-log-monitoring-project",
    status: "shipped",
  },
  {
    index: "04",
    title: "Portfolio Infrastructure Platform",
    type: "Infrastructure — In Progress",
    oneLiner: "This website, becoming its own infrastructure project.",
    description:
      "This portfolio is the workload for an ongoing infrastructure build taking it from a Git repository to a containerized, monitored, CI/CD-deployed service on real cloud infrastructure.",
    tech: ["Docker", "AWS EC2", "Nginx", "GitHub Actions", "Terraform", "CI/CD"],
    github: "https://github.com/Guna-Asher",
    status: "building",
  },
];
