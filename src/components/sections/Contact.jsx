import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { resumeData } from "../../data/resume";
import {
  FaGithub,
  FaLinkedin,
  FaDownload,
  FaCopy,
  FaCheck,
  FaPaperPlane,
} from "react-icons/fa";

const contactLinks = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/kush-prog",
    url: resumeData.links.github,
    icon: <FaGithub size={22} />,
    color: "#f0f0f0",
    bgColor: "rgba(240, 240, 240, 0.05)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/kush-chauhan",
    url: resumeData.links.linkedin,
    icon: <FaLinkedin size={22} />,
    color: "#0A66C2",
    bgColor: "rgba(10, 102, 194, 0.05)",
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <FaCheck size={12} className="text-green-400" />
      ) : (
        <FaCopy
          size={12}
          className="text-star-silver/40 hover:text-star-white"
        />
      )}
    </button>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
      <div>
        <label className="text-xs font-mono text-star-silver/50 uppercase tracking-wider mb-1.5 block">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-star-white text-sm placeholder:text-star-silver/30 focus:outline-none focus:border-nebula-purple/60 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-mono text-star-silver/50 uppercase tracking-wider mb-1.5 block">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-star-white text-sm placeholder:text-star-silver/30 focus:outline-none focus:border-nebula-purple/60 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-mono text-star-silver/50 uppercase tracking-wider mb-1.5 block">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-star-white text-sm placeholder:text-star-silver/30 focus:outline-none focus:border-nebula-purple/60 transition-colors resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
        whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-nebula-purple to-nebula-blue rounded-xl font-semibold text-white shadow-lg shadow-nebula-purple/25 transition-all disabled:opacity-60"
      >
        {status === "sending" ? (
          "Sending..."
        ) : status === "success" ? (
          <>
            <FaCheck /> Message Sent
          </>
        ) : (
          <>
            <FaPaperPlane /> Send Message
          </>
        )}
      </motion.button>

      {status === "error" && (
        <p className="text-xs text-red-400 text-center">
          Something went wrong — please try again or email directly.
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mt-3 text-star-white">
            Let's Build Something <span className="text-gradient">Cosmic</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-nebula-cyan to-nebula-purple rounded-full mx-auto mt-4" />
          <p className="text-star-silver/60 mt-4 max-w-lg mx-auto">
            Open to opportunities, collaborations, and conversations about AI,
            backend systems, and the future of tech.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Links + Resume */}
          <div>
            <div className="grid gap-3 mb-6">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target={link.id !== "email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: link.bgColor, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-star-white text-sm">
                      {link.label}
                    </h4>
                    <p className="text-xs text-star-silver/50 font-mono">
                      {link.value}
                    </p>
                  </div>
                  <CopyButton text={link.value} />
                  <motion.span
                    className="text-star-silver/30 group-hover:text-star-white transition-colors"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              ))}
            </div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href={resumeData.links.resume}
                download
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 40px rgba(124, 58, 237, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-nebula-purple to-nebula-blue rounded-xl font-semibold text-white shadow-lg shadow-nebula-purple/25 transition-all"
              >
                <FaDownload />
                Download Full Resume
              </motion.a>
              <p className="text-xs text-star-silver/30 mt-3 font-mono text-center">
                PDF • Updated 2026
              </p>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Fun Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 p-6 glass rounded-2xl border border-nebula-purple/10 max-w-2xl mx-auto"
        >
          <p className="text-star-silver/50 text-sm">
            <span className="text-nebula-purple font-mono">{">"}</span> "The
            best code is the code that solves real problems."
          </p>
          <p className="text-star-silver/30 text-xs mt-2 font-mono">
            — crafted with ☕ and curiosity by Kush Chauhan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
