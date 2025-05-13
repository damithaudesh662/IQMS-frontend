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

export type CreateQueueItem = Omit<QueueItem, "id"> & {
  institute_id: string | null;
  time_per_slot: string;
};

export type QueueGroups = {
  upcoming: QueueItem[];
  ongoing: QueueItem[];
};
