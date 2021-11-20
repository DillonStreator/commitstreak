interface ENV {
    PORT: string;
    IS_DEV: boolean;
    GITHUB_ACCESS_TOKEN?: string;
    GITHUB_GRAPHQL_API_URL: string;
}

declare module GithubGraphQL {

    interface ContributionDay {
        contributionCount: number;
        weekday: number;
        date: string;
    }

    interface Week {
        contributionDays: ContributionDay[];
    }

    interface ContributionCalendar {
        totalContributions: number;
        weeks: Week[];
    }

    interface ContributionsCollection {
        contributionCalendar: ContributionCalendar;
    }

    interface User {
        contributionsCollection: ContributionsCollection;
    }

    export interface ContributionsResponseData {
        user: User;
    }

    export interface ContributionsResponse {
        data: Data;
    }

}

