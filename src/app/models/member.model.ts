export interface IMember {
  id: string | undefined;
  name: string | undefined;
  email: string;
  avatar: string | undefined;
  position: string | undefined;
  skills: ISkillRating | undefined;
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
  leadership: number; // Ability to inspire a team to achieve a goal. Influencing, Empowering, Motivating
  mentorship: number; // Coaching, Sharing & Development of others skills
}

export const SkillDescription = new Map<string, string>([
  ['backend', 'Serverless, AWS, API, Data-structures, JS/TS, Git'],
  ['frontend', 'Web app frameworks, Design, Styling, TDD'],
  [
    'architecture',
    'Serverless, Microservice, SOLID, DRY, IoC, DI, Enterprise messaging, CQRS, Event-Sourcing',
  ],
  [
    'infrastructure',
    'VMs, Containers, Networking, Subnetting, Firewalls, Linux, Bash, Windows-server, Powershell',
  ],
  ['design', 'Wireframes, Mocks, LowFid, HighFid, Prototypes'],
  ['research', 'Problem discovery, Customer research, Requirement gathering'],
  [
    'qualityAssurance',
    'Auditing & Testing, Drafting & Implementing quality procedures, test automation, BDD',
  ],
  [
    'leadership',
    'Ability to inspire a team to achieve a goal. Influencing, Empowering, Motivating',
  ],
  ['mentorship', 'Coaching, Sharing & Development of others skills'],
]);

export const SkillName = new Map<string, string>([
  ['backend', 'Backend'],
  ['frontend', 'Frontend'],
  ['architecture', 'Architecture'],
  ['infrastructure', 'Infrastructure'],
  ['design', 'Design'],
  ['research', 'Research'],
  ['qualityAssurance', 'Quality Assurance'],
  ['leadership', 'Leadership'],
  ['mentorship', 'Mentorship'],
]);
