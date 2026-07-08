const blogs = [
  {
    id: 1,
    title: "Understanding React Server Components",
    author: "Matti Luukkainen",
    url: "https://react.dev/blog/2023/03/22/react-server-components",
    likes: 42
  },
  {
    id: 2,
    title: "Next.js App Router: A Complete Guide",
    author: "Lee Robinson",
    url: "https://nextjs.org/blog/app-router-guide",
    likes: 38
  },
  {
    id: 3,
    title: "The Future of Full Stack Development",
    author: "Dan Abramov",
    url: "https://overreacted.io/future-of-fullstack",
    likes: 27
  },
  {
    id: 4,
    title: "Mastering TypeScript in React Projects",
    author: "Josh Goldberg",
    url: "https://typescript-react.dev/mastering",
    likes: 15
  },
  {
    id: 5,
    title: "From SPA to Next.js: Why and How",
    author: "Katriina Haimi",
    url: "https://fullstackopen.com/blog/spa-to-nextjs",
    likes: 31
  },
  {
    id: 6,
    title: "Server Actions in Next.js: A Deep Dive",
    author: "Delba de Oliveira",
    url: "https://nextjs.org/blog/server-actions",
    likes: 53
  },
  {
    id: 7,
    title: "Building Accessible Web Apps with React",
    author: "Julia Undeutsch",
    url: "https://accessibility-react.dev/guide",
    likes: 19
  }
];

let nextId = 8

export const getBlogs = () => {
    return blogs
}
/*
export const addBlogs = () => {
    blogs.push()
}
    */