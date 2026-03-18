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
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Objective', align: 'start', key: 'objective' },
  { title: 'Responsibility', align: 'start', key: 'responsibility' },
  { title: 'Version Note', align: 'start', key: 'version_note' },
  { title: 'Actions', align: 'center', key: 'actions', sortable: false }
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

const ModulesItems = [
  {
    id: 1,
    objective: "User authentication",
    inputs: ["username", "password"],
    data_structure: "User table with hashed passwords",
    logic_rules: "Validate credentials and generate token",
    outputs: ["auth_token"],
    responsibility: "Security team",
    failure_scenarios: "Invalid credentials, locked account",
    audit_trail_requirements: "Log login attempts with timestamp",
    dependencies: [2],
    version_note: "v1.0 initial release"
  },
  {
    id: 2,
    objective: "Payment processing",
    inputs: ["card_number", "amount", "currency"],
    data_structure: "Transaction table",
    logic_rules: "Authorize payment if card is valid",
    outputs: ["payment_confirmation", "receipt"],
    responsibility: "Finance team",
    failure_scenarios: "Card declined, network error",
    audit_trail_requirements: "Store transaction ID, user ID",
    dependencies: [1],
    version_note: "v1.1 added currency support"
  },
  {
    id: 3,
    objective: "Email notifications",
    inputs: ["recipient_email", "message"],
    data_structure: "Queue system",
    logic_rules: "Send email asynchronously",
    outputs: ["delivery_status"],
    responsibility: "Communication service",
    failure_scenarios: "SMTP error, invalid email",
    audit_trail_requirements: "Log email ID and status",
    dependencies: [],
    version_note: "v1.0 basic notifications"
  },
  {
    id: 4,
    objective: "Report generation",
    inputs: ["date_range", "filters"],
    data_structure: "Report schema",
    logic_rules: "Aggregate data by filters",
    outputs: ["PDF_report"],
    responsibility: "Analytics team",
    failure_scenarios: "Missing data, timeout",
    audit_trail_requirements: "Log report parameters",
    dependencies: [2],
    version_note: "v2.0 optimized queries"
  },
  {
    id: 5,
    objective: "Inventory management",
    inputs: ["product_id", "quantity"],
    data_structure: "Inventory table",
    logic_rules: "Update stock levels",
    outputs: ["updated_inventory"],
    responsibility: "Operations team",
    failure_scenarios: "Negative stock, invalid product",
    audit_trail_requirements: "Log changes with user ID",
    dependencies: [],
    version_note: "v1.0 initial setup"
  },
  {
    id: 6,
    objective: "User profile update",
    inputs: ["user_id", "profile_data"],
    data_structure: "Profile table",
    logic_rules: "Validate and update fields",
    outputs: ["update_status"],
    responsibility: "User service",
    failure_scenarios: "Invalid data, permission denied",
    audit_trail_requirements: "Log changes with timestamp",
    dependencies: [1],
    version_note: "v1.2 added phone field"
  },
  {
    id: 7,
    objective: "File upload",
    inputs: ["file", "metadata"],
    data_structure: "File storage system",
    logic_rules: "Check file type and size",
    outputs: ["file_url"],
    responsibility: "Storage service",
    failure_scenarios: "File too large, unsupported type",
    audit_trail_requirements: "Log file ID and uploader",
    dependencies: [],
    version_note: "v1.0 basic upload"
  },
  {
    id: 8,
    objective: "Data backup",
    inputs: ["database_snapshot"],
    data_structure: "Backup archive",
    logic_rules: "Compress and store snapshot",
    outputs: ["backup_id"],
    responsibility: "IT team",
    failure_scenarios: "Storage full, corrupted snapshot",
    audit_trail_requirements: "Log backup ID and date",
    dependencies: [],
    version_note: "v1.0 nightly backup"
  },
  {
    id: 9,
    objective: "Search functionality",
    inputs: ["query_string"],
    data_structure: "Indexed documents",
    logic_rules: "Match query against index",
    outputs: ["search_results"],
    responsibility: "Search service",
    failure_scenarios: "No results, index outdated",
    audit_trail_requirements: "Log queries for analytics",
    dependencies: [],
    version_note: "v1.0 basic search"
  },
  {
    id: 10,
    objective: "Access control",
    inputs: ["user_role", "resource"],
    data_structure: "ACL table",
    logic_rules: "Check permissions",
    outputs: ["access_granted"],
    responsibility: "Security team",
    failure_scenarios: "Unauthorized access attempt",
    audit_trail_requirements: "Log access attempts",
    dependencies: [1],
    version_note: "v1.0 role-based access"
  }
]


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


export {ProjectHeaders, ArtifactHeaders, ModuleHeaders, ProjectItems, ArtifactItems, ModulesItems, AuditEvents, AuditEventHeaders};
