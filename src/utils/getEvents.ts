import { getEventList } from "@/config/firestore";

export const fetchMostRecentEventImage = async () => {
    const events = await getEventList();
    const currentDate = new Date();
  
    // Filter and sort events to get the most recent one
    const sortedEvents = events
      .filter(event => new Date(event.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    if (sortedEvents.length > 0) {
      return sortedEvents[0].imageURL;
    }
  
    return null;
  };