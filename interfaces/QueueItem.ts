export type QueueItem = {
  id: string;
  queue_name: string;
  date: string;
  start_time: string;
  end_time: string;
  queue_type: string;
  is_ongoing: boolean;
  no_of_slots: number;
  unavailable_slots: number[];
};

export type QueueGroups = {
  upcoming: QueueItem[];
  ongoing: QueueItem[];
};
