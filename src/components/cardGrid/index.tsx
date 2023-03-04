import { getAllPosts } from "@/services/firestore/gallery/getAllGalleryPosts";
import { Post } from "@/types/Post";
import React, { useState } from "react";
import Card from "../card";
import SingleArtLoader from "../loader/SingleArtLoader";

export default function CardGrid({
  data,
  handleOpenImage,
}: {
  data: Post[];
  handleOpenImage: Function;
}) {
  return (
    <div className="w-100 h-100 d-flex flex-wrap gap-4 justify-content-center">
      {data.map((post) => {
        return (
          <React.Fragment key={post.artId}>
            <Card data={post} handleOpenPost={handleOpenImage} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
