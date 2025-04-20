import React, { useState } from "react";
import styles from "./FAQ.module.css";

const faqData = [
  {
    id: 1,
    question: "How do I book a consultation?",
    answer: "Simply sign in, choose a doctor, and book a time that suits you.",
  },
  {
    id: 2,
    question: "Are the doctors certified?",
    answer: "Yes, all doctors on our platform are verified and certified.",
  },
  {
    id: 3,
    question: "Is my information secure?",
    answer: "Absolutely. We use top-grade encryption to protect your data.",
  },
  {
    id: 4,
    question: "Can I consult anytime?",
    answer: "Yes, our services are available 24/7 for your convenience.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px 0', marginTop: '-50px', position: 'relative', zIndex: '1' }}>
      <div id="FAQ" className={`faq-container ${styles.faqContainer}`}>
      <div className={`faq-label ${styles.faqLabel}`}>FAQ</div>
      {faqData.map((item, index) => (
        <div
          key={item.id}
          className={`faq-item ${activeIndex === index ? "active" : ""} ${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
        >
          <div className={`faq-question ${styles.faqQuestion}`} onClick={() => handleToggle(index)}>
            <div className={`faq-number ${styles.faqNumber}`}>{item.id.toString().padStart(2, "0")}</div>
            <div className={`faq-text ${styles.faqText}`}>{item.question}</div>
            <div className={`faq-toggle ${styles.faqToggle}`}>{activeIndex === index ? "−" : "+"}</div>
          </div>
          {activeIndex === index && (
            <div className={`faq-answer ${styles.faqAnswer}`}>{item.answer}</div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default FAQ;