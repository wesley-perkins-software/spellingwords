import { getCollection } from 'astro:content';
import { getCanonicalGradeRoutes, getCanonicalListPath, getGradeHubPath, isCanonicalGradeCurriculumId, GATEWAY_COLLECTION_IDS } from '@/lib/content/canonicalGradeRoutes';
import { SKILLS_INDEX_PATH } from '@/lib/content/canonicalSkillRoutes';
import { gradeConfig } from '@/lib/content/gradeConfig';
import { isPublished } from '@/lib/content/spellingLists';
import { LEARNING_PATHS } from '@/lib/content/learningPaths';

const SITE = 'https://spellingwords.app';

function url(path: string) {
  return `${SITE}${path}`;
}

export async function GET() {
  const lists = (await getCollection('spelling-lists')).filter(isPublished);
  const collections = (await getCollection('spelling-collections')).filter((collection) => collection.data.status === 'published');
  const gatewayIds = new Set(GATEWAY_COLLECTION_IDS);

  const paths = new Set<string>([
    '/',
    '/play',
    '/spelling-lists',
    '/spelling-lists/grade-level',
    '/spelling-lists/phonics',
    '/spelling-lists/sight-words',
    '/spelling-lists/challenge',
    SKILLS_INDEX_PATH,
    ...gradeConfig.map((grade) => getGradeHubPath(grade.grade)),
    ...getCanonicalGradeRoutes().map((route) => route.canonicalPath),
    ...LEARNING_PATHS.map((path) => `/learning-paths/${path.id}`),
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
