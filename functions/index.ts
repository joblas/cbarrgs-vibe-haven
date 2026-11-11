import { markdownFor, varyOnAccept, type MarkdownEnv } from './_markdown';

/** `/`: markdown (from llms.txt) for agents that ask for it, the SPA otherwise. */
export const onRequest: PagesFunction<MarkdownEnv> = async (context) => {
  const markdown = await markdownFor(context, '/llms.txt');
  if (markdown) return markdown;
  return varyOnAccept(await context.next());
};
