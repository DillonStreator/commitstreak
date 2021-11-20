import got from 'got';
import env from './env';

export const getContributions = async (username: string): Promise<GithubGraphQL.ContributionsResponseData> => {
	const { body } = await got.post<GithubGraphQL.ContributionsResponse>(env.GITHUB_GRAPHQL_API_URL, {
        headers: {
            "Authorization": `bearer ${env.GITHUB_ACCESS_TOKEN}`
        },
		json: {
			query: `
            {
                user(login: "${username}") {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    weekday
                                    date
                                }
                            }
                        }
                    }
                }
            }
            `,
		},
        responseType: 'json'
	});

    return body.data
};
