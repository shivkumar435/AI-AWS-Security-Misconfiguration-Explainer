import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";

function Agent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What are my highest-risk findings?",
    "How can I reduce my AWS security risk?",
    "Explain my most critical finding."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      // TODO: Connect to real backend AI/chat endpoint when available
      // const response = await fetch('http://127.0.0.1:8000/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
      // const data = await response.json();
      // setMessages([...newMessages, { role: "assistant", content: data.reply }]);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "This is a mock response from the AI Security Agent. It will be replaced with real backend AI analysis once the endpoint is ready."
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Error: Unable to connect to the AI agent."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <div className="main" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <header className="topbar" style={{ flexShrink: 0 }}>
        <div>
          <h1>AI Security Agent</h1>
          <p style={{ color: '#68778d', marginTop: '5px' }}>Chat with your intelligent AWS security assistant</p>
        </div>
      </header>

      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {messages.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#68778d' }}>
            <div className="ai-symbol" style={{ fontSize: '48px', marginBottom: '20px' }}>✦</div>
            <h2 style={{ color: '#e8edf7', marginBottom: '10px' }}>How can I help you secure your AWS environment?</h2>
            <p style={{ marginBottom: '30px' }}>Ask a question or select a suggestion below to get started.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '500px' }}>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  style={{
                    background: '#1c2738',
                    border: '1px solid #283a54',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    color: '#e8edf7',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => e.target.style.background = '#283a54'}
                  onMouseOut={(e) => e.target.style.background = '#1c2738'}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '70%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  background: msg.role === 'user' ? '#4e8fdc' : '#1c2738',
                  color: msg.role === 'user' ? '#ffffff' : '#e8edf7',
                  border: msg.role === 'user' ? 'none' : '1px solid #283a54',
                  lineHeight: '1.5'
                }}>
                  {msg.role === 'assistant' && <div className="ai-symbol" style={{ display: 'inline-block', marginRight: '8px', color: '#4e8fdc' }}>✦</div>}
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  maxWidth: '70%',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  background: '#1c2738',
                  border: '1px solid #283a54',
                }}>
                  <LoadingSpinner message="Typing..." />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div style={{ flexShrink: 0, padding: '20px', borderTop: '1px solid #1c2738', background: '#0a101a' }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '900px', margin: '0 auto' }}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your AWS security posture..."
            disabled={isLoading}
            style={{
              flexGrow: 1,
              background: '#111926',
              border: '1px solid #283a54',
              borderRadius: '8px',
              padding: '15px',
              color: '#e8edf7',
              resize: 'none',
              height: '56px',
              fontFamily: 'inherit'
            }}
          />
          <button
            onClick={() => handleSend(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            style={{
              background: '#4e8fdc',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '0 25px',
              cursor: (isLoading || !inputValue.trim()) ? 'not-allowed' : 'pointer',
              opacity: (isLoading || !inputValue.trim()) ? 0.6 : 1,
              fontWeight: 'bold'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Agent;
