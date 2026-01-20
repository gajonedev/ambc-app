"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";

function TestButton() {
  const trpc = useTRPC();
  const { isPending, data, refetch, isRefetching } = useQuery(
    trpc.course.list.queryOptions(),
  );

  return (
    <div className="space-y-4 p-4">
      <div>
        <p className="mb-2 font-medium">Fetched data:</p>
        {isPending ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : data && data.length > 0 ? (
          <pre className="bg-muted p-4 rounded-lg max-h-64 overflow-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-muted-foreground">Aucune donnée</p>
        )}
      </div>
      <Button onClick={() => refetch()} disabled={isPending || isRefetching}>
        {isRefetching ? "Rafraîchissement..." : "Rafraîchir"}
      </Button>
    </div>
  );
}

export default TestButton;
