export type SkillCategory = {
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Cloud & Infrastructure",
    skills: ["Linux", "AWS", "EC2", "S3", "IAM", "VPC / Networking", "CloudWatch", "Nginx"],
  },
  {
    label: "DevOps & Automation",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Bash", "Terraform", "Kubernetes"],
  },
  {
    label: "Backend",
    skills: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "SQL", "SQLAlchemy", "Alembic"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "AWS CLI", "Docker CLI", "Postman"],
  },
];
