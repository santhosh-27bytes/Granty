# Granty

**Discover scholarships. Stay on top of applications.**

Granty is a responsive scholarship discovery and application tracking prototype for students in India. It helps students explore Central and State Government scholarship opportunities, find listings that may fit their profile, and organize application progress and deadlines.

> **Prototype notice:** Scholarship listings and dates shown in the demo are sample data. Verify current eligibility, deadlines, and application instructions on the provider’s official website.

## Features

- **Profile-based discovery:** Uses a student’s state, education level, and field of study to find potential scholarship matches.
- **Scholarship search and filters:** Browse Central and State Government listings. Filter by state, education level, field, eligibility, award amount, or application status.
- **Scholarship details:** Review benefits, eligibility, required documents, application steps, deadlines, and provider links.
- **Saved scholarships:** Bookmark opportunities to revisit later.
- **Application tracker:** Manually track progress, from preparing documents to receiving a decision.
- **Deadline notifications:** View in-app reminders for saved scholarships and approaching deadlines.
- **Responsive design:** Use Granty on desktop, tablet, or mobile.

## How it works

1. Create an account and enter a few profile details.
2. Browse scholarships that may fit your profile.
3. Use filters to narrow the results.
4. Open a scholarship to review its details and follow the provider’s application link.
5. Save scholarships and update application progress in Granty.

Granty suggests potential matches; the scholarship provider makes the final eligibility decision. Application IDs are personal references only. The prototype does not retrieve live application status from government portals.

## Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui-style components
- React Router
- Framer Motion
- Recharts
- Lucide React

## Run locally

You’ll need Node.js and npm installed.

```bash
npm install
npm run dev
```

Vite will show the local development URL in the terminal.

To create a production build:

```bash
npm run build
```

## Prototype limitations

- Scholarship records are for demonstration and are not verified current opportunities.
- Authentication and student data use prototype storage and are not suitable for real accounts or sensitive information.
- Notifications appear inside the app; email and push delivery are not configured.
- Application progress is updated manually; live provider status integrations are not configured.
- Confirm scholarship details and submit applications through the provider’s official website.

## Deployment

Build the project with `npm run build`, then deploy the generated `dist` folder to a static hosting provider that supports single-page applications.

## License

No license has been specified yet.
