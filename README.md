# PixelProfits Full-Stack Challenge Nov 2024

## Project Overview
This project should take approximately 4 hours to complete, focusing on core functionalities without over-engineering the solution. It’s designed to assess your proficiency in using modern development frameworks and your approach to building functional, user-centric applications.

You are tasked with creation of a simple full-stack application using NestJS for the backend and RemixJS (or NextJS alternatively) for the frontend. The goal is to build a web page that allows a user to search for videos and displays them on the page. This project will demonstrate your ability to work with both frontend and backend technologies, apply RESTful principles, and implement clean, scalable code.


You should approach this as if you were starting a new project that is expected to grow to support multiple developers working on it at once. Therefore, you are expected to take care to make thoughtful decisions about the project architecture.

The frontend and backend base projects have been provided in the `remix` and `nest` directories of this repository to save time bootstrapping.

## Technical Requirements
- **Backend**: Develop a RESTful API using NestJS with TypeScript. The API will serve a page of 9 videos sourced from Pexels, an API repository of free videos, to simulate a simple CMS.
- **Frontend**: Build a user interface following the provided designs using RemixJS (or NextJS) with TypeScript. The interface will include a hero section and a content search section to show the videos from the backend.
  - This repo contains a bootstrapped RemixJS project, however, if you are more comfortable using NextJS for the sake of development time, you are welcome to delete the `remix` directory and replace it with your own `next` directory instead.
- **Typescript**: Do not use `any` or `unknown` types. Do not edit the `tsconfig` files, and do not disable the linter.

## Backend Specifications
1. **API Endpoints**:
    - `GET /videos/?search={searchTerm}`: Returns a page of 9 videos sourced from Pexels using the provided search term. Also fires a VideosSearched event that is used to track the most recent search terms.
      - Restrict the searchTerm query to a maximum of 255 characters
      - Do not allow the following characters: $ ^ > {}
      - Return clear error messages for validation failures and handle external API response errors gracefully.
    - `GET /metrics/recentSearches`: Returns the last 20 search terms used (stored in memory, not persisted across app restarts so a DB is not required)
2. **Video Search Service**:
   - Video objects returned to the frontend should have fields for ID (you may generate a random UUID), width, height, duration, cover image, and video source URL (usually an MP4 file).
   - Pexels returns an array of video files in different resolutions for each video. Do not worry about providing a range of resolutions to the frontend, a single video source URL using one of the "sd" quality options in the Pexels response will suffice.
   - Pexels returns an array of cover images for each video. You may pick one at random to use in the response to the frontend.
   - The responses from the Pexels API do not include a field for video name, however, one can be created from the slug of the video URLs.
     - For example, a video with the URL https://www.pexels.com/video/a-pet-kitten-resting-and-trying-to-catch-insect-in-the-grass-3116737/ should have the name "A pet kitten resting and trying to catch insect in the grass"
3. **Tracking Video Searches**:
   - We have included the [NestJS EventEmitter module](https://docs.nestjs.com/techniques/events) in the dependencies. When a call to the search endpoint is made, the Videos module should fire a VideosSearched event that is caught and handled in the Metrics module to track the search in the search terms history.
   - You may store the past search results in an in-memory array or other suitable data structure at your discretion. Don't worry persisting searches to a DB or otherwise -- it's fine to lose the search history when the app stops.
   - Since past search results will be stored in-memory, keep only the 100 most recent results in order to prevent a memory leak. 
4. **SOLID Principles**:
    - Implement and demonstrate the use of Single Responsibility and Dependency Inversion principles in your code architecture.
    - Implement the Pexels integration in such a way that a separate video search provider could be dropped in later without requiring a refactoring of the main video search service.

### Backend Dependencies

#### The Videos API
You will make server to server calls to the [Pexels API](https://www.pexels.com/api/documentation) to fetch the video results.

You will be given an API key separately to authenticate with the API. **This key should not be exposed in your git repo nor the frontend client**. It is your responsibility to manage the secret.

Do not use Pexel's javascript client, you should manage the authentication and API calls directly.

#### Other Backend Libraries
You may use any package from the @nestjs package family, for example `@nestjs/swagger`. Refrain from adding any non-NestJS packages on the backend that are not included in the NestJS core.

## Frontend Specifications
1. **Design**:
   [Link to Figma](https://www.figma.com/design/a2GE4UI3Oa6hViQ9AtmfLK/Full-Stack-Coding-Challenge-Nov-2024?node-id=6-276&t=tIzjTTKNsBMLcQ4d-4)
2. **Form Handling**:
    - Implement a single search input based on the provided design.
    - Restrict input to a maximum of 255 characters
    - Do not allow the following characters: $ ^ > {}
    - Display clear error messages for validation failures and handle API response errors gracefully.
3. **User Interface**:
    - Designs for Desktop and Mobile have been provided in the Figma file.
    - You may add additional components to the frontend design to improve the UX at your discretion (for example, toasts, loading animations, etc.)
    - Consider, in the context of a new codebase, that form elements and API calls that you create may be required in other parts of the application later.
4. **Video Playback**:
   - It's not required to support video playback for this challenge.
   

### Frontend Dependencies
Tailwind has been added to the Remix configuration if you would like to leverage it. You may also use styled-components, vanilla CSS, SCSS, or another css processor but please refrain from adding any other UI libraries or preconfigured stylesheets.

You are welcome to replace the `remix` directory with a `next` directory if you would like to use NextJS instead of RemixJS. If you do this, make sure to keep the `tsconfig` settings from the `remix` directory to ensure strict mode is enabled.

You may utilize the `zod` library for form validation if you like (it has not been added to the bootstrapped project by default).

## Project Delivery
- Create a branch called `submission` on this repository, push your code to the `submission` branch, and when you are ready to submit your final application, create a pull request to `main` from your branch (do not merge)
- Include a README file with instructions on how to set up and run the project locally.
- Ensure that the application is easy to set up with minimal configurations.

## Evaluation Criteria
- Code cleanliness and organization.
- Adherence to RESTful practices and SOLID principles.
- Effective implementation of the frontend according to the design and functional specifications.
- Proper handling of edge cases and errors both on the frontend and backend.

## Extra Credit
If you finish early or want to showcase additional skillsets, you may consider adding the following:
- Unit tests
- Dockerization (utilizing docker-compose)
- API documentation with the @nestjs/swagger package
- Support for internationalization
- API rate limiting
