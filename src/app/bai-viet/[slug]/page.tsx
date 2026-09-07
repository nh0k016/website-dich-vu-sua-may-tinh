import { redirect } from 'next/navigation';

export default async function RedirectToRootSlug({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  redirect(`/${resolvedParams.slug}`);
}
