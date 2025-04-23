import { useState, useEffect } from "react";

export default function Hero() {
  const phrases = [
    { text: "Create.", color: " #2fd1ba" },
    { text: "Collaborate.", color: " #ffffff" },
    { text: "Grow.", color: " #3357FF"}
  ];
  const [text, setText] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [fontSize, setFontSize] = useState("4rem"); // Default to desktop size

  useEffect(() => {
    // Dynamically adjust font size based on screen width
    const updateFontSize = () => {
      if (window.innerWidth > 768) {
        setFontSize("4rem"); // Desktop font size
      } else {
        setFontSize("1.8rem"); // Mobile font size
      }
    };

    // Call the function once on mount and attach event listener
    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopIndex];
      if (isDeleting) {
        setText(currentPhrase.text.substring(0, text.length - 1));
        setTypingSpeed(100);
      } else {
        setText(currentPhrase.text.substring(0, text.length + 1));
        setTypingSpeed(150);
        setColor(currentPhrase.color);
      }

      if (!isDeleting && text === currentPhrase.text) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, phrases, loopIndex]);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "5px",
        padding: "0 20px",
        width: "100%",
        boxSizing: "border-box",
        height: "150px", // Stable height
      }}
    >
      <h1
        style={{
          fontSize: fontSize, // Dynamically set font size
          lineHeight: "1.2",
          color: "#FFFFFF",
          whiteSpace: "nowrap",
        }}
      >
        Space To{" "}
        <span style={{ color }}>{text}</span>
        <span
          style={{
            borderRight: "2px solid",
            marginLeft: "5px",
            animation: "blink 1s infinite", // Typing cursor animation
          }}
        ></span>
      </h1>
    </section>
  );
}
