const DETAILS = [
  { label: 'Full Name', value: 'Bipan Chhetri' },
  { label: 'Phone', value: '+61 414 271 497' },
  { label: 'Email', value: 'bipan13345@gmail.com' },
  { label: 'Address', value: 'Laverton, Victoria, Australia' },
];

const About = () => (
  <section
    aria-labelledby="about-heading"
    className="grid gap-10 lg:grid-cols-3"
  >
    <div className="lg:col-span-2">
      <h2 id="about-heading" className="section-heading">
        About me
      </h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-600">
        <p>
          This is Bipan Chhetri. I am an innovative and dedicated JavaScript
          developer with 3 years of hands-on experience in the dynamic realm of
          web development. Specializing in crafting immersive and responsive
          user interfaces using React, while also possessing proficiency in
          backend technologies such as Node.js and AWS services.
        </p>
        <p>
          My journey in software engineering has seen me contribute to diverse
          projects, collaborating with multidisciplinary teams to deliver robust
          applications. With a passion for clean code, best practices, and
          continuous learning, I am excited to bring my technical expertise to a
          forward-thinking company that values creativity, innovation, and
          growth.
        </p>
      </div>
    </div>
    <dl className="h-fit divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white px-5 text-sm">
      {DETAILS.map(({ label, value }) => (
        <div key={label} className="py-3.5">
          <dt className="text-zinc-500">{label}</dt>
          <dd className="mt-0.5 font-medium break-words text-zinc-900">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default About;
