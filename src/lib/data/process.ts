export type ProcessStep = {
  index: string;
  title: string;
  summary: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Plan",
    summary: "Understand the problem and define the system.",
    detail:
      "Before writing code, I map out what the system actually needs to do — the data, the users, the failure modes — so the architecture isn't a guess.",
  },
  {
    index: "02",
    title: "Build",
    summary: "Write the application and make it work.",
    detail:
      "APIs, database models, auth, payments — built with FastAPI and PostgreSQL, tested against real usage rather than happy-path demos.",
  },
  {
    index: "03",
    title: "Deploy",
    summary: "Containerize it, automate deployment, and put it on infrastructure.",
    detail:
      "Docker images, deployment portals, and CI pipelines that take a build from a laptop to a running service without manual steps.",
  },
  {
    index: "04",
    title: "Operate",
    summary: "Monitor it, troubleshoot it, and improve it.",
    detail:
      "Logs, metrics, and archival so I know when something breaks — and can trace why — instead of finding out from a user.",
  },
];
