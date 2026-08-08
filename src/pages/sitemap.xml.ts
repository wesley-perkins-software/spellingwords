import { getCanonicalGradeRoutes, getGradeHubPath } from '@/lib/content/canonicalGradeRoutes';
import { getCanonicalSkillRoutes, SKILLS_INDEX_PATH } from '@/lib/content/canonicalSkillRoutes';
import { gradeConfig } from '@/lib/content/gradeConfig';

const SITE = 'https://spellingwords.app';

function url(path: string) {
  return `${SITE}${path}`;
}

export async function GET() {
  const paths = [
    '/',
    '/play',
    SKILLS_INDEX_PATH,
    ...gradeConfig.map((grade) => getGradeHubPath(grade.grade)),
    ...getCanonicalGradeRoutes().map((route) => route.canonicalPath),
    ...getCanonicalSkillRoutes().map((route) => route.canonicalPath),
  ];

  const uniquePaths = new Set(paths);
  const expectedPathCount = 2 + gradeConfig.length + 1 + getCanonicalGradeRoutes().length + getCanonicalSkillRoutes().length;
  if (uniquePaths.size !== expectedPathCount) {
    throw new Error(
      `Sitemap expected exactly ${expectedPathCount} canonical URLs, got ${uniquePaths.size}.`,
    );
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...uniquePaths]
    .sort()
    .map((path) => `  <url><loc>${url(path)}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
