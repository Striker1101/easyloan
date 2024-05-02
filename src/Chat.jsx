import React, { useEffect } from "react";

export default function Chat() {
  useEffect(() => {
    // Function to inject Tawk.to script dynamically
    const injectTawkToScript = () => {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/66334430a0c6737bd13396bf/1hss44ns1";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    };

    // Call the function to inject the script
    injectTawkToScript();
  }, []); // Empty dependency array ensures the effect runs only once after component mount

  return <div>{/* Your chat component content */}</div>;
}
