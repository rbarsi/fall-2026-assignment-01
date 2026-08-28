import { promises as fs } from "fs";

export type CommentSummary = {
  postId: number;
  id: number;
  commenterEmail: string;
};

type RemoteComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export async function processCommentsPipeline(
  targetPostId: number,
  outputPath: string,
): Promise<number> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${targetPostId}/comments`,
  );

  const comments = (await response.json()) as RemoteComment[];

  const summaries: CommentSummary[] = comments.map((comment) => ({
    postId: comment.postId,
    id: comment.id,
    commenterEmail: comment.email.trim(),
  }));

  const filteredComments = summaries.filter(
    (comment) => !comment.commenterEmail.endsWith(".org"),
  );

  const jsonData = JSON.stringify(filteredComments);

  await fs.writeFile(outputPath, jsonData, "utf-8");

  return filteredComments.length;
}