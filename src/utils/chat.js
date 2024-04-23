export const chatHistory = {
  author: {
    userId: "abc",
    name: "MD. Ashik",
  },
  history: [
    {
      type: "user_message",
      message: "Payment and Subscription",
      createdAt: "29 Apr, 2020 4:28 PM",
    },
    {
      type: "admin_message",
      message: "How Can I help you?",
      createdAt: "29 Apr, 2020 4:28 PM",
    },
    {
      type: "user_message",
      message: "How do I upgrade to paid plan?",
      createdAt: "29 Apr, 2020 4:28 PM",
    },
    {
      type: "admin_message",
      message:
        "Click on the credit remaining button at the top right side of your dashboard or click on your workspace’s name at the bottom left and select workspace billing. In there, click on the Upgrade button. Select the plan you wish to use by clicking continue. Enter your card information and click on subscribe now. Please make sure your complete that.",
      createdAt: "29 Apr, 2020 4:28 PM",
    },
    {
      type: "user_message",
      message: "Thanks for helping me.",
      createdAt: "29 Apr, 2020 4:28 PM",
    },
  ],
};

export const suggestionData = [
  {
    title: "Payment and Subscription",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, molestias.",
  },
  {
    title: "Account question",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    title: "Editing Questions",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
  },
  {
    title: "Issue or Bug",
    description: "Lorem, ipsum.",
  },
  {
    title: "Something else",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati veniam deserunt harum!`",
  },
];

export const getFormattedDate = () => {
  const currentDate = new Date();
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return currentDate.toLocaleDateString("en-US", options);
};
