import React, { useState, useRef, useEffect } from "react";
import {
  Add,
  BadgeXp,
  BinDestruct,
  ChartBarAlt,
  Flash,
  HelpQuestionSupport,
  HomeAlt,
  Logo,
  LogoTitre,
  Mouse,
  NotifAlarm,
  ShopBag,
  SyncRefresh,
  UserProfile,
} from "../icons/icons";
import NotificationComponent from "./NotificationComponent";
import { supabaseBrowser } from "@/lib/supabase/browser";
import Spinner from "../ui/Spinner";

interface NavigationProps {
  setView: (view: string) => void;
  currentView: string; // Ajouter une propriété pour suivre la vue actuelle
}

export const Navigation: React.FC<NavigationProps> = ({
  setView,
  currentView,
}) => {
  return (
    <div className="col-span-10 row-span-1 h-fit flex flex-row justify-between gap-70">
      <div className="flex flex-row gap-[12px] h-[60px] items-center ">
        <div onClick={() => setView("home")} className="w-fit cursor-pointer">
          <Logo />
        </div>
        <div className="flex flex-col justify-center ">
          <LogoTitre />
        </div>
      </div>

      <div className="flex-1 flex items-center">
        {/* <div>
          <div className=" w-fit h-fit rounded-8 text-16 text-grey-600 leading-[100%] font-bold p-10 bg-goldyellow flex flex-row gap-10 items-center">
            <BadgeXp size={14} />
            <div>NIVEAU 35</div>
          </div>
        </div>
        <div className="flex-1 h-[10px] bg-blur">
          <div className="w-[100px] h-[10px] bg-goldyellow"></div>
        </div>
        <div className=" w-fit h-fit rounded-8 text-16 text-goldyellow leading-[100%] font-bold p-10 bg-blur">
          +362 XP
        </div> */}
      </div>
      <Software state={""} />

      <div className="flex flex-row gap-25">
        {/* <NotificationComponent /> */}

        <button
          className={`bg-blur  w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200 ${
            currentView === "settings" ? "text-goldyellow" : "text-grey-300"
          }`}
          onClick={() => setView("settings")}
        >
          <UserProfile />
        </button>
      </div>
    </div>
  );
};

interface SoftwareProps {
  state: string;
}

const Software: React.FC<SoftwareProps> = ({ state }) => {
  let icon;
  let label;
  let textColor;

  switch (state) {
    case "instable":
      icon = <UserProfile />;
      label = "INSTABLE";
      textColor = "text-voltred";
      break;
    case "connecté":
      icon = <UserProfile />;
      label = "CONNECTÉ";
      textColor = "text-green-500";
      break;
    default:
      icon = <SyncRefresh />;
      label = "DÉCONNECTÉ";
      textColor = "text-grey-300";
      break;
  }

  return (
    <div className="flex flex-row items-center transition-all ease-in-out duration-200">
      <div
        className={`bg-blur w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200 ${textColor} transition-all ease-in-out duration-200`}
      >
        {icon}
      </div>
      <div
        className={`flex items-center font-bold rounded-r-8 text-16 px-10 h-[31px] border-grey-500 border-t border-b border-r ${textColor} transition-all ease-in-out duration-200`}
      >
        {label}
      </div>
    </div>
  );
};

type ConfigurationType = {
  AutoDestruction_checkboxes: string[] | null;
};

export const SideNavigation: React.FC<NavigationProps> = ({
  setView,
  currentView,
}) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const offset = -127;
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = (view: string) => {
    const index = ["home", "modules", "ok", "cancel"].indexOf(view);
    setView(view);
    moveIndicator(index);
  };

  const moveIndicator = (index: number) => {
    if (indicatorRef.current) {
      const indicatorElement = indicatorRef.current;
      const translateY = 85 * index + offset;
      indicatorElement.style.transform = `translateY(${translateY}px)`;
    }
  };

  useEffect(() => {
    handleButtonClick(currentView);
  }, [currentView]);

  useEffect(() => {
    if (indicatorRef.current) {
      const indicatorElement = indicatorRef.current;
      indicatorElement.style.transform = `translateY(${offset}px)`;
    }
  }, []);

  const isActiveView = ["home", "modules", "ok", "cancel"].includes(
    currentView
  );

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="w-fit h-full flex flex-row gap-25 items-center">
        <div className="flex h-fit w-[4px]">
          <div
            ref={indicatorRef}
            className={`w-[4px] h-[24px] rounded-r-[50px] bg-goldyellow transition-transform duration-200 ease-in-out ${
              isActiveView ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
        <div className="h-fit flex flex-col gap-25">
          <button
            className={`bg-blur  w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200 ${
              currentView === "home" ? "text-goldyellow" : "text-grey-300"
            }`}
            onClick={() => handleButtonClick("home")}
          >
            <HomeAlt size={20} />
          </button>
          <button
            className={`bg-blur  w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200 ${
              currentView === "modules" ? "text-goldyellow" : "text-grey-300"
            }`}
            onClick={() => handleButtonClick("modules")}
          >
            <Mouse size={20} />
          </button>
          <button
            className={`bg-blur  w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200 ${
              currentView === "ok" ? "text-goldyellow" : "text-grey-300"
            }`}
            onClick={() => handleButtonClick("ok")}
          >
            <ChartBarAlt size={20} />
          </button>
          <button
            className={`bg-blur  w-[60px] h-[60px] rounded-16 flex justify-center items-center hover:bg-goldyellowhover hover:text-goldyellow hover:drop-shadow-glow transition-all ease-in-out duration-200 ${
              currentView === "cancel" ? "text-goldyellow" : "text-grey-300"
            }`}
            onClick={() => handleButtonClick("cancel")}
          >
            <HelpQuestionSupport size={20} />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row justify-start gap-25">
        <div className="flex h-fit w-[4px]"></div>
        <button
          className="bg-voltred/20 w-[60px] h-[60px] text-voltred rounded-16 flex justify-center items-center hover:bg-voltred/30 drop-shadow-glowred transition-all ease-in-out duration-200"
          onClick={handleOpenPopup}
        >
          <BinDestruct size={20} />
        </button>
      </div>
      {showPopup && <PopupModal onClose={handleClosePopup} />}
    </div>
  );
};

type PopupModalProps = {
  onClose: () => void;
};

const PopupModal: React.FC<PopupModalProps> = ({ onClose }) => {
  const [countdown, setCountdown] = useState(4);
  const [showCountdown, setShowCountdown] = useState(true);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [shouldCloseTab, setShouldCloseTab] = useState(false);
  const [skipCountdown, setSkipCountdown] = useState(false);

  // Créez une référence pour le contenu du modal
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConfiguration = async () => {
      console.log("Fetching configuration...");
      const supabase = supabaseBrowser();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user data:", userError);
        setLoading(false);
        return;
      }

      console.log("User data:", userData);

      if (userData?.user?.id) {
        const { data: configuration, error: configError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id);

        if (configError) {
          console.error("Error fetching configuration:", configError);
        } else if (configuration && configuration.length > 0) {
          const configData = configuration[0];
          console.log("Configuration fetched:", configData);

          if (
            configData.AutoDestruction_checkboxes?.includes(
              "instantdestruction"
            )
          ) {
            setSkipCountdown(true);
            setShowCountdown(false);
          } else if (
            configData.AutoDestruction_checkboxes?.includes("closetab")
          ) {
            setShouldCloseTab(true);
          }
        } else {
          console.log("No configuration found for user.");
        }
      } else {
        console.log("No user ID found.");
      }
      setLoading(false);
    };

    fetchConfiguration();
  }, []);

  const Shutdown = () => {
    // Tente de fermer la fenêtre
    if (window.opener) {
      window.opener = null;
      window.open("", "_self");
      window.close();
    } else {
      window.location.href = "about:blank"; // Revenir à la redirection de secours
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showCountdown && !loading && !skipCountdown) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setFinished(true);
            if (shouldCloseTab) {
              Shutdown();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (skipCountdown) {
      setFinished(true);
      if (shouldCloseTab) {
        Shutdown();
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [showCountdown, loading, skipCountdown, shouldCloseTab]);

  useEffect(() => {
    // Écouteur d'événement pour fermer le modal lorsqu'on clique en dehors
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div
        ref={modalRef}
        className="flex flex-col gap-50 shadow-lg p-50 w-full max-w-2xl bg-blur rounded-16 border border-voltred"
      >
        <h1 className="font-bold font-PPNeueBit text-voltred text-64 leading-10 text-center">
          {finished ? (
            <>
              Le logiciel a été supprimé <br /> de votre ordinateur
            </>
          ) : (
            <>
              Le logiciel va <br /> s’auto-détruire dans...
            </>
          )}
        </h1>

        {(showCountdown || skipCountdown) && (
          <>
            <p className="text-center font-PPNeueBit text-voltred text-300 leading-[170px]">
              {finished ? "X" : countdown}
            </p>
            <div className="flex flex-col justify-center items-center pt-25">
              <button
                onClick={() => {
                  if (finished) {
                    onClose();
                  } else {
                    setSkipCountdown(true);
                  }
                }}
                className="w-fit px-25 h-50 rounded-16 text-16 flex justify-center items-center text-grey-200 leading-[100%] font-bold bg-blur gap-10 cursor-pointer hover:bg-[#FF505030] hover:text-voltred hover:drop-shadow-glowred transition-all ease-in-out duration-200"
              >
                {finished ? (
                  <>
                    <Flash size={20} />
                    <div className="font-blod tracking-wider">
                      Aller à l'accueil
                    </div>
                  </>
                ) : (
                  <>
                    <Add size={20} className="rotate-45" />
                    <div className="font-blod tracking-wider">Annuler</div>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupModal;
