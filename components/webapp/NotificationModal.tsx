import React, { useRef, useState, useEffect } from "react";
import { UserProfile } from "../icons/icons";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(isOpen);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimateOut(false);
    } else {
      setAnimateOut(true);
      const timer = setTimeout(() => {
        setAnimateOut(false);
        setVisible(false);
        onClose();
      }, 500); // durée de l'animation

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setAnimateOut(true);
      const timer = setTimeout(() => {
        setAnimateOut(false);
        setVisible(false);
        onClose();
      }, 500); // durée de l'animation

      return () => clearTimeout(timer);
    }
  };

  const closeNotif = () => {
    setAnimateOut(true);
    const timer = setTimeout(() => {
      setAnimateOut(false);
      setVisible(false);
      onClose();
    }, 450); // durée de l'animation

    return () => clearTimeout(timer);
  };

  return (
    <div
      className={` fixed inset-0 flex items-start justify-end p-20 z-20 ${
        visible ? "block" : "hidden"
      }`}
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className={`bg-blur rounded-16 border border-goldyellow max-w-[400px] w-full p-20 flex flex-col gap-20 ${
          isOpen && !animateOut
            ? "animate-slide-in-right"
            : "animate-slide-out-right"
        }`}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="font-PPNeueBit text-48 text-goldyellow leading-[50%]">
            Notification
          </div>
          <div
            className="text-36 text-goldyellow flex flex-col items-center leading-3 cursor-pointer"
            onClick={() => closeNotif()}
          >
            x
          </div>
        </div>
        <tr className="border min-h-[1px] border-grey-500"></tr>
        <div className="rounded-16 bg-blur h-[190px] p-20 flex flex-col gap-20">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col rounded-8 justify-center items-center h-[24px] bg-voltred text-12 px-10 font-bold text-fasleblack">
              IMPORTANT
            </div>
            <div className="text-grey-400">
              <UserProfile size={24} />
            </div>
          </div>
          <div>
            <div className="font-bold text-20 text-grey-200">
              Votre abonnement expire dans 3 jours !
            </div>
            <div className="text-16 underline text-grey-400">
              Renouveler dès maintenant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
