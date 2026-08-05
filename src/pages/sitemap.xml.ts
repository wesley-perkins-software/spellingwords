import { getCollection } from 'astro:content';
import { getCanonicalGradeRoutes, getCanonicalListPath, getGradeHubPath, isCanonicalGradeCurriculumId, COMMON_WORDS_GATEWAY_REDIRECTS } from '@/lib/content/canonicalGradeRoutes';
import { gradeConfig } from '@/lib/content/gradeConfig';
import { isPublished } from '@/lib/content/spellingLists';

const SITE = 'https://spellingwords.app';

function url(path: string) {
  return `${SITE}${path}`;
}

export async function GET() {
  const lists = (await getCollection('spelling-lists')).filter(isPublished);
  const collections = (await getCollection('spelling-collections')).filter((collection) => collection.data.status === 'published');
  const gatewayIds = new Set(COMMON_WORDS_GATEWAY_REDIRECTS.map((redirect) => redirect.id));

  const paths = new Set<string>([
    '/',
    '/play',
    '/spelling-lists',
    '/spelling-lists/grade-level',
    '/spelling-lists/phonics',
    '/spelling-lists/sight-words',
    '/spelling-lists/challenge',
    '/spelling-lists/skills',
    ...gradeConfig.map((grade) => getGradeHubPath(grade.grade)),
    ...getCanonicalGradeRoutes().map((route) => route.canonicalPath),
    ...lists.filter((entry) => !isCanonicalGradeCurriculumId(entry.data.id)).map((entry) => getCanonicalListPath(entry.data)),
    ...collections
      .filter((collection) => !gatewayIds.has(collection.data.id))
      .map((collection) => `/spelling-lists/collections/${collection.data.urlSlug}`),
  ]);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...paths]
    .sort()
    .map((path) => `  <url><loc>${url(path)}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
