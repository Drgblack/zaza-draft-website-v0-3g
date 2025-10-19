import type { Metadata } from "next"
import DiscussionThreadClient from "./discussion-thread-client"

export const metadata: Metadata = {
  title: "Discussion Thread | Zaza Draft Community",
  description: "Join the conversation with thousands of teachers using AI in their classrooms.",
}

export default function DiscussionThreadPage() {
  return <DiscussionThreadClient />
}
