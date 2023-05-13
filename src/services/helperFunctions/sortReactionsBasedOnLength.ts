type Props = {
  heart: string[];
  fire: string[];
  smile: string[];
  sad: string[];
  shocked: string[];
};
type ArrayOfReactions = {
  name: "sad" | "smile" | "shocked" | "fire" | "heart";
  count: number;
}[];
export function sortReactionBasedOnCount({
  heart,
  fire,
  smile,
  sad,
  shocked,
}: Props) {
  const heartCount = heart.length;
  const fireCount = fire.length;
  const smileCount = smile.length;
  const sadCount = sad.length;
  const shockedCount = shocked.length;

  const arrayOfReactions: ArrayOfReactions = [
    {
      name: "shocked",
      count: shockedCount,
    },
    {
      name: "heart",
      count: heartCount,
    },
    {
      name: "fire",
      count: fireCount,
    },
    {
      name: "smile",
      count: smileCount,
    },
    {
      name: "sad",
      count: sadCount,
    },
  ];
  const totalCount =
    heartCount + fireCount + smileCount + sadCount + shockedCount;
  return {
    sortedReactions: arrayOfReactions
      .filter((value) => value.count !== 0)
      .sort(sorting),
    totalReactionCount: totalCount,
  };
}

type element = {
  name: string;
  count: number;
};

function sorting(a: element, b: element) {
  if (a.count < b.count) {
    return 1;
  }
  if (a.count > b.count) {
    return -1;
  }
  return 0;
}
