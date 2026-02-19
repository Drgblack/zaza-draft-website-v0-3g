# Zaza Draft - Marketing Website

A production-ready multi-page marketing site for Zaza Draft, an AI-powered tool that helps teachers write better parent messages.

## Features

- **Multi-page site** with Home, Features, Pricing, Blog, Resources, About, Contact, and Legal pages
- **Internationalization (i18n)** - English and German live, expandable to ES/FR/IT
- **CMS-backed Blog** - 3 seeded posts with tags, author info, and related posts
- **CMS-backed Resources** - Templates, guides, and checklists for teachers
- **Dark theme** with purple gradient branding
- **Email signup** with Brevo integration
- **GA4 analytics** ready
- **Fully responsive** and accessible

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Google Fonts (Inter)

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env

# Brevo Email Integration (optional)

NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key
NEXT_PUBLIC_BREVO_ENDPOINT=https://api.brevo.com/v3/contacts

# Google Analytics (optional)

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe (optional - for future payment integration)

NEXT*PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test*...
STRIPE*SECRET_KEY=sk_test*...
STRIPE*PRICE_ID=price*...
\`\`\`

If environment variables are not set, the app will use mock endpoints and display console warnings.

## Internationalization

### Current Languages

- **English (EN)** - Default, fully translated
- **German (DE)** - Fully translated

### Adding New Languages

1. Open `lib/i18n/language-context.tsx`
2. Copy the `translationsEn` object structure
3. Create a new translations object (e.g., `translationsEs` for Spanish)
4. Add the new language to the `Language` type
5. Update the language switcher in `components/header.tsx`

Example files for ES/FR/IT are already created in `lib/i18n/` with TODO comments.

### Translation Keys

All translation keys are centralized in `lib/i18n/language-context.tsx`. Key categories:

- `nav.*` - Navigation labels
- `footer.*` - Footer labels
- `home.*` - Home page content
- `features.*` - Features page content
- `pricing.*` - Pricing page content
- `form.*` - Form labels and messages
- `blog.*` - Blog labels
- `resources.*` - Resources labels

## Content Management

### Adding Blog Posts

Edit `lib/cms/posts.ts` and add a new post to the `posts` array:

\`\`\`typescript
{
slug: "your-post-slug",
title: "Your Post Title",
excerpt: "Brief description...",
coverImage: "/path-to-image.jpg",
body: `Full post content in markdown...`,
tags: ["Tag1", "Tag2"],
authorName: "Author Name",
authorAvatar: "/author-avatar.png",
publishedAt: "2024-01-15",
language: "en"
}
\`\`\`

### Adding Resources

Edit `lib/cms/resources.ts` and add a new resource to the `resources` array:

\`\`\`typescript
{
slug: "your-resource-slug",
title: "Resource Title",
type: "Guide" | "Template" | "Checklist",
excerpt: "Brief description...",
heroImage: "/path-to-image.jpg",
body: `Full resource content...`,
downloadUrl: "/optional-download-link.pdf", // optional
language: "en"
}
\`\`\`

### Images

Place images in the `public/` directory. Reference them with `/image-name.jpg` in your code.

## Customization

### Colors

The color palette is defined in `app/globals.css`. Main colors:

- Background: `#0B1220` (navy)
- Surface: `#111827` / `#0F172A`
- Primary gradient: `#7C3AED` to `#6366F1` (purple)
- Accent: `#60A5FA` (blue)
- Text: `#F9FAFB` (light)
- Muted: `#D1D5DB` / `#9CA3AF`

### Typography

The site uses Inter font from Google Fonts. To change fonts:

1. Update the import in `app/layout.tsx`
2. Update the font variable in `app/globals.css`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Production

Set the following in your Vercel project settings:

- `NEXT_PUBLIC_BREVO_API_KEY`
- `NEXT_PUBLIC_BREVO_ENDPOINT`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

## SEO

- Each page has custom metadata
- Sitemap available at `/sitemap.xml`
- Robots.txt configured
- Open Graph tags for social sharing

## Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text on images
- Color contrast meets WCAG AA standards

## Support

For questions or issues:

- Email: support@zazadraft.com
- Documentation: This README

## License

© Zaza Technologies. All rights reserved.
