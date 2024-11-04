![holiday-list](https://github.com/user-attachments/assets/f230e422-fb7d-4355-9fcc-8e70f12743cc)

# Holiday Listing and Filtering Application (PERCON A.S.)
 Listing and Filtering Application (PERCON A.S.)

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

## Project Setup

This project requires several tables on Supabase to manage holiday information: `countries`, `states`, and `holidays`. Below are the steps to create these tables, along with the necessary SQL queries.

## Required Tables

The project uses three main tables: `countries`, `states`, and `holidays`. Each table should be structured as follows.

### 1. `countries` Table

The `countries` table stores each country's name and the count of holidays within that country.

#### SQL Query:

```sql
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  holiday_count INTEGER DEFAULT 0
);
```

- **`id`**: Auto-incrementing unique identifier.
- **`name`**: Name of the country.
- **`holiday_count`**: Stores the number of holidays associated with this country. Default value is `0`.

### 2. `states` Table

The `states` table stores the states or regions within a country.

#### SQL Query:

```sql
CREATE TABLE states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE
);
```

- **`id`**: Auto-incrementing unique identifier.
- **`name`**: Name of the state or region.
- **`country_id`**: Foreign key that references an entry in the `countries` table. When a country is deleted, all associated states will also be deleted (`ON DELETE CASCADE`).

### 3. `holidays` Table

The `holidays` table stores details of each holiday and associates it with a specific country and/or state.

#### SQL Query:

```sql
CREATE TABLE holidays (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  color CHAR(7) DEFAULT '#FFFFFF',
  state_id INTEGER REFERENCES states(id) ON DELETE SET NULL,
  type VARCHAR(50) CHECK (type IN ('Official', 'Religious')),
  country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE
);
```

- **`id`**: Auto-incrementing unique identifier.
- **`date`**: Date of the holiday.
- **`name`**: Name of the holiday.
- **`color`**: Color code for the holiday (in hex format, e.g., `#16a34a`).
- **`state_id`**: Foreign key that references an entry in the `states` table. If the state is deleted, this value is set to `NULL` (`ON DELETE SET NULL`).
- **`type`**: Type of holiday, restricted to `Official` or `Religious` values (`CHECK` constraint).
- **`country_id`**: Foreign key that references an entry in the `countries` table. When a country is deleted, all associated holidays are also deleted (`ON DELETE CASCADE`).

### Automatically Updating Holiday Counts

To keep the `holiday_count` in the `countries` table up to date, you can set up a `TRIGGER` and `FUNCTION` that will update this count each time a holiday is added or removed.

#### Function to Update Holiday Count

```sql
CREATE OR REPLACE FUNCTION update_holiday_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE countries
    SET holiday_count = holiday_count + 1
    WHERE id = NEW.country_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE countries
    SET holiday_count = holiday_count - 1
    WHERE id = OLD.country_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

#### Adding a Trigger to the `holidays` Table

```sql
CREATE TRIGGER trigger_update_holiday_count
AFTER INSERT OR DELETE ON holidays
FOR EACH ROW
EXECUTE FUNCTION update_holiday_count();
```

This `TRIGGER` will activate the `update_holiday_count` function each time an `INSERT` or `DELETE` operation occurs on the `holidays` table, keeping the `holiday_count` field in the `countries` table accurate.

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
