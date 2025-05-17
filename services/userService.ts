import { supabase } from "../lib/supabase";

export async function joinQueue(queueID: string, slot: string) {
  const {
    data: { user: currentUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (!currentUser?.id || userError) {
    return { error: userError?.message };
  }

  const { data, error: slotError } = await supabase
    .from("user_joined_queues")
    .insert([
      {
        user_id: currentUser?.id,
        queue_id: queueID,
        slot: slot,
      },
    ]);

  if (slotError) {
    return { error: slotError.message };
  }

  return { error: null };
}

export async function getQueuesByUserID() {
  const {
    data: { user: currentUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (!currentUser?.id || userError) {
    return { queues: [], error: userError?.message };
  }

  const { data: queues, error: queueError } = await supabase
    .from("user_joined_queues")
    .select(
      `
    id,  
    slot,
    institute_queues(
        institutes(
            institute_name
        ),
        queue_name,
        date,
        start_time,
        end_time,
        is_ongoing
    )
    `
    )
    .eq("user_id", currentUser?.id);

  if (queueError) {
    return { queues: [], error: queueError?.message };
  }

  return { queues: queues, error: null };
}
