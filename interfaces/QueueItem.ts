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

export type JoinedQueue = {
  id: string;
  institute_queues: {
    queue_name: string;
    date: string;
    start_time: string;
    end_time: string;
    is_ongoing: boolean;
    institutes: {
      institute_name: string;
    };
  };
  slot: string;
};

export type UserQueueViewScreenProps = {
  id: string;
  slot: string;
  institute_name: string;
  queue_name: string;
  date: string;
  start_time: string;
  end_time: string;
};

export type AdminManageQueueScreenProps = {
  id: string;
};
