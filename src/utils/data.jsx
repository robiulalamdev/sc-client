import AddPresenter from "../components/UserPanel/CreateProject/AddPresenter";
import accepted from "../assets/accepted.svg";
import alert from "../assets/alert.svg";
import brandActive from "../assets/brand-active.svg";
import brand from "../assets/brand.svg";
import activityPersonImg1 from "../assets/editor_panel/acivity_img.svg";
import clientImg1 from "../assets/editor_panel/clientImg1.svg";
import clientIconActive from "../assets/editor_panel/client_active.svg";
import clientIcon from "../assets/editor_panel/clients.svg";
import dashboardIconActive from "../assets/editor_panel/dashboard_icon.svg";
import dashboardIcon from "../assets/editor_panel/dashboard_icon_inactive.svg";
import myTasksIcon from "../assets/editor_panel/my_tasks.svg";
import myTasksIconActive from "../assets/editor_panel/my_tasks_active.svg";
import happy from "../assets/happy.svg";
import homeActive from "../assets/home-active.svg";
import home from "../assets/home.svg";
import mediaActive from "../assets/media-active.svg";
import media from "../assets/media.svg";
import premium from "../assets/premium.svg";
import rejected from "../assets/rejected.svg";
import sad from "../assets/sad.svg";
import upset from "../assets/upset.svg";
import videoActive from "../assets/video-active.svg";
import video from "../assets/video.svg";
import landscape from "../assets/landscape.svg";
import square from "../assets/square.svg";
import portrait from "../assets/portrait.svg";
import taskIcon from "../assets/editor_panel/newproject_icon.svg";
import taskIcon2 from "../assets/editor_panel/inprogress.svg";
import internalInActive from "../assets/admin/internal_inactive.svg";
import internalActive from "../assets/admin/internal_active.svg";
import companiesInActive from "../assets/admin/companis_inactive.svg";
import companiesActive from "../assets/admin/companis_active.svg";
import socialVoice from "../assets/social-voice.svg";
import cc from "../assets/cc.svg";
import voice from "../assets/voice.svg";
import express from "../assets/express-edit.svg";
import strategy from "../assets/strategy.svg";
import business from "../assets/business-plan.svg";
import enterprise from "../assets/enterprise-plan.svg";
import email from "../assets/email-notification.svg";
import slack from "../assets/slack-notification.svg";

import {
  FileVideo,
  Folder,
  GearSix,
  NewspaperClipping,
  Note,
  Notebook,
  PlusCircle,
  Question,
  Scissors,
  Swatches,
  UploadSimple,
  Users,
  Video,
} from "@phosphor-icons/react";

export const tableHeading = [
  "Client",
  "Project Name",
  "Status",
  "Date Created",
];

export const tableHeadingTwo = [
  "Client",
  "Project Name",
  "Assignee",
  "Status",
  "Last Activity",
];

export const clientTableHeading = [
  "Client",
  // "Project Count",
  "Last Project Status",
  "Last Activity",
];

export const internalTableHeading = [
  "Name",
  "Joined",
  "Last Active",
  "User Role",
];

export const insightsCardData = [
  {
    icon: taskIcon,
    name: "New Projects",
    number: 8,
  },
  {
    icon: taskIcon2,
    name: "In Progress",
    number: 12,
  },
];

export const MyWorkTableData = [
  {
    clientImg: clientImg1,
    clientName: "Xavier Davis",
    projectName: "Product Showcase Video",
    projectCount: 5,
    assignee: "Shawn Mahbub",
    status: "In Progress",
    duration: 4,
    dateCreated: "September 10, 2023",
  },
  {
    clientImg: clientImg1,
    clientName: "Xavier Davis",
    projectName: "Product Showcase  dfsdf Video",
    projectCount: 8,
    assignee: "Shawn Mahbub",
    status: "Approved",
    duration: 4,
    dateCreated: "September 10, 2023",
  },
  {
    clientImg: clientImg1,
    clientName: "Xavier Davis",
    projectName: "Product Showcase Video",
    projectCount: 8,
    assignee: "Shawn Mahbub",
    status: "New Project",
    duration: 4,
    dateCreated: "September 10, 2023",
  },
];

export const RecentActivites = [
  {
    img: activityPersonImg1,
    type: "Editor",
    name: "Shawn Mahbub",
    mentionName: "@Sophia Chen",
    dateTime: "29 Apr, 2020 4:28 PM",
  },
  {
    img: activityPersonImg1,
    type: "Client",
    name: "Shawn Mahbub",
    mentionName: "",
    dateTime: "29 Apr, 2020 4:28 PM",
  },
];

export const internalUserData = [
  {
    clientImg: clientImg1,
    clientName: "James Daher",
    joined: "September 10, 2023",
    lastActive: "September 10, 2023",
    role: "Admin",
  },
  {
    clientImg: clientImg1,
    clientName: "Marvin McKinney",
    joined: "September 10, 2023",
    lastActive: "September 10, 2023",
    role: "Admin",
  },
  {
    clientImg: clientImg1,
    clientName: "Darrell Steward",
    joined: "September 10, 2023",
    lastActive: "September 10, 2023",
    role: "Account Manager",
  },
  {
    clientImg: clientImg1,
    clientName: "Brooklyn Simmons",
    joined: "September 10, 2023",
    lastActive: "September 10, 2023",
    role: "Editor",
  },
];

export const menus = [
  {
    type: "USER",
    pic: home,
    activePic: homeActive,
    title: "Home",
    path: "/user",
  },
  {
    type: "USER",
    pic: video,
    activePic: videoActive,
    title: "Projects",
    path: "/user/projects",
  },

  {
    type: "USER",
    pic: video,
    activePic: videoActive,
    title: "All Videos",
    path: "/user/all-videos",
  },

  {
    type: "USER",
    pic: media,
    activePic: mediaActive,
    title: "Media Storage",
    path: "/user/media-storage",
  },

  {
    type: "USER",
    pic: brand,
    activePic: brandActive,
    title: "Brand Kit",
    path: "/user/brand-kit",
  },

  {
    type: "EDITOR",
    pic: dashboardIcon,
    activePic: dashboardIconActive,
    title: "Dashboard",
    path: "/editor",
  },

  {
    type: "EDITOR",
    pic: myTasksIcon,
    activePic: myTasksIconActive,
    title: "My Tasks",
    path: "/editor/my-projects",
  },
  {
    type: "EDITOR",
    pic: myTasksIcon,
    activePic: myTasksIconActive,
    title: "All Tasks",
    path: "/editor/all-projects",
  },

  {
    type: "EDITOR",
    pic: clientIcon,
    activePic: clientIconActive,
    title: "Clients",
    path: "/editor/clients",
  },
  {
    type: "ADMIN",
    pic: internalInActive,
    activePic: internalActive,
    title: "Internal Users",
    path: "/admin/internal-users",
  },
  {
    type: "ADMIN",
    pic: companiesInActive,
    activePic: companiesActive,
    title: "Companies",
    path: "/admin/companies",
  },
];

export const videos = [
  {
    name: "Product Showcase Video",
    status: "Exported",
  },
  {
    name: "Sales Training Video",
    status: "In Progress",
  },
  {
    name: "Sales Training Video",
    status: "In Progress",
  },
  {
    name: "Employee Onboarding Training",
    status: "Exported",
  },
  {
    name: "Sales Strategies Video Series",
    status: "Draft",
  },
  {
    name: "Advanced Training Module",
    status: "Exported",
  },
  {
    name: "Marketing Campaign Launch Video",
    status: "Draft",
  },
  {
    name: "Goal Setting Workshop",
    status: "Exported",
  },
  {
    name: "Leadership Development Series",
    status: "Exported",
  },
  {
    name: "Market Research Presentation",
    status: "Draft",
  },
  {
    name: "Corporate Culture Spotlight",
    status: "Exported",
  },
  {
    name: "Sales Strategies Video Series",
    status: "Draft",
  },
  {
    name: "Management Best Practices",
    status: "Exported",
  },
  {
    name: "Creative Thinking Symposium",
    status: "Exported",
  },
  {
    name: "Executive Coaching Series",
    status: "Exported",
  },
  {
    name: "Executive Coaching Series",
    status: "Exported",
  },
  {
    name: "Sales Strategies Video Series",
    status: "Draft",
  },
  {
    name: "Management Best Practices",
    status: "Exported",
  },
];

export const details = [
  {
    icon: <PlusCircle size={24} weight="fill" />,
    name: "New Projects",
    bgColor: "bg-purple-100",
    buttonBg: "bg-purple-950",
    title: "Create your first project",
  },
  {
    icon: <Scissors size={24} />,
    name: "Edit Video",
    bgColor: "bg-pink-100",
    buttonBg: "bg-pink-900",
    title: "Make changes to your videos",
  },
  {
    icon: <UploadSimple size={24} />,
    name: "Upload Brand",
    bgColor: "bg-emerald-100",
    buttonBg: "bg-emerald-900",
    title: "Upload your brand kit",
  },
  {
    icon: <Folder size={24} weight="fill" />,
    name: "Access Files",
    bgColor: "bg-amber-100",
    buttonBg: "bg-amber-700",
    title: "Access your file uploads",
  },
];

export const reactions = [sad, upset, happy];

export const answers = [
  "Go to your dashboard and click your profile icon at the top right corner.",
  "​Click on Account Settings.",
  "Click on the pen icon button to type the new email address and click Save to update it.",
  "The new email address will receive an email to confirm it. Click on Confirm new email address button to confirm it. Alternatively, copy and paste the link/URL included in the email.",
];

export const quickOptions = [
  "Payment and Subscription",
  "Account question",
  "Editing Questions",
  "Issue or Bug",
  "Something else",
];

export const notifications = [
  {
    date: "2024-03-05",
    lists: [
      {
        pic: accepted,
        new: true,
        title: "Project Accepted  🎉",
        description:
          "<span  style='color:#4F46E5;'>@shawnmahbub </span>  accepted the job for Advanced Training Module.",
        time: "09:40 AM",
      },
      {
        pic: alert,
        new: false,
        title: "Exclusive Event Alert",
        description:
          "Join our annual event this weekend! Meet new people & more social. Register now!",
        time: "08:29 AM",
      },
    ],
  },
  {
    date: "2024-03-04",
    lists: [
      {
        pic: rejected,
        new: false,
        title: "Project Rejected",
        description:
          "<span style='color:#4F46E5;'>@shawnmahbub </span>  rejected the job for Advanced Training Module.",
        time: "20:30 PM",
      },
      {
        pic: premium,
        new: false,
        title: "Unlock Premium Features",
        description:
          "Upgrade to Premium for exclusive benefits & enhance your experience!",
        time: "10:30 AM",
      },
    ],
  },
  {
    date: "2024-03-03",
    lists: [
      {
        pic: rejected,
        new: false,
        title: "Project Rejected",
        description:
          "<span style='color:#4F46E5;'>@shawnmahbub </span>  rejected the job for Advanced Training Module.",
        time: "20:30 PM",
      },
      {
        pic: premium,
        new: false,
        title: "Unlock Premium Features",
        description:
          "Upgrade to Premium for exclusive benefits & enhance your experience!",
        time: "10:30 AM",
      },
    ],
  },
];

export const guidelines = [
  {
    title: "Brand Guidelines",
    subtitle:
      "Add brand images and custom watermarks and use them across your projects.",
    acceptType: "application/pdf",
    inputName: "guidelines",
  },
  {
    title: "Logos",
    subtitle:
      "Add brand images and custom watermarks and use them across your projects.",
    acceptType: "image/svg+xml",
    inputName: "logos",
  },
  {
    title: "Fonts",
    subtitle:
      "Add brand images and custom watermarks and use them across your projects.",
    acceptType: ".ttf, .otf, .woff, .woff2",
    inputName: "fonts",
  },
  {
    title: "Color Palette",
    subtitle:
      "Add your brand color palettes to maintain brand consistency across your videos",
    buttonName: "Add Color",
    acceptType: "image/*",
    inputName: "colors",
  },
  {
    title: "Image Assets",
    subtitle:
      "Add brand images and custom watermarks and use them across your projects.",
    acceptType: "image/*",
    inputName: "images",
  },
  {
    title: "Video Assets",
    subtitle:
      "Add brand videos and custom clips and use them across your projects.",
    acceptType: "video/*,.mkv",
    inputName: "videos",
  },
  {
    title: "Audio Assets",
    subtitle:
      "Add custom audio and use them for subtitles and caption in any videos",
    acceptType: ".mp3,audio/*",
    inputName: "audios",
  },
];

export const mediaStorage = [
  {
    id: 1,
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 3,
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: 4,
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 5,
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 6,
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },

  {
    id: 7,
    folder: [
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      },
    ],
  },
  {
    id: 8,
    folder: [
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
      {
        video:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      },
    ],
  },
];

export const gettingStarted = [
  {
    query: "How to change the email address of your account?",
    time: "2",
  },
  {
    query: "How to apply a promo code?",
    time: "3",
  },
  {
    query: "How to download your invoices?",
    time: "3",
  },
  {
    query: "How to cancel your subscription?",
    time: "3",
  },
  {
    query: "How collaborator charges are calculated",
    time: "3",
  },
];

export const helps = [
  {
    title: "Getting Started",
    no: 2,
  },
  {
    title: "How to use SoCreative",
    no: 14,
  },
  {
    title: "Account and Subscription",
    no: 5,
  },
  {
    title: "Issues and Feedback",
    no: 4,
  },
  {
    title: "FAQs",
    no: 25,
  },
];

export const createProjectStepper = [
  "Upload Files",
  "Create Brief",
  "Select Add ons",
];

export const expandsDetails = [
  {
    id: 5,
    title: "Add Presenter",
    component: <AddPresenter />,
  },
];

export const aspectRatio = [
  {
    pic: landscape,
    ratio: "16:9",
    name: "Landscape",
  },
  {
    pic: square,
    ratio: "1:1",
    name: "Square",
  },
  {
    pic: portrait,
    ratio: "9:16",
    name: "Portrait",
  },
];

export const addOns = [
  {
    id: 1,
    pic: socialVoice,
    title: "Social Media Resizing",
    subtitle: "Resize your video for different social media platforms.",
    credit: 0.5,
  },
  {
    id: 2,
    pic: cc,
    title: "Subtitles and SRT Files",
    subtitle: "Spoken English videos only. Allow up to 24-48 hours.",
    credit: 0.5,
  },
  {
    id: 3,
    pic: voice,
    title: "Voice Over Artist",
    subtitle: "Professional voice. Allow up to 48 hours.",
    credit: 1,
  },
  {
    id: 4,
    pic: express,
    title: "Express Edit",
    subtitle: "Your video delivered on the same day",
    credit: 1,
  },
  {
    id: 5,
    pic: strategy,
    title: "1 hour Video Strategy Call",
    subtitle: "Schedule a project meeting with a Creative Director",
    credit: 1,
  },
];

export const workspaceMenu = [
  {
    icon: <GearSix size={24} weight="bold" />,
    title: "Team Settings",
  },
  {
    icon: <Users size={24} weight="bold" />,
    title: "Collaborators",
  },
  {
    icon: <Notebook size={24} weight="bold" />,
    title: "Team Billing",
  },
  // {
  //   icon: <BellSimpleRinging size={24} />,
  //   title: "Notifications",
  // },
];
export const companyMenu = [
  {
    icon: <Users size={24} weight="bold" />,
    title: "Team Members",
  },
  {
    icon: <NewspaperClipping size={24} weight="bold" />,
    title: "Plans & Billing",
  },
];

export const plans = [
  {
    pic: business,
    title: "Business Plan",
    slug: "business",
    subtitle:
      "For professionals that need translation, storage, and more instruments.",
  },
  {
    pic: enterprise,
    title: "Enterprise Plan",
    slug: "enterprise",
    subtitle:
      "For professionals that need translation, storage, and more instruments.",
  },
  {
    pic: enterprise,
    title: "Weakly Plan",
    slug: "weak",
    subtitle:
      "For professionals that need translation, storage, and more instruments.",
  },
  {
    pic: enterprise,
    title: "Monthly Plan",
    slug: "month",
    subtitle:
      "For professionals that need translation, storage, and more instruments.",
  },
];

export const notificationSettings = [
  {
    pic: email,
    title: "Email Notifications",
    subtitle: "Send me notification via email when someone...",
    options: [
      "Assigns you to an project",
      "Mentions y ou in a post or reply ",
      "Write an updates on a project that you’re working",
      "Replies to a conversation you’re part of",
    ],
  },
  {
    pic: slack,
    title: "Slack Notifications",
    subtitle:
      "Get a slack notification when someone assigns or mentions you in an update.",
    options: [
      "Assigns you to an project",
      "Mentions y ou in a post or reply ",
      "Write an updates on a project that you’re working",
      "Replies to a conversation you’re part of",
    ],
  },
];

export const projectTab = [
  {
    icon: <Video size={16} weight="bold" />,
    name: "Submit Video",
  },
  {
    icon: <FileVideo size={16} weight="bold" />,
    name: "Video Files",
  },
  {
    icon: <Note size={16} weight="bold" />,
    name: "Project Brief",
  },
  {
    icon: <Swatches size={16} weight="bold" />,
    name: "Brand Kit",
  },
  {
    icon: <Question size={16} weight="bold" />,
    name: "Ask Questions",
  },
];
