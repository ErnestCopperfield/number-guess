import { GuessDetailPage } from "@/components/pages/GuessDetailPage";

export default async function RecordDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <GuessDetailPage id={id} />;
}
