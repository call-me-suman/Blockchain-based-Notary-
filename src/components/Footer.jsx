"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const submissionTimer = setTimeout(() => {
      setIsSubmitting(false);
      console.log("Form submitted", { name, email, message });

      setName("");
      setEmail("");
      setMessage("");
    }, 7000);

    return () => clearTimeout(submissionTimer);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <h2>Get in touch</h2>
          <p>
            Have a specific inquiry? Send us a message. Don&apos;t hesitate, get
            in contact.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? styles.error : ""}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? styles.error : ""}
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={errors.message ? styles.error : ""}
              />
              {errors.message && (
                <p className={styles.errorText}>{errors.message}</p>
              )}
            </div>

            <button type="submit">
              {isSubmitting ? "Please wait..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
