"use client";
import dynamic from "next/dynamic";

const ScrollStoryScene2 = dynamic(
  () => import("@/components/ScrollStoryScene2"),
  { ssr: false, loading: () => <div style={{ position:"absolute", inset:0, background:"#080808" }} /> }
);

export default function ScrollStoryScene2Client({ children }: { children?: React.ReactNode }) {
  return <ScrollStoryScene2>{children}</ScrollStoryScene2>;
}
