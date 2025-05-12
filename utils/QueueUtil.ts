import { QueueGroups, QueueItem } from "@/interfaces/QueueItem";

export function formatQueues(data: QueueItem[]): QueueGroups {
  const formatted = {
    upcoming: [] as QueueItem[],
    ongoing: [] as QueueItem[],
  };

  data.forEach((item) => {
    const formattedItem: QueueItem = {
      id: String(item.id),
      queue_name: item.queue_name,
      date: item.date,
      start_time: item.start_time.slice(0, 5), // "HH:mm"
      end_time: item.end_time.slice(0, 5), // "HH:mm"
      is_ongoing: item.is_ongoing,
      queue_type: item.queue_type,
      no_of_slots: item.no_of_slots,
      unavailable_slots: item.unavailable_slots,
    };

    if (item.is_ongoing) {
      formatted.ongoing.push(formattedItem);
    } else {
      formatted.upcoming.push(formattedItem);
    }
  });

  return formatted;
}
