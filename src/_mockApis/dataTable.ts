const ProjectHeaders = [
    { title: 'Name', align: 'start', key: 'name' },
    { title: 'Client Name', align: 'start', key: 'client' },
    { title: 'Created by', align: 'start', key: 'created' },
    { title: 'Status', align: 'start', key: 'status' },
    { title: 'Actions', align: 'center', key: 'actions' }
]

const ArtifactHeaders = [
    { title: 'Project ID', align: 'start', key: 'project_id' },
    { title: 'Type', align: 'start', key: 'type' },
    { title: 'Status', align: 'start', key: 'status' },
    { title: 'Owner User ID', align: 'center', key: 'owner' },
    { title: 'Complete at', align: 'start', key: 'completed_at' },
    {title: 'Content Json', align: 'start', key: 'content_json'},
    { title: 'Actions', align: 'center', key: 'actions' }
]
const ModuleHeaders = [
    { title: 'Name', align: 'start', key: 'name' },
    { title: 'Project Name', align: 'start', key: 'project' },
    { title: 'Post', align: 'start', key: 'post' },
    { title: 'Status', align: 'start', key: 'status' },
    { title: 'Budget', align: 'end', key: 'budget' },
]
const AuditEventHeaders = [
    { title: 'Actor User ID', align: 'start', key: 'actor_user_id' },
    { title: 'Entity Type', align: 'start', key: 'entity_type' },
    { title: 'Entity ID', align: 'start', key: 'entity_id' },
    { title: 'Action', align: 'start', key: 'action' },
    {title: 'Json', align: 'center', key: 'content_json'},
    { title: 'Created At', align: 'start', key: 'created_at' },
]

const ProjectItems = [
  { name: "Project Alpha", client: "Acme Corp", created: "John Doe", status: "Draft" },
  { name: "Project Beta", client: "Globex Inc", created: "Jane Doe", status: "Discovery" },
  { name: "Project Gamma", client: "Initech", created: "Richard Roe", status: "Execution" },
  { name: "Project Delta", client: "Umbrella Corp", created: "Mary Major", status: "Delivered" },
  { name: "Project Epsilon", client: "Soylent Corp", created: "John Smith", status: "Draft" },
  { name: "Project Zeta", client: "Stark Industries", created: "Jane Smith", status: "Execution" },
  { name: "Project Theta", client: "Wayne Enterprises", created: "Robert Brown", status: "Discovery" },
  { name: "Project Iota", client: "Wonka Factory", created: "Emily Davis", status: "Delivered" },
  { name: "Project Kappa", client: "Cyberdyne Systems", created: "Michael Johnson", status: "Draft" },
  { name: "Project Lambda", client: "Tyrell Corp", created: "Sarah Wilson", status: "Execution" }
]

const ArtifactItems = [
  {
    project_id: "P-001",
    type: "Strategic alignment",
    status: "Not started",
    owner: "U-201",
    completed_at: null,
    content_json: {
      transformation: "Digital transformation roadmap",
      supported_decisions: ["Budget allocation", "Team structure"],
      measurable_success: [
        { metric: "Customer satisfaction", target: "90%" },
        { metric: "Revenue growth", target: "15%" }
      ],
      out_of_scope: ["Legacy system migration", "HR policies"]
    }
  },
  {
    project_id: "P-002",
    type: "Big picture",
    status: "In Progress",
    owner: "U-202",
    completed_at: null,
    content_json: {
      ecosystem_vision: "Unified platform for all services",
      impacted_domains: ["Finance", "Healthcare", "Retail"],
      success_definition: "Adoption by 80% of target users"
    }
  },
  {
    project_id: "P-003",
    type: "Domain breakdown",
    status: "Blocked",
    owner: "U-203",
    completed_at: null,
    content_json: {
      domains: [
        { name: "Payments", objective: "Secure transactions", owner_user_id: "U-301" },
        { name: "Analytics", objective: "Data insights", owner_user_id: "U-302" }
      ]
    }
  },
  {
    project_id: "P-004",
    type: "Module Matrix",
    status: "Done",
    owner: "U-204",
    completed_at: "2026-03-02",
    content_json: {
      modules_overview: [
        { name: "Auth", domain: "Security", priority: "High", phase: "Phase 1" },
        { name: "Dashboard", domain: "UI", priority: "Medium", phase: "Phase 2" }
      ]
    }
  },
  {
    project_id: "P-005",
    type: "Module Engineering",
    status: "In Progress",
    owner: "U-205",
    completed_at: null,
    content_json: {
      modules_overview: [
        { name: "Engine Core", domain: "Backend", priority: "High", phase: "Phase 1" },
        { name: "UI Builder", domain: "Frontend", priority: "Medium", phase: "Phase 2" }
      ]
    }
  },
  {
    project_id: "P-006",
    type: "System Architecture",
    status: "Not started",
    owner: "U-206",
    completed_at: null,
    content_json: {
      auth_model: "OAuth2 with JWT",
      api_style: "RESTful",
      data_model_notes: "Normalized relational schema",
      scalability_notes: "Horizontal scaling with load balancers"
    }
  },
  {
    project_id: "P-007",
    type: "Phase Scope",
    status: "Blocked",
    owner: "U-207",
    completed_at: null,
    content_json: {
      included_modules: ["Auth", "Dashboard"],
      excluded_items: ["Legacy API"],
      acceptance_criteria: ["All tests pass", "Performance under 200ms"]
    }
  }
]

const ModuleItem = {
  project_id: "P-010",
  domain: "Payments",
  name: "PaymentGateway",
  status: "draft",
  objective: "Procesar pagos en línea de manera segura",
  inputs: ["credit_card_info", "user_id"],
  data_structure: "{ card_number: string, expiry: date, cvv: string }",
  logic_rules: "Validar tarjeta, procesar pago, registrar transacción",
  outputs: ["transaction_id", "payment_status"],
  responsibility: "Equipo de Finanzas",
  failure_scenarios: "Tarjeta inválida, fondos insuficientes, error de red",
  audit_trail_requirements: "Registrar cada intento de pago con resultado",
  dependencies: ["Module_Auth", "Module_UserProfile"],
  version_note: "v1.0 inicial"
}


const AuditEvents = [
  {
    actor_user_id: 301,
    entity_type: "Module",
    entity_id: 1001,
    action: "status_changed",
    before_json: { status: "draft" },
    after_json: { status: "validated" },
    created_at: "13 Mar 2026, 1:00 PM"
  },
  {
    actor_user_id: 302,
    entity_type: "Project",
    entity_id: 1002,
    action: "created",
    before_json: {},
    after_json: { status: "Not started" },
    created_at: "14 Mar 2026, 9:15 AM"
  },
  {
    actor_user_id: 303,
    entity_type: "Artifact",
    entity_id: 1003,
    action: "updated",
    before_json: { title: "Plan 2025" },
    after_json: { title: "Plan 2026" },
    created_at: "14 Mar 2026, 10:20 AM"
  },
  {
    actor_user_id: 304,
    entity_type: "Module",
    entity_id: 1004,
    action: "validated",
    before_json: { status: "draft" },
    after_json: { status: "validated" },
    created_at: "14 Mar 2026, 11:00 AM"
  },
  {
    actor_user_id: 305,
    entity_type: "Project",
    entity_id: 1005,
    action: "status_changed",
    before_json: { status: "In Progress" },
    after_json: { status: "Completed" },
    created_at: "14 Mar 2026, 12:30 PM"
  },
  {
    actor_user_id: 306,
    entity_type: "Artifact",
    entity_id: 1006,
    action: "status_changed",
    before_json: { status: "draft" },
    after_json: { status: "ready" },
    created_at: "14 Mar 2026, 1:45 PM"
  },
  {
    actor_user_id: 307,
    entity_type: "Module",
    entity_id: 1007,
    action: "updated",
    before_json: { version_note: "v1.0" },
    after_json: { version_note: "v1.1" },
    created_at: "14 Mar 2026, 2:10 PM"
  },
  {
    actor_user_id: 308,
    entity_type: "Project",
    entity_id: 1008,
    action: "completed",
    before_json: { status: "Validated" },
    after_json: { status: "Completed" },
    created_at: "14 Mar 2026, 3:00 PM"
  },
  {
    actor_user_id: 309,
    entity_type: "Artifact",
    entity_id: 1009,
    action: "updated",
    before_json: { api_style: "REST" },
    after_json: { api_style: "GraphQL" },
    created_at: "14 Mar 2026, 4:20 PM"
  },
  {
    actor_user_id: 310,
    entity_type: "Module",
    entity_id: 1010,
    action: "status_changed",
    before_json: { status: "draft" },
    after_json: { status: "ready_for_build" },
    created_at: "14 Mar 2026, 5:45 PM"
  }
];


export {ProjectHeaders, ArtifactHeaders, ModuleHeaders, ProjectItems, ArtifactItems, ModuleItem, AuditEvents, AuditEventHeaders};
