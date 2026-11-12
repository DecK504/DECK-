(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const pages = ["home","community","garage","chat","messages","missions","achievements","market","events","points","search","safety","profile","stats","notifications","settings"];
  let supabaseClient = null;
  const demoPosts = [
    {name:"Comunidad DECK",handle:"@deck_comunidad",time:"Publicación de ejemplo",text:"¡Bienvenidos a DECK! Comparte tus vehículos, conoce a otros jugadores y participa en las actividades de la comunidad.",likes:0},
    {name:"DECK News",handle:"@deck_news",time:"Anuncio de ejemplo",text:"Este espacio mostrará noticias oficiales, eventos, sorteos y novedades de la plataforma.",likes:0}
  ];

  function showPage(page) {
    if (page === "stats") page = "stats";
    if (!pages.includes(page)) page = "home";
    $$(".page").forEach(el => el.classList.toggle("active", el.id === `page-${page}`));
    $$(".nav-item,.mobile-nav button").forEach(el => el.classList.toggle("active", el.dataset.page === page));
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function renderPosts(target) {
    const host = $(target);
    if (!host) return;
    host.innerHTML = demoPosts.map((p,i) => `
      <article class="post-card">
        <div class="post-head"><div class="post-avatar">${p.name.charAt(0)}</div><div><div class="post-author">${p.name}</div><div class="post-time">${p.handle} · ${p.time}</div></div></div>
        <div class="post-body">${escapeHtml(p.text)}</div>
        <div class="post-actions"><button type="button" data-demo="like">♡ ${p.likes} Me gusta</button><button type="button" data-demo="comment">▢ Comentar</button><button type="button" data-demo="share">↗ Compartir</button></div>
      </article>`).join("");
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function openModal(kind) {
    const title = $("#modalTitle"), fields = $("#modalFields"), form = $("#modalForm");
    const templates = {
      "new-post": {title:"Crear publicación", fields:[["Texto de tu publicación","textarea","Comparte algo con la comunidad..."],["Hashtags (opcional)","text","#CPM #DECK"]]},
      "new-vehicle": {title:"Publicar vehículo", fields:[["Nombre del vehículo","text","Ej. Nissan Skyline"],["Descripción y modificaciones","textarea","Cuéntanos sobre tu vehículo..."]]},
      "market-suggestion": {title:"Sugerir artículo para Market", fields:[["Nombre del artículo","text","¿Qué artículo propones?"],["Categoría","text","Vehículos, regalo, artículo virtual..."],["Descripción","textarea","Describe tu sugerencia..."]]},
      "story-archive": {title:"Archivo de historias", fields:[["Archivo de historias","text","El archivo se mostrará al conectar tu cuenta."]]}
    };
    const config = templates[kind] || templates["new-post"];
    title.textContent = config.title;
    fields.innerHTML = config.fields.map(([label,type,placeholder],i) => `<div class="field"><label>${label}</label>${type==="textarea" ? `<textarea name="field${i}" placeholder="${placeholder}" required></textarea>` : `<input name="field${i}" placeholder="${placeholder}" ${kind==="story-archive"?"disabled":"required"}>`}</div>`).join("");
    form.dataset.kind = kind;
    $("#modalBackdrop").classList.add("open");
    $("#modalBackdrop").setAttribute("aria-hidden","false");
  }
  function closeModal() {
    $("#modalBackdrop").classList.remove("open");
    $("#modalBackdrop").setAttribute("aria-hidden","true");
    $("#modalForm").reset();
  }
  document.addEventListener("click", e => {
    const pageBtn = e.target.closest("[data-page]");
    if (pageBtn) { e.preventDefault(); showPage(pageBtn.dataset.page); return; }
    const actionBtn = e.target.closest("[data-action]");
    if (actionBtn) { openModal(actionBtn.dataset.action); return; }
    const demo = e.target.closest("[data-demo]");
    if (demo) { toast("Esta acción se activará al conectar Supabase."); return; }
  });
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", e => { if (e.target.id === "modalBackdrop") closeModal(); });
  $("#modalForm").addEventListener("submit", e => {
    e.preventDefault();
    const kind = e.currentTarget.dataset.kind;
    if (kind === "story-archive") { toast("El archivo estará disponible al conectar tu cuenta."); closeModal(); return; }
    toast("Borrador preparado. La publicación real requiere conectar Supabase.");
    closeModal();
  });
  $$(".tab").forEach(tab => tab.addEventListener("click", () => {
    $$(".tab").forEach(t => t.classList.toggle("active", t === tab));
    toast("El feed se filtrará cuando se conecte tu cuenta.");
  }));
  $("#searchButton").addEventListener("click", runSearch);
  $("#globalSearch").addEventListener("keydown", e => { if (e.key === "Enter") runSearch(); });
  function runSearch() {
    const q = $("#globalSearch").value.trim();
    $("#searchResults").textContent = q ? `La búsqueda de “${q}” estará disponible al conectar Supabase. Solo se mostrarán perfiles y contenido público.` : "Escribe algo para comenzar tu búsqueda.";
  }
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); showPage("search"); $("#globalSearch").focus(); }
    if (e.key === "Escape") closeModal();
  });
  renderPosts("#homePosts");
  renderPosts("#communityPosts");

  async function connectSupabase() {
    const cfg = window.DECK_CONFIG || {};
    const state = $("#connectionState");
    if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      state.innerHTML = "<i></i> Supabase sin configurar";
      return;
    }
    if (!window.supabase?.createClient) {
      state.innerHTML = "<i></i> No se pudo cargar Supabase";
      return;
    }
    try {
      supabaseClient = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
      const { error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      state.innerHTML = "<i style='background:#39c98a'></i> Supabase conectado";
      window.DECK = { supabase: supabaseClient };
    } catch (err) {
      state.innerHTML = "<i></i> Revisar configuración";
      console.error("DECK Supabase:", err.message);
    }
  }
  connectSupabase();
})();