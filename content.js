const ACTIONS = {
    markAllAsViewed:       () => document.querySelectorAll('.js-reviewed-checkbox').forEach(e => e.checked || e.click()),
    markAllAsNotViewed:    () => document.querySelectorAll('.js-reviewed-checkbox').forEach(e => !e.checked || e.click()),
    markSwiftAsViewed:     () => document.querySelectorAll('[data-file-type=".swift"] .js-reviewed-checkbox').forEach(e => e.checked || e.click()),
    markSwiftAsNotViewed:  () => document.querySelectorAll('[data-file-type=".swift"] .js-reviewed-checkbox').forEach(e => !e.checked || e.click()),
    markKtAsViewed:        () => document.querySelectorAll('[data-file-type=".kt"] .js-reviewed-checkbox').forEach(e => e.checked || e.click()),
    markKtAsNotViewed:     () => document.querySelectorAll('[data-file-type=".kt"] .js-reviewed-checkbox').forEach(e => !e.checked || e.click()),
    loadAllDiffs:        () => document.querySelectorAll('button.load-diff-button').forEach(e => e.click()),
    expandAllComments:   () => document.querySelectorAll('.js-resolvable-timeline-thread-container').forEach(e => e.setAttribute('open', '')),
    collapseAllComments: () => document.querySelectorAll('.js-resolvable-timeline-thread-container').forEach(e => e.removeAttribute('open')),
    expandAllFiles:      () => document.querySelectorAll('.js-file-content').forEach(e => {
                                   const file = e.closest('.js-file');
                                   if (file?.classList.contains('Details--off'))
                                       file.classList.replace('Details--off', 'Details--on');
                               }),
    collapseAllFiles:    () => document.querySelectorAll('.js-file-content').forEach(e => {
                                   const file = e.closest('.js-file');
                                   if (file?.classList.contains('Details--on'))
                                       file.classList.replace('Details--on', 'Details--off');
                               }),
};

chrome.runtime.onMessage.addListener((request) => {
    if (ACTIONS[request.action]) ACTIONS[request.action]();
});

// --- Injected button ---

const WRAPPER_ID = 'gh-ext-wrapper';

const ICONS = {
    eye:        '<path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"/>',
    eyeClosed:  '<path d="M.143 2.31a.75.75 0 0 1 1.047-.167l14.5 10.5a.75.75 0 1 1-.88 1.214l-2.248-1.628C11.346 13.19 9.792 14 8 14c-1.981 0-3.67-.992-4.933-2.078C1.797 10.832.88 9.577.43 8.9a1.619 1.619 0 0 1 0-1.797c.353-.533.995-1.42 1.868-2.305L.31 3.357A.75.75 0 0 1 .143 2.31Zm1.536 5.622A.12.12 0 0 0 1.657 8c0 .021.006.045.022.068.412.621 1.242 1.75 2.366 2.717C5.175 11.758 6.527 12.5 8 12.5c1.195 0 2.31-.488 3.29-1.191L9.063 9.695A2 2 0 0 1 6.058 7.52L3.529 5.688a14.207 14.207 0 0 0-1.85 2.244ZM8 3.5c-.516 0-1.017.09-1.499.251a.75.75 0 1 1-.473-1.423A6.207 6.207 0 0 1 8 2c1.981 0 3.67.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.11.166-.248.365-.41.587a.75.75 0 1 1-1.21-.887c.148-.201.272-.382.371-.53a.119.119 0 0 0 0-.137c-.412-.621-1.242-1.75-2.366-2.717C10.825 4.242 9.473 3.5 8 3.5Z"/>',
    diff:       '<path d="M8.75 1.75V5H12a.75.75 0 0 1 0 1.5H8.75v3.25a.75.75 0 0 1-1.5 0V6.5H4A.75.75 0 0 1 4 5h3.25V1.75a.75.75 0 0 1 1.5 0ZM4 13h8a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 4 13Z"/>',
    unfold:     '<path d="m8.177.677 2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25a.75.75 0 0 1-1.5 0V4H5.104a.25.25 0 0 1-.177-.427L7.823.677a.25.25 0 0 1 .354 0ZM7.25 10.75a.75.75 0 0 1 1.5 0V12h2.146a.25.25 0 0 1 .177.427l-2.896 2.896a.25.25 0 0 1-.354 0l-2.896-2.896A.25.25 0 0 1 5.104 12H7.25v-1.25Zm-5-2a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"/>',
    fold:       '<path d="M10.896 2H8.75V.75a.75.75 0 0 0-1.5 0V2H5.104a.25.25 0 0 0-.177.427l2.896 2.896a.25.25 0 0 0 .354 0l2.896-2.896A.25.25 0 0 0 10.896 2ZM8.75 15.25a.75.75 0 0 1-1.5 0V14H5.104a.25.25 0 0 1-.177-.427l2.896-2.896a.25.25 0 0 1 .354 0l2.896 2.896a.25.25 0 0 1-.177.427H8.75v1.25Zm-6.5-6.5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM6 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 6 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5ZM12 8a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5A.75.75 0 0 1 12 8Zm2.25.75a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 0 0 1.5h.5Z"/>',
};

function makeIcon(path) {
    return `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16" style="flex-shrink:0;fill:currentColor;">${path}</svg>`;
}

function injectStyles() {
    if (document.getElementById('gh-ext-styles')) return;
    const style = document.createElement('style');
    style.id = 'gh-ext-styles';
    style.textContent = `
        #${WRAPPER_ID} {
            margin-left: 8px;
        }
        #${WRAPPER_ID} details {
            position: relative;
            display: inline-block;
        }
        #${WRAPPER_ID} summary.Button {
            background-color: #0969da;
            color: #ffffff;
            border-color: rgba(0, 45, 126, 0.3);
        }
        #${WRAPPER_ID} summary.Button:hover {
            background-color: #0860ca;
            color: #ffffff;
        }
        #${WRAPPER_ID} summary.Button:active {
            background-color: #0757ba;
            color: #ffffff;
        }
        .gh-ext-menu {
            position: absolute;
            top: calc(100% + 4px);
            right: 0;
            z-index: 99;
            min-width: 200px;
            background-color: var(--bgColor-default, #ffffff);
            border: 1px solid var(--borderColor-default, #d0d7de);
            border-radius: 6px;
            box-shadow: var(--shadow-floating-small, 0 8px 24px rgba(140, 149, 159, 0.2));
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .gh-ext-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            padding: 5px 16px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
            text-align: left;
            cursor: pointer;
            border: 1px solid rgba(27, 31, 36, 0.15);
            border-radius: 6px;
            background-color: var(--button-default-bgColor-rest, #f6f8fa);
            color: var(--button-default-fgColor-rest, #24292f);
            box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25);
            transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
            transition-property: color, background-color, box-shadow, border-color;
            white-space: nowrap;
        }
        .gh-ext-btn:hover {
            background-color: var(--button-default-bgColor-hover, #f3f4f6);
            transition-duration: 0.1s;
        }
        .gh-ext-btn:active {
            background-color: var(--button-default-bgColor-active, #ebecf0);
            box-shadow: inset 0 1px 0 rgba(27, 31, 36, 0.2);
            transition: none;
        }
        .gh-ext-btn-primary {
            color: var(--button-primary-fgColor-rest, #ffffff);
            background-color: var(--button-primary-bgColor-rest, #1f883d);
            border-color: rgba(27, 31, 36, 0.15);
            box-shadow: 0 1px 0 rgba(27, 31, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .gh-ext-btn-primary:hover {
            background-color: var(--button-primary-bgColor-hover, #1a7f37);
        }
        .gh-ext-btn-primary:active {
            background-color: var(--button-primary-bgColor-active, #187733);
            box-shadow: inset 0 1px 0 rgba(20, 70, 32, 0.2);
        }
        .gh-ext-btn-swift {
            color: #ffffff;
            background-color: #f05138;
            border-color: rgba(27, 31, 36, 0.15);
            box-shadow: 0 1px 0 rgba(27, 31, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .gh-ext-btn-swift:hover { background-color: #e04830; }
        .gh-ext-btn-swift:active { background-color: #d04020; box-shadow: inset 0 1px 0 rgba(80, 20, 10, 0.2); }
        .gh-ext-btn-swift-muted {
            color: #c03010;
            background-color: #fde8e4;
            border-color: rgba(240, 81, 56, 0.3);
            box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        .gh-ext-btn-swift-muted:hover { background-color: #fbd8d2; }
        .gh-ext-btn-swift-muted:active { background-color: #f9c8c0; box-shadow: inset 0 1px 0 rgba(80, 20, 10, 0.1); }
        .gh-ext-btn-kotlin {
            color: #ffffff;
            background-color: #7f52ff;
            border-color: rgba(27, 31, 36, 0.15);
            box-shadow: 0 1px 0 rgba(27, 31, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .gh-ext-btn-kotlin:hover { background-color: #7045f0; }
        .gh-ext-btn-kotlin:active { background-color: #6138e0; box-shadow: inset 0 1px 0 rgba(30, 10, 80, 0.2); }
        .gh-ext-btn-kotlin-muted {
            color: #5830cc;
            background-color: #ede8ff;
            border-color: rgba(127, 82, 255, 0.3);
            box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        .gh-ext-btn-kotlin-muted:hover { background-color: #e0d8ff; }
        .gh-ext-btn-kotlin-muted:active { background-color: #d3c8ff; box-shadow: inset 0 1px 0 rgba(30, 10, 80, 0.1); }
        .gh-ext-menu-divider {
            height: 1px;
            background-color: var(--borderColor-default, #d0d7de);
            margin: 2px 0;
        }
        .gh-ext-pair-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            padding: 2px 4px;
        }
        .gh-ext-pair-label {
            font-size: 12px;
            font-weight: 500;
            color: var(--fgColor-muted, #57606a);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
        }
        .gh-ext-pair-btns {
            display: flex;
            gap: 4px;
        }
        .gh-ext-btn-icon {
            padding: 5px 10px;
        }
    `;
    document.head.appendChild(style);
}

function injectQuickActionsButton() {
    if (document.getElementById(WRAPPER_ID)) return;

    const reviewsContainer = document.querySelector('.js-reviews-container');
    if (!reviewsContainer) return;

    // Outer wrapper — matches the diffbar-item structure used by sibling elements
    const wrapper = document.createElement('div');
    wrapper.id = WRAPPER_ID;
    wrapper.className = 'diffbar-item';

    // <details> with GitHub's own overlay classes:
    //   details-reset  → removes default <summary> marker
    //   details-overlay → adds a fixed backdrop on summary::before that closes the
    //                     dropdown when clicking outside (z-index 80)
    const details = document.createElement('details');
    details.className = 'details-reset details-overlay';

    // <summary> uses GitHub's current Button ViewComponent classes so it renders
    // identically to other toolbar buttons without any custom trigger styles
    const summary = document.createElement('summary');
    summary.className = 'Button Button--small';
    summary.innerHTML = `
        <span class="Button-content">
            <span class="Button-label">Quick actions</span>
        </span>
        <span class="Button-visual Button-trailingAction">
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-triangle-down">
                <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path>
            </svg>
        </span>`;

    // Dropdown menu panel
    const menu = document.createElement('div');
    menu.className = 'gh-ext-menu';

    const items = [
        { label: 'Mark all as viewed',       action: 'markAllAsViewed',    primary: true, icon: ICONS.eye },
        { label: 'Mark all as not viewed',  action: 'markAllAsNotViewed',               icon: ICONS.eyeClosed },
        { label: 'Mark *.swift as viewed',     action: 'markSwiftAsViewed',    icon: ICONS.eye,       variant: 'swift' },
        { label: 'Mark *.swift as not viewed', action: 'markSwiftAsNotViewed', icon: ICONS.eyeClosed, variant: 'swift-muted' },
        { label: 'Mark *.kt as viewed',        action: 'markKtAsViewed',       icon: ICONS.eye,       variant: 'kotlin' },
        { label: 'Mark *.kt as not viewed',    action: 'markKtAsNotViewed',    icon: ICONS.eyeClosed, variant: 'kotlin-muted' },
        null,
        { label: 'Load all diffs',        action: 'loadAllDiffs',                      icon: ICONS.diff },
        null,
        { type: 'pair', label: 'Comments', expand: 'expandAllComments',  collapse: 'collapseAllComments' },
        { type: 'pair', label: 'Files',    expand: 'expandAllFiles',     collapse: 'collapseAllFiles' },
    ];

    items.forEach(item => {
        if (!item) {
            const divider = document.createElement('div');
            divider.className = 'gh-ext-menu-divider';
            menu.appendChild(divider);
            return;
        }

        if (item.type === 'pair') {
            const row = document.createElement('div');
            row.className = 'gh-ext-pair-row';

            const lbl = document.createElement('span');
            lbl.className = 'gh-ext-pair-label';
            lbl.textContent = item.label;

            const btnGroup = document.createElement('div');
            btnGroup.className = 'gh-ext-pair-btns';

            [
                { iconPath: ICONS.unfold, title: 'Expand',   action: item.expand },
                { iconPath: ICONS.fold,   title: 'Collapse', action: item.collapse },
            ].forEach(({ iconPath, title, action }) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'gh-ext-btn gh-ext-btn-icon';
                btn.title = title;
                btn.innerHTML = makeIcon(iconPath) + title;
                btn.addEventListener('click', () => {
                    ACTIONS[action]();
                    details.removeAttribute('open');
                });
                btnGroup.appendChild(btn);
            });

            row.appendChild(lbl);
            row.appendChild(btnGroup);
            menu.appendChild(row);
            return;
        }

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gh-ext-btn' + (item.primary ? ' gh-ext-btn-primary' : item.variant ? ` gh-ext-btn-${item.variant}` : '');
        btn.innerHTML = makeIcon(item.icon) + item.label;
        btn.addEventListener('click', () => {
            ACTIONS[item.action]();
            details.removeAttribute('open');
        });
        menu.appendChild(btn);
    });

    details.appendChild(summary);
    details.appendChild(menu);
    wrapper.appendChild(details);

    reviewsContainer.after(wrapper);
}

function isPRFilesPage() {
    return GH_EXT_CONFIG.prFilesPathPattern.test(location.pathname);
}

if (isPRFilesPage()) {
    injectStyles();

    let debounceTimer;
    new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(injectQuickActionsButton, 300);
    }).observe(document.body, { childList: true, subtree: true });

    injectQuickActionsButton();
}
