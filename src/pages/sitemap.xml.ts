import {
  getCanonicalGradeRoutes,
  getGradeHubPath,
  gradeStrandGatewayPaths,
} from '@/lib/content/canonicalGradeRoutes';
import { getCanonicalSkillRoutes, SKILLS_INDEX_PATH } from '@/lib/content/canonicalSkillRoutes';
import { gradeConfig } from '@/lib/content/gradeConfig';
import { STRAND_GATEWAY_PATHS } from '@/lib/content/strandGatewayRoutes';

const SITE = 'https://spellingwords.app';

function url(path: string) {
  return `${SITE}${path}`;
}

export async function GET() {
  const paths = [
    '/',
    '/about',
    '/accessibility',
    '/curriculum',
    '/grades',
    '/play',
    '/practice-your-own-words',
    '/privacy',
    '/terms',
    SKILLS_INDEX_PATH,
    ...Object.values(STRAND_GATEWAY_PATHS),
    ...gradeConfig.map((grade) => getGradeHubPath(grade.grade)),
    ...gradeStrandGatewayPaths,
    ...getCanonicalGradeRoutes().map((route) => route.canonicalPath),
    ...getCanonicalSkillRoutes().map((route) => route.canonicalPath),
  ];

  const uniquePaths = new Set(paths);
  const expectedPathCount =
    9 +
    Object.keys(STRAND_GATEWAY_PATHS).length +
    gradeConfig.length +
    1 +
    gradeStrandGatewayPaths.length +
    getCanonicalGradeRoutes().length +
    getCanonicalSkillRoutes().length;
  if (uniquePaths.size !== expectedPathCount) {
    throw new Error(
      `Sitemap expected exactly ${expectedPathCount} canonical URLs, got ${uniquePaths.size}.`,
    );
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...uniquePaths,
  ]
    .sort()
    .map((path) => `  <url><loc>${url(path)}</loc></url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
