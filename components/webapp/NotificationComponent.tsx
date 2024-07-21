import React, { useState } from "react";
import NotificationModal from "./NotificationModal";
import { NotifAlarm } from "../icons/icons";

const NotificationComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={openModal}
        className={`bg-blur w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200
            ${isModalOpen ? "text-goldyellow" : "text-grey-200"}`}
      >
        <NotifAlarm />
      </button>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default NotificationComponent;
