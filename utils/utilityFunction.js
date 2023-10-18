export function extractUsername(email) {
    const parts = email.split('@');
  
    const username = parts[0];
  
    return username;
  }
  