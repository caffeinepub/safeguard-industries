export function getSessionId(): string {
  let sessionId = localStorage.getItem("safeguard_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("safeguard_session_id", sessionId);
  }
  return sessionId;
}
