import { useState } from 'react';

export default function useUnread() {
  const [unreadCount, setUnreadCount] = useState(0);
  return { unreadCount, setUnreadCount };
}
