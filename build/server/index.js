import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { HiPlay, HiBars3BottomRight } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { BsBank, BsStarFill, BsStar } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import { BiSolidRightArrow } from "react-icons/bi";
import mysql from "mysql2/promise";
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
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
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
const Logo = ({ theme }) => {
  const [navTheme, setNavTheme] = useState("light");
  useEffect(() => {
    setNavTheme(theme);
  }, [theme, navTheme]);
  return /* @__PURE__ */ jsxs("div", { className: `flex place-items-center space-x-1`, children: [
    /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("div", { className: `${theme === "light" ? "bg-black text-white" : "bg-white/90 text-black"}
                relative w-8 h-8 
                `, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "/images/comcerc-logo.png",
        alt: "comcerc",
        className: `object-cover w-full hfull`
      }
    ) }) }),
    /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("span", { className: `${theme === "light" ? "text-black" : "text-white/90"}
                font-[700] text-2xl tracking-tight relative
                `, children: "comcerc" }) })
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
    url: "/search",
    label: "Search"
  },
  {
    id: 3,
    url: "/search?q=hotels",
    label: "Hotels"
  },
  {
    id: 4,
    url: "/search?q=travel",
    label: "Travel"
  },
  {
    id: 5,
    url: `/search?q=real estate`,
    label: "Real Estate"
  },
  {
    id: 6,
    url: "/search?q=services",
    label: "Services"
  }
];
const MobileNav = ({
  showNav,
  closeNav
}) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const bgOverlay = showNav ? "block" : "hidden";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { onClick: closeNav, className: `transform ${bgOverlay} fixed transition-all duration-500 inset-0 z-[4000] bg-black opacity-20 w-full` }),
    /* @__PURE__ */ jsxs("div", { className: `${navOpen} transform transition-all duration-500
                delay-0 fixed  justify-start  h-full
                w-[320px] md:w-[400px] bg-white z-[4001] ${showNav ? "shadow-lg shadow-black/50" : ""}
                  `, children: [
      /* @__PURE__ */ jsxs("div", { className: `bg-white pt-4 pb-4`, children: [
        /* @__PURE__ */ jsx("div", { className: `${showNav ? "flex" : "hidden"} w-12 h-10 bg-black  
                        place-content-center place-items-center
                        absolute top-0 right-[-48px]`, children: /* @__PURE__ */ jsx(FaTimes, { className: `text-[21px] text-white` }) }),
        /* @__PURE__ */ jsx("div", { className: `pl-8 md:pl-12`, children: /* @__PURE__ */ jsx(Logo, { theme: "light" }) })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: ` border-t-[1px] border-yellow-500/20` }),
      /* @__PURE__ */ jsx("div", { className: `flex flex-col mt-10`, children: navlinks.map((link, index2) => {
        return /* @__PURE__ */ jsx(Link, { to: link.url, children: /* @__PURE__ */ jsxs("p", { className: `text-[17px] hover:font-bold
                                        py-3  w-full text-black
                                        font-medium hover:text-black
                                        pl-8 md:pl-12 hover:bg-black/10 flex
                                        place-items-center gap-x-2
                                        `, children: [
          link.label,
          /* @__PURE__ */ jsx(HiPlay, { className: `text-[11px] text-red-500` })
        ] }) }, index2);
      }) }),
      /* @__PURE__ */ jsx("div", { className: `absolute bottom-0 h-4 bg-black w-full` })
    ] })
  ] }) });
};
const CenterNav$1 = ({ navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: `hidden lg:flex place-items-center space-x-14 h-full `, children: navlinks.map((link, index2) => {
    return /* @__PURE__ */ jsx(Link, { to: link.url, children: /* @__PURE__ */ jsx("span", { className: `${navBg ? "text-white" : "text-white"}
                                font-light tracking-normal text-[13px] font-sans
                                hover:text-white/40`, children: link.label }) }, index2);
  }) }) });
};
const SigninMenu = ({ theme, openNav, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center space-x-4`,
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
const AppNav$1 = ({ openNav }) => {
  const [navBg, setNavBg] = useState(false);
  const [scrollHeight] = useState(1);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setNavBg(true);
      }
      if (window.scrollY < scrollHeight) {
        setNavBg(false);
      }
    };
    window.onscroll = () => handler();
  }, [scrollHeight]);
  return /* @__PURE__ */ jsx("div", { className: `${navBg ? "bg-gray-800" : "bg-black/30"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition-all ease-in-out duration-0`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `, children: [
    /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
    /* @__PURE__ */ jsx(CenterNav$1, { navBg }),
    /* @__PURE__ */ jsx(SigninMenu, { openNav, navBg })
  ] }) });
};
const ResponsiveNav$1 = () => {
  const [showNav, setShowNav] = useState(false);
  const [navBg] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(AppNav$1, { openNav, navBg }),
    /* @__PURE__ */ jsx(MobileNav, { showNav, closeNav })
  ] });
};
const SearchBox = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("form", { action: "/search", method: "get", children: /* @__PURE__ */ jsx("div", { className: `mx-[15px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[800px] mx-auto w-full
                        bg-blue-100 rounded flex gap-x-0 overflow-hidden`, children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        type: "text",
        className: `grow bg-white p-3 outline-none`,
        placeholder: "Enter an address, city, state or country"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: `text-black px-4 bg-gray-200 rounded-r
                                border-none font-bold`,
        children: "Submit"
      }
    )
  ] }) }) }) });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("div", { className: `w-full h-screen bg-[#0f0715] overflow-hidden
        relative bg-[url('/images/hero.jpg')] bg-cover bg-center`, children: [
    /* @__PURE__ */ jsx("div", { className: " absolute inset-0 bg-black opacity-50" }),
    /* @__PURE__ */ jsxs("div", { className: `flex justify-center items-center flex-col
                max-w-[1100px] w-full mx-auto relative h-full
                `, children: [
      /* @__PURE__ */ jsx("h1", { className: `text-white text-center
                    text-[13px] sm:text-[15px] uppercase font-light
                    font-sans`, children: "The Best Way To" }),
      /* @__PURE__ */ jsx("h1", { className: `text-center font-sans font-[800]
                    text-2xl sm:text-4xl text-white mt-4
                    tracking-wide`, children: "Discover. Connect. Grow" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: `mt-4 text-center text-[12px] sm:text-[15px] 
                    text-gray-200 font-sans font-light`,
          children: "More than 745,000 businesses, places & people."
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `mt-6 w-full`,
          children: /* @__PURE__ */ jsx(SearchBox, {})
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `text-white mt-[10px] text-[12px] text-center
                      max-w-[800px] w-full px-[50px]`, children: "Get to know and visit the best of local businesses across the globe. Smartest way to find and be found." })
    ] })
  ] });
};
const Home = () => {
  return /* @__PURE__ */ jsx("div", { className: `overflow-hidden`, children: /* @__PURE__ */ jsx(Hero, {}) });
};
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    /* @__PURE__ */ jsx(Home, {})
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const CenterNav = ({ theme, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: `hidden lg:flex place-items-center space-x-14 h-full `, children: navlinks.map((link, index2) => {
    return /* @__PURE__ */ jsx(Link, { to: link.url, children: /* @__PURE__ */ jsx("span", { className: `${theme === "light" ? "text-black" : "text-white"}
                                font-normal tracking-tight text-[14px] font-sans
                                hover:text-white/40`, children: link.label }) }, index2);
  }) }) });
};
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
  return /* @__PURE__ */ jsx("div", { className: `${_theme === "dark" ? "bg-gray-800" : "bg-yellow-300"}
        fixed h-[60px] z-[300] w-full px-[15px]
        transition ease-in-out duration-0`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full
              h-full flex place-items-center place-content-between
              `, children: [
    /* @__PURE__ */ jsx(Logo, { theme: _theme }),
    /* @__PURE__ */ jsx(CenterNav, { theme: _theme, navBg }),
    /* @__PURE__ */ jsx(SigninMenu, { theme: _theme, openNav, navBg })
  ] }) });
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
const config = {
  BASE_URL: "https://gursse.com"
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
const getSearch = async (criteria) => {
  const endpoint = "/api/listings/search?q=" + criteria;
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
  const endpoint = `/api/listings/featured_listing`;
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
  const endpoint = `/api/listings/listing_by_category/${category}/${limit}`;
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
  return /* @__PURE__ */ jsx("div", { className: `w-full h-auto px-[15px] mt-5`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full
                    grid grid-cols-12 gap-8`, children: [
    /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-8 `, children }),
    /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 lg:block `, children: /* @__PURE__ */ jsx("div", { className: `sticky top-[80px]`, children: /* @__PURE__ */ jsx(Featured, {}) }) })
  ] }) });
};
const ResultItem = ({ listing }) => {
  var _a, _b;
  const IMG_BASE_URL = "https://oxbyt.com";
  return /* @__PURE__ */ jsxs("div", { className: ` cursor-pointer mt-4`, onClick: (e) => {
    window.location.href = `/${listing.gid}`;
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex rounded-sm gap-4`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative min-w-[100px] w-[100px] h-[100px]`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: IMG_BASE_URL + listing.image_url,
          alt: listing.title,
          className: `object-cover w-full h-full text-sm
                            rounded `
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: " w-full", children: /* @__PURE__ */ jsxs("div", { className: `md:flex md:place-content-between 
                w-full md:gap-x-[4px]`, children: [
        /* @__PURE__ */ jsxs("div", { className: `w-full md:w-[60%]`, children: [
          /* @__PURE__ */ jsx(Link, { to: `/${listing.gid}`, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx("div", { className: `font-bold text-[17px] text-brown-800
                    leading-[1.1em] hover:underline text-blue-900`, children: listing.title }) }),
          /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] leading-[1.2em] mt-[2px]
                    `, children: (listing == null ? void 0 : listing.business_phrases) ? `${(_a = listing == null ? void 0 : listing.business_phrases) == null ? void 0 : _a.substring(0, 150)}...` : "" }),
          /* @__PURE__ */ jsxs("div", { className: `font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[3px]`, children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                className: `hover:underline text-blue-700`,
                to: listing.website !== null ? listing.website : "#top",
                onClick: (e) => e.stopPropagation(),
                children: "Website"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FiArrowRight, {}) }),
            /* @__PURE__ */ jsx("div", { className: `capitalize flex place-items-center gap-1`, children: listing.category })
          ] }),
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
    /* @__PURE__ */ jsxs("div", { className: `mt-2 md:mt-3 mb-2 text-[13px] leading-[1.2em]
                    flex place-content-start`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative top-[-3px]`, children: /* @__PURE__ */ jsx(RiDoubleQuotesL, { className: `tracking-tighter text-[20px]` }) }),
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
    /* @__PURE__ */ jsx("div", { className: ` divide-y`, children: currentItems.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(ResultItem, { listing: item }) }, index2);
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
const LatestStarRating = ({ rating = 0, maxStars = 5 }) => {
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
const LatestBusinesses = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL = "https://oxbyt.com";
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
            src: IMG_BASE_URL + (data == null ? void 0 : data.image_url),
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
const Footer = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `h-[100px]` }),
    /* @__PURE__ */ jsx("div", { className: " pt-10 pb-12 bg-black w-full px-[15px]", children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] mx-auto w-full`, children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Logo, { theme: "dark" }) }),
      /* @__PURE__ */ jsx("hr", { className: `border-b-0 border-t-[1px] border-gray-500/50` }),
      /* @__PURE__ */ jsxs("p", { className: " text-center mt-4 text-sm text-white/40 font-extralight", children: [
        "Copyright 2025 © | ",
        /* @__PURE__ */ jsx("a", { href: "/", children: "comcerc.com" })
      ] })
    ] }) })
  ] });
};
const loader$3 = async ({ request, params }) => {
  const url = new URL(request.url);
  const query2 = url.searchParams.get("q") || "";
  let data = await getSearch(query2);
  let res = {
    data,
    query: query2
  };
  return res;
};
const index = () => {
  const res = useLoaderData();
  const data = res.data;
  useEffect(() => {
    if (data.length > 0) {
      console.log(data);
    }
  }, [data]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav, { theme: "light" }),
    /* @__PURE__ */ jsx("div", { className: ` w-full  bg-yellow-400/90
                flex flex-col`, children: /* @__PURE__ */ jsx("div", { className: `mt-[80px] mb-[22px]`, children: /* @__PURE__ */ jsx(SearchBox, {}) }) }),
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
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
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
const loader$2 = async ({ request, params }) => {
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
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request, params }) => {
  try {
    const id = params.guid_or_username;
    const isFeatured = true;
    const rows = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != ''
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.featured = ?)
            ORDER BY RAND()
            LIMIT 0, 10
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
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request, params }) => {
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
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D5a5QfFs.js", "imports": ["/assets/components-u2jWRsVt.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D8z6UBY6.js", "imports": ["/assets/components-u2jWRsVt.js"], "css": ["/assets/root-D7xu9voL.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BjiEPGFc.js", "imports": ["/assets/components-u2jWRsVt.js", "/assets/SearchBox-BQGObCFA.js"], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CrpKyvr3.js", "imports": ["/assets/components-u2jWRsVt.js", "/assets/SearchBox-BQGObCFA.js"], "css": [] }, "routes/api/listings/search": { "id": "routes/api/listings/search", "parentId": "root", "path": "/api/listings/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/featured_listing": { "id": "routes/api/listings/featured_listing", "parentId": "root", "path": "/api/listings/featured_listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/featured_listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/listing_by_category": { "id": "routes/api/listings/listing_by_category", "parentId": "root", "path": "api/listings/listing_by_category/:category/:limit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing_by_category-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-e6210d32.js", "version": "e6210d32" };
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
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/api/listings/search": {
    id: "routes/api/listings/search",
    parentId: "root",
    path: "/api/listings/search",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/api/listings/featured_listing": {
    id: "routes/api/listings/featured_listing",
    parentId: "root",
    path: "/api/listings/featured_listing",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/api/listings/listing_by_category": {
    id: "routes/api/listings/listing_by_category",
    parentId: "root",
    path: "api/listings/listing_by_category/:category/:limit",
    index: void 0,
    caseSensitive: void 0,
    module: route5
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
