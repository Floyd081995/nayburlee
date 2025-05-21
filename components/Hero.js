import { useState, useEffect } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const phrases = [
      { text: "Create.", color: " #2fd1ba" },
      { text: "Collaborate.", color: " #ffffff" },
      { text: "Grow.", color: " #3357FF"}
    ];

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
  }, [text, isDeleting, typingSpeed, loopIndex]);

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "0px",
        padding: "0 10px",
        width: "100%",
        boxSizing: "border-box",
        height: "150px",
      }}
    >
      <h1 className="hero-title">
        Space To{" "}
        <span style={{ color }}>{text}</span>
        <span></span>
      </h1>
    </section>
  );
}
