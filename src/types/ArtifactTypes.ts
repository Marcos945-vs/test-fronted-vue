type ArtifactType =  {
    project_id: number | string,
    type: string,
    status: string,
    owner: string,
    completed_at: string | null,
    content_json: any | null,
} | null;

export type { ArtifactType }