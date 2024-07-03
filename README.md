# Google Classroom Grade Viewer for Scarsdale High School
This [web app](https://gc-grade-viewer.vercel.app) calculates your current class average by using pasted raw grades from Google Classroom, making the tedious process of adding up your grades much easier.

## Features
- After pasting from google classroom (see guide on the site), the grades will **automatically be extracted** and your class **average will be calculated, no work required**.
  - Additionally, you can choose a few grading scales (most classes use total points) corresponding to various classes offered at SHS.
- **Calculate what you need on the final** easily just by typing in the percent worth and your desired letter grade.
- **Create an account:** Creating an account allows you to track grades and create a personal gradebook, albeit much easier than doing so on Excel by typing in your grades if they are not available online.
  - **Categories:** Type in the different grade categories and the percent on your average for easy calculations.
  - **Grades:** Easily type in your grades, save them to our Firebase database, and name them for convienence. (ex: Shakespeare Essay)
  - **Authentication:** Auth0 is used for easy and safe account management.
  - **TODO: PREMIUM:** Purchase a cheap subscription (in the future) in order to store multiple classes.
- **Dark Mode** UI is easy on the eyes for all to enjoy.

## Frameworks/Libraries
- NextJS: web framework
- Tailwind & HeadlessUI: styling
- Firebase: database
- Auth0: account management

## Visitors
As of July 3rd 2024, over 372 users have visited the site to calculate their grades.
