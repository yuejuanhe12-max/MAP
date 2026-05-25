/**
 * 北师香港浸会大学 · 校园服务 SPA
 */

(function () {
  const views = {
    home: document.getElementById('view-home'),
    'lost-found': document.getElementById('view-lost-found'),
    faculties: document.getElementById('view-faculties'),
    'scc-faculty': document.getElementById('view-scc-faculty'),
  };

  let currentView = 'home';
  let lostItems = [...LOST_ITEMS];
  let selectedLocationId = null;

  const hotspotsLayer = document.getElementById('hotspots-layer');
  const pillarsLayer = document.getElementById('pillars-layer');
  const lostFilter = document.getElementById('lost-filter');

  const itemModal = document.getElementById('item-modal');
  const itemModalBody = document.getElementById('item-modal-body');
  const locationModal = document.getElementById('location-modal');
  const locationModalTitle = document.getElementById('location-modal-title');
  const locationStats = document.getElementById('location-stats');
  const locationItemsList = document.getElementById('location-items-list');
  const submitModal = document.getElementById('submit-modal');
  const submitForm = document.getElementById('submit-lost-form');
  const formLocationId = document.getElementById('form-location-id');
  const formLocationSelect = document.getElementById('form-location-select');
  const formLocationHint = document.getElementById('form-location-hint');

  function fillLocationSelect(selectedId) {
    formLocationSelect.innerHTML =
      '<option value="">— 请选择建筑 —</option>' +
      CAMPUS_LOCATIONS.map(
        (l) => `<option value="${l.id}" ${l.id === selectedId ? 'selected' : ''}>${l.name}</option>`
      ).join('');
  }
  fillLocationSelect();

  // ---------- 路由 ----------
  function navigateTo(viewId) {
    if (!views[viewId]) return;
    views[currentView]?.classList.remove('active');
    currentView = viewId;
    views[viewId].classList.add('active');
    const isMapView = viewId === 'home' || viewId === 'lost-found';
    document.body.classList.toggle('mode-map', isMapView);
    document.body.classList.toggle('mode-content', !isMapView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewId === 'lost-found') renderLostFoundMap();
    if (viewId === 'faculties') renderFacultyGrid();
    if (viewId === 'scc-faculty') renderSccFaculty();
  }

  document.querySelectorAll('[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
  });

  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.back));
  });

  // ---------- 失物统计 ----------
  function getItemsByLocation(locationId, filter = lostFilter.value) {
    let items = lostItems.filter((i) => i.locationId === locationId);
    if (filter === 'lost') items = items.filter((i) => i.status === 'lost');
    if (filter === 'found') items = items.filter((i) => i.status === 'found');
    return items;
  }

  function getLocationCounts(locationId) {
    const all = lostItems.filter((i) => i.locationId === locationId);
    const lost = all.filter((i) => i.status === 'lost').length;
    const found = all.filter((i) => i.status === 'found').length;
    return { lost, found, total: all.length };
  }

  /** 柱高度：真实数据 + 演示随机基数 */
  function getPillarCount(loc) {
    const { lost, found, total } = getLocationCounts(loc.id);
    const filter = lostFilter.value;
    if (filter === 'lost') return lost || (total === 0 ? Math.floor(loc.demoCount * 0.6) : 0);
    if (filter === 'found') return found;
    return total > 0 ? total : loc.demoCount;
  }

  const homeMarkersLayer = document.getElementById('home-markers-layer');

  function layoutMapLayer(layer) {
    if (!layer || typeof MapCoords === 'undefined') return;
    const rect = MapCoords.getRectForLayer(layer);
    if (!rect) return;

    layer.querySelectorAll('[data-px][data-py]').forEach((el) => {
      MapCoords.applyPoint(el, parseFloat(el.dataset.px, 10), parseFloat(el.dataset.py, 10), rect);
    });

    layer.querySelectorAll('.location-hotspot[data-location-id]').forEach((el) => {
      const loc = getLocationById(el.dataset.locationId);
      if (loc) MapCoords.applyHotspot(el, loc, rect);
    });
  }

  function layoutAllMapOverlays() {
    layoutMapLayer(pillarsLayer);
    layoutMapLayer(hotspotsLayer);
    layoutMapLayer(homeMarkersLayer);
  }

  // ---------- 渲染失物招领地图层 ----------
  function renderLostFoundMap() {
    renderPillars();
    renderHotspots();
    layoutMapLayer(pillarsLayer);
    layoutMapLayer(hotspotsLayer);
  }

  function renderPillars() {
    pillarsLayer.innerHTML = CAMPUS_LOCATIONS.map((loc) => {
      const count = getPillarCount(loc);
      if (count <= 0) return '';
      const height = Math.min(24 + count * 14, 140);
      const { lost, found } = getLocationCounts(loc.id);
      const hasReal = lost + found > 0;
      const typeClass = hasReal && found > 0 && lost === 0 ? 'pillar-found' : 'pillar-lost';
      return `
        <div class="item-pillar ${typeClass}" data-px="${loc.posX}" data-py="${loc.posY}" style="--pillar-h:${height}px" title="${loc.name}：${count} 件">
          <div class="pillar-bar"></div>
          <span class="pillar-count">${count}</span>
        </div>
      `;
    }).join('');
  }

  function renderHotspots() {
    hotspotsLayer.innerHTML = CAMPUS_LOCATIONS.map(
      (loc) => `
      <button
        type="button"
        class="location-hotspot"
        data-location-id="${loc.id}"
        aria-label="${loc.name}，点击查看失物"
      >
        <span class="hotspot-label">${loc.name}</span>
      </button>
    `
    ).join('');

    hotspotsLayer.querySelectorAll('.location-hotspot').forEach((btn) => {
      btn.addEventListener('click', () => openLocationModal(btn.dataset.locationId));
    });
  }

  lostFilter.addEventListener('change', renderLostFoundMap);

  // ---------- 地点弹窗 ----------
  function openLocationModal(locationId) {
    const loc = getLocationById(locationId);
    if (!loc) return;
    selectedLocationId = locationId;

    const items = getItemsByLocation(locationId, 'all');
    const { lost, found } = getLocationCounts(locationId);
    const displayCount = getPillarCount(loc);

    locationModalTitle.textContent = loc.name;
    locationStats.textContent =
      items.length > 0
        ? `未寻回 ${lost} 件 · 已寻回 ${found} 件 · 区域积累 ${displayCount} 件`
        : `演示数据：该区域约 ${loc.demoCount} 件失物记录（可点击下方登记）`;

    if (items.length === 0) {
      locationItemsList.innerHTML =
        '<li class="empty-hint">暂无登记记录，点击下方按钮添加第一条失物信息。</li>';
    } else {
      locationItemsList.innerHTML = items
        .map(
          (item) => `
        <li>
          <button type="button" class="location-item-btn" data-item-id="${item.id}">
            <span class="item-name">${item.name}</span>
            <span class="status-badge ${item.status}">${item.status === 'lost' ? '未寻回' : '已寻回'}</span>
          </button>
        </li>
      `
        )
        .join('');

      locationItemsList.querySelectorAll('.location-item-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const item = lostItems.find((i) => i.id === btn.dataset.itemId);
          if (item) {
            closeModal(locationModal);
            openItemModal(item);
          }
        });
      });
    }

    locationModal.classList.remove('hidden');
  }

  document.getElementById('btn-add-at-location').addEventListener('click', () => {
    if (selectedLocationId) {
      closeModal(locationModal);
      openSubmitModal(selectedLocationId);
    }
  });

  // ---------- 单条失物弹窗 ----------
  function openItemModal(item) {
    const loc = getLocationById(item.locationId);
    const place = loc ? loc.name : item.claimLocation || '—';

    if (item.status === 'lost') {
      itemModalBody.innerHTML = `
        <h3>${item.name}</h3>
        <span class="status-badge lost">未寻回</span>
        <dl>
          <dt>丢失地点</dt><dd>${place}</dd>
          <dt>丢失时间</dt><dd>${item.lostTime}</dd>
          <dt>联系方式</dt><dd>${item.contact || '—'}</dd>
          ${item.note ? `<dt>备注</dt><dd>${item.note}</dd>` : ''}
        </dl>
      `;
    } else {
      itemModalBody.innerHTML = `
        <h3>${item.name}</h3>
        <span class="status-badge found">已寻回</span>
        <dl>
          <dt>地点</dt><dd>${place}</dd>
          <dt>寻回时间</dt><dd>${item.foundTime}</dd>
          <dt>认领状态</dt><dd>${item.claimStatus}</dd>
        </dl>
      `;
    }
    itemModal.classList.remove('hidden');
  }

  function closeModal(el) {
    el.classList.add('hidden');
  }

  itemModal.querySelector('.modal-close').addEventListener('click', () => closeModal(itemModal));
  itemModal.addEventListener('click', (e) => {
    if (e.target === itemModal) closeModal(itemModal);
  });

  locationModal.querySelector('.modal-close').addEventListener('click', () => closeModal(locationModal));
  locationModal.addEventListener('click', (e) => {
    if (e.target === locationModal) closeModal(locationModal);
  });

  // ---------- 提交失物 ----------
  function openSubmitModal(locationId) {
    const loc = locationId ? getLocationById(locationId) : null;
    selectedLocationId = locationId || null;
    formLocationId.value = locationId || '';
    fillLocationSelect(locationId || '');
    formLocationHint.textContent = loc
      ? `登记地点：${loc.name}`
      : '可点击地图建筑区域，或在下方下拉选择地点';
    submitModal.classList.remove('hidden');
  }

  formLocationSelect.addEventListener('change', () => {
    const id = formLocationSelect.value;
    formLocationId.value = id;
    selectedLocationId = id || null;
    const loc = getLocationById(id);
    if (loc) formLocationHint.textContent = `登记地点：${loc.name}`;
  });

  document.getElementById('btn-submit-lost').addEventListener('click', () => openSubmitModal(selectedLocationId));

  submitModal.querySelector('.modal-close').addEventListener('click', () => closeModal(submitModal));
  submitModal.querySelector('.modal-cancel').addEventListener('click', () => closeModal(submitModal));
  submitModal.addEventListener('click', (e) => {
    if (e.target === submitModal) closeModal(submitModal);
  });

  submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(submitForm);
    const locationId = fd.get('locationId') || fd.get('locationSelect') || selectedLocationId;
    if (!locationId) {
      alert('请选择丢失地点（点击地图建筑或下拉选择）。');
      return;
    }
    const loc = getLocationById(locationId);
    const lostTime = String(fd.get('lostTime')).replace('T', ' ');
    const newItem = {
      id: `lf-${Date.now()}`,
      locationId,
      name: fd.get('name'),
      status: 'lost',
      lostTime,
      contact: fd.get('contact'),
      claimLocation: loc ? loc.name : '',
      note: fd.get('note') || '',
    };
    lostItems.push(newItem);
    renderLostFoundMap();
    closeModal(submitModal);
    submitForm.reset();
    formLocationId.value = '';
    openLocationModal(locationId);
  });

  // ---------- 学部 / 师资（保持不变）----------
  function renderFacultyGrid() {
    const grid = document.getElementById('faculty-grid');
    grid.innerHTML = FACULTIES.map(
      (f) => `
      <article class="faculty-card ${f.clickable ? 'clickable' : 'static'}" data-id="${f.id}" ${f.clickable ? 'tabindex="0" role="button"' : ''}>
        <div class="faculty-card-logo">${f.code}</div>
        <h3 class="faculty-card-title">${f.name}</h3>
        <p class="faculty-card-code">${f.code} · ${f.nameEn}</p>
        <p class="faculty-card-desc">${f.desc}</p>
        ${f.clickable ? '<span class="faculty-card-hint">点击查看师资 →</span>' : '<span class="faculty-card-hint muted">详情筹备中</span>'}
      </article>
    `
    ).join('');

    grid.querySelectorAll('.faculty-card.clickable').forEach((card) => {
      card.addEventListener('click', () => navigateTo('scc-faculty'));
      card.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          navigateTo('scc-faculty');
        }
      });
    });
  }

  function renderSccFaculty() {
    const list = document.getElementById('scc-faculty-list');
    list.innerHTML = SCC_FACULTY.map(
      (t) => `
      <article class="teacher-card">
        <div class="teacher-info">
          <h2 class="teacher-name">${t.name}</h2>
          <p class="teacher-title">${t.title}</p>
          <div class="teacher-module">
            <span class="module-icon" aria-hidden="true">💡</span>
            <div>
              <h4>个人简介</h4>
              ${t.bio.map((p) => `<p>${p}</p>`).join('')}
            </div>
          </div>
          <div class="teacher-module">
            <span class="module-icon" aria-hidden="true">📄</span>
            <div>
              <h4>研究领域</h4>
              ${t.research.map((r) => `<p>${r}</p>`).join('')}
            </div>
          </div>
          <div class="teacher-module">
            <span class="module-icon" aria-hidden="true">✉️</span>
            <div>
              <h4>联系方式</h4>
              <p><a href="mailto:${t.email}" class="email-link">${t.email}</a></p>
            </div>
          </div>
        </div>
        <div class="teacher-avatar-wrap">
          <div class="teacher-avatar${t.photo ? ' has-photo' : ''}" aria-label="${t.name} 头像">
            ${
              t.photo
                ? `<img src="${t.photo}" alt="${t.name}" width="180" height="180">`
                : t.avatar
            }
          </div>
        </div>
      </article>
    `
    ).join('');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(itemModal);
      closeModal(locationModal);
      closeModal(submitModal);
    }
  });

  // 禁止失物页地图拖动（兜底）
  const lostViewport = document.getElementById('lost-map-viewport');
  if (lostViewport) {
    ['wheel', 'touchmove'].forEach((evt) => {
      lostViewport.addEventListener(
        evt,
        (e) => {
          if (e.target.closest('.location-hotspot, .map-floating-toolbar, .modal-overlay')) return;
          e.preventDefault();
        },
        { passive: false }
      );
    });
  }

  function renderHomeMarkers() {
    const layer = document.getElementById('home-markers-layer');
    if (!layer || typeof HOME_MARKERS === 'undefined') return;
    layer.innerHTML = HOME_MARKERS.map(
      (m) => `
      <span
        class="home-red-marker"
        style="left:${m.posX}%;top:${m.posY}%;"
        data-label="${m.name}"
        title="${m.name}"
      ></span>
    `
    ).join('');
  }

  renderHomeMarkers();
  renderFacultyGrid();
})();
