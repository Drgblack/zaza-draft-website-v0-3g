# UK GEO Cluster Implementation

Implemented route structure:

- `/uk`
- `/uk/teacher-communication-resources`
- `/uk/how-to-reply-to-angry-parent-email`
- `/uk/parents-evening-email-templates`
- `/uk/ofsted-friendly-report-comments`
- `/uk/behaviour-letter-home-primary-school`
- `/uk/gdpr-safe-ai-for-teachers`
- `/uk/ofsted-friendly-parent-email-examples`
- `/uk/how-to-document-parent-contact-for-slt`
- `/uk/positive-honest-sen-report-comments`
- `/england`
- `/england/how-to-document-parent-contact-for-ofsted`

## Metadata Inventory

| Route                                                | Title                                                  | Intent      |
| ---------------------------------------------------- | ------------------------------------------------------ | ----------- | --------------------- |
| `/uk/teacher-communication-resources`                | `UK Teacher Communication Resources                    | Zaza Draft` | Hub                   |
| `/uk/how-to-reply-to-angry-parent-email`             | `How to Reply to an Angry Parent Email in the UK       | Zaza Draft` | How-to/problem intent |
| `/uk/parents-evening-email-templates`                | `Parents' Evening Email Templates for UK Teachers      | Zaza Draft` | Template intent       |
| `/uk/ofsted-friendly-report-comments`                | `Ofsted-Friendly Report Comments for UK Teachers       | Zaza Draft` | Template intent       |
| `/uk/behaviour-letter-home-primary-school`           | `Behaviour Letter Home for UK Primary Schools          | Zaza Draft` | Template intent       |
| `/uk/gdpr-safe-ai-for-teachers`                      | `GDPR-Safe AI for Teachers in the UK                   | Zaza Draft` | Tool intent           |
| `/uk/ofsted-friendly-parent-email-examples`          | `Ofsted-Friendly Parent Email Examples for UK Teachers | Zaza Draft` | Template intent       |
| `/uk/how-to-document-parent-contact-for-slt`         | `How to Document Parent Contact for SLT in the UK      | Zaza Draft` | How-to/problem intent |
| `/uk/positive-honest-sen-report-comments`            | `Positive Honest SEN Report Comments for UK Teachers   | Zaza Draft` | Template intent       |
| `/england/how-to-document-parent-contact-for-ofsted` | `How to Document Parent Contact for Ofsted in England  | Zaza Draft` | How-to/problem intent |

## Trust Block Language

Shared UK trust block headline:

`Trusted by UK teachers - GDPR compliant, built for British schools`

## JSON-LD Notes

Regional pages now include:

- `EducationalAudience` with UK or England audience text
- `areaServed`
- `contentLocation`
- UK and England place mentions in regional page schema
- teacher-first software and organisation references

## Hub Structure

The UK hub groups pages into:

- Templates
- How-to pages
- Safe AI and report pages

The cluster map is intentionally simple so teachers can scan it quickly and so AI crawlers can see the relationship between the pages.
