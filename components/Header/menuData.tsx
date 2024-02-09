import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Create a Video",
    newTab: false,
    submenu: [
      {
        id:11,
        title: "Video Wizard",
        path:"/create-video",
        newTab: false,
      },
      {
        id:12,
        title: "AI URL to Video",
        path:"/create-video-ai-url",
        newTab: false,
      },
  /*    {
        id:13,
        title: "Use APIs",
        path:"/create-video-api",
        newTab: false,
      }*/
    ]
  },
  {
    id: 2,
    title: "How it Works",
    path: "/data-to-video-how",
    newTab: false,
  },
  {
    id: 3,
    title: "Gallery",
    path: "/gallery",
    newTab: false,
  },
  {
    id: 4,
    title: "Roadmap",
    path: "/roadmap",
    newTab: false,
  },
 /* {
    id: 4,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "About Page",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Blog Grid Page",
        path: "/blog",
        newTab: false,
      },
      {
        id: 44,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 46,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      {
        id: 47,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 48,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },*/
];
export default menuData;
