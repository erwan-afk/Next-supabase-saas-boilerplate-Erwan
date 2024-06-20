import React, { useEffect, useRef } from "react";
import { UserProfile } from "../icons/icons";

export const AdvertisingBar: React.FC = () => {
  const marqueeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContent = marqueeContentRef.current;
    if (marqueeContent) {
      const clone = marqueeContent.cloneNode(true);
      marqueeContent.parentElement?.appendChild(clone);
    }
  }, []);

  return (
    <div className=" h-fit bg-gradient-to-r from-goldgradient-dark to-goldgradient-light flex items-center overflow-hidden marquee gap-20 rounded-16">
      <div
        className="marquee-content flex items-center gap-20 text-grey-600"
        ref={marqueeContentRef}
      >
        <UserProfile size={20} />
        <div>
          <span className="font-extrabold text-30 align-text-middle">
            Parraine
          </span>
          <span className=" font-PPNeueBit text-40"> un ami</span>
        </div>
        <UserProfile size={20} />
        <div>
          <span className="font-extrabold text-30 align-text-middle">
            Gagne des jours
          </span>
          <span className=" font-PPNeueBit text-40"> gratuits</span>
        </div>
        <UserProfile size={20} />
        <div>
          <span className="font-extrabold text-30 align-text-middle">
            Parraine
          </span>
          <span className=" font-PPNeueBit text-40"> un ami</span>
        </div>
        <UserProfile size={20} />
        <div>
          <span className="font-extrabold text-30 align-text-middle">
            Gagne des jours
          </span>
          <span className=" font-PPNeueBit text-40"> gratuits</span>
        </div>
        <UserProfile size={20} />
        <div>
          <span className="font-extrabold text-30 align-text-middle">
            Parraine
          </span>
          <span className=" font-PPNeueBit text-40"> un ami</span>
        </div>
        <UserProfile size={20} />
        <div>
          <span className="font-extrabold text-30 align-text-middle">
            Gagne des jours
          </span>
          <span className=" font-PPNeueBit text-40"> gratuits</span>
        </div>
      </div>
    </div>
  );
};
