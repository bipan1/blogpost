import 'server-only';
import { Client, estypes } from '@elastic/elasticsearch';

const INDEX = 'blogposts';

export const isElasticsearchConfigured = () =>
  Boolean(process.env.ELASTICSEARCH_URL);

let client: Client | undefined;

// Created lazily so builds don't need Elasticsearch credentials.
const getClient = () => {
  client ??= new Client({
    node: process.env.ELASTICSEARCH_URL,
    ssl: {
      cert: process.env.ELASTICSEARCH_CLIENT_CERT,
      key: process.env.ELASTICSEARCH_CLIENT_KEY,
      ca: process.env.ELASTICSEARCH_CA_CERT,
      rejectUnauthorized: false,
    },
  });
  return client;
};

/** Returns the ids of posts whose title matches the query, best match first. */
export const searchPostIds = async (query: string): Promise<number[]> => {
  const result = await getClient().search({
    index: INDEX,
    body: { query: { match: { title: query } } },
  });

  return result.body.hits.hits
    .map((hit: estypes.SearchHit) => Number(hit._id))
    .filter(Number.isInteger);
};

export interface Suggestion {
  id: string;
  /** Title fragments with matches wrapped in <em> by Elasticsearch. */
  text: string[];
}

export const autocompleteTitles = async (
  query: string,
  limit = 5,
): Promise<Suggestion[]> => {
  const result = await getClient().search({
    index: INDEX,
    body: {
      size: limit,
      query: {
        multi_match: {
          query,
          fields: ['title_as_you_type'],
          type: 'bool_prefix',
        },
      },
      highlight: {
        fields: { title_as_you_type: { fragment_size: 30 } },
      },
    },
  });

  return result.body.hits.hits.map((hit: estypes.SearchHit) => ({
    id: hit._id,
    text: hit.highlight?.title_as_you_type ?? [],
  }));
};

/** Adds or updates a post in the search index (same shape as sync-data). */
export const indexPost = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => {
  await getClient().index({
    index: INDEX,
    id: String(id),
    body: {
      title,
      title_as_you_type: title,
      title_suggest: { input: [title] },
    },
  });
};

export const removePostFromIndex = async (id: number) => {
  await getClient().delete({ index: INDEX, id: String(id) }, { ignore: [404] });
};
