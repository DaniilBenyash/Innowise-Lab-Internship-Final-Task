export type Project = {
  id: string;
  name: string;
  internalName: string;
  domain: string;
  startDate: string;
  endDate: string;
  teamSize: string;
  description: string;
};

export type RequestedProject = Omit<Project, "id">;
