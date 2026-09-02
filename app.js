/* ==========================================================================
   NAJEEBA NASIR PORTFOLIO - APPLICATION INTERACTIVE LOGIC
   Features: Canvas Particles, Pipeline Inspector, Terminal Sandbox, Scroll Spy
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initMobileNav();
  initSkillsFilter();
  initScrollSpy();
});

/* ==========================================================================
   1. BACKGROUND CANVAS NEURAL GRAPH / PARTICLE ANIMATION
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Generate nodes
  const nodesCount = Math.floor((width * height) / 18000);
  const nodes = [];

  for (let i = 0; i < nodesCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.fill();

      // Move nodes
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   2. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpen = navMenu.classList.contains('active');
    toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE PIPELINE ARCHITECTURE INSPECTOR
   ========================================================================== */
const PIPELINE_DATA = {
  ingestion: {
    stage: 'STAGE 1',
    title: 'Code Analysis & AST Parsing',
    desc: 'Parses legacy application assets, SQL scripts, and data definitions into structured Abstract Syntax Trees (AST). Identifies business functions, data access routines, and dependencies.',
    tags: ['Python', 'AST Parsing', 'Static Analysis', 'Schema Analysis'],
    snippet: `# Code Analysis & Ingestion Stream
analyzer = CodebaseAnalyzer(target="LEGACY_PAYROLL_SERVICE")
ast_nodes = analyzer.parse_syntax_tree()`
  },
  graph: {
    stage: 'STAGE 2',
    title: 'Knowledge Graph & Neo4j Graph IR',
    desc: 'Constructs a graph-based Intermediate Representation using Neo4j and Cypher. Maps dependencies, call graphs, and database interactions to enable clean structural refactoring.',
    tags: ['Neo4j', 'Cypher', 'Knowledge Graphs', 'Graph IR', 'Dependency Map'],
    snippet: `// Cypher Dependency Mapping Query
MATCH (p:ServiceModule)-[:CALLS]->(m:Subroutine)
WHERE p.bounded_context = 'FINANCE'
RETURN p.name, collect(m.name) AS dependencies`
  },
  bounded: {
    stage: 'STAGE 3',
    title: 'Bounded Context & Microservice Domain Isolation',
    desc: 'Groups legacy programs strictly by business domain and data ownership. Enforces exclusive data access boundaries so services communicate cleanly through microservice REST APIs.',
    tags: ['Bounded Context', 'Domain Driven Design', 'PostgreSQL', 'Microservices'],
    snippet: `# Bounded Context Data Access Enforcer
def validate_data_access(context_a, context_b):
    if context_a.db != context_b.db:
        raise RestrictedAccessException("Inter-context communication must use REST APIs")`
  },
  agent: {
    stage: 'STAGE 4',
    title: 'Agentic Workflows & Model Context Protocol (MCP)',
    desc: 'Integrates LangGraph state machines and Model Context Protocol (MCP) for databases (PostgreSQL, MySQL, Neo4j). Agents query schemas safely and execute multi-step tool calls with full traceability.',
    tags: ['LangGraph', 'MCP for DB', 'PostgreSQL', 'MySQL', 'Tool Calling'],
    snippet: `# LangGraph State Machine & MCP Tool Routing
workflow = StateGraph(AgentState)
workflow.add_node("mcp_postgres_inspect", mcp_postgres_tool)
workflow.add_node("fastapi_spec_scaffold", generate_openapi_spec)
workflow.set_entry_point("mcp_postgres_inspect")`
  },
  microservice: {
    stage: 'STAGE 5',
    title: 'FastAPI Microservice & OpenAPI Contract Scaffolding',
    desc: 'Synthesizes clean Python/FastAPI microservices with auto-generated OpenAPI/Swagger specifications. Hardened with Trivy/Bandit security scans, Docker containers, and Azure DevOps CI/CD integration.',
    tags: ['FastAPI', 'Python', 'OpenAPI/Swagger', 'Docker', 'Azure DevOps'],
    snippet: `@app.post("/api/v1/payroll/process", response_model=PayrollResponse)
async def process_payroll(payload: PayrollRequest):
    """Auto-generated microservice endpoint per bounded context contract."""
    return await PayrollService.execute_batch(payload)`
  }
};

function initPipelineInspector() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const stageBadge = document.getElementById('inspector-stage');
  const titleElem = document.getElementById('inspector-title');
  const descElem = document.getElementById('inspector-desc');
  const tagsElem = document.getElementById('inspector-tags');
  const codeElem = document.getElementById('inspector-code-snippet');

  if (!nodes.length || !stageBadge) return;

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const key = node.getAttribute('data-node');
      const data = PIPELINE_DATA[key];

      if (data) {
        stageBadge.textContent = data.stage;
        titleElem.textContent = data.title;
        descElem.textContent = data.desc;

        tagsElem.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
        codeElem.textContent = data.snippet;
      }
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE AGENT & MCP PLAYGROUND CLI SANDBOX
   ========================================================================== */
function initDecisionLedgerTerminal() {
  const inputElem = document.getElementById('terminal-input');
  const runBtn = document.getElementById('btn-run-ledger');
  const logsContainer = document.getElementById('terminal-logs');
  const jsonDisplay = document.getElementById('json-output-display');
  const copyBtn = document.getElementById('btn-copy-json');

  if (!inputElem || !runBtn || !logsContainer) return;

  runBtn.addEventListener('click', () => executeMCPAgentRun());
  inputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') executeMCPAgentRun();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(jsonDisplay.textContent);
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy JSON';
      }, 2000);
    });
  }

  async function executeMCPAgentRun() {
    const rawVal = inputElem.value.trim() || 'POSTGRES_PAYROLL';
    const cleanVal = rawVal.toUpperCase().replace(/[^A_Z0-9_]/g, '_');

    const dbType = cleanVal.includes('NEO4J') ? 'Neo4j' : (cleanVal.includes('MYSQL') ? 'MySQL' : 'PostgreSQL');

    // Append terminal logs
    const log1 = document.createElement('div');
    log1.className = 'log-line prompt';
    log1.textContent = `$ agent.query --target "${cleanVal}" --protocol mcp/v1`;
    logsContainer.appendChild(log1);

    const log2 = document.createElement('div');
    log2.className = 'log-line success';
    log2.textContent = `[MCP SUCCESS] Connected to ${dbType} MCP Server (SSL Encrypted)`;
    logsContainer.appendChild(log2);

    const log3 = document.createElement('div');
    log3.className = 'log-line info';
    log3.textContent = `[LANGGRAPH AGENT] State Transition: Schema_Inspect -> Generate_FastAPI_Spec`;
    logsContainer.appendChild(log3);

    const log4 = document.createElement('div');
    log4.className = 'log-line warning';
    log4.textContent = `[API SCAFFOLD] Auto-generated Swagger Spec & Endpoint Router in 14ms`;
    logsContainer.appendChild(log4);

    logsContainer.scrollTop = logsContainer.scrollHeight;

    // Update JSON preview display
    const jsonOutput = {
      agent_framework: "LangGraph State Machine",
      mcp_server: `mcp-${dbType.toLowerCase()}-db-router`,
      target_database: cleanVal,
      query_type: "SCHEMA_INSPECTION_AND_MICROSERVICE_SCAFFOLD",
      mcp_tools_invoked: [
        `${dbType.toLowerCase()}_list_tables`,
        `${dbType.toLowerCase()}_describe_schema`,
        "openapi_router_scaffold"
      ],
      bounded_context: `${cleanVal}_DOMAIN`,
      generated_artifacts: [
        "FastAPI_Endpoint_Router.py",
        "OpenAPI_Swagger_Spec.json",
        "Trivy_Bandit_Security_Scan.log"
      ],
      status: "MICROSERVICE_READY"
    };

    jsonDisplay.textContent = JSON.stringify(jsonOutput, null, 2);
  }
}

// Utility function for Web Crypto SHA-256
async function generateSHA256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ==========================================================================
   5. TECHNICAL SKILLS MATRIX CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. SCROLL SPY & FORM FEEDBACK
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Global Contact Form Handler
window.handleFormSubmit = function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value || 'Portfolio Inquiry';
  const message = document.getElementById('message').value;
  const statusElem = document.getElementById('form-status');

  statusElem.style.color = '#00ff9d';
  statusElem.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you ${name}! Opening your email app to send message to najeebavns2019@gmail.com...`;

  // Trigger mailto link with pre-filled content
  const mailtoUrl = `mailto:najeebavns2019@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
  
  setTimeout(() => {
    window.location.href = mailtoUrl;
    document.getElementById('contact-form').reset();
  }, 500);
};
