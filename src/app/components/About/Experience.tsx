import { FaGraduationCap, FaSuitcase } from 'react-icons/fa';

interface TimelineItem {
  title: string;
  place: string;
  period: string;
  points: string[];
  current?: boolean;
}

const work: TimelineItem[] = [
  {
    title: 'Full Stack Developer',
    place: 'Nimo Industries, South Melbourne · Full-time',
    period: 'Jan 2025 - Present',
    current: true,
    points: [
      'Led the development and enhancement of core features for NIMO’s digital lending platform using React.js, Node.js and AWS, improving usability and streamlining lending operations.',
      'Improved user experience by integrating WebSocket functionality, ensuring real-time data updates for enhanced interactivity.',
      'Fortified frontend security through seamless AWS Amplify and Cognito integration, enhancing user authentication in the customer-facing portal.',
      'Built 20+ serverless backend microservices with AWS Lambda, Node.js, and services like S3, SQS, SES, DynamoDB, and RDS.',
      'Established effective collaboration with external services for API integration, ensuring smooth connectivity and interoperability.',
      'Maintained CI/CD pipelines and automated testing with GitHub Actions.',
      'Implemented agile methodologies using Jira, actively engaged in sprint planning, and collaborated closely with the product manager to allocate tasks to the development team.',
    ],
  },
  {
    title: 'Software Engineer',
    place: 'Fuse Machines, Nepal',
    period: 'Oct 2020 - May 2022',
    points: [
      'Contributed to the Fuse Classroom platform, enabling accessible online education, and Enhatch, a scalable SaaS solution streamlining preoperative planning for medical implants.',
      'Gathered business requirements and implemented complex logic, enhancing efficiency by automating over 30% of manual tasks.',
      'Actively participated in Agile methodologies (Scrum), including sprint planning, daily stand-up meetings, and user story refinement.',
      'Increased code reliability by implementing automated testing with Jest and React Testing Library, achieving a 95% test coverage across key components.',
    ],
  },
  {
    title: 'Software Engineer',
    place: 'Info Developers Pvt. Ltd.',
    period: 'Dec 2019 - Nov 2020',
    points: [
      'Enhanced front-end efficiency by developing and maintaining reusable React components, reducing new feature development time by approximately 20%.',
      'Built a React boilerplate for new projects, reducing setup time and facilitating team onboarding for faster project initiation.',
      'Collaborated with backend engineers to design and implement RESTful APIs, ensuring seamless frontend-backend integration for an improved user experience.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    place: 'kEIV Pvt. Ltd.',
    period: 'Jun 2019 - Nov 2019',
    points: [
      'Solidified web development and JavaScript foundation through hands-on experience with React, Redux, and Node.js projects, gaining valuable knowledge applicable to different domains.',
    ],
  },
];

const education: TimelineItem[] = [
  {
    title: 'Masters Of Information Technology',
    place: 'APIC College, Melbourne',
    period: '2022 - present',
    points: [],
  },
  {
    title: 'Bachelors in Electronics and Communication Engineering',
    place: 'IOE, TU, Nepal',
    period: '2015 - 2019',
    points: [],
  },
];

const Timeline = ({
  items,
  icon: Icon,
}: {
  items: TimelineItem[];
  icon: typeof FaSuitcase;
}) => (
  <ol className="relative mt-6 space-y-8 border-l border-zinc-200 pl-8">
    {items.map((item) => (
      <li key={`${item.place}-${item.period}`} className="relative">
        <span className="absolute top-0.5 -left-[2.8rem] flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-violet-700 shadow-xs">
          <Icon size={12} aria-hidden="true" />
        </span>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="flex items-center gap-2 font-semibold text-zinc-900">
            {item.title}
            {item.current && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
                Current
              </span>
            )}
          </h3>
          <span className="text-sm text-zinc-500">{item.period}</span>
        </div>
        <p className="text-sm font-medium text-violet-700">{item.place}</p>
        {item.points.length > 0 && (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-zinc-600 marker:text-zinc-300">
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ol>
);

const Experience = () => (
  <div className="grid gap-14 lg:grid-cols-3">
    <section aria-labelledby="work-heading" className="lg:col-span-2">
      <h2 id="work-heading" className="section-heading">
        Work experience
      </h2>
      <Timeline items={work} icon={FaSuitcase} />
    </section>
    <section aria-labelledby="education-heading">
      <h2 id="education-heading" className="section-heading">
        Education
      </h2>
      <Timeline items={education} icon={FaGraduationCap} />
    </section>
  </div>
);

export default Experience;
