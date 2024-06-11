import React, { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    const loadTawkToScript = () => {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/666899499a809f19fb3c8488/1i049di1m";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    };

    loadTawkToScript();
  }, []);

  return null;
};

export default Chat;
