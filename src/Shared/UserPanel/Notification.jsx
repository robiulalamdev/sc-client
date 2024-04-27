/* eslint-disable react/prop-types */
import close from "../../assets/close.svg";
import { notificationPics } from "../../utils/data";
import Loading from "../Loading";

const Notification = ({
  setShowNotification,
  notificationRef,
  meta,
  notifications,
  isLoading,
  handleLoadMore,
}) => {
  const formatDateTitle = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const inputDate = new Date(date);

    if (inputDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      return "Today";
    } else if (
      inputDate.setHours(0, 0, 0, 0) === yesterday.setHours(0, 0, 0, 0)
    ) {
      return "Yesterday";
    } else {
      return date;
    }
  };

  return (
    <div
      ref={notificationRef}
      className="notification fixed z-[9999] top-[84px] right-[82px]  w-full max-h-[85vh] overflow-y-auto no_scrollbar  bg-white rounded-2xl shadow-2xl p-6 max-w-[448px]"
    >
      <div className="flex gap-2 justify-between items-center mb-6">
        <p className="text-xl font-bold">Notification</p>
        <button onClick={() => setShowNotification(false)}>
          <img src={close} alt="" />
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {notifications.length > 0 ? (
            notifications?.map((data, index) => (
              <div key={index}>
                <div className="flex gap-4 items-center mb-5">
                  <p className="text-slate-500 text-sm font-semibold whitespace-nowrap">
                    {formatDateTitle(data.date)}
                  </p>
                  <div className="border-b w-full"></div>
                </div>
                {data.lists?.length > 0 &&
                  data.lists.map((list, listIndex) => (
                    <div
                      key={listIndex}
                      className="flex items-start gap-4 mb-5"
                    >
                      {}
                      <img
                        src={
                          (list?.type === "Exported Project" &&
                            notificationPics.exported) ||
                          (list?.type === "Project Accepted" &&
                            notificationPics.accept) ||
                          (list?.type === "Event Alert" &&
                            notificationPics.alert) ||
                          (list?.type === "Project Rejection" &&
                            notificationPics.rejected) ||
                          (list?.type === "Unload Premium Feature" &&
                            notificationPics.premium) ||
                          (list?.type === "Paid Successful" &&
                            notificationPics.paid) ||
                          (list?.type === "Exported Project" &&
                            notificationPics.exported)
                        }
                        alt=""
                      />
                      <div>
                        <div className="flex items-center gap-2 justify-between">
                          <p>{list.type}</p>
                          {/* {list.new && (
                            <button className="text-xs text-white py-[1px] px-2 rounded-[32px] bg-[#E84E4E]">
                              <span className="inline-block w-2 h-2 rounded-full bg-white mr-1"></span>
                              New
                            </button>
                          )} */}
                        </div>
                        <p
                          dangerouslySetInnerHTML={{ __html: list.detailes }}
                        />
                        <p>{data.createdAt}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <p>There is no data</p>
          )}
          {notifications?.length > 0 && (
            <>
              {meta?.totalPages > meta?.currentPage && (
                <button
                  onClick={handleLoadMore}
                  className="rounded-full w-full border py-2 pr-4 pl-2 text-base font-medium"
                >
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
