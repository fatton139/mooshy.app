import { Tag } from "antd";
import React from "react";

const tagToColourLookup: Record<string, string> = {
  CSGO: "orange",
  DOTA: "red",
};

export const ColouredTags: React.FunctionComponent<{ tags: string[] }> = ({
  tags,
}) => {
  return (
    <>
      {tags.map((tag) => (
        <Tag color={tagToColourLookup[tag]} key={tag}>
          {tag}
        </Tag>
      ))}
    </>
  );
};
