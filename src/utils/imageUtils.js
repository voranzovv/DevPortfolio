const TOPIC_IMAGES = [
  {
    keywords: ["e-commerce", "shop", "store", "cart"],
    url: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["chat", "messaging", "social"],
    url: "https://images.pexels.com/photos/1111368/pexels-photo-1111368.jpeg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["weather", "climate"],
    url: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["dashboard", "analytics", "admin"],
    url: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["portfolio", "resume"],
    url: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["task", "todo", "manager"],
    url: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["blog", "content", "news"],
    url: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=",
  },
  {
    keywords: ["crypto", "finance", "bank"],
    url: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=",
  },
];

const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=";

export function getProjectImage(project, width = 800) {
  if (project?.imageUrl) return project.imageUrl;

  const titleLower = project?.title ? project.title.toLowerCase() : "";

  const matchedTopic = TOPIC_IMAGES.find((item) =>
    item.keywords.some((kw) => titleLower.includes(kw)),
  );

  if (matchedTopic) {
    return `${matchedTopic.url}${width}`;
  }

  if (project?._id) {
    return `https://picsum.photos/seed/${project._id}/${width}/${Math.round(width * 0.56)}`;
  }

  return `${DEFAULT_IMAGE}${width}`;
}
