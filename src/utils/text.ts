import mongoose from "mongoose";

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\u0100-\uFFFF\w\-]/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function truncate(str: string, num: number) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function stringToObjectId(id: string) {
  return new mongoose.Types.ObjectId(id);
}

export function getInitials(name: string | undefined) {
  if (name == "undefined") {
    return name;
  }
  const words = name.split(" ");
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  } else {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
}
