import { getPoolOfCurrUserRelations } from "@/services/realtimeDB/pool";

export async function getCurrUserRelationPosts(lastPostCreated: number) {
  /// persist this in local storage
  const userRelations = await getPoolOfCurrUserRelations();
}
