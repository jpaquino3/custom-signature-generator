import React, { useState, useEffect, useCallback } from "react";
import { ChromePicker } from "react-color";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/**********************************************************/
/** Inline SVG icon helpers: Instagram, X, Pinterest, etc. **/
/**********************************************************/
function getInstagramSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 512 512"
     fill="${color}" 
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M349.33 69.33H162.67C105.07 69.33 64 110.4 64 168v186.67c0 57.6 41.07 98.67 98.67 98.67h186.67c57.6 0 98.67-41.07 98.67-98.67V168c0-57.6-41.07-98.67-98.67-98.67Zm-18.13 32h.13c14.72 0 16.53.07 22.3.32 5.42.24 8.38 1.12 10.33 1.85 2.6 1 4.45 2.2 6.39 4.14s3.17 3.79 4.14 6.39c.73 1.95 1.61 3.91 1.85 10.33.25 5.77.31 7.58.32 22.3v84.85c0 50.1-40.7 90.8-90.8 90.8h-84.86c-50.1 0-90.8-40.7-90.8-90.8v-84.85c0-50.1 40.7-90.8 90.8-90.8h84.85ZM256 149.33c-58.88 0-106.67 47.79-106.67 106.67S197.12 362.67 256 362.67 362.67 314.88 362.67 256 314.88 149.33 256 149.33Zm0 32c41.42 0 74.67 33.25 74.67 74.67s-33.25 74.67-74.67 74.67S181.33 297.42 181.33 256 214.58 181.33 256 181.33Zm90.35-37.19c-10.25 0-18.53 8.3-18.53 18.53s8.28 18.52 18.53 18.52 18.52-8.28 18.52-18.52-8.28-18.53-18.52-18.53Z"/>
</svg>
  `;
}

function getXSVG(color = "#000") {
  return `
<svg width="18" height="18" viewBox="0 0 300 271"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
</svg>
  `;
}

function getPinterestSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 512 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M268.3 8C123.5 8 48.3 111.9 48.3 202c0 50.1 18.8 94.5 59.2 111 6.6 2.7 12.4.1 14.3-7.1 1.3-4.9 4.4-17.2 5.8-22.4 1.9-7.1 1.2-9.6-4.1-15.8-11.6-13.7-19-31.6-19-56.9 0-73.4 55.3-139.7 144.2-139.7 78.4 0 136.6 49.5 136.6 120.1 0 84-37.3 154.7-92.4 154.7-30.5 0-53.3-21.5-46-60.2 8.5-44.4 24.9-92.3 24.9-124.3 0-28.7-15.3-52.7-47-52.7-37.2 0-67.1 38.4-67.1 89.9 0 24.5 8.7 41.2 8.7 41.2s-28.7 120.3-33.8 141.3c-10.1 42.4-1.5 94-.8 99.2.4 2.8 3.8 3.5 5.3 1.4 2.3-3.1 31.8-47.1 41.8-90.8 2.8-12.7 14.5-79.9 14.5-79.9 7.7 14.7 30.3 27.7 54.4 27.7 71.6 0 120.4-65.1 120.4-151.9 0-79.5-69.1-154.4-172.7-154.4z"/>
</svg>
  `;
}

function getFacebookSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 320 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M279.14 288l14.22-92.66h-88.91V141.2c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S283.43 0 248.29 0c-73.22 0-121.11 44.38-121.11 124.72v70.62H40v92.66h87.18V512h107.1V288z"/>
</svg>
  `;
}

function getLinkedInSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 448 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340a53.55 53.55 0 1 1 53.52-53.55 53.54 53.54 0 0 1-53.51 53.55zM447.9 448h-92.68V302.4c0-34.7-.7-79.31-48.28-79.31-48.3 0-55.7 37.7-55.7 76.6V448h-92.64V148.9h88.94v40.8h1.28a97.64 97.64 0 0 1 87.9-48.25c94 0 111.3 61.9 111.3 142.3V448z"/>
</svg>
  `;
}

function getTiktokSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 512 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(4px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M314.59 0H369c1.71 10.69 4.39 21.21 8.16 31.37 14.56 39.49 45.44 60.83 84.86 63.48v56.77c-22.72 1.65-44.12-2.6-64.28-13.23-19.28-10.11-34.79-24.9-46.28-43.95v139.35c0 63.27-47.11 129.21-122.08 128.14-44.64-.65-82.13-24.55-105.72-61.35-27.92-44.32-26.69-106.82 2.82-150.34 20.63-32.43 51.42-54.53 92.31-62.42v60.79c-13.68 3.06-25.37 10.4-34.73 20.45-22.01 24-16.86 62.62 11.46 78.21 22.53 12.05 52.76 4.1 66.01-15.55 5.09-7.8 7.52-17.28 7.52-28.03v-235.8z"/>
</svg>
  `;
}

function getBlueSkySVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 600 530"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
</svg>
  `;
}

function getThreadsSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 192 192"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
  <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C122.03 17.1113 139.624 24.4614 154.118 38.788C159.894 45.8136 164.199 54.6488 167.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883Z"/>
</svg>
  `;
}

// Helper function to convert hex colors to "R, G, B" format.
function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

/** Reorder array by removing from startIndex and inserting at endIndex */
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/** Remove protocol/www from a URL */
function getDisplayUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function App() {
  // States for signature colors, dimensions, and toggles
  const [ringStart, setRingStart] = useState("#6E3CF3");
  const [ringEnd, setRingEnd] = useState("#3CB1F3");
  const [textStart, setTextStart] = useState("#6E3CF3");
  const [textEnd, setTextEnd] = useState("#3CB1F3");
  const [socialIconColor, setSocialIconColor] = useState("#6E3CF3");

  // For background – originally just a color, now expanded
  const [cardBackground, setCardBackground] = useState("#fff");
  const [cardBgType, setCardBgType] = useState("Solid");
  const [bgGradientStart, setBgGradientStart] = useState("#ffffff");
  const [bgGradientEnd, setBgGradientEnd] = useState("#dddddd");
  const [bgGradientAngle, setBgGradientAngle] = useState(45);
  const [bgTexture, setBgTexture] = useState("texture1");
  const [bgTextureOpacity, setBgTextureOpacity] = useState(1);
  const [bgTextureColor, setBgTextureColor] = useState("#ffffff");
  const [bgCustomImageUrl, setBgCustomImageUrl] = useState("");

  const [cornerRadius, setCornerRadius] = useState(15);

  // New states for text colors
  const [titleCompanyColor, setTitleCompanyColor] = useState("#777777");
  const [contactTextColor, setContactTextColor] = useState("#555555");
  const [separatorColor, setSeparatorColor] = useState("#999999");

  // New state for texture blend mode
  const [textureBlendMode, setTextureBlendMode] = useState("normal");

  // New states for custom background image adjustments
  const [customBgZoom, setCustomBgZoom] = useState(1.0);
  const [customBgRotation, setCustomBgRotation] = useState(0);
  const [customBgOffsetX, setCustomBgOffsetX] = useState(0);
  const [customBgOffsetY, setCustomBgOffsetY] = useState(0);

  // New states for highlight toggle
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  const [highlightColor, setHighlightColor] = useState("#ffff00");
  const [highlightOpacity, setHighlightOpacity] = useState(0.5);

  // Name/Title/Company toggles
  const [nameEnabled, setNameEnabled] = useState(true);
  const [userName, setUserName] = useState("Your Name");
  const [titleEnabled, setTitleEnabled] = useState(true);
  const [userTitle, setUserTitle] = useState("Title");
  const [companyEnabled, setCompanyEnabled] = useState(true);
  const [userCompany, setUserCompany] = useState("Your Company");

  // Phone/Email/Website toggles
  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("555-555-5555");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailAddress, setEmailAddress] = useState("you@yourcompany.com");
  const [websiteEnabled, setWebsiteEnabled] = useState(true);
  const [website, setWebsite] = useState("https://yourcompany.com");

  // Social logos mode toggle: false = use SVG (with color controls), true = use PNG logos
  const [usePngLogos, setUsePngLogos] = useState(false);

  // Social icons array for drag & drop
  const [socials, setSocials] = useState([
    {
      id: "instagram",
      label: "Instagram",
      link: "https://instagram.com/yourprofile",
      enabled: true,
      getSVG: getInstagramSVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png",
    },
    {
      id: "x",
      label: "X",
      link: "https://x.com/yourprofile",
      enabled: true,
      getSVG: getXSVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/X_logo_2023.svg/600px-X_logo_2023.svg.png",
    },
    {
      id: "pinterest",
      label: "Pinterest",
      link: "https://pinterest.com/yourprofile",
      enabled: true,
      getSVG: getPinterestSVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png?20160129083321",
    },
    {
      id: "facebook",
      label: "Facebook",
      link: "https://facebook.com/yourprofile",
      enabled: true,
      getSVG: getFacebookSVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/1024px-Facebook_f_logo_%282021%29.svg.png?20210818083032",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      link: "https://linkedin.com/in/yourprofile",
      enabled: true,
      getSVG: getLinkedInSVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    },
    {
      id: "tiktok",
      label: "TikTok",
      link: "https://www.tiktok.com/@yourprofile",
      enabled: true,
      getSVG: getTiktokSVG,
      pngUrl:
        "https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Tiktok-512.png",
    },
    {
      id: "blue-sky",
      label: "Blue Sky",
      link: "https://blueskyweb.xyz/yourprofile",
      enabled: true,
      getSVG: getBlueSkySVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bluesky_Logo.svg/1200px-Bluesky_Logo.svg.png",
    },
    {
      id: "threads",
      label: "Threads",
      link: "https://threads.net/yourprofile",
      enabled: true,
      getSVG: getThreadsSVG,
      pngUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Threads_%28app%29_logo.svg/1200px-Threads_%28app)%29_logo.svg.png",
    },
  ]);

  // Profile picture bounding states
  const [profilePicUrl, setProfilePicUrl] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
  );
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const circleDiameter = 120;
  const [photoScale, setPhotoScale] = useState(1.0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Shadow toggles
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [shadowAngle, setShadowAngle] = useState(45);
  const [shadowDistance, setShadowDistance] = useState(4);
  const [shadowBlur, setShadowBlur] = useState(8);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  // Universal color (for ring, text, and social icons in SVG mode)
  const [universalColor, setUniversalColor] = useState("#cccccc");

  // For “Paste HTML” area
  const [pasteHtmlText, setPasteHtmlText] = useState("");

  // Measure the image for dynamic fill scale
  useEffect(() => {
    if (!profilePicUrl) return;
    const img = new Image();
    img.src = profilePicUrl;
    img.onload = () => {
      setMeasuredWidth(img.naturalWidth);
      setMeasuredHeight(img.naturalHeight);
      const biggerDim = Math.max(img.naturalWidth, img.naturalHeight);
      const fillScale = circleDiameter / biggerDim;
      setPhotoScale(Math.max(fillScale, 0.01));
      setOffsetX(0);
      setOffsetY(0);
    };
  }, [profilePicUrl]);

  // Clamp offsets so the picture doesn't escape the circle
  const clampOffsets = useCallback(
    (scale, x, y) => {
      if (!measuredWidth || !measuredHeight) return { x, y };
      const scaledW = measuredWidth * scale;
      const scaledH = measuredHeight * scale;
      const radius = circleDiameter / 2;
      const halfW = scaledW / 2;
      const halfH = scaledH / 2;

      let minX = radius - halfW;
      let maxX = halfW - radius;
      if (minX > maxX) [minX, maxX] = [maxX, minX];
      let clampedX = Math.max(minX, Math.min(x, maxX));

      let minY = radius - halfH;
      let maxY = halfH - radius;
      if (minY > maxY) [minY, maxY] = [maxY, minY];
      let clampedY = Math.max(minY, Math.min(y, maxY));

      return { x: clampedX, y: clampedY };
    },
    [measuredWidth, measuredHeight]
  );

  useEffect(() => {
    const { x, y } = clampOffsets(photoScale, offsetX, offsetY);
    if (x !== offsetX || y !== offsetY) {
      setOffsetX(x);
      setOffsetY(y);
    }
  }, [photoScale, offsetX, offsetY, clampOffsets]);

  // Generate final signature HTML
  function generateSignatureHTML() {
    // Compute background style based on card background type.
    let computedBg = "";
    if (cardBgType === "Custom Image") {
      // For Custom Image we keep the table itself transparent
      computedBg = "";
    } else {
      switch (cardBgType) {
        case "Solid":
          computedBg = cardBackground;
          break;
        case "Gradient":
          computedBg = `linear-gradient(${bgGradientAngle}deg, ${bgGradientStart}, ${bgGradientEnd})`;
          break;
        case "Texture":
          // We apply two layers: tinted gradient + texture image
          const textureUrls = {
            texture1:
              "https://img.freepik.com/free-photo/grey-copy-space-fabric-texture_23-2148402342.jpg",
            texture2:
              "https://img.freepik.com/free-vector/abstract-horizontal-grid-lines-graph-style-graphic-design_1017-39918.jpg",
            texture3:
              "https://img.freepik.com/premium-photo/deep-blue-glossy-cloth-texture-background-natural-textile-material-photo-pattern_568886-19300.jpg",
            texture4:
              "https://img.freepik.com/premium-photo/white-ink-brush-strokes-painted-black-watercolor-background_231311-3480.jpg",
            texture5:
              "https://img.freepik.com/free-vector/black-white-pattern-background_1409-10031.jpg",
            texture6:
              "https://img.freepik.com/free-vector/scribbles-background-hand-drawn-line-seamless-doodle-pattern_474888-6296.jpg",
            texture7:
              "https://img.freepik.com/free-photo/dark-blue-stamped-background-with-white-diy-block-prints_53876-103547.jpg",
            texture8:
              "https://img.freepik.com/free-vector/fabric-grunge-splash_1409-10742.jpg",
            texture9:
              "https://img.freepik.com/premium-photo/decorative-glass-plate-background_1160-2185.jpg",
            texture10:
              "https://img.freepik.com/premium-photo/horizontal-black-white-bokeh-illustration-background_199726-5442.jpg",
          };
          computedBg = `linear-gradient(rgba(${hexToRgb(
            bgTextureColor
          )}, ${bgTextureOpacity}), rgba(${hexToRgb(
            bgTextureColor
          )}, ${bgTextureOpacity})), url(${textureUrls[bgTexture]})`;
          break;
        default:
          computedBg = cardBackground;
      }
    }

    // Build contact line with anchors inheriting the contactTextColor.
    const contactItems = [];
    if (phoneEnabled && phoneNumber.trim()) {
      contactItems.push(
        `<a href="tel:${phoneNumber}" style="text-decoration:none; color:inherit;">${phoneNumber}</a>`
      );
    }
    if (emailEnabled && emailAddress.trim()) {
      contactItems.push(
        `<a href="mailto:${emailAddress}" style="text-decoration:none; color:inherit;">${emailAddress}</a>`
      );
    }
    if (websiteEnabled && website.trim()) {
      const displaySite = getDisplayUrl(website);
      contactItems.push(
        `<a href="${website}" style="text-decoration:none; color:inherit;">${displaySite}</a>`
      );
    }
    const separatorHTML = `<span style="color: ${separatorColor};"> | </span>`;
    const contactLine = contactItems.join(separatorHTML);

    // Gather social icons (using PNG if toggled, else SVG)
    const iconSpans = socials.reduce((arr, s) => {
      if (s.enabled) {
        let iconMarkup;
        if (usePngLogos) {
          iconMarkup = `<img src="${s.pngUrl}" alt="${s.label}" style="vertical-align: middle; width:20px; height:20px;" />`;
        } else {
          iconMarkup = s.getSVG(socialIconColor);
        }
        arr.push(`
<span style="display:inline-block;">
  <a href="${s.link}" style="text-decoration:none;">
    ${iconMarkup}
  </a>
</span>`);
      }
      return arr;
    }, []);
    const socialIconsHTML = `
<div style="display:flex; gap:12px; align-items:center;">
  ${iconSpans.join("")}
</div>
`;

    // Compute highlight background if enabled
    const highlightBg = highlightEnabled
      ? ` background: rgba(${hexToRgb(highlightColor)}, ${highlightOpacity});`
      : "";

    // Name section
    let nameHTML = "";
    if (nameEnabled) {
      nameHTML = `
<div style="font-size:22px; font-weight:bold; margin-bottom:5px;
 background: linear-gradient(45deg, ${textStart}, ${textEnd});
 -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
  ${userName}
</div>`;
    }
    // Title + Company
    let titleCompanyHTML = "";
    if (titleEnabled || companyEnabled) {
      const a = [];
      if (titleEnabled) a.push(userTitle);
      if (companyEnabled) a.push(userCompany);
      const joined = a.join(", ");
      if (joined.trim()) {
        titleCompanyHTML = `
<div style="font-size:15px; color:${titleCompanyColor};${highlightBg}">
  ${joined}
</div>
<div style="height:5px;"></div>
`;
      }
    }

    // Compute drop shadow
    function getBoxShadow() {
      if (!shadowEnabled) return "none";
      const rad = (shadowAngle * Math.PI) / 180;
      const offsetXVal = Math.round(shadowDistance * Math.cos(rad));
      const offsetYVal = Math.round(shadowDistance * Math.sin(rad));
      return `${offsetXVal}px ${offsetYVal}px ${shadowBlur}px 0 rgba(0,0,0,${shadowOpacity})`;
    }
    const shadow = getBoxShadow();

    // Transform for profile picture
    const transformStyle = `
transform: translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${photoScale});
transform-origin: center;`;

    // Build the table HTML (for non-Custom Image)
    const tableHtml = `
<table border="0" cellpadding="0" cellspacing="0"
  style="max-width:410px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
         ${cardBgType !== "Custom Image" ? `background:${computedBg};` : ""}
         ${
           cardBgType === "Texture"
             ? `background-blend-mode:${textureBlendMode};`
             : ""
         }
         border:1px solid #ddd; border-radius:${cornerRadius}px;
         border-collapse:separate; border-spacing:0; box-shadow:${shadow};">
  <tr>
    <td style="padding:20px; vertical-align:middle;">
      <div style="width:128px; height:128px;
                  background: linear-gradient(to bottom left, ${ringStart}, ${ringEnd});
                  border-radius:50%; padding:4px; box-sizing:border-box;">
        <div style="width:100%; height:100%; border-radius:50%; overflow:hidden; position:relative;">
          <img src="${profilePicUrl}" alt="${userName}"
               style="position:absolute; top:50%; left:50%; width:auto; height:auto; max-width:none; max-height:none; object-fit:cover; ${transformStyle}"
          />
        </div>
      </div>
    </td>
    <td style="padding:20px 0; vertical-align:middle;">
      <div style="width:1px; background:#e0e0e0; height:110px;"></div>
    </td>
    <td style="padding:20px; vertical-align:middle;">
      ${nameHTML}
      ${titleCompanyHTML}
      ${
        contactLine
          ? `<div style="font-size:14px; color:${contactTextColor}; margin-bottom:10px;${highlightBg}">${contactLine}</div>`
          : ""
      }
      ${socialIconsHTML}
    </td>
  </tr>
</table>
`.trim();

    // For Custom Image: wrap the table in a container with the background image
    if (cardBgType === "Custom Image") {
      const containerStyle = `
        position: relative;
        display: inline-block;
        overflow: hidden;
        border-radius: ${cornerRadius}px;
        box-shadow: ${shadow};
      `;
      // We absolutely position the custom background <img> behind the table
      const customBgStyle = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) translate(${customBgOffsetX}px, ${customBgOffsetY}px) scale(${customBgZoom}) rotate(${customBgRotation}deg);
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
        z-index: -1;
      `;
      const tableHtmlCustom = `
<table border="0" cellpadding="0" cellspacing="0"
  style="max-width:410px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
         background: transparent;
         border: none;
         border-collapse:separate; border-spacing:0;">
  <tr>
    <td style="padding:20px; vertical-align:middle;">
      <div style="width:128px; height:128px;
                  background: linear-gradient(to bottom left, ${ringStart}, ${ringEnd});
                  border-radius:50%; padding:4px; box-sizing:border-box;">
        <div style="width:100%; height:100%; border-radius:50%; overflow:hidden; position:relative;">
          <img src="${profilePicUrl}" alt="${userName}"
               style="position:absolute; top:50%; left:50%; width:auto; height:auto; max-width:none; max-height:none; object-fit:cover; ${transformStyle}"
          />
        </div>
      </div>
    </td>
    <td style="padding:20px 0; vertical-align:middle;">
      <div style="width:1px; background:#e0e0e0; height:110px;"></div>
    </td>
    <td style="padding:20px; vertical-align:middle;">
      ${nameHTML}
      ${titleCompanyHTML}
      ${
        contactLine
          ? `<div style="font-size:14px; color:${contactTextColor}; margin-bottom:10px;${highlightBg}">${contactLine}</div>`
          : ""
      }
      ${socialIconsHTML}
    </td>
  </tr>
</table>
`.trim();

      return `
<div style="${containerStyle}">
  <img src="${bgCustomImageUrl}" alt="Custom Background" style="${customBgStyle}" />
  ${tableHtmlCustom}
</div>
      `.trim();
    } else {
      // Return normal table if not using custom image
      return tableHtml;
    }
  }

  // Handle drag end for social icons
  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;
    const reordered = reorder(socials, source.index, destination.index);
    setSocials(reordered);
  }

  // Copy final HTML to clipboard
  function copyHtml() {
    const html = generateSignatureHTML();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(html).then(
        () => alert("Signature HTML copied!"),
        (err) => {
          console.error("Clipboard error:", err);
          fallback(html);
        }
      );
    } else {
      fallback(html);
    }
    function fallback(text) {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      alert("Signature HTML copied!");
    }
  }

  // Copy live preview as if user selected all
  function copyPreviewSelectAll() {
    const preview = generateSignatureHTML();
    const container = document.createElement("div");
    container.innerHTML = preview;
    document.body.appendChild(container);
    const range = document.createRange();
    range.selectNodeContents(container);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    alert("Live Preview copied (select all approach)!");
    sel.removeAllRanges();
    document.body.removeChild(container);
  }

  // Universal color: apply to ring, text, and SVG social icons
  function applyUniversalColor() {
    setRingStart(universalColor);
    setRingEnd(universalColor);
    setTextStart(universalColor);
    setTextEnd(universalColor);
    setSocialIconColor(universalColor);
  }

  // Reset functions
  function resetRingStart() {
    setRingStart("#6E3CF3");
  }
  function resetRingEnd() {
    setRingEnd("#3CB1F3");
  }
  function resetTextStart() {
    setTextStart("#6E3CF3");
  }
  function resetTextEnd() {
    setTextEnd("#3CB1F3");
  }
  function resetSocialColor() {
    setSocialIconColor("#6E3CF3");
  }
  function resetCardBackground() {
    setCardBackground("#fff");
  }
  function resetCornerRadius() {
    setCornerRadius(15);
  }
  function resetShadow() {
    setShadowAngle(45);
    setShadowDistance(4);
    setShadowBlur(8);
    setShadowOpacity(0.1);
  }
  function resetZoom() {
    if (!measuredWidth || !measuredHeight) return;
    const biggerDim = Math.max(measuredWidth, measuredHeight);
    const fillScale = circleDiameter / biggerDim;
    setPhotoScale(Math.max(fillScale, 0.01));
  }
  function resetOffsetX() {
    setOffsetX(0);
  }
  function resetOffsetY() {
    setOffsetY(0);
  }

  /******************************************************************
   *  "PASTE HTML" FUNCTIONALITY
   *  This tries to parse the user’s pasted HTML and update states,
   *  so the result is reflected in the same controls + preview.
   ******************************************************************/
  function handleApplyPastedHtml() {
    if (!pasteHtmlText.trim()) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(pasteHtmlText, "text/html");

    // Grab the main <table> (or wrapper <div> if using custom image)
    const table = doc.querySelector("table[border='0']");
    if (!table) {
      alert("Could not find a matching <table> in the pasted HTML. Aborting parse.");
      return;
    }

    const tableStyle = table.getAttribute("style") || "";

    // 1) Corner radius
    const cornerMatch = tableStyle.match(/border-radius:\s*(\d+)px/);
    if (cornerMatch) {
      setCornerRadius(parseInt(cornerMatch[1], 10));
    }

    // 2) Box shadow
    const shadowMatch = tableStyle.match(/box-shadow:\s*([^;]+)/i);
    if (shadowMatch) {
      const shadowVal = shadowMatch[1].trim();
      if (shadowVal !== "none") {
        const parts = shadowVal.split(/\s+/);
        if (parts.length >= 5) {
          // e.g. "2px 3px 5px 0 rgba(0,0,0,0.1)"
          const offsetXVal = parseFloat(parts[0]);
          const offsetYVal = parseFloat(parts[1]);
          const blurVal = parseFloat(parts[2]);
          const angleDeg = Math.round(
            (Math.atan2(offsetYVal, offsetXVal) * 180) / Math.PI
          );
          setShadowAngle((angleDeg + 360) % 360);
          setShadowDistance(
            Math.round(Math.sqrt(offsetXVal ** 2 + offsetYVal ** 2))
          );
          setShadowBlur(blurVal);
          const rgbaMatch = shadowVal.match(/rgba?\(([^)]+)\)/);
          if (rgbaMatch) {
            const colorParts = rgbaMatch[1].split(",");
            const alpha = colorParts[3] ? parseFloat(colorParts[3].trim()) : 1;
            setShadowOpacity(alpha);
          }
          setShadowEnabled(true);
        }
      } else {
        setShadowEnabled(false);
      }
    } else {
      setShadowEnabled(false);
    }

    // 3) Check if it's using “Custom Image” wrapper <div> or not
    const wrapperDiv = doc.querySelector("div[style*='position: relative'][style*='overflow: hidden']");
    if (wrapperDiv) {
      // It's a custom image scenario
      setCardBgType("Custom Image");
      const bgImg = wrapperDiv.querySelector("img[alt='Custom Background']");
      if (bgImg) {
        const bgStyle = bgImg.getAttribute("style") || "";
        const transformMatch = bgStyle.match(
          /translate\(-50%,\s*-50%\)\s*translate\(([-\d.]+)px,\s*([-\d.]+)px\)\s*scale\(([\d.]+)\)\s*rotate\(([\d.]+)deg\)/
        );
        if (transformMatch) {
          const [, offx, offy, sc, rot] = transformMatch;
          setCustomBgOffsetX(parseFloat(offx));
          setCustomBgOffsetY(parseFloat(offy));
          setCustomBgZoom(parseFloat(sc));
          setCustomBgRotation(parseFloat(rot));
        }
        const srcVal = bgImg.getAttribute("src") || "";
        setBgCustomImageUrl(srcVal);
      }
    } else {
      // Otherwise, parse normal background from table’s style
      if (tableStyle.includes("linear-gradient(") && tableStyle.includes("url(")) {
        // That means "Texture"
        setCardBgType("Texture");
        const blendModeMatch = tableStyle.match(/background-blend-mode:\s*([^;]+)/i);
        if (blendModeMatch) {
          setTextureBlendMode(blendModeMatch[1].trim());
        }
        const rgbaMatches = tableStyle.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\)/);
        if (rgbaMatches) {
          const r = parseInt(rgbaMatches[1], 10);
          const g = parseInt(rgbaMatches[2], 10);
          const b = parseInt(rgbaMatches[3], 10);
          const a = parseFloat(rgbaMatches[4]);
          const hex = "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
          setBgTextureColor(hex);
          setBgTextureOpacity(a);
        }
      } else if (tableStyle.includes("linear-gradient(")) {
        // Possibly "Gradient"
        setCardBgType("Gradient");
        const gradMatch = tableStyle.match(/linear-gradient\(([\d.]+)deg,\s*([^,]+),\s*([^)]+)\)/);
        if (gradMatch) {
          const angleVal = parseFloat(gradMatch[1]);
          setBgGradientAngle(angleVal);
          setBgGradientStart(gradMatch[2].trim());
          setBgGradientEnd(gradMatch[3].trim());
        }
      } else {
        // fallback => "Solid"
        setCardBgType("Solid");
        const bgColMatch = tableStyle.match(/background:\s*([^;]+)/);
        if (bgColMatch) {
          const colorVal = bgColMatch[1].trim();
          if (colorVal.startsWith("#")) {
            setCardBackground(colorVal);
          }
        }
      }
    }

    // 4) Parse ring start/end from the 128x128 ring <div>
    const ringDiv = table.querySelector(
      "div[style*='background: linear-gradient(to bottom left']"
    ) || doc.querySelector("div[style*='background: linear-gradient(to bottom left']");
    if (ringDiv) {
      const ringStyle = ringDiv.getAttribute("style") || "";
      const ringMatch = ringStyle.match(
        /linear-gradient\(to bottom left,\s*([^,]+),\s*([^)]+)\)/
      );
      if (ringMatch) {
        setRingStart(ringMatch[1].trim());
        setRingEnd(ringMatch[2].trim());
      }
    }

    // 5) Parse name, text gradient
    const nameDiv = table.querySelector("div[style*='font-size:22px'][style*='-webkit-background-clip']");
    if (nameDiv) {
      const txtGrad = nameDiv.getAttribute("style") || "";
      const textGradMatch = txtGrad.match(
        /linear-gradient\(45deg,\s*([^,]+),\s*([^)]+)\)/
      );
      if (textGradMatch) {
        setTextStart(textGradMatch[1].trim());
        setTextEnd(textGradMatch[2].trim());
      }
      setUserName(nameDiv.textContent.trim());
      setNameEnabled(true);
    } else {
      setNameEnabled(false);
    }

    // 6) Title + Company
    // We removed `titleCompanyDiv` to avoid warnings. We just use "tcd."
    const tcd = table.querySelector("div[style*='font-size:15px'][style*='color:']");
    if (tcd) {
      const joinedText = tcd.textContent.trim();
      if (joinedText.includes(",")) {
        const parts = joinedText.split(",");
        setUserTitle(parts[0].trim());
        setTitleEnabled(true);
        if (parts[1]) {
          setUserCompany(parts[1].trim());
          setCompanyEnabled(true);
        }
      } else {
        setUserTitle(joinedText);
        setTitleEnabled(true);
        setCompanyEnabled(false);
      }
      const styleVal = tcd.getAttribute("style") || "";
      if (styleVal.includes("background: rgba(")) {
        setHighlightEnabled(true);
        const highlightMatch = styleVal.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
        if (highlightMatch) {
          const hr = parseInt(highlightMatch[1], 10);
          const hg = parseInt(highlightMatch[2], 10);
          const hb = parseInt(highlightMatch[3], 10);
          const ha = parseFloat(highlightMatch[4]);
          const hhex = "#" + [hr, hg, hb]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("");
          setHighlightColor(hhex);
          setHighlightOpacity(ha);
        }
      } else {
        setHighlightEnabled(false);
      }
      const colorMatch = styleVal.match(/color:\s*([^;]+)/);
      if (colorMatch) {
        setTitleCompanyColor(colorMatch[1].trim());
      }
    } else {
      setTitleEnabled(false);
      setCompanyEnabled(false);
    }

    // 7) Contact line (phone, email, website)
    const contactDiv = table.querySelector("div[style*='font-size:14px;'][style*='margin-bottom:10px;']");
    if (contactDiv) {
      const cStyle = contactDiv.getAttribute("style") || "";
      const cColorMatch = cStyle.match(/color:\s*([^;]+)/);
      if (cColorMatch) {
        setContactTextColor(cColorMatch[1].trim());
      }
      if (cStyle.includes("background: rgba(")) {
        setHighlightEnabled(true);
        const hiMatch = cStyle.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/);
        if (hiMatch) {
          const hr = parseInt(hiMatch[1], 10);
          const hg = parseInt(hiMatch[2], 10);
          const hb = parseInt(hiMatch[3], 10);
          const ha = parseFloat(hiMatch[4]);
          const hhex = "#" + [hr, hg, hb]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("");
          setHighlightColor(hhex);
          setHighlightOpacity(ha);
        }
      }
      const links = Array.from(contactDiv.querySelectorAll("a"));
      setPhoneEnabled(false);
      setEmailEnabled(false);
      setWebsiteEnabled(false);
      for (const link of links) {
        const hrefVal = link.getAttribute("href") || "";
        if (hrefVal.startsWith("tel:")) {
          setPhoneEnabled(true);
          setPhoneNumber(hrefVal.slice(4));
        } else if (hrefVal.startsWith("mailto:")) {
          setEmailEnabled(true);
          setEmailAddress(hrefVal.slice(7));
        } else {
          setWebsiteEnabled(true);
          setWebsite(hrefVal);
        }
      }
      const sepSpan = contactDiv.querySelector("span[style*='color:']");
      if (sepSpan) {
        const sepStyle = sepSpan.getAttribute("style") || "";
        const sepMatch = sepStyle.match(/color:\s*([^;]+)/);
        if (sepMatch) {
          setSeparatorColor(sepMatch[1].trim());
        }
      }
    } else {
      setPhoneEnabled(false);
      setEmailEnabled(false);
      setWebsiteEnabled(false);
    }

    // 8) Social icons => parse <div> with "display:flex; gap:12px;"
    const socialDiv = table.querySelector("div[style*='display:flex'][style*='gap:12px']");
    if (socialDiv) {
      const anchorList = Array.from(socialDiv.querySelectorAll("a"));
      const newSocials = socials.map((s) => ({ ...s, enabled: false }));
      anchorList.forEach((a) => {
        const link = a.getAttribute("href") || "";
        for (let i = 0; i < newSocials.length; i++) {
          const label = newSocials[i].label.toLowerCase();
          if (link.toLowerCase().includes(label.replace(/\s/g, ""))) {
            newSocials[i].enabled = true;
            newSocials[i].link = link;
            break;
          } else {
            if (newSocials[i].id === "x" && link.toLowerCase().includes("x.com")) {
              newSocials[i].enabled = true;
              newSocials[i].link = link;
              break;
            }
          }
        }
      });
      setSocials(newSocials);

      // Check if PNG (img) => else inline svg
      const anyPng = socialDiv.querySelector("img");
      if (anyPng) {
        setUsePngLogos(true);
      } else {
        setUsePngLogos(false);
        const firstSvg = socialDiv.querySelector("svg[fill]");
        if (firstSvg) {
          const fillVal = firstSvg.getAttribute("fill");
          if (fillVal && fillVal.startsWith("#")) {
            setSocialIconColor(fillVal);
          }
        }
      }
    }

    // 9) Profile pic => <img alt="Your Name">
    const pImg = doc.querySelector("img[alt], img[alt='Your Name']");
    if (pImg) {
      const picSrc = pImg.getAttribute("src") || "";
      setProfilePicUrl(picSrc);
    }

    alert("Pasted HTML parsed successfully!");
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left column: scrollable controls */}
      <div style={{ width: 380, overflowY: "auto", padding: 20 }}>
        <h2>Signature Generator</h2>

        {/* 1) Shadow Toggles */}
        <div style={{ marginBottom: 20 }}>
          <label>
            <input
              type="checkbox"
              checked={shadowEnabled}
              onChange={() => setShadowEnabled(!shadowEnabled)}
              style={{ marginRight: 8 }}
            />
            <strong>Drop Shadow</strong>
          </label>
          {shadowEnabled && (
            <div
              style={{
                marginTop: 10,
                border: "1px solid #ccc",
                padding: 10,
                borderRadius: 4,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
              >
                <label style={{ marginRight: 10 }}>
                  Angle (deg): {shadowAngle}
                </label>
                <button style={{ marginLeft: "auto" }} onClick={resetShadow}>
                  Reset Shadow
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={shadowAngle}
                  onChange={(e) => setShadowAngle(parseInt(e.target.value, 10))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="360"
                  value={shadowAngle}
                  onChange={(e) => setShadowAngle(parseInt(e.target.value, 10))}
                  style={{ width: 70 }}
                />
              </div>
              <div
                style={{ marginTop: 10, display: "flex", alignItems: "center" }}
              >
                <label style={{ marginRight: 10 }}>
                  Distance (px): {shadowDistance}
                </label>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={shadowDistance}
                  onChange={(e) => setShadowDistance(parseInt(e.target.value, 10))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={shadowDistance}
                  onChange={(e) => setShadowDistance(parseInt(e.target.value, 10))}
                  style={{ width: 70 }}
                />
              </div>
              <div
                style={{ marginTop: 10, display: "flex", alignItems: "center" }}
              >
                <label style={{ marginRight: 10 }}>Blur (px): {shadowBlur}</label>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(parseInt(e.target.value, 10))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(parseInt(e.target.value, 10))}
                  style={{ width: 70 }}
                />
              </div>
              <div
                style={{ marginTop: 10, display: "flex", alignItems: "center" }}
              >
                <label style={{ marginRight: 10 }}>
                  Opacity: {shadowOpacity.toFixed(2)}
                </label>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={shadowOpacity}
                  onChange={(e) => setShadowOpacity(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={shadowOpacity}
                  onChange={(e) => setShadowOpacity(parseFloat(e.target.value))}
                  style={{ width: 70 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 2) Card Background Type */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Card Background Type:</strong>
          </p>
          <select
            value={cardBgType}
            onChange={(e) => setCardBgType(e.target.value)}
          >
            <option value="Solid">Solid</option>
            <option value="Gradient">Gradient</option>
            <option value="Texture">Texture</option>
            <option value="Custom Image">Custom Image</option>
          </select>

          {cardBgType === "Solid" && (
            <div style={{ marginTop: 10 }}>
              <p>
                <strong>Background Color:</strong>
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <ChromePicker
                  color={cardBackground}
                  onChangeComplete={(c) => setCardBackground(c.hex)}
                />
                <button onClick={resetCardBackground}>Reset BG</button>
              </div>
            </div>
          )}

          {cardBgType === "Gradient" && (
            <div style={{ marginTop: 10 }}>
              <p>
                <strong>Gradient Colors:</strong>
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <ChromePicker
                  color={bgGradientStart}
                  onChangeComplete={(c) => setBgGradientStart(c.hex)}
                />
                <ChromePicker
                  color={bgGradientEnd}
                  onChangeComplete={(c) => setBgGradientEnd(c.hex)}
                />
              </div>
              <p>
                <strong>Gradient Angle:</strong> {bgGradientAngle}°
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={bgGradientAngle}
                  onChange={(e) => setBgGradientAngle(parseInt(e.target.value, 10))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="360"
                  step="1"
                  value={bgGradientAngle}
                  onChange={(e) => setBgGradientAngle(parseInt(e.target.value, 10))}
                  style={{ width: 70 }}
                />
              </div>
            </div>
          )}

          {cardBgType === "Texture" && (
            <div style={{ marginTop: 10 }}>
              <p>
                <strong>Select a Texture:</strong>
              </p>
              <select
                value={bgTexture}
                onChange={(e) => setBgTexture(e.target.value)}
              >
                <option value="texture1">Texture 1</option>
                <option value="texture2">Texture 2</option>
                <option value="texture3">Texture 3</option>
                <option value="texture4">Texture 4</option>
                <option value="texture5">Texture 5</option>
                <option value="texture6">Texture 6</option>
                <option value="texture7">Texture 7</option>
                <option value="texture8">Texture 8</option>
                <option value="texture9">Texture 9</option>
                <option value="texture10">Texture 10</option>
              </select>
              <p>
                <strong>Texture Transfer Mode:</strong>
              </p>
              <select
                value={textureBlendMode}
                onChange={(e) => setTextureBlendMode(e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="multiply">Multiply</option>
                <option value="screen">Screen</option>
                <option value="overlay">Overlay</option>
                <option value="darken">Darken</option>
                <option value="lighten">Lighten</option>
              </select>
              <p>
                <strong>Color Opacity:</strong> {bgTextureOpacity.toFixed(2)}
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bgTextureOpacity}
                  onChange={(e) =>
                    setBgTextureOpacity(parseFloat(e.target.value))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bgTextureOpacity}
                  onChange={(e) =>
                    setBgTextureOpacity(parseFloat(e.target.value))
                  }
                  style={{ width: 70 }}
                />
              </div>
              <p>
                <strong>Texture Background Color:</strong>
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <ChromePicker
                  color={bgTextureColor}
                  onChangeComplete={(c) => setBgTextureColor(c.hex)}
                />
                <button onClick={() => setBgTextureColor("#ffffff")}>
                  Reset Color
                </button>
              </div>
            </div>
          )}

          {cardBgType === "Custom Image" && (
            <div style={{ marginTop: 10 }}>
              <p>
                <strong>Custom Background Image URL:</strong>
              </p>
              <input
                type="text"
                value={bgCustomImageUrl}
                onChange={(e) => setBgCustomImageUrl(e.target.value)}
                style={{ width: "100%" }}
              />
              <div style={{ marginTop: 10 }}>
                <p>
                  <strong>Rotation (deg):</strong> {customBgRotation}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={customBgRotation}
                    onChange={(e) =>
                      setCustomBgRotation(parseInt(e.target.value, 10))
                    }
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="360"
                    step="1"
                    value={customBgRotation}
                    onChange={(e) =>
                      setCustomBgRotation(parseInt(e.target.value, 10))
                    }
                    style={{ width: 70 }}
                  />
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <p>
                  <strong>Zoom:</strong> {customBgZoom.toFixed(2)}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={customBgZoom}
                    onChange={(e) => setCustomBgZoom(parseFloat(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={customBgZoom}
                    onChange={(e) => setCustomBgZoom(parseFloat(e.target.value))}
                    style={{ width: 70 }}
                  />
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <p>
                  <strong>Offset X:</strong> {customBgOffsetX}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    step="1"
                    value={customBgOffsetX}
                    onChange={(e) =>
                      setCustomBgOffsetX(parseInt(e.target.value, 10))
                    }
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    min="-150"
                    max="150"
                    step="1"
                    value={customBgOffsetX}
                    onChange={(e) =>
                      setCustomBgOffsetX(parseInt(e.target.value, 10))
                    }
                    style={{ width: 70 }}
                  />
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <p>
                  <strong>Offset Y:</strong> {customBgOffsetY}
                </p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    step="1"
                    value={customBgOffsetY}
                    onChange={(e) =>
                      setCustomBgOffsetY(parseInt(e.target.value, 10))
                    }
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    min="-150"
                    max="150"
                    step="1"
                    value={customBgOffsetY}
                    onChange={(e) =>
                      setCustomBgOffsetY(parseInt(e.target.value, 10))
                    }
                    style={{ width: 70 }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3) Title/Company Text Color */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Title/Company Text Color:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={titleCompanyColor}
              onChangeComplete={(c) => setTitleCompanyColor(c.hex)}
            />
            <button onClick={() => setTitleCompanyColor("#777777")}>Reset</button>
          </div>
        </div>

        {/* 4) Contact Text Color */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Contact Text Color:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={contactTextColor}
              onChangeComplete={(c) => setContactTextColor(c.hex)}
            />
            <button onClick={() => setContactTextColor("#555555")}>Reset</button>
          </div>
        </div>

        {/* 5) Separator Color */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Separator Color:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={separatorColor}
              onChangeComplete={(c) => setSeparatorColor(c.hex)}
            />
            <button onClick={() => setSeparatorColor("#999999")}>Reset</button>
          </div>
        </div>

        {/* 6) Highlight Toggle and Controls */}
        <div style={{ marginBottom: 20 }}>
          <label>
            <input
              type="checkbox"
              checked={highlightEnabled}
              onChange={() => setHighlightEnabled(!highlightEnabled)}
              style={{ marginRight: 8 }}
            />
            <strong>Enable Highlight</strong>
          </label>
          {highlightEnabled && (
            <div style={{ marginTop: 10 }}>
              <p>
                <strong>Highlight Color:</strong>
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <ChromePicker
                  color={highlightColor}
                  onChangeComplete={(c) => setHighlightColor(c.hex)}
                />
                <button onClick={() => setHighlightColor("#ffff00")}>
                  Reset Color
                </button>
              </div>
              <p>
                <strong>Highlight Opacity:</strong> {highlightOpacity.toFixed(2)}
              </p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={highlightOpacity}
                  onChange={(e) => setHighlightOpacity(parseFloat(e.target.value))}
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={highlightOpacity}
                  onChange={(e) => setHighlightOpacity(parseFloat(e.target.value))}
                  style={{ width: 70 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 7) Corner Radius */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ marginTop: 10 }}>
            <strong>Corner Radius ({cornerRadius}px)</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={cornerRadius}
              onChange={(e) => setCornerRadius(parseInt(e.target.value, 10))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min="0"
              max="40"
              step="1"
              value={cornerRadius}
              onChange={(e) => setCornerRadius(parseInt(e.target.value, 10))}
              style={{ width: 70 }}
            />
            <button onClick={resetCornerRadius}>Reset</button>
          </div>
        </div>

        {/* 8) Ring Start/End, Text Gradient (Start/End) */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Ring Start:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={ringStart}
              onChangeComplete={(c) => setRingStart(c.hex)}
            />
            <button onClick={resetRingStart}>Reset</button>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Ring End:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={ringEnd}
              onChangeComplete={(c) => setRingEnd(c.hex)}
            />
            <button onClick={resetRingEnd}>Reset</button>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Text Gradient (Start):</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={textStart}
              onChangeComplete={(c) => setTextStart(c.hex)}
            />
            <button onClick={resetTextStart}>Reset</button>
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Text Gradient (End):</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={textEnd}
              onChangeComplete={(c) => setTextEnd(c.hex)}
            />
            <button onClick={resetTextEnd}>Reset</button>
          </div>
        </div>

        {/* 9) Social Icons Color (only visible in SVG mode) */}
        {!usePngLogos && (
          <div style={{ marginBottom: 20 }}>
            <p>
              <strong>Social Icons Color:</strong>
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <ChromePicker
                key="social-picker"
                color={socialIconColor}
                onChangeComplete={(c) => setSocialIconColor(c.hex)}
              />
              <button onClick={resetSocialColor}>Reset</button>
            </div>
          </div>
        )}

        {/* 10) Universal Color (except BG) */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Universal Color (except BG):</strong>
          </p>
          <ChromePicker
            color={universalColor}
            onChangeComplete={(c) => setUniversalColor(c.hex)}
          />
          <button
            onClick={applyUniversalColor}
            style={{ marginTop: 10, padding: "8px 12px", cursor: "pointer" }}
          >
            Apply to ring/text/social
          </button>
        </div>

        {/* 11) Name/Title/Company toggles */}
        <div style={{ marginBottom: 20 }}>
          <label>
            <input
              type="checkbox"
              checked={nameEnabled}
              onChange={() => setNameEnabled(!nameEnabled)}
            />
            Name
          </label>
          {nameEnabled && (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={titleEnabled}
              onChange={() => setTitleEnabled(!titleEnabled)}
            />
            Title
          </label>
          {titleEnabled && (
            <input
              type="text"
              value={userTitle}
              onChange={(e) => setUserTitle(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={companyEnabled}
              onChange={() => setCompanyEnabled(!companyEnabled)}
            />
            Company
          </label>
          {companyEnabled && (
            <input
              type="text"
              value={userCompany}
              onChange={(e) => setUserCompany(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          )}
        </div>

        {/* 12) Phone/Email/Website toggles */}
        <div style={{ marginBottom: 20 }}>
          <label>
            <input
              type="checkbox"
              checked={phoneEnabled}
              onChange={() => setPhoneEnabled(!phoneEnabled)}
            />
            Phone
          </label>
          {phoneEnabled && (
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={emailEnabled}
              onChange={() => setEmailEnabled(!emailEnabled)}
            />
            Email
          </label>
          {emailEnabled && (
            <input
              type="text"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={websiteEnabled}
              onChange={() => setWebsiteEnabled(!websiteEnabled)}
            />
            Website
          </label>
          {websiteEnabled && (
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ width: "100%", marginBottom: 10 }}
            />
          )}
        </div>

        {/* 13) Toggle for PNG Logos (always visible) */}
        <div style={{ marginBottom: 20 }}>
          <label>
            <input
              type="checkbox"
              checked={usePngLogos}
              onChange={() => setUsePngLogos(!usePngLogos)}
              style={{ marginRight: 8 }}
            />
            Use Full Color Social Icons (disables social icon color controls)
          </label>
        </div>

        {/* 14) SOCIAL DRAG & DROP */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="socialsList" direction="vertical">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  border: "1px dashed #bbb",
                  padding: 10,
                  marginBottom: 20,
                }}
              >
                <p>
                  <strong>Social Icons (Drag to reorder)</strong>
                </p>
                {socials.map((s, index) => (
                  <Draggable key={s.id} draggableId={s.id} index={index}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        style={{
                          userSelect: "none",
                          marginBottom: 10,
                          padding: 8,
                          background: "#f9f9f9",
                          borderRadius: 4,
                          border: "1px solid #ddd",
                          ...prov.draggableProps.style,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 5,
                          }}
                        >
                          <div
                            {...prov.dragHandleProps}
                            style={{ cursor: "grab", marginRight: 8 }}
                          >
                            <strong>::</strong>
                          </div>
                          <label style={{ display: "flex", alignItems: "center" }}>
                            <input
                              type="checkbox"
                              checked={s.enabled}
                              onChange={() => {
                                setSocials((old) =>
                                  old.map((item) =>
                                    item.id === s.id
                                      ? { ...item, enabled: !item.enabled }
                                      : item
                                  )
                                );
                              }}
                              style={{ marginRight: 5 }}
                            />
                            {s.label}
                          </label>
                        </div>
                        {s.enabled && (
                          <input
                            type="text"
                            style={{ width: "100%" }}
                            value={s.link}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSocials((old) =>
                                old.map((item) =>
                                  item.id === s.id ? { ...item, link: val } : item
                                )
                              );
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* 15) Profile picture + bounding logic */}
        <div style={{ marginBottom: 20 }}>
          <label>
            <strong>Profile Picture URL:</strong>
          </label>
          <br />
          <input
            type="text"
            value={profilePicUrl}
            onChange={(e) => setProfilePicUrl(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>

        {/* 16) Zoom & Offset */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
          >
            <label>
              <strong>Zoom [0.01..3]:</strong> {photoScale.toFixed(2)}
            </label>
            <button style={{ marginLeft: "auto" }} onClick={resetZoom}>
              Reset Zoom
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="range"
              min="0.01"
              max="3"
              step="0.01"
              value={photoScale}
              onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min="0.01"
              max="3"
              step="0.01"
              value={photoScale}
              onChange={(e) => setPhotoScale(parseFloat(e.target.value))}
              style={{ width: 70 }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: 10 }}
          >
            <label>
              <strong>Offset X [-150..150]:</strong> {offsetX}
            </label>
            <button style={{ marginLeft: "auto" }} onClick={resetOffsetX}>
              Reset X
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="range"
              min="-150"
              max="150"
              step="1"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value, 10))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min="-150"
              max="150"
              step="1"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value, 10))}
              style={{ width: 70 }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: 10 }}
          >
            <label>
              <strong>Offset Y [-150..150]:</strong> {offsetY}
            </label>
            <button style={{ marginLeft: "auto" }} onClick={resetOffsetY}>
              Reset Y
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="range"
              min="-150"
              max="150"
              step="1"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value, 10))}
              style={{ flex: 1 }}
            />
            <input
              type="number"
              min="-150"
              max="150"
              step="1"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value, 10))}
              style={{ width: 70 }}
            />
          </div>
        </div>

        {/* 17) Buttons to export HTML or copy preview */}
        <div style={{ display: "flex", gap: 10, marginBottom: 30 }}>
          <button
            onClick={copyHtml}
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Export HTML
          </button>
          <button
            onClick={copyPreviewSelectAll}
            style={{
              padding: "10px 20px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Copy Live Preview
          </button>
        </div>

        {/* 18) PASTE HTML TEXT AREA + BUTTON */}
        <div style={{ marginBottom: 40 }}>
          <h3>Paste Exported HTML</h3>
          <textarea
            style={{ width: "100%", height: 150, marginBottom: 10 }}
            value={pasteHtmlText}
            onChange={(e) => setPasteHtmlText(e.target.value)}
          />
          <button
            onClick={handleApplyPastedHtml}
            style={{
              padding: "8px 16px",
              background: "#e67e22",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Apply Pasted HTML
          </button>
          <p style={{ fontSize: 13, color: "#777" }}>
            (This will parse the pasted HTML and update the controls above.)
          </p>
        </div>
      </div>

      {/* Right column: pinned preview */}
      <div
        style={{
          flex: 1,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          padding: 20,
        }}
      >
        <h3>Live Preview</h3>
        <div dangerouslySetInnerHTML={{ __html: generateSignatureHTML() }} />
      </div>
    </div>
  );
}
