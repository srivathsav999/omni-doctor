import React from "react";
import styles from "./Works.module.css";

const steps = [
  { number: 1, title: "Book Your Appointment" },
  { number: 2, title: "Consultation & Examination" },
  { number: 3, title: "Personalized Treatment Plan" },
  { number: 4, title: "Ongoing Care & Follow Up" },
];

const Works = () => {
  return (
    <div className={`how-it-works ${styles.howItWorks}`}>
      <h3>How it Works</h3>
      <h2>
        The Path to <span>Your Perfect Life</span>
      </h2>
      <div className={`steps-container ${styles.stepsContainer}`}>
        {steps.map((step, index) => (
          <div className={`step ${styles.step}`} key={index}>
            <div className={`circle ${styles.circle}`}>{step.number}</div>
            <p>{step.title}</p>
            {index < steps.length - 1 && <div className={`line ${styles.line}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;