import { supabase } from "../lib/supabase";

export async function getAllInstitutes() {
  const { data: institutes, error } = await supabase
    .from("institutes")
    .select();

  if (error) {
    console.log(error);
    return [];
  } else {
    return institutes;
  }
}

export async function getQueuesByInstituteID(id: number) {
  const { data: queues, error } = await supabase
    .from("institute_queues")
    .select()
    .eq("institute_id", id);

  if (error) {
    console.log(error);
    return [];
  } else {
    return queues;
  }
}

export async function updateUnavailableSlotsForQueue(
  id: string,
  unavailableSlots: number[]
) {
  console.log(`Changing unavailable slots to ${unavailableSlots} for id ${id}`);
  const { data, error } = await supabase
    .from("institute_queues")
    .update({ unavailable_slots: unavailableSlots })
    .eq("id", id);

  if (!error) {
    console.log("Slot Booked Successfully");
    return true;
  } else {
    console.log(error);
    return false;
  }
}
