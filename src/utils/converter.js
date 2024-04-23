export function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}

export function truncateFilename(filename) {
  if (filename?.length > 20) {
    const extensionIndex = filename.lastIndexOf(".");
    const extension = filename.substring(extensionIndex);
    const truncatedName = filename.substring(0, 20 - extension.length - 4);
    return truncatedName + "..." + extension;
  }
  return filename;
}

export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

export const DateConverter = (dateString) => {
  const inputDate = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

// export function lastTimeConverter(dateString) {
//   const date = new Date(dateString);
//   const now = new Date();
//   const seconds = Math.floor((now - date) / 1000);

//   let interval = Math.floor(seconds / 31536000);

//   if (interval > 1) {
//     return `${interval} years ago`;
//   }
//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) {
//     return `${interval} months ago`;
//   }
//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) {
//     return `${interval} days ago`;
//   }
//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) {
//     return `${interval} hours ago`;
//   }
//   interval = Math.floor(seconds / 60);
//   if (interval > 1) {
//     return `${interval} minutes ago`;
//   }
//   return `${Math.floor(seconds)} seconds ago`;
// }

export function lastTimeConverter(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds >= 31536000) {
    return `${Math.floor(seconds / 31536000)} years ago`;
  }
  if (seconds >= 2592000) {
    return `${Math.floor(seconds / 2592000)} months ago`;
  }
  if (seconds >= 86400) {
    return `${Math.floor(seconds / 86400)} days ago`;
  }
  if (seconds >= 3600) {
    return `${Math.floor(seconds / 3600)} hours ago`;
  }
  if (seconds >= 60) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

export const DateConverterWithTime = (dateString) => {
  const originalDate = new Date(dateString);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    originalDate
  );
  return formattedDate;
};

export const convetChatDateTime = (dateString) => {
  const dateObj = new Date(dateString);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  let hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12; // 0 should be converted to 12

  const formattedTime = `${day} ${month}, ${year} ${hour}:${minute
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return formattedTime;
};

export const calculateExpireDate = () => {
  const currentDate = new Date();

  const expirationDate = new Date(currentDate);
  expirationDate.setFullYear(currentDate.getFullYear() + 1);

  // const expirationDateString = expirationDate.toISOString().split("T")[0];
  return expirationDate;
};
