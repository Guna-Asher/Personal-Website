export type InfraStepStatus = "done" | "current" | "upcoming";

export type InfraStep = {
  label: string;
  detail: string;
  status: InfraStepStatus;
};

export const infraSteps: InfraStep[] = [
  { label: "Portfolio Website", detail: "Next.js site, in progress", status: "current" },
  { label: "Git", detail: "Version controlled from day one", status: "done" },
  { label: "Docker", detail: "Containerize the build", status: "upcoming" },
  { label: "AWS EC2", detail: "Provision the host", status: "upcoming" },
  { label: "Nginx", detail: "Reverse proxy in front of the container", status: "upcoming" },
  { label: "HTTPS / Domain", detail: "TLS and a real domain", status: "upcoming" },
  { label: "GitHub Actions CI/CD", detail: "Automate build and deploy on push", status: "upcoming" },
  { label: "Monitoring", detail: "Know when something breaks", status: "upcoming" },
  { label: "Terraform", detail: "Infrastructure as code", status: "upcoming" },
];
