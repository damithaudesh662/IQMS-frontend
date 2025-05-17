import { useEffect } from "react";
import { supabase } from "../lib/supabase"; // Adjust the import

const useCurrentSlotSubscription = (
  queueID: string,
  onChange: (newSlot: number) => void
) => {
  useEffect(() => {
    const channel = supabase
      .channel("public:institute_queues")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "institute_queues",
          filter: `id=eq.${queueID}`,
        },
        (payload) => {
          const newSlot = payload.new.current_slot;
          onChange(newSlot);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queueID, onChange]);
};

export default useCurrentSlotSubscription;
