# AI Social Media Content Studio

AI Social Media Content Studio is a lightweight full-stack application that helps brands generate social media marketing content using AI. It allows users to generate platform-specific text captions and product images from a single set of inputs.
The project demonstrates end-to-end AI integration, clean backend architecture, and a simple but functional frontend.

## Live Demo

- **Frontend:** https://ai-social-media-studio.netlify.app  
- **Backend API Docs:** https://ai-social-media-studio-production.up.railway.app/docs

## Features

- Generate marketing captions tailored to platform and target audience
- Generate product images from text prompts
- Fully working text and image generation flow
- Clean separation of frontend, backend, and AI services
- Collapsible result sections for better UX
- Rate-limited public API to prevent abuse

## Tech Stack

### Frontend
- HTML
- Tailwind CSS
- Vanilla JavaScript

### Backend
- Python
- FastAPI
- Pydantic (for request validation)
- SlowAPI (for rate limiting)

### AI Services
- Text generation via Gemini API
- Image generation via Clipdrop Text-to-Image API | [Get it here](https://clipdrop.co/apis/docs/text-to-image#text-to-image-api)

## Architecture Overview

The application follows a simple but scalable architecture:

- The frontend collects product and marketing inputs from the user
- Requests are sent to a FastAPI backend via REST APIs
- The backend validates requests and constructs structured prompts
- External AI services are called from isolated service modules
- Responses are processed and returned to the frontend
- Results are displayed in collapsible sections for clarity

Key design decisions:
- AI logic is isolated in service files to keep routes clean
- Backend owns all AI communication for security
- Environment variables are used for all API keys
- Rate limiting and CORS restrictions protect public deployment

## Running the Project Locally

### Backend Setup

#### 1. Clone the repository:
```bash
git clone https://github.com/BlackIron007/ai-social-media-studio.git
cd ai-social-media-studio
```

####  2. Navigate to the backend folder
```bash
cd backend
```

#### 3. Create and activate a virtual environment
```bash
python -m venv venv
venv\Scripts\activate
```

#### 4. Install dependencies
```bash
pip install -r requirements.txt
```

#### 5. Create a .env file and add:
```bash
GEMINI_API_KEY=your_key_here
CLIPDROP_API_KEY=your_key_here
```

#### 6. Start the server
```bash
uvicorn main:app --reload
```

## Why These AI Models Were Chosen

- Gemini was used for text generation due to its strong reasoning and structured output
- Clipdrop was chosen for image generation because it offers a reliable text-to-image API with a free development quota
- Using separate services allows easy model swapping in the future

## Future Improvements

- User authentication and saved projects
- Template presets for different industries
- Downloadable assets
- Unified deployment under a single domain
