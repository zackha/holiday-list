# Holiday Listing and Filtering Application (PERCON A.S.)

This project is a web application that lists holidays in Germany, the Netherlands, France, and Belgium, allowing users to filter data by country, state, holiday type, year, and month. The application is built with Supabase, Next.js 15, and TypeScript (.tsx).

## Project Structure

- **Frontend Framework**: Built with Next.js (v15) and TypeScript.
- **Backend**: Uses Supabase for API operations.
- **Database**: Stores holiday data and filter options in Supabase.

## Features

- **Holiday Listing**: Displays holidays for the specified countries with relevant details.
- **Filtering Options**: Users can filter holidays by:
  - **Country** (e.g., Germany, Netherlands)
  - **State** (dynamically filtered by selected country)
  - **Holiday Type** (e.g., public, observance)
  - **Year and Month** (yearly and monthly filter options)
- **Pagination**: Allows navigation through holiday listings across multiple pages.
- **Dynamic Filtering**: Filters are dynamically updated based on selected criteria (e.g., states filter updates according to selected country).

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **Supabase Account**: Sign up at [Supabase](https://supabase.com) and set up a project.
- **Environment Variables**: Add the following environment variables in a `.env.local` file:
  - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

### Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env.local` file:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

## Project Structure Overview

- **`app/page.tsx`**: Main page component containing the holiday listing, filter panel, and pagination.
- **`components/FilterPanel.tsx`**: Contains filter components for country, state, type, year, and month.
- **`components/HolidayList.tsx`**: Displays holiday information with transition effects for visual appeal.
- **`components/Pagination.tsx`**: Controls pagination for navigating through holidays.
- **`lib/supabaseClient.ts`**: Sets up and exports the Supabase client for API calls.

## API Endpoints

This application interacts with two primary API endpoints hosted in Supabase:

- **`/api/filters`**: Provides filter options such as countries, states, and holiday types.
- **`/api/holidays`**: Retrieves holiday data based on applied filters and pagination.

## Usage

1. **Select Filters**: Use the Filter Panel to select criteria for filtering holidays.
2. **Browse Results**: View holidays that match selected filters.
3. **Pagination**: Navigate through pages if results exceed the items per page limit.

## Customization

To adjust the application behavior or add new filters, you can modify the `FilterPanel` and `HolidayList` components to incorporate additional filtering logic or adjust the Supabase query logic as needed.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- **Next.js** for the powerful React framework.
- **Supabase** for the backend API and database.
