export type InfraStepStatus = "current" | "upcoming";

export type InfraStep = {
  label: string;
  detail: string;
  status: InfraStepStatus;
};

export const infraSteps: InfraStep[] = [
  { label: "Application", detail: "Next.js portfolio, in progress", status: "current" },
  { label: "Docker", detail: "Containerize the build", status: "upcoming" },
  { label: "AWS", detail: "Provision the host on EC2", status: "upcoming" },
  { label: "Nginx", detail: "Reverse proxy in front of the container", status: "upcoming" },
  { label: "HTTPS", detail: "TLS and a real domain", status: "upcoming" },
  { label: "GitHub Actions", detail: "Automate build and deploy on push", status: "upcoming" },
  { label: "Monitoring", detail: "Know when something breaks", status: "upcoming" },
  { label: "Terraform", detail: "Infrastructure as code", status: "upcoming" },
];
