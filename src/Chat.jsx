import React, { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    const loadTawkToScript = () => {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/6637337107f59932ab3c2923/1ht3q1t0a";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    };

    loadTawkToScript();
  }, []);

  return null;
};

export default Chat;
