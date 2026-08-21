'use client';

import { SharedError } from '@/components/shared';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <SharedError error={error} />;
}
