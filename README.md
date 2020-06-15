# Node Email Server

Node JS + Express + MongoDB server starter for setting up a mailing list with Nodemailer.

Features:

- Sends user confirmation email
- Includes Endpoint for unsubscribe
- Saves date of signup, confirmation, and unsubscribe
- Able to re-sign up

Requires a gmail address to connect to the application for email sending. Templates are written in HTML + inline CSS.

## Setup

Once you have cloned and installed the node app, also add a `.env` file to the root level of the project with:

```bash
MONGO_URI=mongodb+srv://your-mongo-uri-here
SECRET_OR_KEY=secret
EMAIL_USER=your-email-address@gmail.com
EMAIL_PASS=your-email-password
```
