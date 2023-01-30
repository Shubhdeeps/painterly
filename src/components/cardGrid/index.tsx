import React from "react";
import Card from "../card";

export default function CardGrid() {
  return (
    <div className="w-100 h-100 d-flex flex-wrap gap-4 justify-content-center">
      <Card imageURL="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg" />
      <Card imageURL="https://www.shutterstock.com/shutterstock/photos/2060087966/display_1500/stock-photo-abstract-contemporary-art-collage-portrait-of-young-woman-with-flowers-on-face-hides-her-eyes-2060087966.jpg" />
      <Card imageURL="https://media.vanityfair.com/photos/5e8f9f875752fb00088317c4/16:9/w_1280,c_limit/The-Art-of-Making-Art-About-a-Plague.jpg" />
      <Card imageURL="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg" />
      <Card imageURL="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_960_720.jpg" />
    </div>
  );
}
