"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { toast } from "sonner";

function TestButton() {
  const trpc = useTRPC();
  const {
    isPending: mutationIsPending,
    data: mutationData,
    mutate,
  } = useMutation(
    trpc.admin.course.create.mutationOptions({
      onError: (error) => {
        toast.error("Erreur lors de la mise à jour du cours: " + error.message);
        throw error;
      },
      onSuccess: ({ title }) => {
        toast.success("Cours '" + title + "' mis à jour avec succès !");
      },
    }),
  );

  const { data, isFetching, refetch } = useQuery(
    trpc.admin.course.getByIdOrSlug.queryOptions(
      {
        slug: "cours-55",
      },
      { enabled: false },
    ),
  );

  return (
    <div className="space-y-4 p-4">
      <div>
        <p className="mb-2 font-medium">Fetched data:</p>
        {isFetching ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : data ? (
          <pre className="bg-muted p-4 rounded-lg max-h-64 overflow-auto text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-muted-foreground">Aucune donnée</p>
        )}
      </div>
      <Button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Mise à jour en cours..." : "Mettre à jour le cours"}
      </Button>
    </div>
  );
}

export default TestButton;
