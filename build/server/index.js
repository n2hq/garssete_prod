import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, useNavigate, Outlet, useNavigation, Meta, Links, ScrollRestoration, Scripts, Link, useLocation, useLoaderData, useSearchParams, useParams } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import NProgress from "nprogress";
import { FaSpinner, FaSignOutAlt, FaCarSide } from "react-icons/fa";
import CryptoJS from "crypto-js";
import { BiChevronLeft, BiChevronRight, BiSearch, BiUser, BiBriefcase, BiSolidRightArrow, BiBullseye, BiSpa, BiHome, BiEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { MdEditSquare, MdOutlineAttachEmail, MdPassword, MdWifiPassword, MdRealEstateAgent, MdLocationPin, MdPhone, MdOutline3gMobiledata, MdEmail, MdError } from "react-icons/md";
import { GiStarGate } from "react-icons/gi";
import { CgMoreVertical, CgChevronDown, CgChevronRight, CgShoppingCart, CgMenu } from "react-icons/cg";
import { RiRestaurantFill, RiDoubleQuotesL } from "react-icons/ri";
import { FcSettings } from "react-icons/fc";
import { HiBars3BottomRight, HiMiniBriefcase, HiHome, HiBars3BottomLeft } from "react-icons/hi2";
import { BsPersonFillGear, BsPersonFill, BsCircleFill, BsCircle, BsStarFill, BsStar, BsBank } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const NotificationContext = createContext(null);
function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
const NotificationProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState(0);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmOk, setConfirmOk] = useState(false);
  const [onCloseConfirm, setOnCloseConfirm] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const cancel = () => {
    setShow(false);
    setType(0);
    setMessage("");
  };
  useEffect(() => {
    cancel();
  }, []);
  const notify = async (message2 = "Working...") => {
    cancel();
    setNotifyMessage(message2);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(1);
  };
  const alert2 = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(2);
  };
  const alertCancel = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(5);
  };
  const alertReload = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(3);
  };
  const confirm = async (message2 = "Do you wish to continue?", onClose) => {
    cancel();
    setMessage(message2);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(4);
    setOnCloseConfirm(() => onClose);
  };
  let vals = {
    notify,
    cancel,
    alert: alert2,
    alertReload,
    confirm,
    confirmCancel,
    confirmOk,
    alertCancel
  };
  return /* @__PURE__ */ jsxs(NotificationContext.Provider, { value: vals, children: [
    show && type === 1 && /* @__PURE__ */ jsx(
      Notify,
      {
        working: show,
        notifyMessage
      }
    ),
    show && type === 2 && /* @__PURE__ */ jsx(
      Alert,
      {
        handleClose,
        working: show,
        message,
        title
      }
    ),
    show && type === 3 && /* @__PURE__ */ jsx(
      AlertReload,
      {
        handleClose,
        working: show,
        title,
        message
      }
    ),
    show && type === 4 && /* @__PURE__ */ jsx(
      Confirm,
      {
        onClose: onCloseConfirm,
        working: show,
        message
      }
    ),
    show && type === 5 && /* @__PURE__ */ jsx(
      AlertCancel,
      {
        handleClose,
        working: show,
        message,
        title
      }
    ),
    children
  ] });
};
const Confirm = ({ handleClose, working, message, handleConfirmCancel, setConfirmOk, onClose }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: "Confirm" }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(false),
          className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(true),
          className: `px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`,
          children: "Continue"
        }
      )
    ] })
  ] }) });
};
const Notify = ({ working, notifyMessage }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: "Processing..." }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsxs("div", { className: ` px-3 py-3 h-fit
                        flex place-items-center gap-2`, children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: `text-3xl text-blue-500 ${working ? "animate-spin" : ""}` }),
      notifyMessage
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: " " })
  ] }) });
};
const Alert = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: handleClose,
          className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
          children: "Close"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: () => window.location.reload(),
          className: `px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,
          children: "Reload"
        }
      )
    ] })
  ] }) });
};
const AlertReload = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: () => window.location.reload(),
        className: `px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,
        children: "Reload"
      }
    ) })
  ] }) });
};
const AlertCancel = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleClose,
        className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
        children: "Close"
      }
    ) })
  ] }) });
};
const config = {
  BASE_URL: "https://tynk.cc",
  IMG_BASE_URL: "https://oxbyt.com"
};
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
  "cache": "no-store"
};
function DoResponse(json, code = 500) {
  return new Response(
    JSON.stringify(json),
    {
      status: code,
      headers
    }
  );
}
function GetResponse(data, success = false, code = 200) {
  const response = {
    success,
    rspcode: code,
    data
  };
  return new Response(
    JSON.stringify(response),
    {
      status: code,
      headers
    }
  );
}
const HashPwd = (input) => {
  return CryptoJS.SHA256(input).toString();
};
const GenerateRandomHash = () => {
  const randomBytes = CryptoJS.lib.WordArray.random(16);
  const hash = CryptoJS.SHA256(randomBytes).toString();
  return hash;
};
const getBusinessProfile = async (criteria) => {
  const endpoint = "/api/listing/" + criteria;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
const getSearch = async (criteria) => {
  const endpoint = "/api/listing/search?q=" + criteria;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getFeaturedListing = async () => {
  const endpoint = `/api/listing/featured_listing`;
  const url = config.BASE_URL + endpoint;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getListingByCategory = async (category, limit) => {
  const endpoint = `/api/listing/listing_by_category/${category}/${limit}`;
  const url = config.BASE_URL + endpoint;
  console.log(url);
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getRating = async (userGuid, businessGuid) => {
  const endpoint = `/api/rating/${userGuid}/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getBusinessProfileImageData = async (guid) => {
  const endpoint = "/api/listing/business_profile_image/" + guid;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessGallery = async (businessGuid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = `/api/listing/business_gallery/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getRatingsReviews = async (businessGuid) => {
  const endpoint = `/api/rating/ratings_reviews/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getPage = async (criteria) => {
  const endpoint = "/api/listing/" + criteria;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { "message": error.message };
  }
};
const getBusinessRatings = async (businessGuid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = `/api/rating/business_ratings/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getLocalDate = (date) => {
  const localDate = new Date(date);
  const formatted = localDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  return formatted;
};
const getBusinessFeatures = async (businessGuid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = `/api/listing/business_facility_features/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const generate7DigitNumber = () => {
  return Math.floor(1e6 + Math.random() * 9e6);
};
const getCountries = async () => {
  const endpoint = "/api/util/country";
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const finaldata = data.map((country) => {
      return {
        name: country.name,
        id: country.id
      };
    });
    return data;
  } catch (error) {
    return void 0;
  }
};
const getStates = async (countryCode) => {
  const endpoint = "/api/util/state?country_code=" + countryCode;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCities = async (countryCode, stateCode) => {
  const endpoint = "/api/util/city?country_code=" + countryCode + "&state_code=" + stateCode;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCategories = async () => {
  const endpoint = "/api/util/category";
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfile = async (guid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = "/api/user/" + guid;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfileImageData = async (guid) => {
  const endpoint = "/api/user/user_profile_image/" + guid;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getPortfolio = async (guid) => {
  let businessesEndpoint = `/api/listing/owner/${guid}`;
  let url = config.BASE_URL + businessesEndpoint;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return null;
  }
};
const getOperatingHours = async (businessGuid, userGuid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = `/api/listing/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    console.log(error.message);
    return void 0;
  }
};
const saveOperatingHours = async (openStatus, workingHours, businessGuid, userGuid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = `/api/listing/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify({ openStatus, workingHours })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getGallery = async (businessGuid, userGuid) => {
  const endpoint = `/api/listing/gallery/${businessGuid}/${userGuid}`;
  const url = config.BASE_URL + endpoint;
  console.log(url);
  console.log("|||");
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSysFacilityFeatures = async () => {
  const endpoint = `/api/listing/sys_facility_features`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSelectedFacilityFeatures = async (userGuid, businessGuid) => {
  const BASE_URL = "https://tynk.cc";
  const endpoint = `/api/listing/selected_facility_features/${userGuid}/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusiness = async (userGuid, businessGuid) => {
  const endpoint = `/api/listing/activate/${userGuid}/${businessGuid}`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getRecents = async () => {
  const endpoint = `/api/listing/recents`;
  const url = config.BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const AuthContext = createContext(null);
const SITE_BASE_URL = "https://tynk.cc";
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
function AuthProvider({ children }) {
  let [authTokens, setAuthTokens] = useState(null);
  let [user, setUser] = useState(null);
  const verifyToken = async (accessToken) => {
    try {
      let verifyep = "/api/user/verifytoken";
      let vep = SITE_BASE_URL + verifyep;
      const response = await fetch(vep, {
        method: "POST",
        headers,
        body: JSON.stringify({ "token": accessToken })
      });
      if (response.status !== 200) {
        throw new Error("Could not obtain token");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      return null;
    }
  };
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens !== null) {
      const authTokens2 = JSON.parse(tokens);
      setAuthTokens(authTokens2);
    } else {
      setAuthTokens(null);
    }
    if (tokens) {
      const authTokens2 = JSON.parse(tokens);
      const accessToken = authTokens2.accessToken;
      verifyToken(accessToken).then((data) => {
        if (data === null) {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
        } else {
          setUser(data);
        }
      });
    } else {
      setUser(null);
    }
    setLoading(false);
    let timeoutDuration = 1e3 * 60 * 60 * 12;
    let interval = setInterval(() => {
      signout();
    }, timeoutDuration);
    return () => clearInterval(interval);
  }, []);
  let [loading, setLoading] = useState(true);
  const baseurl = SITE_BASE_URL;
  const endpoint = "/api/user/signin";
  const requesturl = baseurl + endpoint;
  useNavigate();
  let signin = async (data) => {
    try {
      const response = await fetch(requesturl, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      let tokens = await response.json();
      if (response.status === 200) {
        setAuthTokens(tokens);
        {
        }
        verifyToken(tokens.accessToken).then((data2) => {
          setUser(data2);
        });
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 100);
        });
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(tokens);
          }, 100);
        });
      }
    } catch (error) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    }
  };
  const signout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.reload();
  };
  const resetpw = async (data) => {
    const BASE_URL = "https://tynk.cc";
    const endpoint2 = "/api/users/reset_password_request";
    const url = BASE_URL + endpoint2;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      var respObj = await response.json();
      if (!response.ok) {
        throw new Error(`Error Code: ${response.status} - ${respObj.message}`);
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(respObj.message);
          }, 100);
        });
      }
    } catch (e) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(e.message);
        }, 100);
      });
    } finally {
    }
  };
  let cdata = {
    user,
    signin,
    signout,
    resetpw
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: cdata, children });
}
const SliderContext = createContext(null);
function useSliderContext() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSliderContext must be used within a SliderProvider");
  }
  return context;
}
const IMG_BASE_URL = "https://oxbyt.com";
const SliderProvider = ({ children }) => {
  const [dialog, setDialog] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [slides, setGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listing, setListing] = useState(null);
  useRef(0);
  useRef(0);
  const handleClose = () => {
    setDialog(false);
  };
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  let vals = {
    dialog,
    setDialog,
    selectedSlide,
    setSelectedSlide,
    slides,
    setGallery,
    setListing
  };
  return /* @__PURE__ */ jsxs(SliderContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `flex w-screen h-screen bg-white z-[5000] 
                fixed top-0 left-0 right-0 bottom-0 `, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
      /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
        /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides && selectedSlide && slides.map((slide, index2) => {
          return /* @__PURE__ */ jsx(
            "img",
            {
              src: IMG_BASE_URL + slide.image_url,
              alt: "",
              style: { transform: `translateX(-${currentSlide * 100}%)` },
              className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
            },
            index2
          );
        }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer right-0 group 
                                                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: () => handleClose(),
            className: `w-[50px] h-[50px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
        /* @__PURE__ */ jsxs("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: [
          "Photos for ",
          listing && listing.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
          currentSlide + 1,
          " / ",
          slides.length
        ] }),
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
      ] })
    ] }) }),
    children
  ] });
};
const AddPhotoDialogContext = createContext(null);
function useAddPhotoDialogContext() {
  const context = useContext(AddPhotoDialogContext);
  if (!context) {
    throw new Error("useAddPhotoDialogContext must be used within an AuthProvider");
  }
  return context;
}
function AddPhotoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const notification = useNotification();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
  };
  const handleUpload = async () => {
    setWorking(true);
    let imageTitle = document.getElementById("image_title");
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", userGuid);
      formData.append("bid", businessGuid);
      formData.append("image_title", imageTitle.value);
      notification.notify();
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      const IMG_BASE_URL2 = "https://oxbyt.com";
      const endpoint = "/business_gallery_pic_upload";
      const url = IMG_BASE_URL2 + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            notification.alert("", data.message);
          });
        } else {
          notification.alertReload("", "Image uploaded successfully!");
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      alert("Please select an image to continue.");
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    imgSrc,
    setImgSrc,
    handleCloseDialog,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile
  };
  return /* @__PURE__ */ jsxs(AddPhotoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3000]`,
            onClick: (event) => {
              event.preventDefault();
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: `relative w-full h-[75%] bg-black`, children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imgSrc,
                  alt: "",
                  className: `object-scale-down w-full h-full`
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "image_title",
                  placeholder: `Enter picture description.`,
                  type: "text",
                  className: `w-full bg-gray-100 px-3  h-[60px]`
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onMouseDown: () => handleCloseDialog(),
                    className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleUpload(),
                    className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: working ? "Working..." : "Submit"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    children
  ] });
}
const EditPhotoDialogContext = createContext(null);
function useEditPhotoDialogContext() {
  const context = useContext(EditPhotoDialogContext);
  if (!context) {
    throw new Error("useEditPhotoDialogContext must be used within an EditPhotoDialogProvider");
  }
  return context;
}
function EditPhotoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageGuid, setImageGuid] = useState(null);
  const [formData, setFormdata] = useState(null);
  const fileInputRef = useRef(null);
  const notification = useNotification();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
    setWorking(false);
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpdate = async () => {
    notification.notify();
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let imageTitle2 = document.getElementById("image_title");
    const formData2 = new FormData();
    if (isImgSelected) {
      formData2.append("file", selectedFile);
    }
    formData2.append("guid", userGuid);
    formData2.append("bid", businessGuid);
    formData2.append("image_title", imageTitle2.value);
    formData2.append("image_guid", imageGuid);
    const IMG_BASE_URL2 = "https://oxbyt.com";
    const endpoint = "/business_gallery_pic_update";
    const url = IMG_BASE_URL2 + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: formData2
      });
      if (!response.ok) {
        let error = response.json().then((data) => {
          notification.alert("", data.message);
        });
      } else {
        notification.alert("Image Update", "Image updated successfully!");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const deletePhoto = async (userGuid2, businessGuid2, imageGuid2) => {
    const IMG_BASE_URL2 = "https://oxbyt.com";
    const endpoint = `/delete_business_gallery_pic`;
    const url = IMG_BASE_URL2 + endpoint;
    const data = {
      guid: userGuid2,
      bid: businessGuid2,
      image_guid: imageGuid2
    };
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alert(data2.message);
        });
      } else {
        notification.alertReload("", "Image deleted successfully!");
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    handleCloseDialog,
    imgSrc,
    setImgSrc,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile,
    imageTitle,
    setImageTitle,
    imageGuid,
    setImageGuid,
    deletePhoto
  };
  return /* @__PURE__ */ jsxs(EditPhotoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen bg-black/30 z-[3000]`, children: /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100] `,
        children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full overflow-y-auto`, children: [
          /* @__PURE__ */ jsxs("div", { className: `relative w-full h-[75%] bg-black`, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-scale-down w-full h-full`
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                className: "hidden",
                onChange: handleFileChange
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex place-content-center place-items-center
                                                                     bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                                                     text-white/80 `,
                onMouseDown: handleImageClick,
                children: /* @__PURE__ */ jsx("div", { className: `w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `h-[25%]`, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                onChange: (e) => setImageTitle(e.target.value),
                id: "image_title",
                value: imageTitle,
                placeholder: `Enter picture description.`,
                type: "text",
                className: `w-full bg-gray-100 px-3  h-[60px]`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => handleCloseDialog(),
                  className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleUpdate(),
                  className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: working ? "Working..." : "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ) }) }),
    children
  ] });
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  const navigation = useNavigation();
  useEffect(() => {
    NProgress.start();
    if (navigation) {
      if (navigation.state !== "loading") {
        NProgress.done();
      }
    }
  }, [navigation]);
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(NotificationProvider, { children: /* @__PURE__ */ jsx(SliderProvider, { children: /* @__PURE__ */ jsx(EditPhotoDialogProvider, { children: /* @__PURE__ */ jsx(AddPhotoDialogProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children }) }) }) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const SearchBox = ({ query: query2 }) => {
  const [queryParam, setQueryParam] = useState("");
  const changeHandler = (e) => {
    setQueryParam(e.target.value);
  };
  useEffect(() => {
    if (query2 !== null && query2 !== void 0) {
      setQueryParam(query2);
    }
  }, [query2]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("form", { action: "/web/search", method: "get", children: /* @__PURE__ */ jsx("div", { className: `mx-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[800px] mx-auto w-full
                        bg-white rounded-full flex overflow-hidden
                        p-[5px] gap-x-1`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        value: queryParam,
        onChange: (e) => changeHandler(e),
        type: "text",
        className: `w-full p-3 outline-none
                                bg-blue-100 rounded-full`,
        placeholder: "Enter an address, city, state or country"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: `text-black bg-blue-500 rounded-full
                                border-none font-bold overflow-hidden min-w-[50px] w-[50px]
                                h-[50px] flex justify-center items-center`,
        children: /* @__PURE__ */ jsx(BiSearch, {})
      }
    )
  ] }) }) }) });
};
const AccountSettings = () => {
  return /* @__PURE__ */ jsx(Link, { to: `/web/account/profile`, children: /* @__PURE__ */ jsxs("div", { className: `flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`, children: [
    /* @__PURE__ */ jsx("div", { className: `bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`, children: /* @__PURE__ */ jsx(FcSettings, { className: `text-[20px]` }) }),
    /* @__PURE__ */ jsx("div", { className: `truncate text-[13px] text-gray-500`, children: "Account & Settings" })
  ] }) });
};
const AccountSignout = () => {
  const { signout } = useAuth();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: () => signout(),
      className: `flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`,
      children: [
        /* @__PURE__ */ jsx("div", { className: `bg-gray-200 h-[30px] w-[30px] rounded-full
                flex place-items-center place-content-center border`, children: /* @__PURE__ */ jsx(FaSignOutAlt, { className: `text-[20px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `truncate text-[13px] text-gray-500`, children: "Signout" })
      ]
    }
  );
};
const AccountUser = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [userProfileImgData, setUserProfileImgData] = useState(null);
  useEffect(() => {
    setName((user == null ? void 0 : user.first_name) + " " + (user == null ? void 0 : user.last_name));
  }, [user]);
  useEffect(() => {
    const getUserImageData = async (guid) => {
      const userProfile = await getUserProfileImageData(guid);
      setUserProfileImgData(userProfile);
    };
    if ((user == null ? void 0 : user.guid) !== null) {
      getUserImageData(user == null ? void 0 : user.guid);
    }
  }, [user]);
  return /* @__PURE__ */ jsx(Link, { to: `/web/account/profile`, children: /* @__PURE__ */ jsxs("div", { className: `flex hover:bg-gray-100 px-[10px] py-[5px] 
        hover:cursor-pointer gap-2 place-items-center`, children: [
    /* @__PURE__ */ jsx("div", { className: `bg-black relative h-[30px] w-[30px] rounded-full
                    overflow-hidden`, children: /* @__PURE__ */ jsx(
      "img",
      {
        className: `object-cover w-full h-full`,
        src: (userProfileImgData == null ? void 0 : userProfileImgData.image_url) ? config.IMG_BASE_URL + (userProfileImgData == null ? void 0 : userProfileImgData.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
        alt: ""
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: `truncate text-[13px] inline-block
                    text-gray-500`, children: name })
  ] }) });
};
const DropDown = ({ open }) => {
  return /* @__PURE__ */ jsx("div", { children: open && /* @__PURE__ */ jsx("div", { className: `absolute`, children: /* @__PURE__ */ jsx("div", { className: `relative`, children: /* @__PURE__ */ jsx("div", { className: `absolute right-[-25px] top-[5px]`, children: /* @__PURE__ */ jsxs("div", { className: `w-[250px] bg-white rounded p-[5px] 
                            shadow-lg
                                shadow-black/30`, children: [
    /* @__PURE__ */ jsx(AccountUser, {}),
    /* @__PURE__ */ jsx("div", { className: `px-[10px] my-1`, children: /* @__PURE__ */ jsx("hr", {}) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(AccountSettings, {}),
      /* @__PURE__ */ jsx(AccountSignout, {})
    ] })
  ] }) }) }) }) });
};
const UserMenu = ({ theme }) => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const showMenu = () => setOpen(true);
  const closeMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    auth.user ? /* @__PURE__ */ jsx(
      "button",
      {
        onClick: (e) => showMenu(),
        onBlur: (e) => closeMenu(),
        className: `w-[25px] h-[25px] bg-gray-400 hover:bg-gray-300 rounded-full text-white
                flex place-items-center place-content-center text-[13px]
                relative cursor-pointer`,
        children: /* @__PURE__ */ jsx(BiUser, { className: `object-cover w-[70%] h-[70%]` })
      }
    ) : /* @__PURE__ */ jsx(Link, { to: `/web/signin`, children: /* @__PURE__ */ jsx("div", { className: ` border-[1px] px-3 rounded-full flex
                        justify-center  content-center
                     text-[13px] py-[5px] cursor-pointer w-[80px] text-center
                    ${theme === "dark" && "text-white border-gray-400/80 hover:bg-white hover:text-blue-800"}
                    ${theme !== "dark" && "text-white border-gray-500/50 hover:text-white/60 hover:shadow-lg bg-blue-800"}
                    `, children: "Sign in" }) }),
    /* @__PURE__ */ jsx(DropDown, { open })
  ] });
};
const Hamburger = ({ theme, openNav, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center`,
      children: /* @__PURE__ */ jsx(
        HiBars3BottomRight,
        {
          onClick: openNav,
          className: `${theme === "light" ? "text-black" : "text-white"} w-8 h-8 cursor-pointer`
        }
      )
    }
  ) });
};
const mainLink = [
  {
    title: "Account Profile",
    icon: /* @__PURE__ */ jsx(BsPersonFillGear, {}),
    link: "/web/account/profile"
  },
  {
    title: "Email Address",
    icon: /* @__PURE__ */ jsx(MdOutlineAttachEmail, {}),
    link: "/web/account/email_address"
  },
  {
    title: "Change Password",
    icon: /* @__PURE__ */ jsx(MdPassword, {}),
    link: "/web/account/change_password"
  },
  {
    title: "Reset Password",
    icon: /* @__PURE__ */ jsx(MdWifiPassword, {}),
    link: "/web/account/reset_password"
  },
  {
    title: "Deactivate Profile",
    icon: /* @__PURE__ */ jsx(BsPersonFill, {}),
    link: "/web/account/deactivate_profile"
  }
];
const moreTools = [
  {
    title: "Create Business",
    icon: /* @__PURE__ */ jsx(BiBriefcase, {}),
    link: "/web/account/create_business"
  },
  {
    title: "My Portfolio",
    icon: /* @__PURE__ */ jsx(HiMiniBriefcase, {}),
    link: "/web/account/portfolio"
  }
];
const LeftNav = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  return /* @__PURE__ */ jsxs("div", { className: `mt-[0px] mx-[15px] relative`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-[18px]`, children: "Manage Account" }),
    /* @__PURE__ */ jsxs("div", { className: ` flex mt-8 pt-3`, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true",
          alt: "",
          className: "w-10 h-10 rounded-md"
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `
                          flex justify-between items-center
                          overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
                      `,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "leading-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "John Doe" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "johndoe@gmail.com" })
            ] }),
            /* @__PURE__ */ jsx(CgMoreVertical, { size: 20 })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("hr", { className: `mt-[15px]` }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    mainLink.map((link, index2) => {
      return /* @__PURE__ */ jsx("div", { className: `mt-[0px]`, children: /* @__PURE__ */ jsx(Link, { to: link.link, children: /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded
                        ${location.pathname.startsWith(link.link) && "bg-[#2e374a]/15"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`, children: link.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-[16px]`, children: link.title })
      ] }) }) }, index2);
    }),
    /* @__PURE__ */ jsxs("div", { className: ` text-[17px] mt-[20px]
                flex place-items-center h-[40px] place-content-between`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-[600]`, children: "More tools" }),
      /* @__PURE__ */ jsx("div", { className: ``, children: /* @__PURE__ */ jsx(CgChevronDown, { className: `text-[20px]` }) })
    ] }),
    moreTools.map((link, index2) => {
      return /* @__PURE__ */ jsx("div", { className: `mt-[0px]`, children: /* @__PURE__ */ jsx(Link, { to: link.link, children: /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                        hover:bg-gray-200/60 py-1 rounded
                        ${location.pathname.startsWith(link.link) && "bg-[#2e374a]/15"}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                    place-content-center place-items-center border-gray-300 text-[23px]`, children: link.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-[16px]`, children: link.title })
      ] }) }) }, index2);
    })
  ] });
};
const WhiteLogo = () => {
  return /* @__PURE__ */ jsx(Link, { to: `/`, children: /* @__PURE__ */ jsxs("div", { className: `font-black text-2xl
                cursor-pointer tracking-tight relative
                top-[-1px]`, children: [
    "Gr",
    /* @__PURE__ */ jsx("i", { children: "ü" }),
    "the"
  ] }) });
};
const cnLinks$1 = [
  {
    title: "Home",
    link: "/",
    icon: /* @__PURE__ */ jsx(HiHome, {})
  },
  {
    title: "Page Search",
    link: "/web/search",
    icon: /* @__PURE__ */ jsx(BiSearch, {})
  }
];
const MobileNav = ({
  showNav,
  closeNav
}) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const bgOverlay = showNav ? "block" : "hidden";
  const { user } = useAuth();
  const location = useLocation();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { onClick: closeNav, className: `transform ${bgOverlay} fixed transition-all duration-500 inset-0 z-[4000] bg-black opacity-20 w-full` }),
    /* @__PURE__ */ jsxs("div", { className: `${navOpen} transform transition-all duration-500
                delay-0 fixed  justify-start  h-full
                w-[350px] md:w-[400px] bg-white z-[4001] ${showNav ? "shadow-lg shadow-black/50" : ""}
                overflow-y-auto
                `, children: [
      /* @__PURE__ */ jsx("div", { className: `bg-white pt-4 pb-4`, children: /* @__PURE__ */ jsx("div", { className: `pl-8 md:pl-12`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }) }),
      /* @__PURE__ */ jsx("hr", { className: ` border-t-[1px] border-yellow-500/20` }),
      /* @__PURE__ */ jsx("div", { className: `flex flex-col mt-10 mx-[15px]`, children: cnLinks$1.map((link, index2) => {
        return /* @__PURE__ */ jsx("div", { className: `mt-[0px]`, children: /* @__PURE__ */ jsx(Link, { to: link.link, children: /* @__PURE__ */ jsxs("div", { className: ` flex place-items-center gap-3
                                                hover:bg-gray-200/60 py-1 rounded
                                                place-content-between pr-1
                                                ${location.pathname === link.link && "bg-[#2e374a]/15"}`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-[40px] h-[40px] rounded-full
                                            place-content-center place-items-center border-gray-300 text-[22px]`, children: link.icon }),
          /* @__PURE__ */ jsx("div", { className: `text-[15px] grow`, children: link.title }),
          /* @__PURE__ */ jsx("div", { className: `text-[17px]`, children: /* @__PURE__ */ jsx(CgChevronRight, {}) })
        ] }) }) }, index2);
      }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("hr", { className: `mt-[20px]` }),
        /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
        user && /* @__PURE__ */ jsx(LeftNav, {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: `mt-20` })
    ] })
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `h-[100px]` }),
    /* @__PURE__ */ jsx("div", { className: " pt-10 pb-12 bg-black w-full px-[15px]", children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
      /* @__PURE__ */ jsx("div", { className: `text-white`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsx("hr", { className: `border-b-0 border-t-[1px] border-gray-500/50` }),
      /* @__PURE__ */ jsxs("p", { className: " text-center mt-4 text-sm text-white/60 font-extralight", children: [
        "Copyright 2025 © | ",
        /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsxs("b", { className: `text-white`, children: [
          "Gr",
          /* @__PURE__ */ jsx("i", { children: "ü" }),
          "the.com"
        ] }) })
      ] })
    ] }) })
  ] });
};
const LatestStarRating = ({ rating = 0, maxStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-green-700 text-lg", children: /* @__PURE__ */ jsx(BsCircleFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-green-900 text-lg", children: /* @__PURE__ */ jsx(BsCircle, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-0", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-green-900` }) }),
    /* @__PURE__ */ jsx("div", { className: ` text-sm`, children: Number(rating).toFixed(0) })
  ] });
};
const Recents = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getRecents();
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsx("div", { className: `px-[15px]`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: `mt-5 pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] border-b pb-4 `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-black text-2xl flex place-content-center
                        tracking-tight`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px] flex place-content-center`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 
                    lg:grid-cols-4 gap-x-3 gap-y-4
                    `, children: listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[120px] md:h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: (data == null ? void 0 : data.image_url) !== null ? IMG_BASE_URL2 + (data == null ? void 0 : data.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate font-bold`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    }) })
  ] }) }) });
};
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(HeaderNav$1, {}),
    /* @__PURE__ */ jsx(HomepageHero$1, {}),
    /* @__PURE__ */ jsx(
      Recents,
      {
        category: "services",
        limit: 8,
        title: `Recent Listings`,
        subtitle: "Recent businesses or entities added by date."
      }
    ),
    /* @__PURE__ */ jsx(FrontPageCategories$1, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const HeaderNav$1 = () => {
  const [scrollHeight] = useState(1);
  const [theme, setTheme] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setIsScroll(true);
      }
      if (window.scrollY < scrollHeight) {
        setIsScroll(false);
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${isScroll && "bg-black/50"}
     `, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold font-sans 
          flex place-items-center text-2xl`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: `hidden place-items-center
          w-full lg:flex`, children: /* @__PURE__ */ jsx(Link, { to: `/web/search`, children: "Search" }) }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-4`, children: [
        /* @__PURE__ */ jsx(UserMenu, { theme: "dark" }),
        /* @__PURE__ */ jsx(Hamburger, { theme: "dark", openNav, navBg })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
const heroimgs$1 = [
  {
    img: "images/dubai7star.jpeg"
  },
  {
    img: "https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"
  },
  {
    img: "https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"
  }
];
const HomepageHero$1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const [slides, setSlides] = useState(null);
  let timeoutId = useRef(null);
  useEffect(() => {
    setSlides(heroimgs$1);
  }, []);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  const handleNext = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    next();
    timeoutId.current = setTimeout(() => {
      handleNext();
    }, 15e3);
  };
  const handlePrev = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    prev();
    timeoutId.current = setTimeout(() => {
      next();
    }, 15e3);
  };
  useEffect(() => {
    const startSlide = async (slides2) => {
      if (slides2 !== null) {
        const cnt = slides2.length;
        for (let i = 0; i < cnt; i++) {
          timeoutId = await new Promise((resolve) => setTimeout(resolve, 15e3));
          next();
          if (i == slides2.length - 1) {
            startSlide(slides2);
          }
        }
      }
    };
    if (slides) {
      startSlide(slides);
    }
  }, [slides]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsx("div", { className: ` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `, children: slides == null ? void 0 : slides.map((slide, index2) => {
      return /* @__PURE__ */ jsx(
        "img",
        {
          src: slide.img,
          alt: "",
          style: { transform: `translateX(-${currentSlide * 100}%)` },
          className: `object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`
        },
        index2
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent` }),
    /* @__PURE__ */ jsxs("div", { className: `z-[300]`, children: [
      /* @__PURE__ */ jsx("button", { onMouseDown: handlePrev, className: `block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: handleNext, className: `block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: ` 
          max-w-[800px] mx-auto w-full z-[300]`,
        children: /* @__PURE__ */ jsx(SearchBox, {})
      }
    ) })
  ] }) });
};
const categories$1 = [
  {
    title: "Restaurants",
    link: "/web/search?q=restaurants",
    icon: /* @__PURE__ */ jsx(RiRestaurantFill, {})
  },
  {
    title: "Shopping",
    link: "/web/search?q=shopping",
    icon: /* @__PURE__ */ jsx(CgShoppingCart, {})
  },
  {
    title: "Nightlife",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(GiStarGate, {})
  },
  {
    title: "Active Life",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(BiBullseye, {})
  },
  {
    title: "Beauty & Spa",
    link: "/web/search?q=beauty and spa",
    icon: /* @__PURE__ */ jsx(BiSpa, {})
  },
  {
    title: "Automotive",
    link: "/web/search?q=automotive",
    icon: /* @__PURE__ */ jsx(FaCarSide, {})
  },
  {
    title: "Home Services",
    link: "/web/search?q=home service",
    icon: /* @__PURE__ */ jsx(BiHome, {})
  },
  {
    title: "Real Estate",
    link: "/web/search?q=real estate",
    icon: /* @__PURE__ */ jsx(MdRealEstateAgent, {})
  }
];
const FrontPageCategories$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: `w-full relative mt-[50px] px-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsx("div", { className: `relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`, children: "Categories" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`, children: categories$1.map((category, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `${category.link}`, children: /* @__PURE__ */ jsxs("div", { className: `border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`, children: category.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-base font-semibold
                  text-gray-500`, children: category.title })
      ] }) }) }, index2);
    }) })
  ] }) });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FrontPageCategories: FrontPageCategories$1,
  HeaderNav: HeaderNav$1,
  HomepageHero: HomepageHero$1,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const GalleryContext = createContext(null);
function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}
const GalleryProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [gallery, setGallery] = useState(null);
  const slider = useSliderContext();
  const [listing, setListing] = useState(null);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const handleClose = () => setShow(false);
  let vals = {
    setShow,
    setGallery,
    setListing
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(gallery);
  };
  return /* @__PURE__ */ jsxs(GalleryContext.Provider, { value: vals, children: [
    show && /* @__PURE__ */ jsxs(
      "div",
      {
        onMouseDown: (e) => setShow(false),
        className: `flex w-screen h-screen bg-black/40 
                        z-[3000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              onMouseDown: (e) => e.stopPropagation(),
              className: `w-[95%] sm:w-[95%] md:w-[80%] max-h-[80%] mx-auto
                         bg-white rounded-lg shadow-lg shadow-black/50 space-y-6
                         z-[3100] overflow-hidden`,
              children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full`, children: [
                /* @__PURE__ */ jsx("div", { className: `border-b py-3 px-3`, children: /* @__PURE__ */ jsxs("div", { className: `font-bold text-gray-700
                                    text-xl w-[80%]  truncate`, children: [
                  "Gallery for ",
                  listing && (listing == null ? void 0 : listing.title)
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: `grid grid-cols-4 md:grid-cols-6 gap-2 
                                h-full overflow-y-auto pt-2 px-2 pb-2
                                bg-gray-800 `, children: gallery && (gallery == null ? void 0 : gallery.map((image, index2) => {
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      onClick: () => showCarousel(index2),
                      className: `relative hover:cursor-pointer
                                                 bg-red-200 h-[80px] md:h-[100px] lg:h-[120px] rounded-md
                                                 overflow-hidden`,
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          className: `object-cover w-full h-full`,
                          src: IMG_BASE_URL2 + image.image_url,
                          alt: ""
                        }
                      )
                    }
                  );
                })) })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              onMouseDown: () => handleClose(),
              className: `w-[50px] h-[50px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`,
              children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
            }
          )
        ]
      }
    ),
    children
  ] });
};
const maximumWords = 100;
const RatingContext = createContext(null);
function useRating() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
}
const RatingSchema = z.object({
  fullname: z.any(),
  rating: z.any(),
  comment: z.any()
});
function RatingProvider({ children }) {
  var _a, _b, _c;
  const [show, setShow] = useState(false);
  const [working, setWorking] = useState(false);
  const [listing, setListing] = useState(null);
  const [ratingData, setRatingData] = useState(void 0);
  const [text, setText] = useState("");
  const notification = useNotification();
  const [stars, setStars] = useState(5);
  let { user } = useAuth();
  const [formdata, setFormdata] = useState(null);
  const [wordLimitReached, setWordLimitReached] = useState(false);
  const countWords = (input) => {
    return input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(RatingSchema)
  });
  const handleTextChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= maximumWords) {
      setValue("text", input);
      setWordLimitReached(false);
    } else {
      setWordLimitReached(true);
      const trimmedWords = words.slice(0, maximumWords).join(" ");
      setValue("text", trimmedWords);
    }
  };
  const postRating = async (data) => {
    notification.notify("Working...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const userGuid = user.guid;
    const businessGuid = listing.gid;
    data["user_guid"] = userGuid;
    data["business_guid"] = businessGuid;
    const BASE_URL = "https://tynk.cc";
    const endpoint = `/api/rating`;
    const url = BASE_URL + endpoint;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const datar = await res.json();
      if (res.ok) {
        notification.alert("Success", "Rating submitted successfully!");
      } else {
        notification.alert("Error", datar.error);
      }
    } catch (error) {
      notification.alert("", error.message);
    }
  };
  const validateData = async (data, user2) => {
    if ((data == null ? void 0 : data.length) === 0) {
      let fname = (user2 == null ? void 0 : user2.first_name) || "";
      let lname = (user2 == null ? void 0 : user2.last_name) || "";
      let fullname = fname + " " + lname;
      setValue("fullname", fullname);
    }
  };
  let vals = {
    show,
    setShow,
    setListing,
    reset,
    setRatingData,
    validateData
  };
  const textValue = watch("text") || "";
  const handleKeyDown = (e) => {
    const words = textValue.trim().split(/\s+/);
    if (words.length >= maximumWords && e.key !== "Backspace" && e.key !== "Delete" && !e.ctrlKey) {
      e.preventDefault();
      setWordLimitReached(true);
    } else {
      setWordLimitReached(false);
    }
  };
  return /* @__PURE__ */ jsxs(RatingContext.Provider, { value: vals, children: [
    show && /* @__PURE__ */ jsx("div", { className: `flex w-screen h-screen bg-black/40 z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 place-items-center place-content-center`, children: /* @__PURE__ */ jsxs("div", { className: `w-[450px] h-fit mx-auto p-6 bg-white rounded-xl shadow-md space-y-6`, children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Create/Edit Rating" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(postRating), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("fullname", {
                onChange: changeHandler
              }),
              type: "text",
              className: "w-full px-3 py-2 border rounded-md",
              placeholder: "Enter Business GUID"
            }
          ),
          ((_a = errors.fullname) == null ? void 0 : _a.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-1 text-sm", children: errors.fullname.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Stars" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              ...register("rating", {
                onChange: (e) => {
                  setStars(Number(e.target.value));
                  changeHandler(e);
                }
              }),
              className: "w-full px-3 py-2 border rounded-md",
              children: [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxs("option", { value: s, children: [
                s,
                " Star",
                s > 1 ? "s" : ""
              ] }, s))
            }
          ),
          ((_b = errors.rating) == null ? void 0 : _b.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-1 text-sm", children: errors.rating.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex place-content-between", children: [
            /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Comment" }),
            /* @__PURE__ */ jsxs("label", { className: " text-gray-600 text-sm", children: [
              "Word Count: ",
              /* @__PURE__ */ jsx("strong", { children: countWords(text) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              ...register("comment", {
                onChange: (e) => {
                  let words = countWords(text);
                  if (words <= maximumWords) {
                    setText(e.target.value);
                    handleTextChange(e);
                    changeHandler(e);
                  } else {
                    e.preventDefault();
                  }
                }
              }),
              onKeyDown: handleKeyDown,
              className: "w-full px-3 py-2 border rounded-md text-sm",
              placeholder: "Write your review...",
              rows: 4
            }
          ),
          wordLimitReached && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-0 text-sm", children: "Maximum maximumWords words allowed." }),
          ((_c = errors.comment) == null ? void 0 : _c.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-0 text-sm", children: errors.comment.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-full grid grid-cols-2 gap-2`, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShow(false),
              className: `w-full bg-red-200 rounded-md
                                        hover:bg-red-100`,
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: working,
              className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700",
              children: working ? "Submitting..." : "Submit Rating"
            }
          )
        ] })
      ] })
    ] }) }),
    children
  ] });
}
const Header = ({ listing }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `text-[19px] md:text-[24px] 
                font-bold mt-[5px] leading-[1.2em]`, children: listing == null ? void 0 : listing.title }),
    /* @__PURE__ */ jsxs("div", { className: `text-[13px] mt-1.5 leading-[1.2em]`, children: [
      (listing == null ? void 0 : listing.address_one) ? `${listing == null ? void 0 : listing.address_one}, ` : "",
      (listing == null ? void 0 : listing.address_two) ? `${listing == null ? void 0 : listing.address_two}, ` : "",
      (listing == null ? void 0 : listing.city_name) ? `${listing == null ? void 0 : listing.city_name}, ` : "",
      (listing == null ? void 0 : listing.state_name) ? `${listing == null ? void 0 : listing.state_name}, ` : "",
      listing == null ? void 0 : listing.country_name
    ] })
  ] });
};
const Description = ({ listing }) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    if (listing.gid) {
      let imgdata = getBusinessProfileImageData(listing.gid);
      imgdata.then((data) => {
        setImg(config.IMG_BASE_URL + data.image_url);
      });
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-lg`, children: "About this business" }),
    /* @__PURE__ */ jsxs("div", { className: `flex place-items-start place-content-start
                gap-2 mt-4 mb-3`, children: [
      /* @__PURE__ */ jsx("div", { className: `rounded-full bg-black w-[30px] h-[30px]
                    overflow-hidden relative`, children: /* @__PURE__ */ jsx(
        "img",
        {
          className: `object-cover w-full h-full`,
          src: img,
          alt: ""
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-md font-bold tracking-tight leading-[1.2em]`, children: listing.title }),
        /* @__PURE__ */ jsx("div", { className: `text-[12px] capitalize`, children: listing.category })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`, children: listing == null ? void 0 : listing.long_description })
  ] });
};
const Address = ({ businessProfile }) => {
  return /* @__PURE__ */ jsxs("div", { className: `bg-blue-50/50 rounded-[5px] overflow-hidden  px-0 pt-0 pb-5 w-full`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-[18px] border-b pb-2 
                 shadow-gray-700/40 px-3 bg-blue-100/50 pt-3`, children: "Contact" }),
    /* @__PURE__ */ jsx("div", { className: "h-[30px]" }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 
            text-[14px] space-y-4 lg:space-y-4 tracking-tight
            md:space-x-4 lg:space-x-0 text-black/80 font-sans
            px-3`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-full`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1 `, children: /* @__PURE__ */ jsx(MdLocationPin, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsxs("div", { className: `col-span-11 leading-[1.2em] ml-2
                            text-[13px]`, children: [
          (businessProfile == null ? void 0 : businessProfile.address_one) + ", ",
          (businessProfile == null ? void 0 : businessProfile.address_two) !== null ? (businessProfile == null ? void 0 : businessProfile.address_two) + ", " : "",
          (businessProfile == null ? void 0 : businessProfile.city_name) !== null ? (businessProfile == null ? void 0 : businessProfile.city_name) + ", " : "",
          (businessProfile == null ? void 0 : businessProfile.state_name) !== null ? (businessProfile == null ? void 0 : businessProfile.state_name) + ", " : "",
          (businessProfile == null ? void 0 : businessProfile.zipcode) !== null ? (businessProfile == null ? void 0 : businessProfile.zipcode) + ", " : "",
          businessProfile == null ? void 0 : businessProfile.country_name
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: `  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `tel:${businessProfile == null ? void 0 : businessProfile.phone}`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1`, children: /* @__PURE__ */ jsx(MdPhone, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2`, children: businessProfile == null ? void 0 : businessProfile.phone })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: `  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `${businessProfile == null ? void 0 : businessProfile.website}`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1 relative top-0
                            `, children: /* @__PURE__ */ jsx(MdOutline3gMobiledata, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2 top-0
                            flex place-items-center`, children: "Website" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: `  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `mailto:${businessProfile == null ? void 0 : businessProfile.email_address}`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1 relative top-0
                            `, children: /* @__PURE__ */ jsx(MdEmail, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2 top-0
                            flex place-items-center`, children: "Email Address" })
      ] }) }) })
    ] })
  ] });
};
const Review = ({ listing }) => {
  const rating = useRating();
  const { user } = useAuth();
  const notification = useNotification();
  useEffect(() => {
    if ((listing == null ? void 0 : listing.gid) && (user == null ? void 0 : user.guid)) {
      rating.setListing(listing);
      getRating(user.guid, listing.gid).then((data) => {
        if ((data == null ? void 0 : data.length) !== 0) {
          rating.reset(data);
          rating.setRatingData(data);
        } else {
          rating.validateData(data, user);
        }
      });
    }
  }, [listing, user]);
  const handleResult = (confirmed) => {
    if (confirmed) {
      notification.cancel();
      window.location.href = "/signin";
    } else {
      notification.cancel();
    }
  };
  const handleShow = () => {
    if ((user == null ? void 0 : user.guid) === null || (user == null ? void 0 : user.guid) === void 0) {
      notification.confirm("Login to continue", handleResult);
    } else {
      rating.setShow(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: `mx-auto w-full sm:w-[60%] lg:w-full mt-3`, children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => handleShow(),
      className: `bg-blue-500 text-white flex flex-col
                items-center py-2 w-full `,
      children: "Write Review"
    }
  ) });
};
const StarRating = ({
  ratingsData,
  rating = 3.5,
  maxStars = 5
}) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-green-700 text-md", children: /* @__PURE__ */ jsx(BsCircleFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: `text-green-700 text-md rounded-full
                overflow-hidden`, children: /* @__PURE__ */ jsx(BsCircle, { className: `bg-green-100` }) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-6", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-green-700` }) }),
    /* @__PURE__ */ jsxs("div", { className: ` text-sm`, children: [
      "Rating: ",
      rating
    ] }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-green-700` }) }),
    /* @__PURE__ */ jsxs("div", { className: `text-sm`, children: [
      "Reviews: ",
      Number(ratingsData.rating_count)
    ] })
  ] });
};
const BusinessFeatures = ({ listing }) => {
  const [features, setFeatures] = useState(void 0);
  useEffect(() => {
    getBusinessFeatures(listing.gid).then((data) => {
      setFeatures(data);
    });
  }, [listing.business_guid]);
  return /* @__PURE__ */ jsxs("div", { className: " mt-12", children: [
    /* @__PURE__ */ jsx("div", { className: ` font-bold text-xl`, children: "Features" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-4 mt-3`, children: features == null ? void 0 : features.map((feature, index2) => {
      return /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold`, children: feature.name }),
        /* @__PURE__ */ jsx("div", { className: `text-sm mt-[-2px] text-gray-500 leading-[1.2em] tracking-normal`, children: feature.user_description || feature.description })
      ] }, index2);
    }) })
  ] });
};
const ShortDescription = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { className: `mt-4`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-lg font-bold`, children: "Intro" }),
    /* @__PURE__ */ jsx("div", { className: ` text-[14px] flex flex-col gap-y-4 whitespace-pre-wrap`, children: listing.short_description })
  ] });
};
const SingleStarRating = ({ rating = 3.5, maxStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg", children: /* @__PURE__ */ jsx(BsStarFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg", children: /* @__PURE__ */ jsx(BsStar, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-0", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-yellow-400` }) }),
    /* @__PURE__ */ jsxs("div", { className: ` text-sm`, children: [
      "Rating: ",
      Number(rating).toFixed(0)
    ] })
  ] });
};
const BusinessRatings = ({ listing }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingsRevews, setRatingsReviews] = useState({});
  useEffect(() => {
    const getReviews = async (guid) => {
      if (guid) {
        await getBusinessRatings(guid).then((data) => {
          setReviews(data);
        });
      }
    };
    const getRatingsReviewsData = async (guid) => {
      if (guid) {
        await getRatingsReviews(guid).then((data) => {
          setRatingsReviews(data);
        });
      }
    };
    if (listing.gid) {
      getReviews(listing.gid);
      getRatingsReviewsData(listing.gid);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-12`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-xl font-bold`, children: "Reviews" }),
    /* @__PURE__ */ jsxs("div", { className: `-mt-1 text-[14px] flex flex-col -gap-y-1 font-light`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold`, children: "Overall Rating:" }),
      ratingsRevews && /* @__PURE__ */ jsx(SingleStarRating, { rating: ratingsRevews == null ? void 0 : ratingsRevews.rating_average })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: `mt-3` }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-4 divide-y-[1px]`, children: reviews !== null && (reviews == null ? void 0 : reviews.map((review, index2) => {
      return /* @__PURE__ */ jsxs("div", { className: `pt-7 pb-4`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex place-items-start gap-2`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-[30px] h-[30px] rounded-full
                                        bg-black overflow-hidden`, children: /* @__PURE__ */ jsx("img", { src: config.IMG_BASE_URL + review.image_url, alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
            /* @__PURE__ */ jsx("div", { className: `text-sm font-bold`, children: review.fullname }),
            /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: `${review == null ? void 0 : review.city_name}, ${review == null ? void 0 : review.state_name}` }),
            /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: `${review == null ? void 0 : review.country_name}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `mt-2`, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SingleStarRating, { rating: review.rating }) }),
          /* @__PURE__ */ jsxs("div", { className: `text-[12px] flex gap-1 place-items-center`, children: [
            /* @__PURE__ */ jsx("b", { children: "Created at:" }),
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: getLocalDate(review.created_at) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `text-[12px] flex gap-1 place-items-center`, children: [
            /* @__PURE__ */ jsx("b", { children: "Last Edited:" }),
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: getLocalDate(review.updated_at) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `text-[14px] mt-2`, children: review.comment })
        ] })
      ] }, index2);
    })) })
  ] });
};
const ImageBlock = ({ images, listing }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const [items, setItems] = useState([]);
  const slider = useSliderContext();
  const gallery = useGallery();
  const [shortGallery, setShortGallery] = useState([]);
  useEffect(() => {
    let shortGallery2 = [...items];
    if (images) {
      images.map((image, index2) => {
        if (index2 + 1 < 12) {
          shortGallery2.push(image);
        }
      });
      setShortGallery(shortGallery2);
    }
  }, [images]);
  const showCarousel = (index2) => {
    if (index2 < images.length) {
      slider.setDialog(true);
      slider.setSelectedSlide(index2 + 1);
      slider.setGallery(images);
      slider.setListing(listing);
    }
  };
  const showGallery = (index2) => {
    gallery.setShow(true);
    gallery.setGallery(images);
    gallery.setListing(listing);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-auto mb-[32px] flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: `h-[350px]
                grid grid-cols-12 gap-2`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-7 bg-red-300
                    row-span-2 rounded-md overflow-hidden
                    relative cursor-pointer`,
          onMouseDown: (e) => showCarousel(0),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_a = images[0]) == null ? void 0 : _a.image_url) !== void 0 && ((_b = images[0]) == null ? void 0 : _b.image_url) !== null ? config.IMG_BASE_URL + ((_c = images[0]) == null ? void 0 : _c.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-5 bg-blue-300
                    rounded-md overflow-hidden
                    relative cursor-pointer`,
          onMouseDown: (e) => showCarousel(1),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_d = images[1]) == null ? void 0 : _d.image_url) !== void 0 && ((_e = images[1]) == null ? void 0 : _e.image_url) !== null ? config.IMG_BASE_URL + ((_f = images[1]) == null ? void 0 : _f.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `col-span-5 bg-green-300
                    rounded-md overflow-hidden
                    relative cursor-pointer`,
          onMouseDown: (e) => showCarousel(2),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_g = images[2]) == null ? void 0 : _g.image_url) !== void 0 && ((_h = images[2]) == null ? void 0 : _h.image_url) !== null ? config.IMG_BASE_URL + ((_i = images[2]) == null ? void 0 : _i.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-5 gap-1.5`, children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded overflow-hidden
                    relative cursor-pointer h-[100px]`,
          onMouseDown: (e) => showCarousel(3),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_j = images[3]) == null ? void 0 : _j.image_url) !== void 0 && ((_k = images[3]) == null ? void 0 : _k.image_url) !== null ? config.IMG_BASE_URL + ((_l = images[3]) == null ? void 0 : _l.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded overflow-hidden
                    relative cursor-pointer h-[100px]`,
          onMouseDown: (e) => showCarousel(4),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_m = images[4]) == null ? void 0 : _m.image_url) !== void 0 && ((_n = images[4]) == null ? void 0 : _n.image_url) !== null ? config.IMG_BASE_URL + ((_o = images[4]) == null ? void 0 : _o.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded-md overflow-hidden
                    relative bg-black cursor-pointer h-[100px]`,
          onMouseDown: (e) => showCarousel(5),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_p = images[5]) == null ? void 0 : _p.image_url) !== void 0 && ((_q = images[5]) == null ? void 0 : _q.image_url) !== null ? config.IMG_BASE_URL + ((_r = images[5]) == null ? void 0 : _r.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded-md overflow-hidden
                    relative bg-black cursor-pointer h-[100px]`,
          onMouseDown: (e) => showCarousel(6),
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: ((_s = images[6]) == null ? void 0 : _s.image_url) !== void 0 && ((_t = images[6]) == null ? void 0 : _t.image_url) !== null ? config.IMG_BASE_URL + ((_u = images[6]) == null ? void 0 : _u.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
              alt: "",
              className: `object-cover h-full w-full`
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded-md overflow-hidden
                    relative bg-black text-white cursor-pointer
                    flex place-content-center place-items-center h-[100px]`,
          onMouseDown: (e) => showGallery(),
          children: (images == null ? void 0 : images.length) > 7 ? `+${images.length - 7}` : "View all"
        }
      )
    ] })
  ] });
};
const BusinessLayout = ({
  listing,
  images,
  ratingsData
}) => {
  return /* @__PURE__ */ jsx("div", { className: `px-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] w-full mx-auto bg-white`, children: [
    ratingsData && /* @__PURE__ */ jsx(StarRating, { ratingsData, rating: Number(ratingsData.rating_average) }),
    listing && /* @__PURE__ */ jsx(Header, { listing }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 mt-4 gap-0 md:gap-6 relative`, children: [
      /* @__PURE__ */ jsxs("div", { className: ` col-span-12 lg:col-span-8`, children: [
        images && listing && /* @__PURE__ */ jsx(
          ImageBlock,
          {
            images,
            listing
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: `lg:hidden mt-5 mb-5`, children: [
          listing && /* @__PURE__ */ jsx(Address, { businessProfile: listing }),
          listing && /* @__PURE__ */ jsx(Review, { listing })
        ] }),
        /* @__PURE__ */ jsx(ShortDescription, { listing }),
        /* @__PURE__ */ jsx(BusinessFeatures, { listing }),
        /* @__PURE__ */ jsx(Description, { listing }),
        listing && /* @__PURE__ */ jsx(BusinessRatings, { listing })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 hidden lg:block`, children: /* @__PURE__ */ jsxs("div", { className: ` sticky top-[100px]`, children: [
        listing && /* @__PURE__ */ jsx(Address, { businessProfile: listing }),
        /* @__PURE__ */ jsx(Review, {})
      ] }) })
    ] })
  ] }) });
};
const Related = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getListingByCategory(category2, limit2);
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsx("div", { className: `w-[95%] md:w-[90%] xl:w-[80%] mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: `mt-10 border-t pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-semibold text-xl`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px]`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4`, children: listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: IMG_BASE_URL2 + (data == null ? void 0 : data.image_url),
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    }) })
  ] }) });
};
const navlnk$1 = [
  {
    title: "Search",
    lnk: "/web/search"
  },
  {
    title: "Hotels",
    lnk: "/web/search?q=hotels"
  },
  {
    title: "Travel",
    lnk: "/web/search?q=travel"
  }
];
const GenericNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [_theme, setTheme] = useState("light");
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query2 = params.get("q") || "";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `px-[10px] z-[10] fixed w-full
        bg-white border-b-[5px] border-green-500`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: `w-full flex place-content-between
                    h-[60px] gap-x-2`, children: [
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center
                        `, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-center
                        gap-1 grow`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-full`, children: /* @__PURE__ */ jsxs(
          "form",
          {
            action: "/web/search",
            className: `w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "q",
                  defaultValue: query2,
                  placeholder: "Business name, address, country, state...",
                  type: "text",
                  className: `h-[40px] w-full px-3
                                        grow outline-none`
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: `bg-red-600 min-w-[30px] w-[30px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,
                  children: /* @__PURE__ */ jsx(BiSearch, {})
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: ` hidden md:flex place-items-center
                                min-w-fit gap-1`, children: navlnk$1.map((link, index2) => {
          const url = location.pathname + location.search;
          console.log(url);
          return /* @__PURE__ */ jsx(
            Link,
            {
              className: `text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded
                                                font-semibold
                                                ${link.lnk.toString() === url && url.toString() !== "" && "bg-green-200"}
                                                    
                                                `,
              to: link.lnk,
              children: link.title
            },
            index2
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-center
                        gap-1 md:gap-4`, children: [
        /* @__PURE__ */ jsx(UserMenu, { theme: "light" }),
        /* @__PURE__ */ jsx(
          Hamburger,
          {
            theme: "light",
            openNav,
            navBg
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `h-[65px] ` })
  ] });
};
const loader$u = async ({ request, params }) => {
  const id = params.id || null;
  let listing = await getPage(id);
  const gallery = await getBusinessGallery(listing.gid);
  const ratingData = await getRatingsReviews(listing.gid);
  return {
    listing,
    gallery,
    ratingsData: ratingData
  };
};
const index$i = () => {
  const data = useLoaderData();
  const listing = data.listing;
  const gallery = data.gallery;
  const ratingsData = data.ratingsData;
  return /* @__PURE__ */ jsx(RatingProvider, { children: /* @__PURE__ */ jsxs(GalleryProvider, { children: [
    /* @__PURE__ */ jsx(GenericNav, {}),
    listing.gid !== null && listing.gid !== void 0 && /* @__PURE__ */ jsx(
      BusinessLayout,
      {
        listing,
        images: gallery,
        ratingsData
      }
    ),
    /* @__PURE__ */ jsx(
      Related,
      {
        category: listing == null ? void 0 : listing.category,
        limit: 6,
        title: `Related: ${listing == null ? void 0 : listing.category}`,
        subtitle: "Related based on the same category."
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$i,
  loader: loader$u
}, Symbol.toStringTag, { value: "Module" }));
const HamburgerMenu = ({ theme, openNav, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center space-x-0`,
      children: /* @__PURE__ */ jsx(
        HiBars3BottomLeft,
        {
          onClick: openNav,
          className: `${theme === "light" ? "text-black" : "text-white"} w-8 h-8 cursor-pointer`
        }
      )
    }
  ) });
};
const HomeNav = () => {
  const [scrollHeight] = useState(1);
  const [theme, setTheme] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const openNav = () => setShowNav(true);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setIsScroll(true);
      }
      if (window.scrollY < scrollHeight) {
        setIsScroll(false);
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsxs("div", { className: `shadow-md pb-3`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex place-content-between
                 fixed w-full mx-auto bg-white
                 px-[12px] h-[50px] z-[600]`, children: [
      /* @__PURE__ */ jsx("div", { className: `h-full w-[150px]   
                    flex place-items-center`, children: /* @__PURE__ */ jsx(HamburgerMenu, { theme: "light", openNav, navBg }) }),
      /* @__PURE__ */ jsx("div", { className: `h-full flex w-full
                    place-content-center place-items-center`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: `h-full w-[150px] 
                    flex place-items-center place-content-end`, children: /* @__PURE__ */ jsx(UserMenu, { theme: "light" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `h-[50px]` }),
    /* @__PURE__ */ jsx("div", { className: `px-[12px]`, children: /* @__PURE__ */ jsx("form", { action: "/web/search", children: /* @__PURE__ */ jsxs("div", { className: `bg-gray-100 w-full rounded-full h-[40px]
                    flex place-items-center px-2 gap-2`, children: [
      /* @__PURE__ */ jsx(BiSearch, { className: `h-[20px] w-[20px]` }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "q",
          className: `bg-transparent w-full outline-none
                            h-full flex place-content-center`
        }
      )
    ] }) }) })
  ] });
};
const HeaderNav = () => {
  const [scrollHeight] = useState(1);
  const [theme, setTheme] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setIsScroll(true);
      }
      if (window.scrollY < scrollHeight) {
        setIsScroll(false);
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${isScroll && "bg-black/50"}
     `, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] 
      mx-auto w-full text-white 
        flex place-content-between h-full gap-x-8`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold font-sans 
          flex place-items-center text-2xl`, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }),
      /* @__PURE__ */ jsx("div", { className: `hidden place-items-center
          w-full lg:flex`, children: /* @__PURE__ */ jsx(Link, { to: `/web/search`, children: "Search" }) }),
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-4`, children: [
        /* @__PURE__ */ jsx(UserMenu, { theme: "dark" }),
        /* @__PURE__ */ jsx(Hamburger, { theme: "dark", openNav, navBg })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
const heroimgs = [
  {
    img: "images/dubai7star.jpeg"
  },
  {
    img: "https://r4.wallpaperflare.com/wallpaper/791/501/238/new-york-city-buildings-wallpaper-51351344a10dae2b3cd90e3cb71d503d.jpg"
  },
  {
    img: "https://c0.wallpaperflare.com/path/494/492/40/signage-brand-cyan-yellow-5d1465fafe2d1f3e8deff1bbe07c71ce.jpg"
  }
];
const HomepageHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const [slides, setSlides] = useState(null);
  let timeoutId = useRef(null);
  useEffect(() => {
    setSlides(heroimgs);
  }, []);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  const handleNext = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    next();
    timeoutId.current = setTimeout(() => {
      handleNext();
    }, 15e3);
  };
  const handlePrev = async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    prev();
    timeoutId.current = setTimeout(() => {
      next();
    }, 15e3);
  };
  useEffect(() => {
    const startSlide = async (slides2) => {
      if (slides2 !== null) {
        const cnt = slides2.length;
        for (let i = 0; i < cnt; i++) {
          timeoutId = await new Promise((resolve) => setTimeout(resolve, 15e3));
          next();
          if (i == slides2.length - 1) {
            startSlide(slides2);
          }
        }
      }
    };
    if (slides) {
      startSlide(slides);
    }
  }, [slides]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `relative`, children: [
    /* @__PURE__ */ jsx("div", { className: ` w-full h-[300px] md:h-[500px] flex 
          overflow-hidden z-0
          `, children: slides == null ? void 0 : slides.map((slide, index2) => {
      return /* @__PURE__ */ jsx(
        "img",
        {
          src: slide.img,
          alt: "",
          style: { transform: `translateX(-${currentSlide * 100}%)` },
          className: `object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000`
        },
        index2
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-[70%]
          absolute z-[200] top-0
          bg-gradient-to-b
     from-black/60 to-transparent` }),
    /* @__PURE__ */ jsxs("div", { className: `z-[300]`, children: [
      /* @__PURE__ */ jsx("button", { onMouseDown: handlePrev, className: `block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative top-[100px]`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: handleNext, className: `block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative top-[100px]`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `z-100 absolute top-0 w-full h-[300px] md:h-[500px] 
          flex place-content-center place-items-center px-[15px]`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: ` 
          max-w-[800px] mx-auto w-full z-[300]`,
        children: /* @__PURE__ */ jsx(SearchBox, {})
      }
    ) })
  ] }) });
};
const categories = [
  {
    title: "Restaurants",
    link: "/web/search?q=restaurants",
    icon: /* @__PURE__ */ jsx(RiRestaurantFill, {})
  },
  {
    title: "Shopping",
    link: "/web/search?q=shopping",
    icon: /* @__PURE__ */ jsx(CgShoppingCart, {})
  },
  {
    title: "Nightlife",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(GiStarGate, {})
  },
  {
    title: "Active Life",
    link: "/web/search?q=nightlife",
    icon: /* @__PURE__ */ jsx(BiBullseye, {})
  },
  {
    title: "Beauty & Spa",
    link: "/web/search?q=beauty and spa",
    icon: /* @__PURE__ */ jsx(BiSpa, {})
  },
  {
    title: "Automotive",
    link: "/web/search?q=automotive",
    icon: /* @__PURE__ */ jsx(FaCarSide, {})
  },
  {
    title: "Home Services",
    link: "/web/search?q=home service",
    icon: /* @__PURE__ */ jsx(BiHome, {})
  },
  {
    title: "Real Estate",
    link: "/web/search?q=real estate",
    icon: /* @__PURE__ */ jsx(MdRealEstateAgent, {})
  }
];
const FrontPageCategories = () => {
  return /* @__PURE__ */ jsx("div", { className: `w-full relative mt-[50px] px-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
    /* @__PURE__ */ jsx("div", { className: `relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`, children: "Categories" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`, children: categories.map((category, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `${category.link}`, children: /* @__PURE__ */ jsxs("div", { className: `border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`, children: category.icon }),
        /* @__PURE__ */ jsx("div", { className: `text-base font-semibold
                  text-gray-500`, children: category.title })
      ] }) }) }, index2);
    }) })
  ] }) });
};
const _index = () => {
  return /* @__PURE__ */ jsxs("div", { className: " h-screen ", children: [
    /* @__PURE__ */ jsx("div", { className: `md:hidden`, children: /* @__PURE__ */ jsx(HomeNav, {}) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx(HeaderNav, {}) }),
    /* @__PURE__ */ jsx("div", { className: `hidden md:block`, children: /* @__PURE__ */ jsx(HomepageHero, {}) }),
    /* @__PURE__ */ jsx(
      Recents,
      {
        category: "services",
        limit: 8,
        title: `Recent Listings`,
        subtitle: "Recent businesses or entities added by date."
      }
    ),
    /* @__PURE__ */ jsx(FrontPageCategories, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index
}, Symbol.toStringTag, { value: "Module" }));
const Logo = ({ theme }) => {
  const [navTheme, setNavTheme] = useState("light");
  useEffect(() => {
    setNavTheme(theme);
  }, [theme, navTheme]);
  return /* @__PURE__ */ jsxs("div", { className: `flex place-items-center space-x-1`, children: [
    /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("div", { className: `${theme === "light" ? "bg-black text-white" : "bg-white/90 text-black"}
                relative w-8 h-8 rounded-full overflow-hidden
                `, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: `${theme === "dark" ? "/images/comcerc-logo-light.png" : "/images/comcerc-logo.png"}`,
        alt: "comcerc",
        className: `object-cover w-full hfull`
      }
    ) }) }),
    /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("span", { className: `${theme === "light" ? "text-blue-900" : "text-white/90"}
                font-[700] text-2xl tracking-tight relative
                `, children: "comcerc" }) })
  ] });
};
const cnLinks = [
  {
    label: "Page Search",
    url: "/web/search"
  }
];
const CenterNav = ({ theme, navBg }) => {
  const location = useLocation();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: `hidden lg:flex place-items-center space-x-14 h-full `, children: cnLinks.map((link, index2) => {
    return /* @__PURE__ */ jsx(Link, { to: link.url, children: /* @__PURE__ */ jsx("span", { className: `${theme === "light" ? "text-black" : "text-black"}
                                font-normal tracking-tight text-[13px] font-sans
                                hover:text-black/40 bg-gray-50 px-3 
                                py-[5px] rounded-full border-[1px] border-blue-500/30
                               ${location.pathname === link.url && "bg-blue-300"}
                                `, children: link.label }) }, index2);
  }) }) });
};
const AppNav$1 = ({
  theme,
  openNav,
  navBg,
  setNavBg,
  setTheme,
  _theme
}) => {
  const [scrollHeight] = useState(1);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setTheme("dark");
      }
      if (window.scrollY < scrollHeight) {
        setTheme("light");
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsx("div", { className: `${_theme === "light" ? "bg-transparent" : "bg-[#001e5a]"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full gap-5
              h-full flex place-items-center place-content-between
              `, children: [
    /* @__PURE__ */ jsx(Logo, { theme: _theme }),
    /* @__PURE__ */ jsx("div", { className: ` w-full`, children: /* @__PURE__ */ jsx(CenterNav, { theme: _theme, navBg }) }),
    /* @__PURE__ */ jsxs("div", { className: `flex place-items-center gap-4`, children: [
      /* @__PURE__ */ jsx(UserMenu, { theme: _theme }),
      /* @__PURE__ */ jsx(Hamburger, { theme: _theme, openNav, navBg })
    ] })
  ] }) });
};
const ResponsiveNav$1 = ({ theme }) => {
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [_theme, setTheme] = useState(theme);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      AppNav$1,
      {
        theme,
        openNav,
        navBg,
        setNavBg,
        setTheme,
        _theme
      }
    ),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
function loader$t() {
  return null;
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, { theme: "dark" }),
    /* @__PURE__ */ jsx("div", { className: `min-h-screen flex items-center justify-center 
        text-center px-4 text-black`, children: /* @__PURE__ */ jsxs("div", { className: `flex place-content-center place-items-center gap-3
                h-[50px]`, children: [
      /* @__PURE__ */ jsx("div", { className: `text-2xl font-bold text-red-600 h-full
                    flex place-items-center`, children: "404" }),
      /* @__PURE__ */ jsx("div", { className: `h-full w-[2px] border-r` }),
      /* @__PURE__ */ jsx("div", { className: `text-black text-[14px]
                    h-full flex place-items-center`, children: "This page could not be found." })
    ] }) })
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
const index$h = () => {
  return /* @__PURE__ */ jsx("div", {});
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$h
}, Symbol.toStringTag, { value: "Module" }));
const Feature = ({ feature }) => {
  return /* @__PURE__ */ jsxs("div", { id: feature.gid, className: `pb-4 pt-3`, children: [
    /* @__PURE__ */ jsx(Link, { to: `/${feature.gid}`, children: /* @__PURE__ */ jsx("div", { className: `text-[15px] tracking-normal 
                text-blue-700 font-normal`, children: feature.title }) }),
    /* @__PURE__ */ jsx("div", { className: `text-md font-semibold 
                tracking-tight mt-[2px]`, children: feature.phone }),
    /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] 
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`, children: feature.short_description.substring(0, 80) }),
    /* @__PURE__ */ jsx("div", { className: `text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`, children: feature.address_one }),
    /* @__PURE__ */ jsx("div", { className: `text-[13px] font-normal 
                tracking-tight mt-[8px] text-blue-800`, children: /* @__PURE__ */ jsx(Link, { to: feature.website ? feature.website : `#${feature.gid}`, children: "Website" }) })
  ] });
};
const Featured = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    const getFeatured = async () => {
      const data = await getFeaturedListing();
      console.log(data);
      setFeatured(data);
    };
    getFeatured();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `border-[1px] px-4 pt-4 pb-4
        rounded border-gray-200`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-lg`, children: "Featured" }),
    /* @__PURE__ */ jsx("div", { className: `divide-y divide-gray-200`, children: (featured == null ? void 0 : featured.length) > 0 ? featured == null ? void 0 : featured.map((feature, index2) => {
      return /* @__PURE__ */ jsx(Feature, { feature }, index2);
    }) : /* @__PURE__ */ jsx("div", { className: `text-[15px] mt-4`, children: "Loading..." }) })
  ] });
};
const ResultLayout = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: `w-full h-auto px-[15px] mt-5 z-0`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full
                    grid grid-cols-12 gap-8`, children: [
    /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-8 `, children }),
    /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 lg:block `, children: /* @__PURE__ */ jsx("div", { className: `sticky top-[80px]`, children: /* @__PURE__ */ jsx(Featured, {}) }) })
  ] }) });
};
const ResultItem$1 = ({ listing }) => {
  var _a, _b;
  const [imgscr, setImgsrc] = useState("");
  useEffect(() => {
    if ((listing == null ? void 0 : listing.image_url) === "" || (listing == null ? void 0 : listing.image_url) === null) {
      setImgsrc(`https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif`);
    } else {
      setImgsrc(config.IMG_BASE_URL + listing.image_url);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: ` cursor-pointer mt-4 z-0 pb-4`, onClick: (e) => {
    window.location.href = `/${listing.gid}`;
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex rounded-sm gap-4 z-0`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative min-w-[100px] w-[100px] h-[100px] border
                    bg-white z-0`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: imgscr,
          alt: listing.title,
          className: `object-cover w-full h-full text-sm
                            rounded z-0`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: " w-full", children: /* @__PURE__ */ jsxs("div", { className: `md:flex md:place-content-between 
                w-full md:gap-x-[4px]`, children: [
        /* @__PURE__ */ jsxs("div", { className: `w-full md:w-[60%]`, children: [
          /* @__PURE__ */ jsx(Link, { to: `/${listing.gid}`, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx("div", { className: `font-bold text-[17px] text-brown-800
                    leading-[1.1em] hover:underline text-[#001e5a]`, children: listing.title }) }),
          /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] leading-[1.2em] mt-[2px]
                    `, children: (listing == null ? void 0 : listing.business_phrases) ? `${(_a = listing == null ? void 0 : listing.business_phrases) == null ? void 0 : _a.substring(0, 150)}...` : "" }),
          /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[3px]`, children: /* @__PURE__ */ jsx("div", { className: `capitalize flex place-items-center gap-1
                                    text-black underline`, children: listing.category }) }),
          (listing == null ? void 0 : listing.established) && /* @__PURE__ */ jsxs("div", { className: `flex gap-2 mt-[5px] place-items-center`, children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BsBank, {}) }),
            /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-y-0 leading-3`, children: [
              /* @__PURE__ */ jsxs("div", { className: `text-[12px] font-bold`, children: [
                "Since ",
                listing == null ? void 0 : listing.established
              ] }),
              /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: "In Business" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-full lg:w-[40%] hidden 
                                sm:block`, children: [
          /* @__PURE__ */ jsx("div", { className: `flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`, children: listing.phone }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col text-end text-[12px]
                                leading-[1.2em]`, children: [
            listing == null ? void 0 : listing.address_one,
            (listing == null ? void 0 : listing.address_two) ? `, ${listing == null ? void 0 : listing.address_two}` : "",
            (listing == null ? void 0 : listing.city_name) ? `, ${listing == null ? void 0 : listing.city_name}` : "",
            (listing == null ? void 0 : listing.state_name) ? `, ${listing == null ? void 0 : listing.state_name}` : "",
            (listing == null ? void 0 : listing.country_name) ? `, ${listing == null ? void 0 : listing.country_name}` : ""
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mt-2 md:mt-3 mb-0 text-[13px] leading-[1.2em]
                    md:flex place-content-start hidden`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative top-[-3px] z-0 flex`, children: /* @__PURE__ */ jsx(RiDoubleQuotesL, { className: `tracking-tighter text-[20px]` }) }),
      /* @__PURE__ */ jsx("div", { children: (listing == null ? void 0 : listing.short_description) ? `${(_b = listing == null ? void 0 : listing.short_description) == null ? void 0 : _b.substring(0, 150)}...` : "" })
    ] })
  ] });
};
const SearchPagination = ({
  data,
  itemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: ` divide-y z-0 divide-gray-500`, children: currentItems.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResultItem$1, { listing: item }) }, index2);
    }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: `flex justify-center gap-[5px] 
                mt-[60px]`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToPrevious,
          disabled: currentPage === 1,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Previous"
        }
      ),
      Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => paginate(number),
          className: `px-[12px] py-[8px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
          children: number
        },
        number
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToNext,
          disabled: currentPage === totalPages,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Next"
        }
      )
    ] })
  ] });
};
const LatestBusinesses = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getListingByCategory(category2, limit2);
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-10 border-t pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-semibold text-xl`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px]`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4`, children: (listings == null ? void 0 : listings.length) > 0 && (listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: (data == null ? void 0 : data.image_url) ? IMG_BASE_URL2 + (data == null ? void 0 : data.image_url) : "https://accuvice.ng/wp-content/uploads/2016/06/placeholder.gif",
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    })) })
  ] });
};
const navlinks = [
  {
    id: 1,
    url: "/",
    label: "Home"
  },
  {
    id: 2,
    url: "/web/search",
    label: "Search"
  },
  {
    id: 3,
    url: "/web/search?q=hotels",
    label: "Hotels"
  },
  {
    id: 4,
    url: "/web/search?q=travel",
    label: "Travel"
  },
  {
    id: 5,
    url: `/web/search?q=real estate`,
    label: "Real Estate"
  },
  {
    id: 6,
    url: "/web/search?q=services",
    label: "Services"
  }
];
const loader$s = async ({ request, params }) => {
  const url = new URL(request.url);
  const query2 = url.searchParams.get("q") || "";
  let data = await getSearch(query2);
  let res = {
    data,
    query: query2
  };
  return res;
};
const index$g = () => {
  var _a;
  const res = useLoaderData();
  const [searchParams] = useSearchParams();
  const data = res.data;
  const query2 = res.query;
  const [queryParam, setQueryParam] = useState(null);
  useEffect(() => {
    if (query2) {
      setQueryParam(query2);
    }
  }, [query2]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(GenericNav, {}),
    /* @__PURE__ */ jsx("div", { className: `px-[15px] border-b`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full`, children: /* @__PURE__ */ jsxs("div", { className: ` grid grid-cols-12 gap-x-2`, children: [
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center col-span-12 md:col-span-4 truncate
                             pt-3 pb-0 md:pb-3 `, children: /* @__PURE__ */ jsx("span", { className: `text-[18px] font-bold`, children: ((_a = res.query) == null ? void 0 : _a.length) > 0 ? `Search for '${res.query}'` : `Browse Updates` }) }),
      /* @__PURE__ */ jsx("div", { className: `space-x-6 flex place-items-center place-content-start
                            col-span-12 md:col-span-8 truncate md:place-content-end
                             pt-0 pb-2 md:pt-3 md:pb-3 `, children: navlinks.map((link, index2) => {
        return /* @__PURE__ */ jsx(Link, { to: `${link.url}`, className: `text-[14px]`, children: link.label }, index2);
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs(ResultLayout, { children: [
      data.length > 0 ? /* @__PURE__ */ jsx(
        SearchPagination,
        {
          data,
          itemsPerPage: 20
        }
      ) : /* @__PURE__ */ jsx("div", { className: `flex place-items-center rounded
                            place-content-center p-5 border capitalize`, children: /* @__PURE__ */ jsx("span", { children: "no record" }) }),
      /* @__PURE__ */ jsx(
        LatestBusinesses,
        {
          category: "entertainment",
          limit: 5,
          title: "Entertainment",
          subtitle: "Entertainment based businesses added in the last 7 days"
        }
      ),
      /* @__PURE__ */ jsx(
        LatestBusinesses,
        {
          category: "services",
          limit: 5,
          title: "Services",
          subtitle: "Services based businesses added in the last 7 days"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$g,
  loader: loader$s
}, Symbol.toStringTag, { value: "Module" }));
const AppNav = ({
  theme,
  openNav,
  navBg,
  setNavBg,
  setTheme,
  _theme
}) => {
  const [scrollHeight] = useState(1);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setTheme("dark");
      }
      if (window.scrollY < scrollHeight) {
        setTheme("light");
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsx("div", { className: `${_theme === "dark" ? "bg-gray-800" : "bg-white"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `, children: /* @__PURE__ */ jsx(WhiteLogo, {}) }) });
};
const ResponsiveNav = ({ theme }) => {
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [_theme, setTheme] = useState(theme);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      AppNav,
      {
        theme,
        openNav,
        navBg,
        setNavBg,
        setTheme,
        _theme
      }
    ),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const SigninSchema = z.object({
  username: z.string({ message: "Please enter an email" }).min(7, { message: "Email must be greater than 7 characters" }).email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex, "Please enter a valid password")
});
const SigninForm = () => {
  const [formdata, setFormdata] = useState(null);
  const { signin } = useAuth();
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const navigator = useNavigate();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSigninForm = async (data) => {
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const email = data.username;
    const password = data.password;
    const datr = {
      email,
      password
    };
    const res = await signin(datr);
    if (res === true) {
      notification.cancel();
      navigator("/");
    } else {
      notification.alertCancel("Complete Your Signup", res.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setWorking(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SigninSchema)
  });
  return /* @__PURE__ */ jsxs("div", { className: `w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[150px] mb-[20px] `, children: [
    /* @__PURE__ */ jsx("div", { className: `hidden lg:block ` }),
    /* @__PURE__ */ jsx("div", { className: `place-content-center flex lg:place-content-end col-span-12 md:col-span-1`, children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleSigninForm), children: /* @__PURE__ */ jsxs("div", { className: `w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `, children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Logo, { theme: "light" }) }),
      /* @__PURE__ */ jsx("div", { className: `text-[22px] text-center
                        mt-[30px] font-bold text-blue-800`, children: "Sign in to your account" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] text-center
                        mt-[0px] font-light text-black`, children: "using your Comcerc account" }),
      /* @__PURE__ */ jsxs("div", { className: `w-full flex flex-col 
                        place-items-center mt-[30px]`, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("username", {
              onChange: changeHandler
            }),
            placeholder: "Email address",
            type: "text",
            className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `w-[85%]`, children: (errors == null ? void 0 : errors.username) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: errors.username.message }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `w-full flex flex-col 
                        place-items-center mt-[15px] `, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password", {
              onChange: changeHandler
            }),
            placeholder: "Password",
            type: "password",
            className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `w-[85%]`, children: (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: errors.password.message }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[25px]`, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,
          children: "Sign in"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                                            place-items-center mt-[20px] `, children: /* @__PURE__ */ jsx(
        Link,
        {
          className: `w-[85%]`,
          to: `/web/reset_password`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`,
              children: "Forgot Password?"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                                            place-items-center mt-[20px]`, children: /* @__PURE__ */ jsx(Link, { to: `/web/signup`, className: `w-[85%]`, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`,
          children: "Not account yet? Create an account"
        }
      ) }) })
    ] }) }) })
  ] });
};
const SigninBody = () => {
  return /* @__PURE__ */ jsx("div", { className: `bg-black w-full 
        bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: /* @__PURE__ */ jsx(SigninForm, {}) });
};
const index$f = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav, { theme: "light" }),
    /* @__PURE__ */ jsx(SigninBody, {})
  ] });
};
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$f
}, Symbol.toStringTag, { value: "Module" }));
const SignupForm = () => {
  return /* @__PURE__ */ jsxs("div", { className: `w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[150px] mb-[20px] `, children: [
    /* @__PURE__ */ jsx("div", { className: `hidden lg:block ` }),
    /* @__PURE__ */ jsx("div", { className: `place-content-center flex lg:place-content-end col-span-12 md:col-span-1`, children: /* @__PURE__ */ jsxs("div", { className: `w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px]`, children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Logo, { theme: "light" }) }),
      /* @__PURE__ */ jsx("div", { className: `text-[22px] text-center
                        mt-[30px] font-bold text-blue-800`, children: "Create an account" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] text-center
                        mt-[0px] font-light text-black`, children: "Get a Comcerc account" }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[30px]`, children: /* @__PURE__ */ jsx(
        "input",
        {
          placeholder: "First name",
          type: "text",
          className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[15px]`, children: /* @__PURE__ */ jsx(
        "input",
        {
          placeholder: "Last name",
          type: "text",
          className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[15px]`, children: /* @__PURE__ */ jsx(
        "input",
        {
          placeholder: "Email address",
          type: "text",
          className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[15px] `, children: /* @__PURE__ */ jsx(
        "input",
        {
          placeholder: "Password",
          type: "password",
          className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[25px]`, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,
          children: "Create an account"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[20px] `, children: /* @__PURE__ */ jsx(
        Link,
        {
          className: `w-[85%]`,
          to: `/web/reset_password`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `border-b w-full
                                px-[0px] py-1 text-[14px]
                                outline-none hover:underline`,
              children: "Forgot Password?"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[20px]`, children: /* @__PURE__ */ jsx(Link, { to: `/web/signin`, className: `w-[85%]`, children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: `w-full 
                            py-[2px] text-[14px] rounded-full text-center
                            text-blue-700 hover:bg-gray-100`,
          children: [
            "Alread have an account? ",
            /* @__PURE__ */ jsx("span", { children: "Sign in" })
          ]
        }
      ) }) })
    ] }) })
  ] });
};
const SignupBody = () => {
  return /* @__PURE__ */ jsx("div", { className: `bg-black w-full 
        bg-[url('https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: /* @__PURE__ */ jsx(SignupForm, {}) });
};
const index$e = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav, { theme: "light" }),
    /* @__PURE__ */ jsx(SignupBody, {})
  ] });
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$e
}, Symbol.toStringTag, { value: "Module" }));
const ResetPasswordForm$1 = () => {
  return /* @__PURE__ */ jsxs("div", { className: `w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2
        mt-[150px] mb-[20px] `, children: [
    /* @__PURE__ */ jsx("div", { className: `hidden lg:block ` }),
    /* @__PURE__ */ jsx("div", { className: `place-content-center flex lg:place-content-end col-span-12 md:col-span-1`, children: /* @__PURE__ */ jsxs("div", { className: `w-[350px] bg-white h-full rounded-2xl
                    flex flex-col place-items-center pt-[40px] pb-[40px]
                    px-[10px] `, children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Logo, { theme: "light" }) }),
      /* @__PURE__ */ jsx("div", { className: `text-[22px] text-center
                        mt-[30px] font-bold text-blue-800`, children: "Forgot Password?" }),
      /* @__PURE__ */ jsx("div", { className: `text-[15px] text-center
                        mt-[0px] font-light text-black`, children: "enter your email address below" }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[30px]`, children: /* @__PURE__ */ jsx(
        "input",
        {
          placeholder: "Email address",
          type: "text",
          className: `border-b w-[85%]
                                px-[0px] py-1 text-[15px]
                                outline-none`
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                        place-items-center mt-[25px]`, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: `w-[85%] bg-blue-600
                            py-[12px] text-[15px] rounded-full
                            text-white hover:bg-blue-700`,
          children: "Send recovery email"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                                            place-items-center mt-[20px] `, children: /* @__PURE__ */ jsx(
        Link,
        {
          className: `w-[85%]`,
          to: `/web/signin`,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `border-b w-full
                                                    px-[0px] py-1 text-[14px]
                                                    outline-none hover:underline`,
              children: "Already have and account? Sign in"
            }
          )
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: `w-full flex flex-col 
                                            place-items-center mt-[20px]`, children: /* @__PURE__ */ jsx(Link, { to: `/web/signup`, className: `w-[85%]`, children: /* @__PURE__ */ jsxs(
        "button",
        {
          className: `w-full 
                                                py-[2px] text-[14px] rounded-full text-center
                                                text-blue-700 hover:bg-gray-100`,
          children: [
            "No account yet? ",
            /* @__PURE__ */ jsx("span", { className: `text-black`, children: "Create an account" })
          ]
        }
      ) }) })
    ] }) })
  ] });
};
const ResetPasswordBody = () => {
  return /* @__PURE__ */ jsx("div", { className: `bg-black w-full 
        bg-[url('https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1200')]
        bg-cover bg-center min-h-screen flex place-content-center`, children: /* @__PURE__ */ jsx(ResetPasswordForm$1, {}) });
};
const index$d = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav, { theme: "light" }),
    /* @__PURE__ */ jsx(ResetPasswordBody, {})
  ] });
};
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$d
}, Symbol.toStringTag, { value: "Module" }));
const navlnk = [
  {
    title: "Search",
    lnk: "/web/search"
  },
  {
    title: "Hotels",
    lnk: "/web/search?q=hotels"
  },
  {
    title: "Travel",
    lnk: "/web/search?q=travel"
  }
];
const AccountNav = () => {
  const [showNav, setShowNav] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [_theme, setTheme] = useState("light");
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  const location = useLocation();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `px-[15px] z-[10] fixed w-full
        bg-white border-b-[5px] border-green-500`, children: /* @__PURE__ */ jsx("div", { className: `w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: `w-full flex place-content-between
                    h-[60px] gap-x-5`, children: [
      /* @__PURE__ */ jsx("div", { className: `flex place-items-center
                        `, children: /* @__PURE__ */ jsx(Link, { to: `/`, children: /* @__PURE__ */ jsxs("div", { className: `font-black text-2xl
                                    tracking-tight`, children: [
        "Gr",
        /* @__PURE__ */ jsx("i", { children: "ü" }),
        "the"
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-center
                        gap-5 grow`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-full`, children: /* @__PURE__ */ jsxs(
          "form",
          {
            action: "/web/search",
            className: `w-full flex rounded-full border px-1
                                border-gray-300 overflow-hidden bg-white
                                place-items-center gap-1`,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "q",
                  placeholder: "Business name, address, country, state...",
                  type: "text",
                  className: `h-[40px] w-full px-3
                                        grow outline-none`
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: `bg-red-600 min-w-[30px] w-[30px] h-[30px]
                                        flex place-items-center place-content-center
                                        rounded-full text-white`,
                  children: /* @__PURE__ */ jsx(BiSearch, {})
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: ` hidden md:flex place-items-center
                                min-w-fit gap-1`, children: navlnk.map((link, index2) => {
          const url = location.search;
          const final = decodeURI(url);
          console.log(final);
          return /* @__PURE__ */ jsx(
            Link,
            {
              className: `text-[14px] hover:bg-gray-200/50
                                                px-[10px] py-[6px] rounded
                                                font-semibold
                                                ${link.lnk.toString().includes(final) && final.toString() !== "" && "bg-green-200"}`,
              to: link.lnk,
              children: link.title
            },
            index2
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex place-items-center
                        gap-4`, children: [
        /* @__PURE__ */ jsx(UserMenu, { theme: "light" }),
        /* @__PURE__ */ jsx(
          Hamburger,
          {
            theme: "light",
            openNav,
            navBg
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      MobileNav,
      {
        showNav,
        closeNav
      }
    )
  ] });
};
const AccountLayout = ({ children }) => {
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const handleShow = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    if ((user == null ? void 0 : user.guid) !== null && (user == null ? void 0 : user.guid) !== void 0 && (user == null ? void 0 : user.guid) !== "") {
      setLoading(false);
    } else {
      window.location.href = "/web/signin";
    }
  }, [user]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loadings..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: `h-screen flex flex-col relative`, children: [
    /* @__PURE__ */ jsx(AccountNav, {}),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleShow,
        className: `text-xl text-white bg-blue-700 p-2 
                rounded-full hover:bg-gray-700 shadow-lg top-[72px]
                ${show ? "left-[295px]" : "left-[15px]"}
                focus:outline-none fixed z-50 top-[60px]
                transition-all duration-300 ease-in-out
                hidden md:block`,
        children: /* @__PURE__ */ jsx(CgMenu, { className: `${show ? "rotate-0 transition-all duration-300 ease-in-out" : "rotate-90 transition-all duration-300 ease-in-out"}` })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `flex flex-1 pt-[65px] h-full
                overflow-hidden`, children: [
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: `bg-gray-50 text-gray-900 
                        h-full overflow-y-auto transition-all z-30
                        duration-300 ease-in-out border-r shadow-md
                        hidden md:block
                        ${show ? "w-[350px] min-w-[350px]" : "w-0 min-w-0 overflow-hidden"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
            /* @__PURE__ */ jsx(LeftNav, {}),
            /* @__PURE__ */ jsx("div", { className: `h-[20px]` })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `flex-1 overflow-y-auto bg-gray-100 py-6 px-[15px]`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[100%] md:max-w-[80%] mx-auto w-full  
                        `, children }) })
    ] })
  ] });
};
const ContentLayout = ({ children, title }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold text-lg`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `mt-4 bg-white px-[15px] pt-4 
                rounded-lg shadow-md pb-8 `, children })
  ] });
};
const index$c = () => {
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ContentLayout, { title: "Account Profile", children: "Account Profile" }) });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$c
}, Symbol.toStringTag, { value: "Module" }));
const inputControlWrapper = `mb-8 w-[100%]`;
const inputHeadingClass = `text-black ml-1.5 mb-2 font-semibold`;
const controlInformationClass = `w-full text-gray-400 
mt-[-2px] text-[12px] font-normal leading-[1.2em]`;
const inputClass = `border-[1px] border-gray-500/20 w-full px-3 py-2 rounded 
 bg-gray-100`;
const inputClassError = `w-full mt-0 text-[13px] bg-red-100/50 
py-2 px-3 rounded-sm flex place-items-center gap-1`;
const formWrapperClass = `w-full mx-auto mt-10 flex flex-col items-center`;
const inputWrapperClass = `mb-8 w-[100%] `;
const textAreaClass = `border-[1px] border-gray-500/30 w-full px-3 py-2 
rounded bg-gray-100/40 h-[250px] text-[14px]`;
const Button = ({
  working,
  value
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `border-[1px] border-none bg-blue-900 
                            w-full  
                            py-2.5 rounded text-white mt-1 shadow-lg shadow-blue-400
                            cursor-pointer ${working && "bg-blue-500 cursor-default"}`,
        disabled: working,
        children: working ? "Submitting..." : `${value ? value : "Submit"}`
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: `mt-4 text-[.7em] leading-[1.2em] 
                    px-2 w-full`, children: "By submitting, you agree to our Privacy Commitment and Terms of Service." })
  ] }) });
};
const Input = ({
  controlName,
  controlType,
  controlPlaceholder,
  controlTitle,
  controlInformation,
  register,
  changeHandler,
  error,
  width,
  disabled = false
}) => {
  const [wrapperWidth, setWrapperWidth] = useState("");
  const [inputWidth, setInputWidth] = useState(width);
  useEffect(() => {
    if (inputWidth > 0) {
      if (inputWidth === 100) {
        setWrapperWidth(`xl:w-full`);
      } else {
        setWrapperWidth(`xl:w-[${inputWidth}%]`);
      }
    }
  }, [inputWidth]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: inputHeadingClass, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-0`, children: controlTitle }),
      (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: controlInformationClass, children: controlInformation })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `w-[100%]`, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ...register(controlName, {
            onChange: changeHandler
          }),
          type: controlType ? controlType : "text",
          className: `${inputClass} ${disabled && "bg-gray-200/80"}`,
          placeholder: controlPlaceholder,
          disabled
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `${inputClassError}`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const Select = ({
  controlName,
  controlTitle,
  controlPlaceholder,
  selectJson,
  register,
  changeHandler,
  error,
  setCode,
  controlInformation
}) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (register && changeHandler && selectJson) {
      setTimeout(() => {
        setReady(true);
      }, 1e3);
    }
  }, [register, changeHandler, selectJson]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: inputHeadingClass, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-0`, children: controlTitle }),
      (controlInformation == null ? void 0 : controlInformation.length) > 1 && /* @__PURE__ */ jsx("div", { className: controlInformationClass, children: controlInformation })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-[90%]", children: [
      ready && /* @__PURE__ */ jsxs(
        "select",
        {
          ...register(controlName, {
            onChange: (e) => {
              changeHandler(e);
              if (setCode) {
                setCode(e.target.value);
              }
            }
          }),
          className: inputClass,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: controlPlaceholder }),
            selectJson.map((item, id) => {
              return /* @__PURE__ */ jsx("option", { value: item.id, children: item.name }, id);
            })
          ]
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const ProfileSchema = z.object({
  first_name: z.string().min(1, { message: "Enter a first name" }),
  lastname: z.any(),
  country_code: z.any(),
  state_code: z.any(),
  city_id: z.any(),
  phone: z.any(),
  address_one: z.any(),
  address_two: z.any(),
  country: z.any(),
  xsocial: z.any(),
  linksocial: z.any(),
  fbsocial: z.any(),
  zipcode: z.any()
});
const ImgComponent$1 = ({ user, userProfileImageData }) => {
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const notification = useNotification();
  let imgconst = "";
  if (userProfileImageData == null ? void 0 : userProfileImageData.image_url) {
    imgconst = IMG_BASE_URL2 + userProfileImageData.image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    notification.notify("Working...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      const IMG_BASE_URL22 = "https://oxbyt.com";
      const endpoint = "/user_profile_pic_upload";
      const url = IMG_BASE_URL22 + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            notification.alertCancel("", data.message);
          });
        } else {
          notification.alertReload("", "Image uploaded successfully!");
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      notification.alertCancel("", "Please select an image to continue.");
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `w-[50%] mx-auto flex flex-col 
        place-content-center place-items-center`, children: [
    /* @__PURE__ */ jsxs("div", { className: `relative bg-blue-100 w-[150px] 
                h-[150px] z-40 rounded-full overflow-hidden`, children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "Click to upload",
          className: " object-cover w-full h-full z-0 absolute"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 
                                 top-0 object-cover
                                 text-white/80 `,
          onMouseDown: handleImageClick,
          children: /* @__PURE__ */ jsx("div", { className: `w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` flex flex-col place-items-center 
                place-content-center mt-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `
                        ${working ? "bg-gray-200 cursor-default" : "bg-blue-100"}  
                        w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out
                        px-5`,
        onMouseDown: handleUpload,
        disabled: working,
        children: working ? "Uploading..." : "Upload"
      }
    ) })
  ] });
};
const ProfileForm = ({ loaderData, user, userProfileData }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const countries = loaderData.countries;
  let [states, setStates] = useState(loaderData.states);
  let [cities, setCities] = useState(loaderData.cities);
  loaderData.categories;
  const [countryCode, setCountryCode] = useState((_a = loaderData.userProfileData) == null ? void 0 : _a.country_code);
  const [stateCode, setStateCode] = useState((_b = loaderData.userProfileData) == null ? void 0 : _b.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleUpdateUser = async (data) => {
    setWorking(true);
    notification.notify("Updating user profile...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://tynk.cc";
    const endpoint = "/api/user/" + user.guid;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${respObj.error}`);
      } else {
        notification.alertReload("Success", "Update is Successful!");
      }
    } catch (error) {
      notification.alertCancel("Error", error.message);
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: userProfileData,
    resolver: zodResolver(ProfileSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: formWrapperClass, children: /* @__PURE__ */ jsxs("div", { className: `${inputWrapperClass} flex flex-col place-items-center`, children: [
      /* @__PURE__ */ jsx("div", { className: inputHeadingClass, children: "Add/Change Photo" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
        ImgComponent$1,
        {
          user: userProfileData,
          userProfileImageData: loaderData.userProfileImageData
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleUpdateUser), children: /* @__PURE__ */ jsxs("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                 max-w-[400px] w-full mx-auto `, children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "First Name",
          controlName: "first_name",
          controlPlaceholder: "Enter first name",
          register,
          changeHandler,
          error: errors.first_name,
          controlInformation: `Please enter your first name. First name is compulsory. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Last Name",
          controlName: "lastname",
          controlPlaceholder: "Enter last name",
          register,
          changeHandler,
          error: errors.lastname,
          controlInformation: `Please enter your last name. Last name is compulsory. `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "Country",
          controlName: "country_code",
          controlPlaceholder: "Select Country",
          selectJson: countries,
          register,
          changeHandler,
          error: errors.country_code,
          setCode: resetStates,
          controlInformation: `Please select country. `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "State",
          controlName: "state_code",
          controlPlaceholder: "Select State",
          selectJson: states,
          register,
          changeHandler,
          setCode: resetCities,
          controlInformation: `Please select state. `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "City",
          controlName: "city_id",
          controlPlaceholder: "Select City",
          selectJson: cities,
          register,
          changeHandler,
          controlInformation: `Please select a city. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Zipcode",
          controlName: "zipcode",
          controlPlaceholder: "Enter zip code",
          register,
          changeHandler,
          controlInformation: `Please a zipcode. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Phone",
          controlName: "phone",
          controlPlaceholder: "Enter phone number",
          register,
          changeHandler,
          controlInformation: `Please enter a phone or mobile. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address Line 1",
          controlName: "address_one",
          controlPlaceholder: "Enter address",
          register,
          changeHandler,
          controlInformation: `Please enter an address. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address Line 2",
          controlName: "address_two",
          controlPlaceholder: "Enter address",
          register,
          changeHandler,
          controlInformation: `E.g. Off Brian's Boulevard or Avenue. `
        }
      ),
      /* @__PURE__ */ jsx(Button, { working })
    ] }) })
  ] });
};
const index$b = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [states, setStates] = useState(null);
  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [userProfileImageData, setUserProfileImageData] = useState(null);
  const [categories2, setCategories] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      const countries2 = await getCountries();
      const userObject = userProfileData;
      const states2 = await getStates(userObject.country_code || "");
      const cities2 = await getCities(userObject.country_code || "", userObject.state_code || "");
      const categories22 = await getCategories();
      const userProfileImageData2 = await getUserProfileImageData(guid || "");
      setUserProfile(userProfileData);
      setCountries(countries2);
      setStates(states2);
      setCities(cities2);
      setUserProfileImageData(userProfileImageData2);
      setCategories(categories22);
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile && countries && states && cities && userProfileImageData && categories2) {
      const data2 = {
        userProfile,
        countries,
        states,
        cities,
        userProfileImageData,
        categories: categories2
      };
      setData(data2);
    }
  }, [
    categories2,
    countries,
    states,
    cities,
    userProfileImageData,
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ContentLayout, { title: "Account Profile", children: userProfile && data && user && !loading ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: `font-semibold mb-2 text-md`, children: [
      userProfile == null ? void 0 : userProfile.first_name,
      " ",
      userProfile == null ? void 0 : userProfile.lastname
    ] }),
    /* @__PURE__ */ jsx(
      ProfileForm,
      {
        loaderData: data,
        user,
        userProfileData: data.userProfile
      }
    )
  ] }) : /* @__PURE__ */ jsx("div", { children: "Loading..." }) }) });
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$b
}, Symbol.toStringTag, { value: "Module" }));
const EmailSchema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const EmailForm = ({ loaderData, user }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const [loading, setLoading] = useState(true);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleEmailChangeRequest = async (data) => {
    var _a2;
    setWorking(true);
    notification.notify("", "Updating email...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const endpoint = "/api/user/change_email_request";
    const url = config.BASE_URL + endpoint;
    data["guid"] = (_a2 = loaderData.userProfile) == null ? void 0 : _a2.user_guid;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alertCancel("Error", data2.error);
        });
      } else {
        notification.alertCancel("Email Change Request", "Email Change Request Successfully Sent!");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(EmailSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleEmailChangeRequest), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Current email" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsxs("span", { className: " font-semibold", children: [
        "[",
        (_a = loaderData.userProfile) == null ? void 0 : _a.email,
        "]"
      ] }),
      " will be used for account-related notifications and can be used for password resets."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-[1px] rounded-[8px] px-3 py-3 bg-gray-100", children: [
      (_b = loaderData.userProfile) == null ? void 0 : _b.email,
      "  "
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Update Email",
        controlPlaceholder: "Enter new email address",
        controlName: "email",
        register,
        changeHandler,
        error: errors.email,
        width: 100,
        controlInformation: `Enter a new email address.`
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) }) });
};
const index$a = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Email Address", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: userProfile == null ? void 0 : userProfile.email }),
    data && /* @__PURE__ */ jsx(EmailForm, { loaderData: data, user })
  ] }) });
};
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$a
}, Symbol.toStringTag, { value: "Module" }));
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);
const ChangePasswordSchema = z.object({
  oldpassword: z.string().min(1, { message: "Please enter old password." }).min(8, { message: "Password must be up to 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  }),
  newpassword: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  }),
  newpassword2: z.string().min(1, { message: "Please retype new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  })
}).superRefine((data, ctx) => {
  if (data.oldpassword === data.newpassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["newpassword"],
      message: "New password cannot be the same as old password"
    });
  }
  if (data.newpassword !== data.newpassword2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["newpd2"],
      message: "Your new password don't match"
    });
  }
});
const ChangePasswordForm = ({ loaderData, user }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleEmailChangeRequest = async (data) => {
    var _a2;
    setWorking(true);
    notification.notify("In progress...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const endpoint = "/api/user/change_password/" + ((_a2 = loaderData.userProfile) == null ? void 0 : _a2.user_guid);
    const url = config.BASE_URL + endpoint;
    data["password"] = data == null ? void 0 : data.newpassword;
    delete data["oldpassword"];
    delete data["newpassword"];
    delete data["newpassword2"];
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alertCancel("", data2.message);
        });
      } else {
        notification.alertReload("Success", "Password Successfully Changed! Use new password on next login");
      }
    } catch (error) {
      notification.alertCancel("", error.message);
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(ChangePasswordSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleEmailChangeRequest), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  
            rounded-lg pt-4 max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Change Password" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsx("b", { children: (_a = loaderData.userProfile) == null ? void 0 : _a.email }),
      " is your current email. It will be used be used for password resets or changes."
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Current Password",
        controlPlaceholder: "Enter current password",
        controlType: "password",
        controlName: "oldpassword",
        register,
        changeHandler,
        error: errors.oldpassword
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "New Password",
        controlType: "password",
        controlPlaceholder: "Enter new password",
        controlName: "newpassword",
        register,
        changeHandler,
        error: errors.newpassword
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Retype New Password",
        controlPlaceholder: "Retype new password",
        controlName: "newpassword2",
        controlType: "password",
        register,
        changeHandler,
        error: errors.newpassword2
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) }) });
};
const index$9 = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Change Password", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: userProfile == null ? void 0 : userProfile.email }),
    data && /* @__PURE__ */ jsx(ChangePasswordForm, { loaderData: data, user })
  ] }) });
};
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$9
}, Symbol.toStringTag, { value: "Module" }));
const ResetPasswordSchema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const ResetPasswordForm = ({ loaderData, user }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSendResetEmail = async (data) => {
    setWorking(true);
    notification.notify("Sending reset password request.");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const endpoint = "/api/user/reset_password_request";
    const url = config.BASE_URL + endpoint;
    data["owner"] = loaderData.userProfile.user_guid;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alertCancel("Error handling request", data2.message);
        });
      } else {
        notification.alertReload("Success!", "Request Initiated. Please check your email to continue.");
      }
    } catch (error) {
      notification.alertCancel("Error handling request", error.message);
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.userProfile,
    resolver: zodResolver(ResetPasswordSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleSendResetEmail), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  
                        rounded-lg pt-4 max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Reset Password" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsx("b", { children: (_a = loaderData.userProfile) == null ? void 0 : _a.email }),
      " is your current email. It will be used be used for password resets or changes."
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Your Email Address",
        controlPlaceholder: "Retype new password",
        controlName: "email",
        controlType: "text",
        disabled: true,
        register,
        changeHandler,
        error: errors.email
      }
    ),
    /* @__PURE__ */ jsx(Button, { working, value: "Send Reset Email" })
  ] }) }) });
};
const index$8 = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Reset Password", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: userProfile == null ? void 0 : userProfile.email }),
    data && /* @__PURE__ */ jsx(ResetPasswordForm, { loaderData: data, user })
  ] }) });
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$8
}, Symbol.toStringTag, { value: "Module" }));
const DeactivateProfilechema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const DeactivateProfileForm = ({ loaderData, user }) => {
  var _a, _b, _c;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleDeactivateUser = async (data) => {
    var _a2;
    setWorking(true);
    let msg = "";
    if (loaderData.userProfile.active) {
      msg = "Deactivating...";
    } else {
      msg = "Activating...";
    }
    notification.notify(msg);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let guid = loaderData.userProfile.user_guid;
    const endpoint = "/api/user/activate_deactivate/" + guid;
    const url = config.BASE_URL + endpoint;
    data["active"] = ((_a2 = loaderData.userProfile) == null ? void 0 : _a2.active) ? false : true;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alertCancel("Error!", data2.message);
        });
      } else {
        notification.alertReload("Success!", `You are now ${data["active"] ? "activated" : "deactivated"}`);
      }
    } catch (error) {
      notification.alertCancel("Error!", error.message);
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.userProfile,
    resolver: zodResolver(DeactivateProfilechema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleDeactivateUser), children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass} mt-0  
                        rounded-lg pt-4 max-w-[500px] w-full mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: inputWrapperClass, children: [
    /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: ((_a = loaderData.userProfile) == null ? void 0 : _a.active) ? "Deactivate User" : "Activate User" }),
    /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[13px] leading-5", children: [
      /* @__PURE__ */ jsx("b", { children: (_b = loaderData.userProfile) == null ? void 0 : _b.email }),
      " is your current email. It will be used for password resets or changes."
    ] }),
    /* @__PURE__ */ jsx("div", { className: `mt-[10px]` }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Your Email Address",
        controlPlaceholder: "Retype new password",
        controlName: "email",
        controlType: "text",
        disabled: true,
        register,
        changeHandler,
        error: errors == null ? void 0 : errors.email
      }
    ),
    /* @__PURE__ */ jsx(Button, { working, value: `${((_c = loaderData.userProfile) == null ? void 0 : _c.active) ? "Deactivate" : "Activate"} Profile` })
  ] }) }) });
};
const index$7 = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfileData = await getUserProfile(guid || "");
      setUserProfile(userProfileData);
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile) {
      const data2 = {
        userProfile
      };
      setData(data2);
    }
  }, [
    userProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: userProfile.active ? "Deactivate Profile" : "Activate Profile", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: userProfile == null ? void 0 : userProfile.email }),
    data && /* @__PURE__ */ jsx(DeactivateProfileForm, { loaderData: data, user })
  ] }) });
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$7
}, Symbol.toStringTag, { value: "Module" }));
const ResultItem = ({ listing, index: index2 }) => {
  function isOdd(num) {
    return num % 2 !== 0;
  }
  let url = config.IMG_BASE_URL + listing.image_url;
  if ((listing == null ? void 0 : listing.image_url) === "" || (listing == null ? void 0 : listing.image_url) === null) {
    url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDKSPXOSoC8KuJCf_1dyELpZOsYINbk51FqA&s";
  }
  return /* @__PURE__ */ jsx("div", { className: ` cursor-pointer my-2`, children: /* @__PURE__ */ jsxs("div", { className: `flex rounded  gap-x-2 p-2
             hover:bg-blue-700 hover:text-white  
             ${isOdd(index2) ? "bg-blue-50" : ""}
                `, children: [
    /* @__PURE__ */ jsx("div", { className: `relative min-w-[50px] w-[50px] h-[50px]
                    rounded-full overflow-hidden border`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: url,
        alt: listing.title,
        className: `object-cover w-full h-full text-sm
                             `
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: " w-full", children: /* @__PURE__ */ jsx(Link, { to: `/web/account/portfolio/${listing.gid}`, children: /* @__PURE__ */ jsxs("div", { className: `md:flex md:place-content-between 
                w-full md:gap-x-[4px]`, children: [
      /* @__PURE__ */ jsxs("div", { className: `w-full md:w-[60%]`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-semibold text-[15px] text-brown-800
                    leading-[1.1em]  mt-[2px]`, children: listing.title }),
        /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[0px]`, children: /* @__PURE__ */ jsx("div", { className: `capitalize flex place-items-center gap-1`, children: listing.category }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `w-full lg:w-[40%] hidden 
                                sm:block`, children: [
        /* @__PURE__ */ jsx("div", { className: `flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`, children: listing.phone }),
        /* @__PURE__ */ jsxs("div", { className: `flex flex-col text-end text-[12px]
                                leading-[1.2em]`, children: [
          listing == null ? void 0 : listing.address_one,
          (listing == null ? void 0 : listing.address_two) ? `, ${listing == null ? void 0 : listing.address_two}` : "",
          (listing == null ? void 0 : listing.city_name) ? `, ${listing == null ? void 0 : listing.city_name}` : "",
          (listing == null ? void 0 : listing.state_name) ? `, ${listing == null ? void 0 : listing.state_name}` : "",
          (listing == null ? void 0 : listing.country_name) ? `, ${listing == null ? void 0 : listing.country_name}` : ""
        ] })
      ] })
    ] }) }) })
  ] }) });
};
const PortfolioPagination = ({
  data,
  itemsPerPage = 3
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: ``, children: currentItems.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResultItem, { index: index2 + 1, listing: item }) }, index2);
    }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: `flex justify-end gap-[5px] 
                mt-[0px] text-[13px] border-t pt-6`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToPrevious,
          disabled: currentPage === 1,
          className: "px-[12px] py-[0px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Previous"
        }
      ),
      Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => paginate(number),
          className: `px-[12px] py-[0px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? "bg-blue-50 border-blue-300" : "bg-white"}`,
          children: number
        },
        number
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToNext,
          disabled: currentPage === totalPages,
          className: "px-[12px] py-[6px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Next"
        }
      )
    ] })
  ] });
};
const Portfolio = ({ user, portfolio }) => {
  return /* @__PURE__ */ jsx("div", { className: ` h-fit`, children: (portfolio == null ? void 0 : portfolio.length) > 0 ? /* @__PURE__ */ jsx(
    PortfolioPagination,
    {
      data: portfolio,
      itemsPerPage: 7
    }
  ) : /* @__PURE__ */ jsx("div", { className: `flex place-items-center rounded
                            place-content-center p-5 border capitalize`, children: /* @__PURE__ */ jsx("span", { children: "no record" }) }) });
};
const index$6 = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getAllData(guid) {
      const userProfile2 = await getUserProfile(guid || "");
      const portfolio2 = await getPortfolio(guid || "");
      setUserProfile(userProfile2);
      setPortfolio(portfolio2);
    }
    if (user == null ? void 0 : user.guid) {
      getAllData(user == null ? void 0 : user.guid);
    }
  }, [user == null ? void 0 : user.guid]);
  useEffect(() => {
    if (userProfile && portfolio) {
      const data2 = {
        userProfile,
        portfolio: portfolio.data
      };
      setData(data2);
    }
  }, [
    userProfile,
    portfolio
  ]);
  useEffect(() => {
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Email Address", children: [
    userProfile === null ? "Loading..." : "",
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: userProfile == null ? void 0 : userProfile.email }),
    /* @__PURE__ */ jsx("div", { className: `mt-[20px]` }),
    data !== null && /* @__PURE__ */ jsx(Portfolio, { user: data.userProfile, portfolio: data.portfolio })
  ] }) });
};
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$6
}, Symbol.toStringTag, { value: "Module" }));
const BusinessProfileSchema = z.object({
  username: z.any(),
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  short_description: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 30;
    },
    { message: "You must write at least 30 words." }
  ).refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 50;
    },
    { message: "You can only write up to 50 words." }
  ),
  long_description: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 100;
    },
    { message: "You must write at least 100 words." }
  ).refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 500;
    },
    { message: "You can only write up to 500 words." }
  ),
  address_two: z.any(),
  state_code: z.any(),
  state_text: z.any(),
  country_text: z.any(),
  city_id: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" }),
  call_code: z.any(),
  phone: z.any(),
  zipcode: z.any(),
  intro: z.any(),
  category: z.string().min(2, { message: "Please select a business category" }),
  business_phrases: z.union([
    z.literal(""),
    z.string({ message: "Please enter business phrase" }).min(3, { message: "Business Phrases must not be less than 3 characters" }).max(1e3, { message: "Business Phrases must not be more than 100 characters" }).nullish()
  ]),
  products: z.any(),
  services: z.any(),
  xsocial: z.any(),
  fbsocial: z.any(),
  linksocial: z.any(),
  website: z.union(
    [
      z.string().url().nullish(),
      z.literal("")
    ]
  )
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const ImgComponent = ({ listing, user, businessProfileImageData }) => {
  let imgconst = "";
  if (businessProfileImageData.image_url) {
    imgconst = config.IMG_BASE_URL + businessProfileImageData.image_url;
  } else {
    imgconst = "/images/placeholder-blue.png";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    notification.notify("Working...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      formData.append("bid", listing.gid);
      const endpoint = "/business_profile_pic_upload";
      const url = config.IMG_BASE_URL + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            notification.alertCancel("", data.message);
          });
        } else {
          notification.alertReload("", "Image uploaded successfully!");
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      notification.alertCancel("", "Please select an image to continue.");
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-blue-100 w-[150px] h-[150px] z-40 rounded-full overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "Click to upload",
          className: " object-cover w-full h-full z-0 absolute"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                 text-white/80 `,
          onMouseDown: handleImageClick,
          children: /* @__PURE__ */ jsx("div", { className: `w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` flex flex-col place-items-center 
                place-content-center mt-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `${working ? "bg-gray-200 cursor-default" : "bg-blue-100"}  w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`,
        onMouseDown: handleUpload,
        disabled: working,
        children: working ? "Uploading..." : "Upload"
      }
    ) })
  ] });
};
const TextareaWithWordLimit = ({
  controlName,
  controlPlaceholder,
  controlTitle,
  register,
  changeHandler,
  error,
  setValue,
  getValues,
  watch,
  minWords = 100,
  maxWords = 500
}) => {
  const [text, setText] = useState("");
  const [wordLimitReached, setWordLimitReached] = useState(false);
  const countWords = (input) => {
    return (input == null ? void 0 : input.trim()) === "" ? 0 : input == null ? void 0 : input.trim().split(/\s+/).length;
  };
  const handleTextChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setValue("text", input);
      setWordLimitReached(false);
    } else {
      setWordLimitReached(true);
      const trimmedWords = words.slice(0, maxWords).join(" ");
      setValue("text", trimmedWords);
    }
  };
  const textValue = watch("text") || "";
  const handleKeyDown = (e) => {
    const words = textValue.trim().split(/\s+/);
    if (words.length >= maxWords && e.key !== "Backspace" && e.key !== "Delete" && !e.ctrlKey) {
      e.preventDefault();
      setWordLimitReached(true);
    } else {
      setWordLimitReached(false);
    }
  };
  useEffect(() => {
    if (controlName) {
      let priorText = getValues(controlName);
      setText(priorText);
    }
  }, [controlName]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: inputControlWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex place-content-between", children: [
      /* @__PURE__ */ jsx("label", { className: "block mb-1 text-md font-semibold", children: controlTitle }),
      /* @__PURE__ */ jsxs("label", { className: " text-gray-600 text-sm", children: [
        "Word Count: ",
        /* @__PURE__ */ jsx("strong", { children: countWords(text) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          ...register(controlName, {
            onChange: (e) => {
              setText(e.target.value);
              handleTextChange(e);
              changeHandler(e);
            }
          }),
          className: textAreaClass,
          placeholder: controlPlaceholder,
          onKeyDown: handleKeyDown
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error -mt-[5px]`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const BusinessProfileForm = ({ data }) => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const countries = data.countries;
  let [states, setStates] = useState(data.states);
  let [cities, setCities] = useState(data.cities);
  const categories2 = data.categories.data;
  const [countryCode, setCountryCode] = useState(data.businessProfile.country_code);
  const [stateCode, setStateCode] = useState(data.businessProfile.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleAddBusiness = async (datar) => {
    setWorking(true);
    notification.notify("Updating business profile...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const endpoint = "/api/listing/" + data.businessProfile.gid;
    const url = config.BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(datar)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        notification.alertReload("Success!", "Successfully updated!");
      }
    } catch (error) {
      notification.alertCancel("Error!", error.message);
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: data.businessProfile,
    resolver: zodResolver(BusinessProfileSchema)
  });
  useEffect(() => {
    if (data.businessProfile) {
      setValue("state_code", data.businessProfile.state_code);
      setValue("city_id", data.businessProfile.city_id);
    }
  }, [data.businessProfile]);
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode, data]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: formWrapperClass, children: [
    /* @__PURE__ */ jsxs("div", { className: `${inputWrapperClass} flex flex-col place-items-center`, children: [
      /* @__PURE__ */ jsx("div", { className: inputHeadingClass, children: "Add/Change Photo" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
        ImgComponent,
        {
          listing: data.businessProfile,
          user: data.userProfile,
          businessProfileImageData: data.businessProfileImageData
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: `w-full` }),
    /* @__PURE__ */ jsx("form", { className: " w-full", onSubmit: handleSubmit(handleAddBusiness), children: /* @__PURE__ */ jsxs("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                                lg:max-w-[500px] w-full mx-auto  `, children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Username",
          controlPlaceholder: "Enter username",
          controlName: "username",
          register,
          changeHandler,
          error: errors.username,
          controlInformation: `Choose a username. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Business name",
          controlPlaceholder: "Enter business name",
          controlName: "title",
          register,
          changeHandler,
          error: errors.title,
          controlInformation: `Please enter page name. Page name is compulsory. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Year established",
          controlPlaceholder: "Enter year established",
          controlName: "established",
          register,
          changeHandler,
          error: errors.established,
          controlInformation: `This is the name the business was registered or started `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "Country",
          controlName: "country_code",
          controlPlaceholder: "Select country",
          selectJson: countries,
          register,
          changeHandler,
          error: errors.country_code,
          setCode: resetStates,
          controlInformation: `This is the country the business was registered. `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "State",
          controlName: "state_code",
          controlPlaceholder: "Select state",
          selectJson: states,
          register,
          changeHandler,
          error: errors.state_code,
          setCode: resetCities,
          controlInformation: `This is the state the business was registered. `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "City",
          controlName: "city_id",
          controlPlaceholder: "Select city",
          selectJson: cities,
          register,
          changeHandler,
          error: errors.city_id,
          controlInformation: `This is the city the business was registered. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address 1",
          controlPlaceholder: "Enter address",
          controlName: "address_one",
          register,
          changeHandler,
          error: errors.address_one,
          width: 100,
          controlInformation: `Contact address for the business. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address 2",
          controlPlaceholder: "Enter address",
          controlName: "address_two",
          register,
          changeHandler,
          error: errors.address_two,
          width: 100,
          controlInformation: `E.g. Off North Central Boulevard or North Central Road. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Zipcode",
          controlPlaceholder: "Enter zipcode",
          controlName: "zipcode",
          register,
          changeHandler,
          error: errors.zipcode,
          controlInformation: `Enter the zipcode. `
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Phone number",
          controlPlaceholder: "Enter phone number",
          controlName: "phone",
          register,
          changeHandler,
          error: errors.phone,
          controlInformation: `Mobile number or phoone number. `
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "Category",
          controlName: "category",
          controlPlaceholder: "Select category",
          selectJson: categories2,
          register,
          changeHandler,
          error: errors.category
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Business Phrases",
          controlPlaceholder: "E.g. Advocates, Software Developers, Architect",
          controlName: "business_phrases",
          register,
          changeHandler,
          error: errors.business_phrases
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Products",
          controlPlaceholder: "Enter products",
          controlName: "products",
          register,
          changeHandler,
          error: errors.products
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Services",
          controlPlaceholder: "Enter services",
          controlName: "services",
          register,
          changeHandler,
          error: errors.services
        }
      ),
      /* @__PURE__ */ jsx(
        TextareaWithWordLimit,
        {
          controlTitle: "Short Description",
          controlPlaceholder: "Short description",
          controlName: "short_description",
          register,
          changeHandler,
          error: errors.short_description,
          setValue,
          getValues,
          watch
        }
      ),
      /* @__PURE__ */ jsx(
        TextareaWithWordLimit,
        {
          controlTitle: "Long Description",
          controlPlaceholder: "Long description",
          controlName: "long_description",
          register,
          changeHandler,
          error: errors.long_description,
          setValue,
          getValues,
          watch
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Twitter",
          controlPlaceholder: "@handle",
          controlName: "xsocial",
          register,
          changeHandler,
          error: errors.address
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Facebook",
          controlPlaceholder: "@handle",
          controlName: "fbsocial",
          register,
          changeHandler,
          error: errors.fbsocial
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "LinkedIn",
          controlPlaceholder: "https://linkedin.com/company/username",
          controlName: "linksocial",
          register,
          changeHandler,
          error: errors.linksocial
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Website",
          controlPlaceholder: "Enter website",
          controlName: "website",
          register,
          changeHandler,
          error: errors.website
        }
      ),
      /* @__PURE__ */ jsx(Button, { working })
    ] }) })
  ] }) });
};
const settingsLinks = [
  {
    title: "Settings",
    link: "/settings"
  },
  {
    title: "Gallery",
    link: "/gallery"
  },
  {
    title: "Facilities",
    link: "/facilities"
  },
  {
    title: "Activate",
    link: "/activate"
  }
];
const BusinessMenu = ({ title, guid, userGuid }) => {
  const [showSettings, setShowSettings] = useState(false);
  const displaySettings = () => setShowSettings(true);
  const location = useLocation();
  const pathname = `/web/account/portfolio/${guid}/${userGuid}`;
  const hideSettings = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowSettings(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: " flex place-content-between w-full  px-4 py-3 mt-1 z-[3000]", children: [
    /* @__PURE__ */ jsx("div", { className: "  rounded-lg text-xl text-black font-normal", children: title }),
    /* @__PURE__ */ jsxs("div", { className: `relative flex flex-col place-items-center place-content-end 
                bg-blue-200 w-[180px]  gap-3  text-gray-500 font-light font-sans
                z-[100]
                
                `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `rounded-md cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1`,
          onMouseDown: () => displaySettings(),
          onBlur: () => hideSettings(),
          children: "Settings"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `${showSettings ? "block" : "hidden"} absolute w-full top-8 rounded-lg 
                border-[1px] border-gray-100 bg-white shadow-lg  `, children: /* @__PURE__ */ jsx("div", { className: "divide-y-[1px] divide-gray-500/20 ", children: settingsLinks.map((item, index2) => {
        const url = pathname + item.link;
        return /* @__PURE__ */ jsx("div", { className: `py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold
                                     ${location.pathname === url && "bg-gray-300/30"}
                                     `, children: /* @__PURE__ */ jsx(Link, { to: `${url}`, children: /* @__PURE__ */ jsx("p", { children: item.title }) }) }, index2);
      }) }) })
    ] })
  ] });
};
const loader$r = async ({ request, params }) => {
  const business_guid = params.business_guid;
  const data = {
    business_guid
  };
  return data;
};
const index$5 = () => {
  var _a, _b;
  const loaderData = useLoaderData();
  const auth = useAuth();
  const businessGuid = loaderData.business_guid;
  const userGuid = (_a = auth.user) == null ? void 0 : _a.guid;
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const [states, setStates] = useState(null);
  const [countries, setCountries] = useState(null);
  const [cities, setCities] = useState(null);
  const [userProfileImageData, setUserProfileImageData] = useState(null);
  const [businessProfileImageData, setBusinessProfileImageData] = useState(null);
  const [categories2, setCategories] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getAllData(userGuid2, businessGuid2) {
      const userProfile2 = await getUserProfile(userGuid2 || "");
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      const countries2 = await getCountries();
      const businessObject = businessProfile2;
      const states2 = await getStates(businessObject.country_code || "");
      const cities2 = await getCities(businessObject.country_code || "", businessObject.state_code || "");
      const categories22 = await getCategories();
      const userProfileImageData2 = await getUserProfileImageData(userGuid2 || "");
      const businessProfileImageData2 = await getBusinessProfileImageData(businessGuid2 || "");
      setUserProfile(userProfile2);
      setBusinessProfile(businessProfile2);
      setCountries(countries2);
      setStates(states2);
      setCities(cities2);
      setUserProfileImageData(userProfileImageData2);
      setBusinessProfileImageData(businessProfileImageData2);
      setCategories(categories22);
    }
    if (userGuid && businessGuid) {
      getAllData(userGuid, businessGuid);
    }
  }, [userGuid, businessGuid]);
  useEffect(() => {
    if (userProfile && businessProfile && countries && states && cities && userProfileImageData && categories2 && businessProfileImageData) {
      const data2 = {
        userProfile,
        businessProfile,
        countries,
        states,
        cities,
        userProfileImageData,
        businessProfileImageData,
        categories: categories2
      };
      setData(data2);
    }
  }, [
    categories2,
    countries,
    states,
    cities,
    userProfileImageData,
    businessProfileImageData,
    userProfile,
    businessProfile
  ]);
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ContentLayout, { title: "Update Business", children: data && /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: (_b = data == null ? void 0 : data.businessProfile) == null ? void 0 : _b.title }),
    businessGuid && userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    /* @__PURE__ */ jsx(
      BusinessProfileForm,
      {
        data
      }
    )
  ] }) }) });
};
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5,
  loader: loader$r
}, Symbol.toStringTag, { value: "Module" }));
const CreatePageSchema = z.object({
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  category: z.string().min(1, { message: "Please select a business category." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  state_code: z.any(),
  city_id: z.any(),
  zipcode: z.string().min(1, { message: "Zipcode must not be empty" }).max(7, { message: "Zipcode must not be more than 7 characters" }),
  short_description: z.string({ message: "Please enter business phrase" }).min(3, { message: "Short Description must not be less than 3 characters" }).max(1e3, { message: "Short Description must not be more than 1000 characters" }),
  email_address: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Phone must not be empty" }).max(30, { message: "PHone must not be more than 30 characters" }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  address_two: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" })
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const CreatePageForm = ({ data, user }) => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  useNavigate();
  const countries = data.countries;
  let [states, setStates] = useState(data.states);
  let [cities, setCities] = useState(data.cities);
  const categories2 = data.categories.data;
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleAddBusiness = async (datar) => {
    setWorking(true);
    notification.notify("Creating page...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    datar["owner"] = user.guid;
    const endpoint = "/api/listing";
    const url = config.BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(datar)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${respObj.message}`);
      } else {
        const handleOption = async (value) => {
          if (value) {
            notification.cancel();
          } else {
            window.location.href = "/web/account/portfolio";
            await new Promise((resolve) => setTimeout(resolve, 1e3));
            notification.cancel();
          }
        };
        if (notification.confirm("Page Created. Do you wish to create another page?", handleOption)) {
        }
      }
    } catch (e) {
      notification.alertCancel("Error!", e.message);
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(CreatePageSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleAddBusiness), children: /* @__PURE__ */ jsxs("div", { className: `${formWrapperClass} mt-0  rounded-lg pt-4
                             max-w-[500px] w-full mx-auto `, children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Business Name",
        controlPlaceholder: "Enter business name",
        controlName: "title",
        register,
        changeHandler,
        error: errors.title,
        width: 80,
        controlInformation: `Business name is compulsory.`
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Email Address",
        controlPlaceholder: "Enter email address",
        controlName: "email_address",
        register,
        changeHandler,
        error: errors.email_address,
        controlInformation: `Email address is compulsory.`
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Business Category",
        controlName: "category",
        controlPlaceholder: "Select business category",
        selectJson: categories2,
        register,
        changeHandler,
        error: errors.category,
        controlInformation: `Select business category.`
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Year established",
        controlPlaceholder: "Enter year established",
        controlName: "established",
        register,
        changeHandler,
        error: errors.established,
        controlInformation: `Year registered is compulsory.`
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Country",
        controlName: "country_code",
        controlPlaceholder: "Select country",
        selectJson: countries,
        register,
        changeHandler,
        error: errors.country_code,
        setCode: resetStates
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "State",
        controlName: "state_code",
        controlPlaceholder: "Select state",
        selectJson: states,
        register,
        changeHandler,
        error: errors.state_code,
        setCode: resetCities
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "City",
        controlName: "city_id",
        controlPlaceholder: "Select city",
        selectJson: cities,
        register,
        changeHandler,
        error: errors.city_id
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Address 1",
        controlPlaceholder: "Enter address",
        controlName: "address_one",
        register,
        changeHandler,
        error: errors.address_one,
        width: 100
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Address 2",
        controlPlaceholder: "Enter address",
        controlName: "address_two",
        register,
        changeHandler,
        error: errors.address_two,
        width: 100
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Zipcode",
        controlPlaceholder: "Enter zipcode",
        controlName: "zipcode",
        register,
        changeHandler,
        error: errors.zipcode
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Phone number",
        controlPlaceholder: "Enter phone number",
        controlName: "phone",
        register,
        changeHandler,
        error: errors.phone
      }
    ),
    /* @__PURE__ */ jsx(
      TextareaWithWordLimit,
      {
        controlTitle: "Short Description",
        controlPlaceholder: "Short description",
        controlName: "short_description",
        register,
        changeHandler,
        error: errors.short_description,
        setValue,
        getValues,
        watch
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) });
};
const index$4 = () => {
  const auth = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);
  const [categories2, setCategories] = useState(null);
  useEffect(() => {
    const getAllData = async (user2) => {
      const countries2 = await getCountries();
      const states2 = await getStates("");
      const cities2 = await getCities("", "");
      const categories22 = await getCategories();
      setCountries(countries2);
      setStates(states2);
      setCities(cities2);
      setCategories(categories22);
      setUser(user2);
    };
    if (auth == null ? void 0 : auth.user) {
      getAllData(auth == null ? void 0 : auth.user);
    }
  }, [auth]);
  useEffect(() => {
    if (user && countries && categories2) {
      const data2 = {
        user,
        countries,
        states,
        cities,
        categories: categories2
      };
      setData(data2);
      setLoading(false);
    }
  }, [countries, user]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsx(ContentLayout, { title: "Create Page", children: data && /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: "Create a page" }),
    /* @__PURE__ */ jsx(CreatePageForm, { data, user })
  ] }) }) });
};
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$4
}, Symbol.toStringTag, { value: "Module" }));
const urlvalidator = /^(?!https?)(?!www\.?).*\..+$/g;
const SettingsSchema = z.object({
  username: z.any(),
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  address_two: z.any(),
  state_code: z.any(),
  state_text: z.any(),
  country_text: z.any(),
  city: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" }),
  call_code: z.any(),
  call_mobile: z.any(),
  zipcode: z.any(),
  intro: z.any(),
  category: z.string().min(2, { message: "Please select a business category" }),
  business_phrases: z.string({ message: "Please enter business phrase" }).min(3, { message: "Business Phrases must not be less than 3 characters" }).max(1e3, { message: "Business Phrases must not be more than 100 characters" }),
  products: z.string({ message: "Please enter products offered" }),
  services: z.union([
    z.string({ message: "Please enter services offered" }).min(3, { message: "Please enter up to 3 characters" }),
    z.literal("")
  ]),
  xsocial: z.any(),
  fbsocial: z.any(),
  linksocial: z.any(),
  website: z.union(
    [
      z.string().regex(urlvalidator).nullish(),
      z.literal("")
    ]
  ),
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const timeOptions = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00"
];
const BusinessWorkingHours = ({
  data,
  onChange,
  options
}) => {
  const [workingHours, setWorkingHours] = useState(null);
  const [openStatus, setOpenStatus] = useState("no_hours");
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const getWorkingHours = async (operatingHours) => {
    const hours = operatingHours;
    return {
      Monday: { start: hours.monday_from, end: hours.monday_to },
      Tuesday: { start: hours.tuesday_from, end: hours.tuesday_to },
      Wednesday: { start: hours.wednesday_from, end: hours.wednesday_to },
      Thursday: { start: hours.thursday_from, end: hours.thursday_to },
      Friday: { start: hours.friday_from, end: hours.friday_to },
      Saturday: { start: hours.saturday_from, end: hours.saturday_to },
      Sunday: { start: hours.sunday_from, end: hours.sunday_to }
    };
  };
  useEffect(() => {
    const loadHours = async () => {
      const hours = await getWorkingHours(data.operatingHours);
      setWorkingHours(hours);
      onChange(hours);
      setOpenStatus(data.operatingHours.open_status);
    };
    loadHours();
  }, [data.operatingHours]);
  const handleTimeChange = (day, type, value) => {
    if (!workingHours) return;
    const startTime = type === "start" ? value : workingHours[day].start;
    const endTime = type === "end" ? value : workingHours[day].end;
    if (endTime <= startTime) {
      alert(`For ${day}, closing time must be later than opening time.`);
      return;
    }
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [type]: value
      }
    });
    onChange(workingHours);
  };
  const handleSave = async () => {
    if (openStatus === null) {
      notification.alertCancel("", "Please select working hours.");
      return false;
    }
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await saveOperatingHours(openStatus, workingHours, data.businessGuid, data.userGuid);
      if (response === void 0) {
        notification.alert("", "Save not successful!");
      }
    } catch (error) {
      notification.alert("", error.message);
    } finally {
      setWorking(false);
      notification.alert("", "Save successful!");
    }
  };
  if (!workingHours) return /* @__PURE__ */ jsx("p", { children: "Loading working hours..." });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: `${formWrapperClass}`, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: `w-full`, children: options.map((option) => /* @__PURE__ */ jsxs(
      "label",
      {
        className: `flex items-center gap-3 p-3 rounded cursor-pointer ${openStatus === option.value ? " bg-blue-50" : "border-gray-300"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-[20px]`, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "openStatus",
              value: option.value,
              checked: openStatus === option.value,
              onChange: () => setOpenStatus(option.value),
              className: `accent-blue-600 w-[20px] h-[20px]`
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: option.label }),
            /* @__PURE__ */ jsx("span", { className: `text-[13px] text-gray-500`, children: option.more })
          ] })
        ]
      },
      option.value
    )) }),
    openStatus === "selected_hours" && Object.keys(workingHours).map((day) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "w-24 font-semibold", children: day }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: workingHours[day].start,
          onChange: (e) => handleTimeChange(day, "start", e.target.value),
          className: "border p-2 rounded",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "From..." }),
            timeOptions.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "to" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: workingHours[day].end,
          onChange: (e) => handleTimeChange(day, "end", e.target.value),
          className: "border p-2 rounded",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "To..." }),
            timeOptions.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
          ]
        }
      )
    ] }, day)),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSave,
        className: `mt-6 bg-blue-600 text-white px-6 py-2 
                            rounded hover:bg-blue-700 transition
                            shadow-md hover:shadow-lg hover:shadow-black/50`,
        children: working ? "Saving..." : "Save Business Hours"
      }
    ) })
  ] }) }) });
};
const index$3 = () => {
  var _a;
  const [loading, setLoading] = useState(true);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [operatingHours, setOperatingHours] = useState();
  const [workingHours, setWorkingHours] = useState([]);
  const options = [
    { value: "no_hours", label: "No Hours Available", more: "Visitors won't see business hours on this Page" },
    { value: "always_open", label: "Always Open", more: "e.g. Parks, beaches, roads" },
    { value: "permanently_closed", label: "Permanently Closed", more: "Permantently closed" },
    { value: "temporarily_closed", label: "Temporarily Closed", more: "Temporarily closed" },
    { value: "selected_hours", label: "Open During Selected Hours", more: "Open during selected hours" }
  ];
  const [data, setData] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const { business_guid, user_guid } = useParams();
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const operatingHours2 = await getOperatingHours(businessGuid2, userGuid2);
      setOperatingHours(operatingHours2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    if (business_guid && user_guid) {
      getAllData(business_guid, user_guid);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && operatingHours && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        operatingHours,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [businessGuid, userGuid, operatingHours, businessProfile]);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SettingsSchema)
  });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Settings", children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: (_a = data == null ? void 0 : data.businessProfile) == null ? void 0 : _a.title }),
    businessGuid && userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    data && /* @__PURE__ */ jsx("div", { className: `mt-6`, children: /* @__PURE__ */ jsx(
      BusinessWorkingHours,
      {
        data,
        onChange: setWorkingHours,
        options
      }
    ) })
  ] }) });
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$3
}, Symbol.toStringTag, { value: "Module" }));
const AddPhoto = ({ userGuid, businessGuid }) => {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [dialog, setDialog] = useState(false);
  const addPhoto = useAddPhotoDialogContext();
  const handleFileChange = (event) => {
    var _a;
    try {
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImgSrc(imageUrl);
        setSelectedFile(file);
        setIsImageSelected(true);
        addPhoto.setDialog(true);
        addPhoto.setImgSrc(imageUrl);
        addPhoto.setSelectedFile(file);
        addPhoto.setIsImageSelected(true);
        addPhoto.setUserGuid(userGuid);
        addPhoto.setBusinessGuid(businessGuid);
      }
    } finally {
      event.target.value = "";
    }
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: `mb-2`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleImageClick,
        className: ` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`,
        children: "Add Photo"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        accept: "image/*",
        ref: fileInputRef,
        className: " hidden",
        onChange: handleFileChange
      }
    )
  ] });
};
const GalleryItemMenu = ({
  item,
  menu,
  userGuid,
  businessGuid
}) => {
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const editPhoto = useEditPhotoDialogContext();
  const notification = useNotification();
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const handleOpenDialog = () => {
    editPhoto.setDialog(true);
    editPhoto.setImgSrc(IMG_BASE_URL2 + item.image_url);
    editPhoto.setImageTitle(item.image_title);
    editPhoto.setUserGuid(userGuid);
    editPhoto.setBusinessGuid(businessGuid);
    editPhoto.setImageGuid(item.image_guid);
    setDialog(true);
  };
  const handleDelete = async () => {
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    editPhoto.deletePhoto(userGuid, businessGuid, item.image_guid);
  };
  return /* @__PURE__ */ jsx("div", { className: "", children: menu && /* @__PURE__ */ jsx("div", { className: ` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`, children: /* @__PURE__ */ jsx("div", { className: `mt-3`, children: /* @__PURE__ */ jsxs("div", { className: ` divide-y-[1px]`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleOpenDialog,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleDelete,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Delete"
      }
    )
  ] }) }) }) });
};
const GalleryItem = ({
  showCarousel,
  item,
  itemIndex,
  userGuid,
  businessGuid
}) => {
  const [menu, setMenu] = useState(false);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  let imgconst = "";
  if (item.image_url) {
    imgconst = IMG_BASE_URL2 + item.image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const showMenu = () => {
    setMenu(true);
  };
  const hideMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setMenu(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onMouseDown: showMenu,
            onBlur: hideMenu,
            className: `w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(BiEditAlt, { className: `text-[20px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: (e) => showCarousel(itemIndex),
            className: `relative h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-cover w-full h-full -z-40
                        `
              }
            )
          }
        ),
        item.image_title.length > 0 && /* @__PURE__ */ jsx("div", { className: `text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px]`, children: item.image_title }),
        /* @__PURE__ */ jsx(
          GalleryItemMenu,
          {
            item,
            menu,
            userGuid,
            businessGuid
          }
        )
      ]
    }
  ) });
};
const Slider = ({ slides, selectedSlide, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides.map((slide, index2) => {
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.image_url,
            alt: "",
            style: { transform: `translateX(-${currentSlide * 100}%)` },
            className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
          },
          index2
        );
      }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                p-[1rem] cursor-pointer left-0 group h-full 
                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                    p-[1rem] cursor-pointer right-0 group 
                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onMouseDown: () => handleClose(),
          className: `w-[50px] h-[50px] z-[300] bg-white
                    flex place-content-center place-items-center
                    rounded-full absolute left-2 top-2 cursor-pointer
                    hover:bg-white/40 transition duration-1000 ease-in-out`,
          children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
      /* @__PURE__ */ jsx("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: "Photos for Jason Won, DPT - Flex With Doctor Jay" }),
      /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
        currentSlide + 1,
        " / ",
        slides.length
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
    ] })
  ] }) });
};
const Carousel = ({
  overlay,
  setOverlay,
  selectedSlide,
  handleClose,
  gallery
}) => {
  return /* @__PURE__ */ jsx("div", { children: overlay && /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex w-screen h-screen bg-white z-[1000] 
                fixed top-0 left-0 right-0 bottom-0 `,
      children: gallery && selectedSlide && /* @__PURE__ */ jsx(
        Slider,
        {
          slides: gallery,
          selectedSlide,
          handleClose
        }
      )
    }
  ) });
};
const Gallery = ({ gallery, userGuid, businessGuid }) => {
  const [overlay, setOverlay] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slider = useSliderContext();
  const handleClose = () => {
    setOverlay(false);
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(gallery);
  };
  return /* @__PURE__ */ jsxs("div", { className: ``, children: [
    /* @__PURE__ */ jsx("div", { className: ` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`, children: gallery.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
        GalleryItem,
        {
          showCarousel,
          item,
          itemIndex: index2,
          userGuid,
          businessGuid
        }
      ) }, index2);
    }) }),
    /* @__PURE__ */ jsx(
      Carousel,
      {
        overlay,
        setOverlay,
        selectedSlide: selectedSlide + 1,
        handleClose,
        gallery
      }
    )
  ] });
};
const index$2 = () => {
  var _a;
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [gallery, setGallery] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const gallery2 = await getGallery(businessGuid2, userGuid2);
      setGallery(gallery2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    if (business_guid && user_guid) {
      getAllData(business_guid, user_guid);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && gallery && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        gallery,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [businessGuid, userGuid, gallery, businessProfile]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Gallery Settings", children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: (_a = data == null ? void 0 : data.businessProfile) == null ? void 0 : _a.title }),
    businessGuid && userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    businessGuid && userGuid && /* @__PURE__ */ jsx(AddPhoto, { userGuid, businessGuid }),
    gallery.length > 0 ? /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
      Gallery,
      {
        gallery,
        userGuid,
        businessGuid
      }
    ) }) : /* @__PURE__ */ jsx("div", { className: " mt-2 border-[1px] rounded-lg p-3 mb-6", children: "Gallery is empty" })
  ] }) });
};
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2
}, Symbol.toStringTag, { value: "Module" }));
const FacilityFeatures = ({
  businessGuid,
  userGuid,
  facilityFeatures,
  selectedFacilityFeatures
}) => {
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const [features, setFeatures] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(null);
  const [mergedFeatures, setMergedFeatures] = useState(null);
  useEffect(() => {
    if (facilityFeatures && selectedFacilityFeatures) {
      setFeatures(facilityFeatures);
      setSelectedFeatures(selectedFacilityFeatures);
    }
  }, [facilityFeatures, selectedFacilityFeatures]);
  useEffect(() => {
    if (features && selectedFeatures) {
      const mergedFeatures2 = features.map((feature) => {
        const selected = selectedFeatures.find(
          (selected2) => selected2.feature_id === feature.feature_id
        );
        return {
          ...feature,
          active: selected ? true : false,
          user_description: selected ? selected.user_description : void 0
        };
      });
      setMergedFeatures(mergedFeatures2);
    }
  }, [features, selectedFeatures]);
  const handleToggle = (id) => {
    setMergedFeatures(
      (prev) => prev.map(
        (feature) => feature.feature_id === id ? {
          ...feature,
          active: !feature.active,
          user_description: feature.user_description ? feature.user_description : ""
        } : feature
      )
    );
  };
  const handleDescriptionChange = (id, value) => {
    setMergedFeatures(
      (prev) => prev.map(
        (feature) => feature.feature_id === id ? { ...feature, user_description: value } : feature
      )
    );
  };
  const handleSave = async () => {
    const BASE_URL = "https://tynk.cc";
    const endpoint = `/api/listing/selected_facility_features`;
    const url = BASE_URL + endpoint;
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const selected = mergedFeatures.filter((f) => f.active).map((f) => {
        return {
          feature_id: f.feature_id,
          user_description: f.user_description
        };
      });
      let data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        selected
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (response.ok) {
        notification.alertReload("", "Saved successfully!");
      } else {
        notification.alert("", "Failed to save.");
      }
    } catch (error) {
      notification.alert("", "Something happened!");
    } finally {
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-3", children: "Select Facility Features" }),
    facilityFeatures.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mergedFeatures == null ? void 0 : mergedFeatures.map((feature) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-3 p-3 border rounded cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  onChange: () => handleToggle(feature.feature_id),
                  type: "checkbox",
                  checked: feature.active,
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-5 h-5 border-2 rounded ${feature.active ? "bg-green-500" : "bg-white"}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: " w-full", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium ", children: feature.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs ", children: feature.description }),
              /* @__PURE__ */ jsx("div", { className: " w-full h-[100px] mt-1 rounded overflow-hidden", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  onChange: (e) => handleDescriptionChange(feature.feature_id, e.target.value),
                  className: `w-full h-full bg-gray-100
                                            border p-3 text-sm`,
                  children: feature.user_description
                }
              ) })
            ] })
          ]
        },
        feature.feature_id
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          className: "mt-5 px-4 py-2 bg-blue-600 text-white rounded",
          children: "Save Selected Features"
        }
      )
    ] })
  ] });
};
const index$1 = () => {
  var _a;
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const [facilityFeatures, setFacilityFeatures] = useState(null);
  const [selectedFacilityFeatures, setSelectedFacilityFeatures] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const facilityFeatures2 = await getSysFacilityFeatures();
      setFacilityFeatures(facilityFeatures2);
      const selectedFacilityFeatures2 = await getSelectedFacilityFeatures(userGuid2, businessGuid2);
      setSelectedFacilityFeatures(selectedFacilityFeatures2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    if (business_guid && user_guid) {
      getAllData(business_guid, user_guid);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && facilityFeatures && selectedFacilityFeatures && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        facilityFeatures,
        selectedFacilityFeatures,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    facilityFeatures,
    selectedFacilityFeatures,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: "Facility Features", children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: (_a = data == null ? void 0 : data.businessProfile) == null ? void 0 : _a.title }),
    businessGuid && userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    data && /* @__PURE__ */ jsx(
      FacilityFeatures,
      {
        userGuid,
        businessGuid,
        facilityFeatures,
        selectedFacilityFeatures
      }
    )
  ] }) });
};
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1
}, Symbol.toStringTag, { value: "Module" }));
const Activate = ({
  userGuid,
  businessGuid
}) => {
  const [isActive, setIsActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const notification = useNotification();
  const [working, setWorking] = useState(false);
  useEffect(() => {
    try {
      getBusiness(userGuid, businessGuid).then((business) => {
        setIsActive(business[0].active_status);
        setLoading(false);
      });
    } catch (error) {
      alert("Could not fetch business");
    }
  }, []);
  const toggleBusiness = async () => {
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const newStatus = !isActive;
    try {
      const endpoint = `/api/listing/activate/${userGuid}/${businessGuid}`;
      const url = config.BASE_URL + endpoint;
      const data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        active: newStatus
      };
      const res = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      notification.alertReload("Success", "Completed!");
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    } catch (error) {
    } finally {
      setIsActive(newStatus);
    }
  };
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: `p-6  rounded  max-w-lg
        mx-auto mt-12`, children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-lg mb-4 font-semibold", children: [
      isActive ? "Deactivate" : "Activate",
      " Business"
    ] }),
    /* @__PURE__ */ jsx("div", { className: `border-[3px] border-gray-100 p-5 rounded-lg shadow`, children: /* @__PURE__ */ jsxs("label", { className: `flex items-center space-x-4 hover:cursor-pointer
                        `, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: isActive ?? false,
          onChange: toggleBusiness,
          className: "w-8 h-8"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: `font-semibold`, children: isActive ? "Active" : "Inactive" }),
        /* @__PURE__ */ jsxs("div", { className: `font-normal text-sm`, children: [
          "Click to ",
          isActive ? "deactivate" : "activate",
          " the business profile. Once deactivated, it will no longer be visible"
        ] })
      ] })
    ] }) })
  ] }) });
};
const index = () => {
  var _a;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [businessGuid, setBusinessGuid] = useState("");
  const [userGuid, setUserGuid] = useState("");
  const { business_guid, user_guid } = useParams();
  const [businessProfile, setBusinessProfile] = useState(null);
  useEffect(() => {
    const getAllData = async (businessGuid2, userGuid2) => {
      setBusinessGuid(businessGuid2);
      setUserGuid(userGuid2);
      const businessProfile2 = await getBusinessProfile(businessGuid2 || "");
      setBusinessProfile(businessProfile2);
    };
    if (business_guid && user_guid) {
      getAllData(business_guid, user_guid);
    }
  }, [business_guid, user_guid]);
  useEffect(() => {
    if (businessGuid && userGuid && businessProfile) {
      const data2 = {
        businessGuid,
        userGuid,
        businessProfile
      };
      setData(data2);
      setLoading(false);
    }
  }, [
    businessGuid,
    userGuid,
    businessProfile
  ]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "text-lg", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(AccountLayout, { children: /* @__PURE__ */ jsxs(ContentLayout, { title: `${Boolean(businessProfile.active_status) ? "Deactivate" : "Activate"} Business Profile`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold mb-2 text-md`, children: (_a = data == null ? void 0 : data.businessProfile) == null ? void 0 : _a.title }),
    businessGuid && userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    data && /* @__PURE__ */ jsx(
      Activate,
      {
        userGuid,
        businessGuid
      }
    )
  ] }) });
};
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index
}, Symbol.toStringTag, { value: "Module" }));
const VerifiedStatus = {
  OK: true,
  PENDING: false
};
const RequestType = {
  PASSWORD_RESET: "password_reset",
  CHANGE_PASSWORD: "change_password",
  CHANGE_EMAIL: "change_email"
};
const RequestStatus = {
  OPEN: "open",
  CLOSED: "closed"
};
let cachedPool = global.mysqlPool || null;
const DATABASE_HOST = "localhost";
const DATABASE_PORT = "3306";
const DATABASE_NAME = "comvoinh_dbdirtest";
const DATABASE_PASS = "Querty123$$$$";
const DATABASE_USER = "comvoinh_dbdirtest";
if (!cachedPool) {
  cachedPool = global.mysqlPool = mysql.createPool({
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT) || 3306,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}
async function getConnection() {
  console.log(DATABASE_HOST);
  console.log("hello");
  return cachedPool.getConnection();
}
async function query(sql, values = []) {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(sql, values);
    connection.commit();
    return results;
  } finally {
    connection.release();
  }
}
const JWT_SECRET$1 = "2454522643636363463643565346346";
const loader$q = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const action$c = async ({ request }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return DoResponse({ error: "Missing email or password" }, 400);
    }
    const { email, password } = body;
    const hashedPassword = HashPwd(password);
    const rows = await query(`SELECT * FROM tbl_user 
            WHERE
            email = ?
            AND
            password = ?`, [email, hashedPassword]);
    const user = rows[0];
    if (rows.length <= 0) {
      return DoResponse({
        success: false,
        message: "Please check your email and password and try again!"
      }, 405);
    }
    if (Boolean(rows[0].is_verified) === VerifiedStatus.PENDING) {
      const verifyCode = generate7DigitNumber();
      const result = await query(
        `UPDATE tbl_user 
                SET
                verify_code = ?
                WHERE
                user_hash = ?`,
        [
          verifyCode,
          rows[0].user_hash
        ]
      );
      return DoResponse({ message: "Please check your email to complete signup." }, 500);
    }
    const JWT_INFO = {
      guid: user.user_guid,
      email: user.email,
      first_name: user.first_name,
      last_name: user.lastname
    };
    const accessToken = jwt.sign(JWT_INFO, JWT_SECRET$1, { expiresIn: "7d" });
    const refreshToken = jwt.sign(JWT_INFO, JWT_SECRET$1, { expiresIn: "7d" });
    const tokens = {
      accessToken,
      refreshToken
    };
    return DoResponse(tokens, 200);
  } catch (error) {
    return DoResponse({ message: error.message }, 500);
  }
};
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$c,
  loader: loader$q
}, Symbol.toStringTag, { value: "Module" }));
const JWT_SECRET = "2454522643636363463643565346346";
async function action$b({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  if (request.method === "POST") {
    try {
      const requestToken = await request.json();
      const token = requestToken.token;
      const user = jwt.verify(token, JWT_SECRET);
      return DoResponse(user, 200);
    } catch (error) {
      return DoResponse(null, 200);
    }
  }
  return DoResponse({ success: false, message: "method not allowed" }, 405);
}
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$p = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    rows.map((user) => {
      return {
        email: user.email,
        first_name: user.first_name,
        hash: user.user_hash,
        guid: user.user_guid,
        active: user.active,
        deleted: user.deleted
      };
    });
    delete rows[0].password;
    return DoResponse(rows[0], 200);
  }
};
const action$a = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({ error: "User does not exist" }, 400);
      }
      {
      }
      let first_name = body.first_name === void 0 ? user.first_name : body.first_name;
      let lastname = body.lastname === void 0 ? user.lastname : body.lastname;
      let country_code = body.country_code === void 0 ? user.country_code : body.country_code;
      let state_code = body.state_code === void 0 ? user.state_code : body.state_code;
      let city_id = body.city_id === void 0 ? user.city_id : body.city_id;
      let zipcode = body.zipcode === void 0 ? user.zipcode : body.zipcode;
      let phone = body.phone === void 0 ? user.phone : body.phone;
      let address_one = body.address_one === void 0 ? user.address_one : body.address_one;
      let address_two = body.address_two === void 0 ? user.address_two : body.address_two;
      const result = await query(
        `UPDATE tbl_user SET
                first_name = ?,
                lastname = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                zipcode = ?,
                phone = ?,
                address_one = ?,
                address_two = ?
                WHERE user_guid = ?`,
        [
          first_name,
          lastname,
          country_code,
          state_code,
          city_id,
          zipcode,
          phone,
          address_one,
          address_two,
          guid
        ]
      );
      return DoResponse({
        success: true,
        message: "User updated successfully",
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({
          success: false,
          error: "User does not exist"
        }, 404);
      }
      const result = await query(
        `DELETE FROM tbl_user
                WHERE user_guid = ?`,
        [guid]
      );
      const data = {
        message: `User ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$a,
  loader: loader$p
}, Symbol.toStringTag, { value: "Module" }));
const loader$o = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$9({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userGuid = params.guid;
      if (!body.password) {
        return DoResponse({ error: "Enter password!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      const password = body.password;
      const hashedPassword = HashPwd(password);
      {
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    password = ? 
                    WHERE
                    user_guid = ?`,
        [hashedPassword, userGuid]
      );
      const data = {
        success: true,
        message: "password change is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9,
  loader: loader$o
}, Symbol.toStringTag, { value: "Module" }));
async function action$8({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email) {
        return DoResponse({ error: "Enter email!" }, 400);
      }
      {
      }
      let rows = await query(
        `SELECT * FROM tbl_user 
                WHERE 
                email = ?`,
        [body.email]
      );
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with email does not exist!"
          },
          409
        );
      }
      const user = rows[0];
      {
      }
      const title = "Password Request";
      const type = RequestType.PASSWORD_RESET;
      const owner = user.user_guid;
      const guid = crypto.randomUUID();
      const status = RequestStatus.OPEN;
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type]);
      if (rows.length > 0) {
        {
        }
        console.log(`UPDATE tbl_requests 
                    SET
                    title = '${title}',
                    type = '${type}',
                    guid = '${guid}',
                    status = '${status}'
                    WHERE
                    owner = '${owner}'
                    AND
                    type = '${type}'
                    AND
                    status = '${status}'`);
        const result = await query(
          `UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
          [title, type, guid, status, owner, type, status]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
          [title, type, owner, guid, status]
        );
      }
      const data = {
        success: true,
        message: "password reset initiated. check email to continue.",
        title,
        type,
        owner,
        guid,
        status
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$n = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const action$7 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({ error: "User does not exist" }, 400);
      }
      {
      }
      let active = body.active === void 0 ? user.active : body.active;
      const result = await query(
        `UPDATE tbl_user SET
                active = ? 
                WHERE user_guid = ?`,
        [
          active,
          guid
        ]
      );
      return DoResponse({
        success: true,
        message: `User ${active ? "activated" : "deactivated"} successfully`,
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({
          success: false,
          error: "User does not exist"
        }, 404);
      }
      const result = await query(
        `DELETE FROM tbl_user
                WHERE user_guid = ?`,
        [guid]
      );
      const data = {
        message: `User ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  loader: loader$n
}, Symbol.toStringTag, { value: "Module" }));
const loader$m = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user_profile_image WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$m
}, Symbol.toStringTag, { value: "Module" }));
async function action$6({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email) {
        return DoResponse({ error: "Enter email!" }, 400);
      }
      if (!body.guid) {
        return DoResponse({ error: "User / Owner Guid is required!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [body.guid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User does not exist!"
          },
          409
        );
      }
      const user = rows[0];
      {
      }
      const title = "Email Change Request";
      const type = RequestType.CHANGE_EMAIL;
      const owner = user.user_guid;
      const guid = crypto.randomUUID();
      const status = RequestStatus.OPEN;
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type]);
      if (rows.length > 0) {
        {
        }
        const result = await query(
          `UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
          [title, type, guid, status, owner, type, status]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
          [title, type, owner, guid, status]
        );
      }
      const data = {
        success: true,
        message: "email change request saved successfully",
        title,
        type,
        owner,
        guid,
        status
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$l = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const rawdata = await query(`SELECT * FROM tbl_dir ORDER BY date_created DESC`);
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$5({ request, params }) {
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
      }
      const body = await request.json();
      const rows = await query(`SELECT * FROM tbl_dir 
                WHERE
                SOUNDEX(title) = SOUNDEX(?)
                AND
                owner = ?`, [body.title, body.owner]);
      let title = "";
      if (body.branch === false || body.branch === void 0) {
        {
        }
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({ exists: true, message: "A similar business or branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
            { status: 409 }
          );
        }
      } else {
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({ exists: true, message: "A similar branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
            { status: 409 }
          );
        }
      }
      if (!body.title) {
        return new Response(JSON.stringify({ error: "Missing Title" }), { status: 400 });
      }
      if (!body.category) {
        return new Response(JSON.stringify({ error: "Missing Category" }), { status: 400 });
      }
      if (!body.short_description) {
        return new Response(JSON.stringify({ error: "Missing Short Description" }), { status: 400 });
      }
      if (!body.phone) {
        return new Response(JSON.stringify({ error: "Missing Phone" }), { status: 400 });
      }
      if (!body.email_address) {
        return new Response(JSON.stringify({ error: "Missing Email Address" }), { status: 400 });
      }
      if (!body.address_one) {
        return new Response(JSON.stringify({ error: "Missing Address" }), { status: 400 });
      }
      if (!body.zipcode) {
        return new Response(JSON.stringify({ error: "Missing Zipcode" }), { status: 400 });
      }
      if (!body.owner) {
        return new Response(JSON.stringify({ error: "Missing Owner" }), { status: 400 });
      }
      if (!body.established) {
        return new Response(JSON.stringify({ error: "Missing Year Established" }), { status: 400 });
      }
      let branch = false;
      let branch_location = "";
      if (body.branch !== void 0) {
        branch = body.branch;
      }
      if (body.branch_location !== void 0) {
        branch_location = body.branch_location;
      }
      const gid = crypto.randomUUID();
      const listingHash = GenerateRandomHash();
      console.log(body);
      const result = await query(
        `INSERT INTO tbl_dir SET 
                title = ?, 
                branch = ?,
                branch_location = ?, 
                category = ?, 
                short_description = ?, 
                long_description = ?, 
                phone = ?, 
                email_address = ?, 
                address_one = ?, 
                address_two = ?,
                country_code = ?,
                state_code = ?, 
                city_id = ?,
                zipcode = ?, 
                gid = ?, 
                owner = ?,
                established = ?,
                listing_hash = ?`,
        [
          body.title || null,
          branch,
          branch_location,
          body.category || null,
          body.short_description || null,
          body.long_description || null,
          body.phone || null,
          body.email_address || null,
          body.address_one || null,
          body.address_two || null,
          body.country_code || null,
          body.state_code || null,
          body.city_id || null,
          body.zipcode || null,
          gid,
          body.owner || null,
          body.established || null,
          listingHash || null
        ]
      );
      const data = {
        message: "Listing created successfully",
        data: body,
        guid: gid,
        listing_hash: listingHash
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const loader$k = async ({ request, params }) => {
  try {
    const id = params.guid_or_username;
    const rows = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != ''
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.gid = ? OR d.username = ?)
            `, [id, id]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$4 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid_or_username;
      {
      }
      const rawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const listing = rawlisting[0];
      if (rawlisting.length <= 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Listing does not exist"
          }),
          { status: 400 }
        );
      }
      {
      }
      let email_address = body.email_address === void 0 ? listing.email_address : body.email_address;
      let title = body.title === void 0 ? listing.title : body.title;
      let branch = body.branch === void 0 ? Boolean(listing.branch) : Boolean(body.branch);
      let branch_location = body.branch_location === void 0 ? listing.branch_location : body.branch_location;
      let category = body.category === void 0 ? listing.category : body.category;
      let short_description = body.short_description === void 0 ? listing.short_description : body.short_description;
      let long_description = body.long_description === void 0 ? listing.long_description : body.long_description;
      let phone = body.phone === void 0 ? listing.phone : body.phone;
      let address_one = body.address_one === void 0 ? listing.address_one : body.address_one;
      let address_two = body.address_two === void 0 ? listing.address_two : body.address_two;
      let img = body.img === void 0 ? listing.img : body.img;
      let owner = body.owner === void 0 ? listing.owner : body.owner;
      let username = body.username === void 0 ? listing.username : body.username;
      let zipcode = body.zipcode === void 0 ? listing.zipcode : body.zipcode;
      let products = body.products === void 0 ? listing.products : body.products;
      let services = body.services === void 0 ? listing.services : body.services;
      let business_phrases = body.business_phrases === void 0 ? listing.business_phrases : body.business_phrases;
      let established = body.established === void 0 ? listing.established : body.established;
      let xsocial = body.xsocial === void 0 ? listing.xsocial : body.xsocial;
      let fbsocial = body.fbsocial === void 0 ? listing.fbsocial : body.fbsocial;
      let linksocial = body.linksocial === void 0 ? listing.linksocial : body.linksocial;
      let country_code = body.country_code === void 0 ? listing.country_code : body.country_code;
      let state_code = body.state_code === void 0 ? listing.state_code : body.state_code;
      let city_id = body.city_id === void 0 ? listing.city_id : body.city_id;
      let website = body.website === void 0 ? listing.website : body.website;
      let sql = `UPDATE tbl_dir SET
                title = '${title}',
                branch = '${branch}',
                branch_location = '${branch_location}',
                category = '${category}',
                short_description = '${short_description}',
                phone = '${phone}',
                email_address = '${email_address}',
                address_one = '${address_one}',
                address_two = '${address_two}',
                owner = '${owner}',
                username = '${username}',
                img = '${img}',
                zipcode = '${zipcode}',
                products = '${products}',
                services = '${services}',
                business_phrases = '${business_phrases}',
                established = '${established}',
                xsocial = '${xsocial}',
                fbsocial = '${fbsocial}',
                linksocial = '${linksocial}',
                country_code = '${country_code}',
                state_code = '${state_code}',
                city_id = '${city_id}',
                website = '${website}'
                WHERE
                gid = '${guid}'`;
      const result = await query(
        `UPDATE tbl_dir SET
                title = ?,
                branch = ?,
                branch_location = ?,
                category = ?,
                short_description = ?,
                long_description = ?,
                phone = ?,
                email_address = ?,
                address_one = ?,
                address_two = ?,
                owner = ?,
                username = ?,
                img = ?,
                zipcode = ?,
                products = ?,
                services = ?,
                business_phrases = ?,
                established = ?,
                xsocial = ?,
                fbsocial = ?,
                linksocial = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                website = ?
                WHERE
                gid = ?`,
        [
          title,
          branch,
          branch_location,
          category,
          short_description,
          long_description,
          phone,
          email_address,
          address_one,
          address_two,
          owner,
          username,
          img,
          zipcode,
          products,
          services,
          business_phrases,
          established,
          xsocial,
          fbsocial,
          linksocial,
          country_code,
          state_code,
          city_id,
          website,
          guid
        ]
      );
      {
      }
      {
      }
      const updatedrawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const updatedlisting = updatedrawlisting[0];
      const data = {
        success: true,
        message: "Listing updated successfully",
        data: updatedlisting
      };
      return DoResponse(data, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const listing = rawlisting[0];
      if (rawlisting.length <= 0) {
        return new Response(
          JSON.stringify({ error: "Listing does not exist" }),
          { status: 400 }
        );
      }
      {
      }
      const result = await query(
        `DELETE FROM tbl_dir
                WHERE gid = ?`,
        [guid]
      );
      const data = {
        success: true,
        message: `Listing ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
const loader$j = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    let criteria = url.searchParams.get("q");
    if (criteria === "" || criteria === null || criteria === void 0) {
      criteria = "";
    }
    let rawdata = await query(`SELECT DISTINCT
            d.*,
            co.name AS country_name,
            st.name AS state_name,
            ci.name AS city_name,
            b.image_url AS image_url 
            FROM tbl_dir d
            LEFT JOIN tbl_country co ON d.country_code = co.iso2
            LEFT JOIN tbl_state st ON d.state_code = st.iso2
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            (d.title RLIKE ?
            OR d.short_description RLIKE ?
            OR d.category RLIKE ?
            )
            GROUP BY 
            d.gid
            ORDER BY
            d.date_created
            ASC
            LIMIT 0, 50`, [criteria, criteria, criteria]);
    if (criteria === "" || criteria === null || criteria === void 0) {
      rawdata = await query(`SELECT DISTINCT
                d.*,
                co.name AS country_name,
                st.name AS state_name,
                ci.name AS city_name,
                b.image_url AS image_url 
                FROM tbl_dir d
                LEFT JOIN tbl_country co ON d.country_code = co.iso2
                LEFT JOIN tbl_state st ON d.state_code = st.iso2
                LEFT JOIN tbl_city ci ON d.city_id = ci.id
                LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
                GROUP BY 
                d.gid
                ORDER BY
                d.date_created
                ASC
                LIMIT 0, 50`);
    }
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
const loader$i = async ({ request, params }) => {
  try {
    const id = params.guid_or_username;
    const isFeatured = true;
    const rows = await query(`SELECT DISTINCT
            d.*,
            co.name AS country_name,
            st.name AS state_name,
            ci.name AS city_name,
            b.image_url AS image_url 
            FROM tbl_dir d
            LEFT JOIN tbl_country co ON d.country_code = co.iso2
            LEFT JOIN tbl_state st ON d.state_code = st.iso2
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            d.featured = ?
            GROUP BY 
            d.gid
            ORDER BY RAND()
            ASC
            LIMIT 0, 3
            `, [isFeatured]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
const loader$h = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(
      `SELECT 
            a.feature_id, b.description, a.user_description, 
            a.business_guid, b.name 
            FROM 
            tbl_selected_facility_features a, tbl_sys_facility_features b 
            WHERE a.feature_id = b.feature_id 
            AND
            a.business_guid = ?`,
      [
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const loader$g = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const category = params.category;
    const limit = Number(params.limit) || 5;
    const rows = await query(`SELECT 
            d.*, 
            avg_ratings.avg_rating,
            b.image_url
            FROM tbl_dir d
            LEFT JOIN (
                SELECT business_guid, AVG(rating) AS avg_rating
                FROM tbl_rating
                GROUP BY business_guid
            ) AS avg_ratings ON d.gid = avg_ratings.business_guid
            LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
            WHERE d.category = ?
            LIMIT 0, ?`, [category, limit]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
const loader$f = async ({ request, params }) => {
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            ORDER BY date_created DESC`, [businessGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
const loader$e = async ({ request, params }) => {
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(
      `SELECT * FROM tbl_business_profile_image 
            WHERE
            business_guid = ?`,
      [guid]
    );
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
const loader$d = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const owner = params.guid;
    const rows = await query(`SELECT DISTINCT
            d.*, bi.* 
            FROM tbl_dir d
            LEFT JOIN tbl_business_profile_image bi ON bi.business_guid = d.gid
            WHERE
            d.owner = ?
            `, [owner]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return GetResponse(listings, true, 200);
  } catch (error) {
    console.log(error.message);
    return GetResponse({ "error": error.message }, false, 200);
  }
};
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$c = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const url = new URL(request.url);
    let userGuid = url.searchParams.get("user_guid");
    let businessGuid = url.searchParams.get("business_guid");
    let rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    if (rows.length <= 0) {
      {
      }
      await query(`INSERT INTO tbl_operating_hours 
            SET 
            user_guid = ?,  
            business_guid = ?
            `, [userGuid, businessGuid]);
      rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    }
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$3 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const url = new URL(request.url);
      let userGuid = url.searchParams.get("user_guid");
      let businessGuid = url.searchParams.get("business_guid");
      const body = await request.json();
      const workingHours = body.workingHours;
      {
      }
      const ophours = await query(`SELECT * FROM 
                tbl_operating_hours WHERE
                user_guid = ?
                AND
                business_guid = ?`, [userGuid, businessGuid]);
      if (ophours.length <= 0) {
        return DoResponse({ error: "Operating hours not yet created" }, 400);
      }
      {
      }
      const ophour = ophours[0];
      const open_status = body.openStatus === void 0 ? ophour.open_status : body.openStatus;
      const monday_from = workingHours.Monday.start === void 0 ? ophour.monday_from : workingHours.Monday.start;
      const monday_to = workingHours.Monday.end === void 0 ? ophour.monday_to : workingHours.Monday.end;
      const tuesday_from = workingHours.Tuesday.start === void 0 ? ophour.tuesday_from : workingHours.Tuesday.start;
      const tuesday_to = workingHours.Tuesday.end === void 0 ? ophour.tuesday_to : workingHours.Tuesday.end;
      const wednesday_from = workingHours.Wednesday.start === void 0 ? ophour.wednesday_from : workingHours.Wednesday.start;
      const wednesday_to = workingHours.Wednesday.end === void 0 ? ophour.wednesday_to : workingHours.Wednesday.end;
      const thursday_from = workingHours.Thursday.start === void 0 ? ophour.thursday_from : workingHours.Thursday.start;
      const thursday_to = workingHours.Thursday.end === void 0 ? ophour.thursday_to : workingHours.Thursday.end;
      const friday_from = workingHours.Friday.start === void 0 ? ophour.friday_from : workingHours.Friday.start;
      const friday_to = workingHours.Friday.end === void 0 ? ophour.friday_to : workingHours.Friday.end;
      const saturday_from = workingHours.Saturday.start === void 0 ? ophour.saturday_from : workingHours.Saturday.start;
      const saturday_to = workingHours.Saturday.end === void 0 ? ophour.saturday_to : workingHours.Saturday.end;
      const sunday_from = workingHours.Sunday.start === void 0 ? ophour.sunday_from : workingHours.Sunday.start;
      const sunday_to = workingHours.Sunday.end === void 0 ? ophour.sunday_to : workingHours.Sunday.end;
      const update = await query(
        `UPDATE tbl_operating_hours SET
                open_status = ?,
                monday_from = ?,
                monday_to = ?,
                tuesday_from = ?,
                tuesday_to = ?,
                wednesday_from = ?,
                wednesday_to = ?,
                thursday_from = ?,
                thursday_to = ?,
                friday_from = ?,
                friday_to = ?,
                saturday_from = ?,
                saturday_to = ?,
                sunday_from = ?,
                sunday_to = ? 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
        [
          open_status,
          monday_from,
          monday_to,
          tuesday_from,
          tuesday_to,
          wednesday_from,
          wednesday_to,
          thursday_from,
          thursday_to,
          friday_from,
          friday_to,
          saturday_from,
          saturday_to,
          sunday_from,
          sunday_to,
          userGuid,
          businessGuid
        ]
      );
      return DoResponse({
        success: true,
        message: "Request received successfully",
        workingHours: {
          businessGuid,
          userGuid,
          open_status,
          workingHours: {
            Monday: {
              monday_from,
              monday_to
            },
            Tuesday: {
              tuesday_from,
              tuesday_to
            },
            Wednesday: {
              wednesday_from,
              wednesday_to
            },
            Thursday: {
              thursday_from,
              thursday_to
            },
            Friday: {
              friday_from,
              friday_to
            },
            Saturday: {
              saturday_from,
              saturday_to
            },
            Sunday: {
              sunday_from,
              sunday_to
            }
          }
        }
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const loader$b = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const buid = params.business_guid;
  const user_guid = params.user_guid;
  console.log(user_guid + "|||");
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [buid, user_guid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    console.log(error.message);
    return DoResponse({ "error": error.message }, 500);
  }
};
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$a = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_sys_facility_features`);
    console.log(rawdata);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(
      `SELECT * FROM tbl_selected_facility_features 
            WHERE
            user_guid = ?
            AND
            business_guid = ?`,
      [
        userGuid,
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$8 = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_selected_facility_features`);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$2({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      const selected = body.selected;
      console.log(body);
      await query(`DELETE FROM tbl_selected_facility_features 
                WHERE 
                user_guid = ? 
                AND 
                business_guid = ?
                `, [userGuid, businessGuid]);
      if (selected.length > 0) {
        const vals = selected.map(async (feature) => {
          try {
            const guid = crypto.randomUUID();
            await query(
              `INSERT INTO tbl_selected_facility_features 
                    (user_guid, business_guid, feature_id, user_description, guid) VALUES (?, ?, ?, ?, ?)`,
              [userGuid, businessGuid, feature.feature_id, feature.user_description, guid]
            );
          } catch (error) {
            console.log(">>>>>bumbum");
            return DoResponse({ error: error.message }, 405);
          }
        });
      }
      const gid = crypto.randomUUID();
      const data = {
        message: "Features added successfully",
        data: body,
        user_guid: userGuid,
        business_guid: businessGuid
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_dir 
            WHERE 
            gid = ? 
            AND 
            owner = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$1 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let userGuid = params.user_guid;
      let businessGuid = params.business_guid;
      {
      }
      const listings = await query(`SELECT * FROM tbl_dir 
                WHERE
                owner = ?
                AND
                gid = ?`, [userGuid, businessGuid]);
      const listing = listings[0];
      if (listings.length <= 0) {
        return DoResponse({ error: "Business does not exist" }, 400);
      }
      {
      }
      let active = body.active === void 0 ? listing.active : body.active;
      const result = await query(
        `UPDATE tbl_dir SET
                active_status = ? 
                WHERE owner = ?
                AND
                gid = ?`,
        [
          active,
          userGuid,
          businessGuid
        ]
      );
      return DoResponse({
        success: true,
        message: `User ${active ? "activated" : "deactivated"} successfully`,
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const loader$6 = async ({ request, params }) => {
  try {
    const rows = await query(`SELECT 
            d.*, 
            avg_ratings.avg_rating,
            b.image_url
            FROM tbl_dir d
            LEFT JOIN (
                SELECT business_guid, AVG(rating) AS avg_rating
                FROM tbl_rating
                GROUP BY business_guid
            ) AS avg_ratings ON d.gid = avg_ratings.business_guid
            LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
            ORDER BY 
            date_created
            LIMIT 0, 8
            `, []);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request, params }) => {
  try {
    const businessGuid = params.business_guid;
    const rows = await query(`SELECT DISTINCT
                r.rating,
                r.fullname,
                r.comment,
                r.created_at,
                r.updated_at,
                up.image_url,
                co.name AS country_name,
                st.name AS state_name,
                ci.name AS city_name
                FROM tbl_rating r
                JOIN tbl_user u ON r.user_guid = u.user_guid
                LEFT JOIN tbl_user_profile_image up ON r.user_guid = up.user_guid
                LEFT JOIN tbl_country co ON u.country_code = co.iso2
                LEFT JOIN tbl_state st ON u.state_code = st.iso2
                LEFT JOIN tbl_city ci ON u.city_id = ci.id
                WHERE r.business_guid = ?
                GROUP BY 
                r.rating_guid`, [businessGuid]);
    if (rows.length <= 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ request, params }) => {
  try {
    const businessGuid = params.business_guid;
    const rows = await query(
      `SELECT 
            AVG(a.rating) as rating_average,
            SUM(a.rating) as rating_sum, 
            COUNT(a.rating) AS rating_count 
            FROM 
            tbl_rating a 
            WHERE 
            a.business_guid = ?`,
      [businessGuid]
    );
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get("country_code");
    const rows = await query(`SELECT * FROM tbl_state WHERE country_code = ?`, [countryCode]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    const states = rows.map((state) => {
      return {
        name: state.name,
        country_code: state.country_code,
        id: state.iso2
      };
    });
    return DoResponse(states, 200);
  }
};
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_country`);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const countries = rows.map((country) => {
      return {
        name: country.name,
        id: country.iso2
      };
    });
    return DoResponse(countries, 200);
  }
};
const route51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get("country_code");
    const stateCode = url.searchParams.get("state_code");
    console.log(`statecode: ${stateCode}`);
    console.log(`countrycode: ${countryCode}`);
    const rows = await query(`SELECT * FROM tbl_city 
            WHERE
            country_code = ?
            AND
            state_code = ?`, [countryCode, stateCode]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    const cities = rows.map((city) => {
      return {
        name: city.name,
        country_code: city.country_code,
        state_code: city.state_code,
        id: city.id
      };
    });
    return DoResponse(cities, 200);
  }
};
const route52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_category`);
    if (rows.length <= 0) {
      return GetResponse([{}], true, 200);
    }
    return GetResponse(rows, true, 200);
  }
};
const route53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-9CTKnNkG.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-fhYaibZo.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/index-a6STByh9.js", "/assets/SliderContext-CtjiVkrX.js", "/assets/EditPhotoDialogContext-CS8jVzmM.js", "/assets/index-CCxZ9t8L.js"], "css": ["/assets/root-CKtpiogH.css"] }, "routes/_index_backup": { "id": "routes/_index_backup", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index_backup-BFBK73v7.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/Recents-CEhOoLZM.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-a6STByh9.js", "/assets/index-CCxZ9t8L.js", "/assets/components-kAvIA9Ge.js", "/assets/index-CYPLIe53.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/LatestStarRating-BP_gHaVh.js"], "css": [] }, "routes/listing": { "id": "routes/listing", "parentId": "root", "path": "listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C2OMcgIo.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/SliderContext-CtjiVkrX.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/LatestStarRating-BP_gHaVh.js", "/assets/GenericNav-CYmB3q7e.js", "/assets/index-CCxZ9t8L.js", "/assets/Hamburger-SH_wVbdQ.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BbKHs85y.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-a6STByh9.js", "/assets/Recents-CEhOoLZM.js", "/assets/index-CCxZ9t8L.js", "/assets/index-CYPLIe53.js", "/assets/LatestStarRating-BP_gHaVh.js"], "css": [] }, "routes/_404": { "id": "routes/_404", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_404-BpEF4MFa.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/Logo-Bqbb4Qu7.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-a6STByh9.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web": { "id": "routes/web", "parentId": "root", "path": "web", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BspaleB3.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/listing/index": { "id": "routes/listing/index", "parentId": "root", "path": "/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C2OMcgIo.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/SliderContext-CtjiVkrX.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/LatestStarRating-BP_gHaVh.js", "/assets/GenericNav-CYmB3q7e.js", "/assets/index-CCxZ9t8L.js", "/assets/Hamburger-SH_wVbdQ.js"], "css": [] }, "routes/web/search/index": { "id": "routes/web/search/index", "parentId": "root", "path": "/web/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BCRF0oKY.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/index-a6STByh9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-CYPLIe53.js", "/assets/LatestStarRating-BP_gHaVh.js", "/assets/GenericNav-CYmB3q7e.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/signin/index": { "id": "routes/web/signin/index", "parentId": "root", "path": "/web/signin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-D2d_rJTE.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/ResponsiveNav-CSVgG3Yf.js", "/assets/index-CLh2UBG4.js", "/assets/components-kAvIA9Ge.js", "/assets/Logo-Bqbb4Qu7.js", "/assets/index-a6STByh9.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/signup/index": { "id": "routes/web/signup/index", "parentId": "root", "path": "/web/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-XP1CDN0G.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/ResponsiveNav-CSVgG3Yf.js", "/assets/Logo-Bqbb4Qu7.js", "/assets/components-kAvIA9Ge.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-a6STByh9.js"], "css": [] }, "routes/web/reset_password/index": { "id": "routes/web/reset_password/index", "parentId": "root", "path": "/web/reset_password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CN_YA3ku.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/ResponsiveNav-CSVgG3Yf.js", "/assets/Logo-Bqbb4Qu7.js", "/assets/components-kAvIA9Ge.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-a6STByh9.js"], "css": [] }, "routes/web/account/index": { "id": "routes/web/account/index", "parentId": "root", "path": "/web/account", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-s7EzDycr.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/components-kAvIA9Ge.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/index-a6STByh9.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/profile/index": { "id": "routes/web/account/profile/index", "parentId": "root", "path": "/web/account/profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B5CpyKnC.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-CLh2UBG4.js", "/assets/Input-Du6lIHgR.js", "/assets/Select-DiC_l5-P.js", "/assets/index-a6STByh9.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/css-DMkAD1zc.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/email_address/index": { "id": "routes/web/account/email_address/index", "parentId": "root", "path": "/web/account/email_address", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CBRuZea0.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/Input-Du6lIHgR.js", "/assets/css-DMkAD1zc.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/change_password/index": { "id": "routes/web/account/change_password/index", "parentId": "root", "path": "/web/account/change_password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DrxpB5VP.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/Input-Du6lIHgR.js", "/assets/css-DMkAD1zc.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/reset_password/index": { "id": "routes/web/account/reset_password/index", "parentId": "root", "path": "/web/account/reset_password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DIfUH-mj.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/Input-Du6lIHgR.js", "/assets/css-DMkAD1zc.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/deactivate_profile/index": { "id": "routes/web/account/deactivate_profile/index", "parentId": "root", "path": "/web/account/deactivate_profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C2R_juBe.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/Input-Du6lIHgR.js", "/assets/css-DMkAD1zc.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/portfolio/index": { "id": "routes/web/account/portfolio/index", "parentId": "root", "path": "/web/account/portfolio", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DreADKtV.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/portfolio/business/index": { "id": "routes/web/account/portfolio/business/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-iX5PT5Mt.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/css-DMkAD1zc.js", "/assets/Input-Du6lIHgR.js", "/assets/TextareaWithWordLimit-DYZgauIH.js", "/assets/Select-DiC_l5-P.js", "/assets/BusinessMenu-snPD_ZZZ.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/create_business/index": { "id": "routes/web/account/create_business/index", "parentId": "root", "path": "/web/account/create_business", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BN29fPWI.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/index-CLh2UBG4.js", "/assets/Input-Du6lIHgR.js", "/assets/Select-DiC_l5-P.js", "/assets/css-DMkAD1zc.js", "/assets/TextareaWithWordLimit-DYZgauIH.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/portfolio/business/settings/index": { "id": "routes/web/account/portfolio/business/settings/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Buwb4rJq.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-CLh2UBG4.js", "/assets/components-kAvIA9Ge.js", "/assets/index-a6STByh9.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/css-DMkAD1zc.js", "/assets/BusinessMenu-snPD_ZZZ.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/portfolio/business/gallery/index": { "id": "routes/web/account/portfolio/business/gallery/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/gallery", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-5RyjGqXs.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/index-a6STByh9.js", "/assets/BusinessMenu-snPD_ZZZ.js", "/assets/EditPhotoDialogContext-CS8jVzmM.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/SliderContext-CtjiVkrX.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/portfolio/business/facilities/index": { "id": "routes/web/account/portfolio/business/facilities/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/facilities", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Bru6lUqX.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/index-a6STByh9.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/BusinessMenu-snPD_ZZZ.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js", "/assets/index-CCxZ9t8L.js"], "css": [] }, "routes/web/account/portfolio/business/activate/index": { "id": "routes/web/account/portfolio/business/activate/index", "parentId": "root", "path": "/web/account/portfolio/:business_guid/:user_guid/activate", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C8Syn5ds.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-kAvIA9Ge.js", "/assets/NotificationContext-D6ursZw9.js", "/assets/index-a6STByh9.js", "/assets/ContentLayout-DD3DdK5-.js", "/assets/BusinessMenu-snPD_ZZZ.js", "/assets/index-CCxZ9t8L.js", "/assets/MobileNav-D9wqDv2m.js", "/assets/Hamburger-SH_wVbdQ.js"], "css": [] }, "routes/api/user/signin": { "id": "routes/api/user/signin", "parentId": "root", "path": "api/user/signin", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/signin-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/verifytoken": { "id": "routes/api/user/verifytoken", "parentId": "root", "path": "api/user/verifytoken", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/verifytoken-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/user": { "id": "routes/api/user/user", "parentId": "root", "path": "api/user/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/change_password": { "id": "routes/api/user/change_password", "parentId": "root", "path": "api/user/change_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_password-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/reset_password_request": { "id": "routes/api/user/reset_password_request", "parentId": "root", "path": "api/user/reset_password_request", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/reset_password_request-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/activate_deactivate": { "id": "routes/api/user/activate_deactivate", "parentId": "root", "path": "api/user/activate_deactivate/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/activate_deactivate-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/user_profile_image": { "id": "routes/api/user/user_profile_image", "parentId": "root", "path": "api/user/user_profile_image/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user_profile_image-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/user/change_email_request": { "id": "routes/api/user/change_email_request", "parentId": "root", "path": "api/user/change_email_request", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_email_request-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/index": { "id": "routes/api/listing/index", "parentId": "root", "path": "api/listing", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/listing": { "id": "routes/api/listing/listing", "parentId": "root", "path": "api/listing/:guid_or_username", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/search": { "id": "routes/api/listing/search", "parentId": "root", "path": "api/listing/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/featured_listing": { "id": "routes/api/listing/featured_listing", "parentId": "root", "path": "api/listing/featured_listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/featured_listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_facility_features": { "id": "routes/api/listing/business_facility_features", "parentId": "root", "path": "api/listing/business_facility_features/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_facility_features-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/listing_by_category": { "id": "routes/api/listing/listing_by_category", "parentId": "root", "path": "api/listing/listing_by_category/:category/:limit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing_by_category-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_gallery": { "id": "routes/api/listing/business_gallery", "parentId": "root", "path": "api/listing/business_gallery/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_gallery-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/business_profile_image": { "id": "routes/api/listing/business_profile_image", "parentId": "root", "path": "api/listing/business_profile_image/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_profile_image-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/owner/index": { "id": "routes/api/listing/owner/index", "parentId": "root", "path": "api/listing/owner/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DP2rzg_V.js", "imports": [], "css": [] }, "routes/api/listing/operating_hours": { "id": "routes/api/listing/operating_hours", "parentId": "root", "path": "api/listing/operating_hours", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/operating_hours-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/gallery": { "id": "routes/api/listing/gallery", "parentId": "root", "path": "api/listing/gallery/:business_guid/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/gallery-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/sys_facility_features/index": { "id": "routes/api/listing/sys_facility_features/index", "parentId": "root", "path": "api/listing/sys_facility_features", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-K6Dvbx-E.js", "imports": [], "css": [] }, "routes/api/listing/selected_facility_features/selected_facility_features": { "id": "routes/api/listing/selected_facility_features/selected_facility_features", "parentId": "root", "path": "api/listing/selected_facility_features/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/selected_facility_features-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/selected_facility_features/index": { "id": "routes/api/listing/selected_facility_features/index", "parentId": "root", "path": "api/listing/selected_facility_features", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C6Kfwj0f.js", "imports": [], "css": [] }, "routes/api/listing/activate/activate": { "id": "routes/api/listing/activate/activate", "parentId": "root", "path": "api/listing/activate/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/activate-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listing/recents": { "id": "routes/api/listing/recents", "parentId": "root", "path": "api/listing/recents", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/recents-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/rating/business_ratings": { "id": "routes/api/rating/business_ratings", "parentId": "root", "path": "api/rating/business_ratings/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_ratings-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/rating/ratings_reviews": { "id": "routes/api/rating/ratings_reviews", "parentId": "root", "path": "api/rating/ratings_reviews/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ratings_reviews-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/state": { "id": "routes/api/util/state", "parentId": "root", "path": "api/util/state", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/state-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/country": { "id": "routes/api/util/country", "parentId": "root", "path": "api/util/country", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/country-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/city": { "id": "routes/api/util/city", "parentId": "root", "path": "api/util/city", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/city-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/category": { "id": "routes/api/util/category", "parentId": "root", "path": "api/util/category", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-3f2106eb.js", "version": "3f2106eb" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index_backup": {
    id: "routes/_index_backup",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/listing": {
    id: "routes/listing",
    parentId: "root",
    path: "listing",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/_404": {
    id: "routes/_404",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/web": {
    id: "routes/web",
    parentId: "root",
    path: "web",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/listing/index": {
    id: "routes/listing/index",
    parentId: "root",
    path: "/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/web/search/index": {
    id: "routes/web/search/index",
    parentId: "root",
    path: "/web/search",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/web/signin/index": {
    id: "routes/web/signin/index",
    parentId: "root",
    path: "/web/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/web/signup/index": {
    id: "routes/web/signup/index",
    parentId: "root",
    path: "/web/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/web/reset_password/index": {
    id: "routes/web/reset_password/index",
    parentId: "root",
    path: "/web/reset_password",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/web/account/index": {
    id: "routes/web/account/index",
    parentId: "root",
    path: "/web/account",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/web/account/profile/index": {
    id: "routes/web/account/profile/index",
    parentId: "root",
    path: "/web/account/profile",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/web/account/email_address/index": {
    id: "routes/web/account/email_address/index",
    parentId: "root",
    path: "/web/account/email_address",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/web/account/change_password/index": {
    id: "routes/web/account/change_password/index",
    parentId: "root",
    path: "/web/account/change_password",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/web/account/reset_password/index": {
    id: "routes/web/account/reset_password/index",
    parentId: "root",
    path: "/web/account/reset_password",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/web/account/deactivate_profile/index": {
    id: "routes/web/account/deactivate_profile/index",
    parentId: "root",
    path: "/web/account/deactivate_profile",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/web/account/portfolio/index": {
    id: "routes/web/account/portfolio/index",
    parentId: "root",
    path: "/web/account/portfolio",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/web/account/portfolio/business/index": {
    id: "routes/web/account/portfolio/business/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/web/account/create_business/index": {
    id: "routes/web/account/create_business/index",
    parentId: "root",
    path: "/web/account/create_business",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/web/account/portfolio/business/settings/index": {
    id: "routes/web/account/portfolio/business/settings/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/web/account/portfolio/business/gallery/index": {
    id: "routes/web/account/portfolio/business/gallery/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/gallery",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/web/account/portfolio/business/facilities/index": {
    id: "routes/web/account/portfolio/business/facilities/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/facilities",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/web/account/portfolio/business/activate/index": {
    id: "routes/web/account/portfolio/business/activate/index",
    parentId: "root",
    path: "/web/account/portfolio/:business_guid/:user_guid/activate",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/api/user/signin": {
    id: "routes/api/user/signin",
    parentId: "root",
    path: "api/user/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/api/user/verifytoken": {
    id: "routes/api/user/verifytoken",
    parentId: "root",
    path: "api/user/verifytoken",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/api/user/user": {
    id: "routes/api/user/user",
    parentId: "root",
    path: "api/user/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/api/user/change_password": {
    id: "routes/api/user/change_password",
    parentId: "root",
    path: "api/user/change_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/api/user/reset_password_request": {
    id: "routes/api/user/reset_password_request",
    parentId: "root",
    path: "api/user/reset_password_request",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/api/user/activate_deactivate": {
    id: "routes/api/user/activate_deactivate",
    parentId: "root",
    path: "api/user/activate_deactivate/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/api/user/user_profile_image": {
    id: "routes/api/user/user_profile_image",
    parentId: "root",
    path: "api/user/user_profile_image/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route30
  },
  "routes/api/user/change_email_request": {
    id: "routes/api/user/change_email_request",
    parentId: "root",
    path: "api/user/change_email_request",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/api/listing/index": {
    id: "routes/api/listing/index",
    parentId: "root",
    path: "api/listing",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "routes/api/listing/listing": {
    id: "routes/api/listing/listing",
    parentId: "root",
    path: "api/listing/:guid_or_username",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "routes/api/listing/search": {
    id: "routes/api/listing/search",
    parentId: "root",
    path: "api/listing/search",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/api/listing/featured_listing": {
    id: "routes/api/listing/featured_listing",
    parentId: "root",
    path: "api/listing/featured_listing",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/api/listing/business_facility_features": {
    id: "routes/api/listing/business_facility_features",
    parentId: "root",
    path: "api/listing/business_facility_features/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "routes/api/listing/listing_by_category": {
    id: "routes/api/listing/listing_by_category",
    parentId: "root",
    path: "api/listing/listing_by_category/:category/:limit",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "routes/api/listing/business_gallery": {
    id: "routes/api/listing/business_gallery",
    parentId: "root",
    path: "api/listing/business_gallery/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "routes/api/listing/business_profile_image": {
    id: "routes/api/listing/business_profile_image",
    parentId: "root",
    path: "api/listing/business_profile_image/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route39
  },
  "routes/api/listing/owner/index": {
    id: "routes/api/listing/owner/index",
    parentId: "root",
    path: "api/listing/owner/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/api/listing/operating_hours": {
    id: "routes/api/listing/operating_hours",
    parentId: "root",
    path: "api/listing/operating_hours",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "routes/api/listing/gallery": {
    id: "routes/api/listing/gallery",
    parentId: "root",
    path: "api/listing/gallery/:business_guid/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "routes/api/listing/sys_facility_features/index": {
    id: "routes/api/listing/sys_facility_features/index",
    parentId: "root",
    path: "api/listing/sys_facility_features",
    index: void 0,
    caseSensitive: void 0,
    module: route43
  },
  "routes/api/listing/selected_facility_features/selected_facility_features": {
    id: "routes/api/listing/selected_facility_features/selected_facility_features",
    parentId: "root",
    path: "api/listing/selected_facility_features/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "routes/api/listing/selected_facility_features/index": {
    id: "routes/api/listing/selected_facility_features/index",
    parentId: "root",
    path: "api/listing/selected_facility_features",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  },
  "routes/api/listing/activate/activate": {
    id: "routes/api/listing/activate/activate",
    parentId: "root",
    path: "api/listing/activate/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "routes/api/listing/recents": {
    id: "routes/api/listing/recents",
    parentId: "root",
    path: "api/listing/recents",
    index: void 0,
    caseSensitive: void 0,
    module: route47
  },
  "routes/api/rating/business_ratings": {
    id: "routes/api/rating/business_ratings",
    parentId: "root",
    path: "api/rating/business_ratings/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route48
  },
  "routes/api/rating/ratings_reviews": {
    id: "routes/api/rating/ratings_reviews",
    parentId: "root",
    path: "api/rating/ratings_reviews/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "routes/api/util/state": {
    id: "routes/api/util/state",
    parentId: "root",
    path: "api/util/state",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "routes/api/util/country": {
    id: "routes/api/util/country",
    parentId: "root",
    path: "api/util/country",
    index: void 0,
    caseSensitive: void 0,
    module: route51
  },
  "routes/api/util/city": {
    id: "routes/api/util/city",
    parentId: "root",
    path: "api/util/city",
    index: void 0,
    caseSensitive: void 0,
    module: route52
  },
  "routes/api/util/category": {
    id: "routes/api/util/category",
    parentId: "root",
    path: "api/util/category",
    index: void 0,
    caseSensitive: void 0,
    module: route53
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
