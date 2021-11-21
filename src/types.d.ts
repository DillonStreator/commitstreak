interface ENV {
    PORT: string;
    IS_DEV: boolean;
    GITHUB_ACCESS_TOKEN: string;
    GITHUB_GRAPHQL_API_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number | null;
}

interface Cacher {
    get(key: string): Promise<string|null>
    set(key: string, value: string): Promise
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

