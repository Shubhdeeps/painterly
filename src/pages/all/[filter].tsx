import CardGrid from "@/components/cardGrid";
import HashTitles from "@/components/headings/HashTitles";
import Header from "@/components/headings/Header";
import React from "react";

export default function Filter() {
  return (
    <div>
      <Header title="GALLERY" />
      <div></div>
      <HashTitles
        parentPath="all"
        hashTitles={["All", "Abstract", "OilPaintaing", "Colorful", "Anime"]}
      />
      <CardGrid />
    </div>
  );
}
