import React, { useState, useEffect, useCallback } from "react";
import { ChromePicker } from "react-color";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/**********************************************************/
/** Inline SVG icon helpers: Instagram, X, Pinterest, etc.**/
/**********************************************************/
function getInstagramSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 512 512"
     fill="${color}" 
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
<path d="M349.33 69.33H162.67C105.07
 69.33 64 110.4 64 168v186.67c0
 57.6 41.07 98.67 98.67
 98.67h186.67c57.6 0
 98.67-41.07 98.67-98.67V168c0
 -57.6-41.07-98.67-98.67
 -98.67Zm-18.13 32h.13c14.72
 0 16.53.07 22.3.32 5.42.24
 8.38 1.12 10.33 1.85 2.6
 1 4.45 2.2 6.39 4.14s3.17
 3.79 4.14 6.39c.73 1.95
 1.61 3.91 1.85 10.33.25
 5.77.31 7.58.32 22.3v84.85c0
 50.1-40.7 90.8-90.8
 90.8h-84.86c-50.1 0
 -90.8-40.7-90.8-90.8v
 -84.85c0-50.1 40.7
 -90.8 90.8-90.8h84.85ZM256
 149.33c-58.88 0-106.67
 47.79-106.67 106.67S197.12
 362.67 256 362.67 362.67
 314.88 362.67 256 314.88
 149.33 256 149.33Zm0
 32c41.42 0 74.67 33.25
 74.67 74.67s-33.25 74.67
 -74.67 74.67S181.33
 297.42 181.33 256
 214.58 181.33 256
 181.33Zm90.35-37.19
 c-10.25 0-18.53 8.3
 -18.53 18.53s8.28 18.52
 18.53 18.52 18.52-8.28
 18.52-18.52-8.28
 -18.53-18.52-18.53Z"/>
</svg>
`;
}

function getXSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 32 32"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
<path d="M28.31 2.18
 17.54 14 28.11 29.79A.5.5
 0 0 1 27.68 30H23a1 1
 0 0 1-.82-.43L13.42 17.83l
 -5.94 6.62a1 1 0 0 1
 -.75.34H2.88a.5.5 0 0 1
 -.37-.83l8.71-9.62L2.43
 2.29A.5.5 0 0 1
 2.82 2H7.5a1 1 0 0 1
 .78.37l5.87 7.07L23.54
 2.32A1 1 0 0 1 24.36
 2h3.31a.5.5 0 0
 1 .37.83Z"/>
</svg>
`;
}

function getPinterestSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 512 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
<path d="M268.3 8C123.5 8 48.3 111.9
 48.3 202c0 50.1 18.8 94.5 59.2
 111 6.6 2.7 12.4.1 14.3-7.1
 1.3-4.9 4.4-17.2 5.8-22.4
 1.9-7.1 1.2-9.6-4.1
 -15.8-11.6-13.7-19
 -31.6-19-56.9 0-73.4
 55.3-139.7 144.2-139.7
 78.4 0 136.6 49.5
 136.6 120.1 0 84
 -37.3 154.7-92.4
 154.7-30.5 0-53.3
 -21.5-46-60.2 8.5
 -44.4 24.9-92.3
 24.9-124.3 0-28.7
 -15.3-52.7-47-52.7
 -37.2 0-67.1 38.4
 -67.1 89.9 0 24.5
 8.7 41.2 8.7 41.2s
 -28.7 120.3-33.8
 141.3c-10.1 42.4
 -1.5 94-.8
 99.2.4 2.8 3.8
 3.5 5.3 1.4 2.3
 -3.1 31.8-47.1
 41.8-90.8 2.8
 -12.7 14.5
 -79.9 14.5-79.9
 7.7 14.7 30.3
 27.7 54.4
 27.7 71.6 0
 120.4-65.1
 120.4-151.9 0
 -79.5-69.1-154.4
 -172.7-154.4z"/>
</svg>
`;
}

function getFacebookSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 320 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
<path d="M279.14 288l14.22
-92.66h-88.91V141.2c0-25.35
12.42-50.06 52.24-50.06h40.42V6.26S283.43
0 248.29 0c-73.22 0
-121.11 44.38-121.11
124.72v70.62H40v92.66h87.18V512h107.1V288z"/>
</svg>
`;
}

function getLinkedInSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 448 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
<path d="M100.28 448H7.4V148.9h92.88zm-46.44
-340a53.55 53.55 0 1 1 53.52-53.55
53.54 53.54 0 0 1-53.51
53.55zM447.9 448h
-92.68V302.4c0-34.7-.7
-79.31-48.28-79.31
-48.3 0-55.7 37.7
-55.7 76.6V448h-92.64V148.9h88.94v40.8h1.28a97.64
97.64 0 0 1 87.9-48.25
c94 0 111.3 61.9
111.3 142.3V448z"/>
</svg>
`;
}

function getTiktokSVG(color = "#000") {
  return `
<svg width="20" height="20" viewBox="0 0 512 512"
     fill="${color}"
     style="vertical-align: middle; transform: translateY(1px);"
     xmlns="http://www.w3.org/2000/svg">
<path d="M314.59 0H369c1.71
10.69 4.39 21.21 8.16
31.37 14.56 39.49 45.44
60.83 84.86 63.48v56.77c
-22.72 1.65-44.12-2.6
-64.28-13.23-19.28
-10.11-34.79-24.9
-46.28-43.95v139.35c0
63.27-47.11 129.21
-122.08 128.14
-44.64-.65-82.13-24.55
-105.72-61.35-27.92
-44.32-26.69-106.82
2.82-150.34 20.63
-32.43 51.42-54.53
92.31-62.42v60.79c
-13.68 3.06-25.37
10.4-34.73 20.45
-22.01 24-16.86
62.62 11.46 78.21
22.53 12.05 52.76
4.1 66.01-15.55
5.09-7.8 7.52
-17.28 7.52-28.03
v-235.8z"/>
</svg>
`;
}

/** reorder array by removing from startIndex, inserting at endIndex */
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/** remove protocol/www from a URL */
function getDisplayUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function App() {
  // All states for ring, text, social color, background, corners, etc.
  const [ringStart, setRingStart] = useState("#6E3CF3");
  const [ringEnd, setRingEnd] = useState("#3CB1F3");
  const [textStart, setTextStart] = useState("#6E3CF3");
  const [textEnd, setTextEnd] = useState("#3CB1F3");
  const [socialIconColor, setSocialIconColor] = useState("#6E3CF3");
  const [cardBackground, setCardBackground] = useState("#fff");
  const [cornerRadius, setCornerRadius] = useState(15);

  // name/title/company toggles
  const [nameEnabled, setNameEnabled] = useState(true);
  const [userName, setUserName] = useState("Your Name");
  const [titleEnabled, setTitleEnabled] = useState(true);
  const [userTitle, setUserTitle] = useState("Title");
  const [companyEnabled, setCompanyEnabled] = useState(true);
  const [userCompany, setUserCompany] = useState("Your Company");

  // phone/email/website toggles
  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("555-555-5555");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [emailAddress, setEmailAddress] = useState("you@yourcompany.com");
  const [websiteEnabled, setWebsiteEnabled] = useState(true);
  const [website, setWebsite] = useState("https://yourcompany.com");

  // Social icons in an array for drag & drop
  const [socials, setSocials] = useState([
    {
      id: "instagram",
      label: "Instagram",
      link: "https://instagram.com/yourprofile",
      enabled: true,
      getSVG: getInstagramSVG,
    },
    {
      id: "x",
      label: "X",
      link: "https://x.com/yourprofile",
      enabled: true,
      getSVG: getXSVG,
    },
    {
      id: "pinterest",
      label: "Pinterest",
      link: "https://pinterest.com/yourprofile",
      enabled: false,
      getSVG: getPinterestSVG,
    },
    {
      id: "facebook",
      label: "Facebook",
      link: "https://facebook.com/yourprofile",
      enabled: true,
      getSVG: getFacebookSVG,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      link: "https://linkedin.com/in/yourprofile",
      enabled: true,
      getSVG: getLinkedInSVG,
    },
    {
      id: "tiktok",
      label: "TikTok",
      link: "https://www.tiktok.com/@yourprofile",
      enabled: false,
      getSVG: getTiktokSVG,
    },
  ]);

  // profile pic bounding states
  const [profilePicUrl, setProfilePicUrl] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
  );
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const circleDiameter = 120;
  const [photoScale, setPhotoScale] = useState(1.0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // shadow toggles
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [shadowAngle, setShadowAngle] = useState(45);
  const [shadowDistance, setShadowDistance] = useState(4);
  const [shadowBlur, setShadowBlur] = useState(8);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  // universal color
  const [universalColor, setUniversalColor] = useState("#cccccc");

  // measure the image => dynamic fill scale
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

  // clamp offsets so picture doesn't escape the circle
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

  // generate final signature
  function generateSignatureHTML() {
    // contact line
    const contactItems = [];
    if (phoneEnabled && phoneNumber.trim()) {
      contactItems.push(
        `<a href="tel:${phoneNumber}" style="color:#0066cc; text-decoration:none;">${phoneNumber}</a>`
      );
    }
    if (emailEnabled && emailAddress.trim()) {
      contactItems.push(
        `<a href="mailto:${emailAddress}" style="color:#0066cc; text-decoration:none;">${emailAddress}</a>`
      );
    }
    if (websiteEnabled && website.trim()) {
      const displaySite = getDisplayUrl(website);
      contactItems.push(
        `<a href="${website}" style="color:#0066cc; text-decoration:none;">${displaySite}</a>`
      );
    }
    const contactLine = contactItems.join(" | ");

    // gather social icons in the order from drag & drop
    const iconSpans = socials.reduce((arr, s) => {
      if (s.enabled) {
        arr.push(`
<span style="display:inline-block;">
  <a href="${s.link}" style="text-decoration:none;">
    ${s.getSVG(socialIconColor)}
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

    // name
    let nameHTML = "";
    if (nameEnabled) {
      nameHTML = `
<div style="font-size:22px; font-weight:bold; margin-bottom:5px;
 background: linear-gradient(45deg, ${textStart}, ${textEnd});
 -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
  ${userName}
</div>`;
    }
    // title + company
    let titleCompanyHTML = "";
    if (titleEnabled || companyEnabled) {
      const a = [];
      if (titleEnabled) a.push(userTitle);
      if (companyEnabled) a.push(userCompany);
      const joined = a.join(", ");
      if (joined.trim()) {
        titleCompanyHTML = `
<div style="font-size:15px; color:#777;">
  ${joined}
</div>
<div style="height:5px;"></div>
`;
      }
    }

    // shadow
    function getBoxShadow() {
      if (!shadowEnabled) return "none";
      const rad = (shadowAngle * Math.PI) / 180;
      const offsetXVal = Math.round(shadowDistance * Math.cos(rad));
      const offsetYVal = Math.round(shadowDistance * Math.sin(rad));
      return `${offsetXVal}px ${offsetYVal}px ${shadowBlur}px 0 rgba(0,0,0,${shadowOpacity})`;
    }
    const shadow = getBoxShadow();

    // transform for the pic
    const transformStyle = `
transform: translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) 
           scale(${photoScale});
transform-origin: center;`;

    return `
<table border="0" cellpadding="0" cellspacing="0"
  style="max-width:410px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
         background:${cardBackground}; border:1px solid #ddd; border-radius:${cornerRadius}px;
         border-collapse:separate; border-spacing:0; box-shadow:${shadow};">
  <tr>
    <td style="padding:20px; vertical-align:middle;">
      <div style="width:128px; height:128px;
                  background: linear-gradient(to bottom left, ${ringStart}, ${ringEnd});
                  border-radius:50%; padding:4px; box-sizing:border-box;">
        <div style="width:100%; height:100%; border-radius:50%; overflow:hidden; position:relative;">
          <img src="${profilePicUrl}" alt="${userName}"
               style="position:absolute; top:50%; left:50%;
                      width:auto; height:auto; max-width:none; max-height:none;
                      object-fit:cover; 
                      ${transformStyle}"
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
          ? `<div style="font-size:14px; color:#555; margin-bottom:10px;">
               ${contactLine}
             </div>`
          : ""
      }
      ${socialIconsHTML}
    </td>
  </tr>
</table>
`.trim();
  }

  // handle drag end for the social array
  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return; // dropped outside
    if (source.index === destination.index) return; // same place
    const reordered = reorder(socials, source.index, destination.index);
    setSocials(reordered);
  }

  /** Copy final HTML */
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

  /** Copy live preview as if user selected all of it manually */
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

  /** Universal color (except BG) */
  function applyUniversalColor() {
    setRingStart(universalColor);
    setRingEnd(universalColor);
    setTextStart(universalColor);
    setTextEnd(universalColor);
    setSocialIconColor(universalColor);
  }

  // resets
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
              {/* Shadow Angle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
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

              {/* Distance */}
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
                  onChange={(e) =>
                    setShadowDistance(parseInt(e.target.value, 10))
                  }
                  style={{ flex: 1 }}
                />
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={shadowDistance}
                  onChange={(e) =>
                    setShadowDistance(parseInt(e.target.value, 10))
                  }
                  style={{ width: 70 }}
                />
              </div>

              {/* Blur */}
              <div
                style={{ marginTop: 10, display: "flex", alignItems: "center" }}
              >
                <label style={{ marginRight: 10 }}>
                  Blur (px): {shadowBlur}
                </label>
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

              {/* Opacity */}
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

        {/* 2) Card BG + corner radius */}
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Card Background:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={cardBackground}
              onChangeComplete={(c) => setCardBackground(c.hex)}
            />
            <button onClick={resetCardBackground}>Reset BG</button>
          </div>
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

        {/* 3) Ring Start/End, Text Start/End, Social Color */}
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
        <div style={{ marginBottom: 20 }}>
          <p>
            <strong>Social Icons Color:</strong>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChromePicker
              color={socialIconColor}
              onChangeComplete={(c) => setSocialIconColor(c.hex)}
            />
            <button onClick={resetSocialColor}>Reset</button>
          </div>
        </div>

        {/* 4) Universal color (not BG) */}
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

        {/* 5) Name/Title/Company toggles */}
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

        {/* 6) phone/email/website toggles */}
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

        {/* 7) SOCIAL DRAG & DROP */}
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
                        {...prov.dragHandleProps}
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
                        <label style={{ display: "block", marginBottom: 5 }}>
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
                        {s.enabled && (
                          <input
                            type="text"
                            style={{ width: "100%" }}
                            value={s.link}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSocials((old) =>
                                old.map((item) =>
                                  item.id === s.id
                                    ? { ...item, link: val }
                                    : item
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

        {/* 8) Profile picture + bounding logic */}
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

        {/* Zoom & offset */}
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

          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
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

          <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
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

        {/* 9) Buttons to export HTML or copy preview */}
        <div style={{ display: "flex", gap: 10 }}>
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
