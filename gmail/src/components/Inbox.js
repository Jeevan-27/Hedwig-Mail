// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './MainContent.css'
// import './Inbox.css'

// const Inbox = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const response = await axios.get('http://localhost:1973/api/inbox', {
//           params: { email: user.email },
//         });
//         setEmails(response.data);
//       } catch (error) {
//         console.error('Error fetching inbox:', error);
//       }
//     };

//     fetchInbox();
//   }, []);

//   const handleEmailClick = (email) => {
//     setSelectedEmail(email);
//   };

//   const handleClose = () => {
//     setSelectedEmail(null); // Close the tray
//   };

//   const toggleStarred = async (emailId, isStarred) => {
//     try {
//       await axios.put(`http://localhost:1973/api/inbox/${emailId}/star`, { starred: !isStarred });
//       // Update the UI after successfully starring/un-starring
//       setEmails((prevEmails) =>
//         prevEmails.map((email) =>
//           email._id === emailId ? { ...email, starred: !isStarred } : email
//         )
//       );
//       if (selectedEmail && selectedEmail._id === emailId) {
//         setSelectedEmail((prevSelectedEmail) => ({
//           ...prevSelectedEmail,
//           starred: !isStarred,
//         }));
//       }
//     } catch (error) {
//       console.error('Error updating starred status:', error);
//     }
//   };

//   const handleDelete = async (emailId) => {
//     try {
//       await axios.put(`http://localhost:1973/api/inbox/${emailId}/delete`, { bin: true });
//       // Remove the deleted email from the UI
//       setEmails((prevEmails) => prevEmails.filter(email => email._id !== emailId));
//       if (selectedEmail && selectedEmail._id === emailId) {
//         setSelectedEmail(null); // Close the tray if the deleted email was open
//       }
//     } catch (error) {
//       console.error('Error deleting email:', error);
//     }
//   };

//   return (
//     <div className="main-content-container">
//       <div className="inbox-list">
//         <h2>Inbox</h2>
//         <ul>
//           {emails.map((email) => (
//             <li key={email._id} onClick={() => handleEmailClick(email)} className="email-item">
//               <span className="email-subject">{email.subject}</span> -{' '}
//               <span className="email-from">{email.from}</span>
//               {/* Star Button */}
//               <button
//                 className={`star-btn ${email.starred ? 'starred' : ''}`}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent selecting the email when starring
//                   toggleStarred(email._id, email.starred);
//                 }}
//               >
//                 {email.starred ? '★' : '☆'}
//               </button>
//               {/* Delete Button */}
//               <button
//                 className="delete-btn"
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent selecting the email when deleting
//                   handleDelete(email._id);
//                 }}
//               >
//                 🗑️
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Tray for showing the email details */}
//       {selectedEmail && (
//         <div className="email-tray">
//           <div className="email-tray-content">
//             <button className="close-btn" onClick={handleClose}>✖</button>
//             <h2>{selectedEmail.subject}</h2>
//             <p><strong>From:</strong> {selectedEmail.from}</p>
//             <p><strong>To:</strong> {selectedEmail.to}</p>
//             <p><strong>Date:</strong> {new Date(selectedEmail.date).toLocaleString()}</p>
//             <p><strong>Body:</strong> {selectedEmail.body}</p>
//             <p><strong>Attachments:</strong>{selectedEmail.attachments ? selectedEmail.attachments : ''}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inbox;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Inbox.css';

// const Inbox = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [isForwarding, setIsForwarding] = useState(false);

//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         const response = await axios.get('http://localhost:1973/api/inbox', {
//           params: { email: user.email },
//         });
//         setEmails(response.data);
//       } catch (error) {
//         console.error('Error fetching inbox:', error);
//       }
//     };

//     fetchInbox();
//   }, []);

//   const handleEmailClick = (email) => {
//     setSelectedEmail(email);
//   };

//   const handleClose = () => {
//     setSelectedEmail(null); // Close the tray
//     setIsForwarding(false); // Reset forwarding state
//     setRecipientEmail(''); // Clear recipient email
//   };

//   const toggleStarred = async (emailId, isStarred) => {
//     try {
//       await axios.put(`http://localhost:1973/api/inbox/${emailId}/star`, { starred: !isStarred });
//       // Update the UI after successfully starring/un-starring
//       setEmails((prevEmails) =>
//         prevEmails.map((email) =>
//           email._id === emailId ? { ...email, starred: !isStarred } : email
//         )
//       );
//       if (selectedEmail && selectedEmail._id === emailId) {
//         setSelectedEmail((prevSelectedEmail) => ({
//           ...prevSelectedEmail,
//           starred: !isStarred,
//         }));
//       }
//     } catch (error) {
//       console.error('Error updating starred status:', error);
//     }
//   };

//   const handleDelete = async (emailId) => {
//     try {
//       await axios.put(`http://localhost:1973/api/inbox/${emailId}/delete`, { bin: true });
//       // Remove the deleted email from the UI
//       setEmails((prevEmails) => prevEmails.filter(email => email._id !== emailId));
//       if (selectedEmail && selectedEmail._id === emailId) {
//         setSelectedEmail(null); // Close the tray if the deleted email was open
//       }
//     } catch (error) {
//       console.error('Error deleting email:', error);
//     }
//   };

//   const handleForward = () => {
//     setIsForwarding(true);
//   };

//   const handleSendForward = async () => {
//     if (!recipientEmail) {
//       alert("Please enter a recipient email.");
//       return;
//     }

//     const user = JSON.parse(localStorage.getItem('user'));
//     const forwardedEmail = {
//       from: user.email,
//       to: recipientEmail,
//       subject: `${selectedEmail.subject} (Forwarded mail)`,
//       body: selectedEmail.body,
//       attachments: selectedEmail.attachments,
//       date: new Date(),
//     };

//     try {
//       await axios.post('http://localhost:1973/api/inbox', forwardedEmail);
//       alert("Email forwarded successfully!");
//       handleClose(); // Close the tray after forwarding
//     } catch (error) {
//       console.error('Error forwarding email:', error);
//       alert("Error forwarding email. Please try again.");
//     }
//   };

//   return (
//     <div className="main-content-container">
//       <div className="inbox-list">
//         <h2>Inbox</h2>
//         <ul>
//           {emails.map((email) => (
//             <li key={email._id} onClick={() => handleEmailClick(email)} className="email-item">
//               <span className="email-subject">{email.subject}</span> -{' '}
//               <span className="email-from">{email.from}</span>
//               {/* Star Button */}
//               <button
//                 className={`star-btn ${email.starred ? 'starred' : ''}`}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent selecting the email when starring
//                   toggleStarred(email._id, email.starred);
//                 }}
//               >
//                 {email.starred ? '★' : '☆'}
//               </button>
//               {/* Delete Button */}
//               <button
//                 className="delete-btn"
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent selecting the email when deleting
//                   handleDelete(email._id);
//                 }}
//               >
//                 🗑️
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Tray for showing the email details */}
//       {selectedEmail && (
//         <div className="email-tray">
//           <div className="email-tray-content">
//             <button className="close-btn" onClick={handleClose}>✖</button>
//             <h2>{selectedEmail.subject}</h2>
//             <p><strong>From:</strong> {selectedEmail.from}</p>
//             <p><strong>To:</strong> {selectedEmail.to}</p>
//             <p><strong>Date:</strong> {new Date(selectedEmail.date).toLocaleString()}</p>
//             <p><strong>Content:</strong> {selectedEmail.body}</p>
//             {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
//               <p><strong>Attachments:</strong> {selectedEmail.attachments.join(', ')}</p>
//             )}

//             {/* Forward Button */}
//             <button onClick={handleForward}>Forward</button>

//             {/* Forwarding Input */}
//             {isForwarding && (
//               <div className="forward-input">
//                 <input
//                   type="email"
//                   placeholder="Recipient email"
//                   value={recipientEmail}
//                   onChange={(e) => setRecipientEmail(e.target.value)}
//                 />
//                 <button onClick={handleSendForward}>Send</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inbox;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Inbox.css';

// const Inbox = () => {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [isForwarding, setIsForwarding] = useState(false);
//   const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user?.email) {
//       setLoggedInUserEmail(user.email);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchInbox = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user?.email) {
//           const response = await axios.get('http://localhost:1973/api/inbox', {
//             params: { email: user.email },
//           });
//           setEmails(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching inbox:', error);
//       }
//     };

//     if (loggedInUserEmail) {
//       fetchInbox();
//     }
//   }, [loggedInUserEmail]);

//   const handleEmailClick = (email) => {
//     setSelectedEmail(email);
//   };

//   const handleClose = () => {
//     setSelectedEmail(null);
//     setIsForwarding(false);
//     setRecipientEmail('');
//   };

//   const toggleStarred = async (emailId, isStarred) => {
//     try {
//       const response = await axios.put(`http://localhost:1973/api/inbox/${emailId}/star`, {
//         starred: !isStarred
//       });

//       // Update the UI with the response from the server
//       const updatedEmail = response.data;
      
//       setEmails(prevEmails =>
//         prevEmails.map(email =>
//           email._id === emailId ? updatedEmail : email
//         )
//       );

//       if (selectedEmail && selectedEmail._id === emailId) {
//         setSelectedEmail(updatedEmail);
//       }
//     } catch (error) {
//       console.error('Error updating starred status:', error);
//       alert('Failed to update starred status. Please try again.');
//     }
//   };

//   const handleDelete = async (emailId) => {
//     try {
//       // Send the logged-in user's email in the request body
//       await axios.put(`http://localhost:1973/api/inbox/${emailId}/bin`, {
//         email: loggedInUserEmail
//       });

//       // Remove the email from the UI after successful deletion
//       setEmails(prevEmails => prevEmails.filter(email => email._id !== emailId));
      
//       if (selectedEmail && selectedEmail._id === emailId) {
//         setSelectedEmail(null);
//       }
//     } catch (error) {
//       console.error('Error moving email to bin:', error);
//       alert('Failed to delete email. Please try again.');
//     }
//   };

//   const handleForward = () => {
//     setIsForwarding(true);
//   };

//   const handleSendForward = async () => {
//     if (!recipientEmail) {
//       alert("Please enter a recipient email.");
//       return;
//     }

//     try {
//       const forwardedEmail = {
//         to: recipientEmail,
//         from: loggedInUserEmail,
//         subject: `Fwd: ${selectedEmail.subject}`,
//         body: `
// ---------- Forwarded message ---------
// From: ${selectedEmail.from}
// Date: ${new Date(selectedEmail.date).toLocaleString()}
// Subject: ${selectedEmail.subject}
// To: ${selectedEmail.to}

// ${selectedEmail.body}`,
//         attachments: selectedEmail.attachments || [],
//       };

//       await axios.post('http://localhost:1973/api/send', forwardedEmail);
//       alert("Email forwarded successfully!");
//       handleClose();
//     } catch (error) {
//       console.error('Error forwarding email:', error);
//       alert("Error forwarding email. Please try again.");
//     }
//   };

//   return (
//     <div className="main-content-container">
//       <div className="inbox-list">
//         <h2>Inbox</h2>
//         <ul>
//           {emails.map((email) => (
//             <li 
//               key={email._id} 
//               onClick={() => handleEmailClick(email)} 
//               className="email-item"
//             >
//               <span className="email-subject">{email.subject}</span>{' '}
//               <span className="email-from">
//                 {email.from === loggedInUserEmail ? `To: ${email.to}` : `From: ${email.from}`}
//               </span>
//               <button
//                 className={`star-btn ${email.starred ? 'starred' : ''}`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleStarred(email._id, email.starred);
//                 }}
//               >
//                 {email.starred ? '★' : '☆'}
//               </button>
//               <button
//                 className="delete-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDelete(email._id);
//                 }}
//               >
//                 🗑️
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {selectedEmail && (
//         <div className="email-tray">
//           <div className="email-tray-content">
//             <button className="close-btn" onClick={handleClose}>✖</button>
//             <h2>{selectedEmail.subject}</h2>
//             <p><strong>From:</strong> {selectedEmail.from}</p>
//             <p><strong>To:</strong> {selectedEmail.to}</p>
//             <p><strong>Date:</strong> {new Date(selectedEmail.date).toLocaleString()}</p>
//             <div className="email-body">
//               <strong>Content:</strong>
//               <pre>{selectedEmail.body}</pre>
//             </div>
//             {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
//               <p><strong>Attachments:</strong> {selectedEmail.attachments.join(', ')}</p>
//             )}

//             <button className="forward-btn" onClick={handleForward}>Forward</button>

//             {isForwarding && (
//               <div className="forward-input">
//                 <input
//                   type="email"
//                   placeholder="Recipient email"
//                   value={recipientEmail}
//                   onChange={(e) => setRecipientEmail(e.target.value)}
//                 />
//                 <button onClick={handleSendForward}>Send</button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inbox;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inbox.css';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isForwarding, setIsForwarding] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.email) {
      setLoggedInUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.email) {
          const response = await axios.get('http://localhost:1973/api/inbox', {
            params: { email: user.email },
          });
          setEmails(response.data);
        }
      } catch (error) {
        console.error('Error fetching inbox:', error);
      }
    };

    if (loggedInUserEmail) {
      fetchInbox();
    }
  }, [loggedInUserEmail]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleClose = () => {
    setSelectedEmail(null);
    setIsForwarding(false);
    setRecipientEmail('');
  };

  const toggleStarred = async (emailId) => {
    try {
      const response = await axios.put(
        `http://localhost:1973/api/inbox/${emailId}/star`,
        { email: loggedInUserEmail },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (response.data) {
        // Update the emails list with the new data
        setEmails(prevEmails =>
          prevEmails.map(email =>
            email._id === emailId ? response.data : email
          )
        );
  
        // Also update selectedEmail if it's the one being starred/unstarred
        if (selectedEmail && selectedEmail._id === emailId) {
          setSelectedEmail(response.data);
        }
      }
    } catch (error) {
      console.error('Error updating starred status:', error);
      // Log the full error details for debugging
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      alert('Failed to update starred status. Please try again.');
    }
  };

  const handleDelete = async (emailId) => {
    try {
      await axios.put(`http://localhost:1973/api/inbox/${emailId}/bin`, {
        email: loggedInUserEmail
      });

      setEmails(prevEmails => prevEmails.filter(email => email._id !== emailId));
      
      if (selectedEmail && selectedEmail._id === emailId) {
        setSelectedEmail(null);
      }
    } catch (error) {
      console.error('Error moving email to bin:', error);
      alert('Failed to delete email. Please try again.');
    }
  };

  const handleForward = () => {
    setIsForwarding(true);
  };

//   const handleSendForward = async () => {
//     if (!recipientEmail) {
//       alert("Please enter a recipient email.");
//       return;
//     }

//     try {
//       const forwardedEmail = {
//         to: recipientEmail,
//         from: loggedInUserEmail,
//         subject: `Fwd: ${selectedEmail.subject}`,
//         body: `
// ---------- Forwarded message ---------
// From: ${selectedEmail.from}
// Date: ${new Date(selectedEmail.date).toLocaleString()}
// Subject: ${selectedEmail.subject}
// To: ${selectedEmail.to}

// ${selectedEmail.body}`,
//         attachments: selectedEmail.attachments || [],
//       };

//       await axios.post('http://localhost:1973/api/send', forwardedEmail);
//       alert("Email forwarded successfully!");
//       handleClose();
//     } catch (error) {
//       console.error('Error forwarding email:', error);
//       alert("Error forwarding email. Please try again.");
//     }
//   };

const handleSendForward = async () => {
  if (!recipientEmail) {
    alert("Please enter a recipient email.");
    return;
  }

  try {
    // Split recipients into an array, assuming comma-separated input
    const recipientList = recipientEmail.split(',').map(email => email.trim());

    const forwardedEmail = {
      to: recipientList, // Now properly formatted as an array
      recipients: recipientList, // Ensure `recipients` is an array
      from: loggedInUserEmail,
      subject: `Fwd: ${selectedEmail.subject}`,
      body: `
---------- Forwarded message ---------
From: ${selectedEmail.from}
Date: ${new Date(selectedEmail.date).toLocaleString()}
Subject: ${selectedEmail.subject}
To: ${selectedEmail.to.join(", ")}

${selectedEmail.body}`,
      attachments: selectedEmail.attachments || [],
      binSend: false, // Since this is a sent email, binSend is false
      deletedBy: [] // Initialize as empty array, as no recipient has deleted it
    };

    await axios.post('http://localhost:1973/api/send', forwardedEmail);
    alert("Email forwarded successfully!");
    handleClose();
  } catch (error) {
    console.error('Error forwarding email:', error);
    alert("Error forwarding email. Please try again.");
  }
};

  // Helper function to check if email is starred by current user
  const isStarredByUser = (email) => {
    return email.starredBy?.includes(loggedInUserEmail) || false;
  };

  return (
    <div className="main-content-container">
      <div className="inbox-list">
        <h2>Inbox</h2>
        <ul>
          {emails.map((email) => (
            <li 
              key={email._id} 
              onClick={() => handleEmailClick(email)} 
              className="email-item"
            >
              <span className="email-subject">{email.subject}</span>{' '}
              <span className="email-from">
                {email.from === loggedInUserEmail ? `To: ${email.to}` : `From: ${email.from}`}
              </span>
              <button
                className={`star-btn ${isStarredByUser(email) ? 'starred' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStarred(email._id);
                }}
              >
                {isStarredByUser(email) ? '★' : '☆'}
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(email._id);
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedEmail && (
        <div className="email-tray">
          <div className="email-tray-content">
            <button className="close-btn" onClick={handleClose}>✖</button>
            <h2>{selectedEmail.subject}</h2>
            <p><strong>From:</strong> {selectedEmail.from}</p>
            <p><strong>To:</strong> {selectedEmail.to}</p>
            <p><strong>Date:</strong> {new Date(selectedEmail.date).toLocaleString()}</p>
            <div className="email-body">
              <strong>Content:</strong>
              <pre>{selectedEmail.body}</pre>
            </div>
            {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
              <p><strong>Attachments:</strong> {selectedEmail.attachments.join(', ')}</p>
            )}

            <button className="forward-btn" onClick={handleForward}>Forward</button>

            {isForwarding && (
              <div className="forward-input">
                <input
                  type="email"
                  placeholder="Recipient email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                />
                <button onClick={handleSendForward}>Send</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;