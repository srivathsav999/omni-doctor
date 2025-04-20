import React, { useState, useEffect } from 'react';
import { FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPhoneSlash, FaComment, FaUserMd, FaUser } from 'react-icons/fa';
import styles from './VideoConsultation.module.css';

const VideoConsultation = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'doctor', text: 'Hello! How can I help you today?', time: '10:01 AM' },
    { sender: 'user', text: 'Hi doctor, I\'ve been having headaches for the past week.', time: '10:02 AM' },
    { sender: 'doctor', text: 'I\'m sorry to hear that. Could you describe the pain? Is it constant or does it come and go?', time: '10:03 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Simulated doctor information
  useEffect(() => {
    // In a real app, this would come from an API or route params
    setDoctorInfo({
      id: 1,
      name: "Dr. Sarah Chen",
      specialization: "Family Medicine",
      image: "/images/lady.jpg"
    });

    // Start timer for call duration
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const message = {
      sender: 'user',
      text: newMessage,
      time: timeString
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate doctor response after a short delay
    setTimeout(() => {
      const doctorResponse = {
        sender: 'doctor',
        text: 'Thank you for sharing that information. Let me ask you a few more questions to better understand your condition.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    // In a real app, this would end the call and redirect
    window.history.back();
  };

  return (
    <div className={styles.videoConsultationContainer}>
      <div className={styles.videoMain}>
        <div className={styles.videoHeader}>
          <div className={styles.callInfo}>
            <div className={styles.doctorInfo}>
              {doctorInfo && (
                <>
                  <img src={doctorInfo.image} alt={doctorInfo.name} className={styles.doctorThumbnail} />
                  <div>
                    <h3>{doctorInfo.name}</h3>
                    <p>{doctorInfo.specialization}</p>
                  </div>
                </>
              )}
            </div>
            <div className={styles.callDuration}>
              <span className={styles.durationIndicator}>●</span>
              <span>{formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>

        <div className={styles.videoStreams}>
          <div className={styles.mainVideoStream}>
            {isVideoOn ? (
              <div className={styles.doctorVideo}>
                <FaUserMd className={styles.placeholderIcon} />
                <p>Doctor's Video</p>
              </div>
            ) : (
              <div className={styles.videoOff}>
                <FaUserMd className={styles.placeholderIcon} />
                <p>Doctor's Camera is Off</p>
              </div>
            )}
          </div>
          <div className={styles.userVideoStream}>
            {isVideoOn ? (
              <div className={styles.userVideo}>
                <FaUser className={styles.placeholderIcon} />
                <p>Your Video</p>
              </div>
            ) : (
              <div className={styles.videoOff}>
                <FaUser className={styles.placeholderIcon} />
                <p>Your Camera is Off</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.videoControls}>
          <button 
            className={`${styles.controlButton} ${isAudioOn ? styles.active : styles.inactive}`} 
            onClick={toggleAudio}
          >
            {isAudioOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>
          <button 
            className={`${styles.controlButton} ${isVideoOn ? styles.active : styles.inactive}`} 
            onClick={toggleVideo}
          >
            {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button className={`${styles.controlButton} ${styles.endCall}`} onClick={endCall}>
            <FaPhoneSlash />
          </button>
          <button 
            className={`${styles.controlButton} ${isChatOpen ? styles.active : ''}`} 
            onClick={toggleChat}
          >
            <FaComment />
          </button>
        </div>
      </div>

      {isChatOpen && (
        <div className={styles.chatPanel}>
          <div className={styles.chatHeader}>
            <h3>Chat</h3>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.sender]}`}>
                <div className={styles.messageContent}>
                  <p>{message.text}</p>
                  <span className={styles.messageTime}>{message.time}</span>
                </div>
              </div>
            ))}
          </div>
          <form className={styles.chatInput} onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}

      <div className={styles.consultationInfo}>
        <div className={styles.infoSection}>
          <h3>Consultation Notes</h3>
          <div className={styles.notesArea}>
            <p><strong>Patient Complaint:</strong> Headaches for the past week</p>
            <p><strong>Symptoms:</strong> Throbbing pain, sensitivity to light</p>
            <p><strong>Recommendations:</strong> Pending doctor's assessment</p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <h3>Upcoming Steps</h3>
          <ul className={styles.stepsList}>
            <li>Complete video consultation</li>
            <li>Receive doctor's assessment</li>
            <li>Get prescription (if needed)</li>
            <li>Schedule follow-up (if required)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;
