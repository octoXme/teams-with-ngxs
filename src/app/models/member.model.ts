export interface IMember {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  jobTitle: string;
  skills: ISkillRating;
}

export enum Position {
  UX_DESIGNER = 'UX Designer',
  SENIOR_PRODUCT_DESIGNER = 'Senior Product Designer',
  DEVELOPER = 'Developer',
  FRONT_END_DEVELOPER = 'Front-End Developer',
  SENIOR_DEVELOPER = 'Senior Developer',
}

export interface ISkillRating {
  backend: number; // Serverless, AWS, API, Data-structures, JS/TS, Git
  frontend: number; // Web app frameworks, Design, Styling, TDD
  architecture: number; // Serverless, Microservice, SOLID, DRY, IoC, DI, Enterprise messaging, CQRS, Event-Sourcing
  infrastructure: number; // VMs, Containers, Networking, Subnetting, Firewalls, Linux, Bash, Windows-server, Powershell
  design: number; // Wireframes, Mocks, LowFid, HighFid, Prototypes
  research: number; // problem discovery, Customer research, Requirement gathering
  qualityAssurance: number; // Auditing & Testing, Drafting & Implementing quality procedures, test automation, BDD
  leaderShip: number; // Ability to inspire a team to achieve a goal. Influencing, Empowering, Motivating
  mentorship: number; // Coaching, Sharing & Development of others skills
}
