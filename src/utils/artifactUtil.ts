// src/utils/artifactTemplates.ts

export type ArtifactType =
  | "Strategic alignment"
  | "Big picture"
  | "Domain breakdown"
  | "System Architecture"
  | "Phase Scope"

export function getArtifactTemplate(type: ArtifactType) {
  switch (type) {
    case "Strategic alignment":
      return {
        transformation: "",
        supported_decisions: [],
        measurable_success: [{ metric: "", target: "" }],
        out_of_scope: []
      }
    case "Big picture":
      return {
        ecosystem_vision: "",
        impacted_domains: [],
        success_definition: ""
      }
    case "Domain breakdown":
      return {
        domains: [{ name: "", objective: "", owner_user_id: "" }]
      }
    case "System Architecture":
      return {
        auth_model: "",
        api_style: "",
        data_model_notes: "",
        scalability_notes: ""
      }
    case "Phase Scope":
      return {
        included_modules: [],
        excluded_items: [],
        acceptance_criteria: []
      }
    default:
      return {}
  }
}
