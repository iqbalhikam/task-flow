import Head from "next/head";
import Link from "next/link";
import { GuestRoute } from "~/components/layouts/GuestRoute";
import { PageContainer } from "~/components/layouts/PageContainer";
import { SectionContainer } from "~/components/layouts/SectionContainer";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <GuestRoute>
      <PageContainer>
        <SectionContainer
          padded
          className="flex min-h-[calc(100vh-144px)] flex-col content-center justify-center"
        >
          <h1>Hello</h1>
        </SectionContainer>
      </PageContainer>
    </GuestRoute>
  );
}
