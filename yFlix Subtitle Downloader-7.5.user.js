// ==UserScript==
// @name         yFlix Subtitle Downloader
// @namespace    http://tampermonkey.net/
// @version      7.5
// @description  Hanya memunculkan popup subtitle di halaman /watch/
// @author       Naufal453
// @match        https://yflix.to/watch/*
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @connect      yflix.to
// @connect      thisiscdn.us
// @connect      cc.thisiscdn.us
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    window.debugger = function() {};

    let hasLoaded = false;
    let cachedSubs = [];
    let lastUrl = location.href;

    const getMovieTitle = () => {
        const titleEl = document.querySelector('h1[itemprop="name"]');
        if (titleEl) {
            return titleEl.innerText.trim().replace(/[<>:"/\\|?*]/g, '');
        }
        return "Subtitle";
    };

    const createUI = () => {
        // Validasi tambahan: hanya buat UI jika URL mengandung '/watch/'
        if (!location.pathname.includes('/watch/')) return;

        if (document.getElementById('yflix-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'yflix-wrapper';
        wrapper.style = 'position:fixed; top:100px; right:20px; z-index:999999; background:rgba(0,0,0,0.95); border:1px solid #0f0; border-radius:8px; color:#0f0; width:220px; font-family:sans-serif; overflow:hidden; box-shadow:0 0 15px rgba(0,255,0,0.5);';

        const header = document.createElement('div');
        header.style = 'padding:10px; background:#0f0; color:#000; font-weight:bold; cursor:pointer; display:flex; justify-content:space-between; align-items:center;';
        header.innerHTML = '<span>SUBTITLES</span> <span id="yflix-toggle">−</span>';

        const content = document.createElement('div');
        content.id = 'yflix-content';
        content.style = 'padding:10px; max-height:400px; overflow-y:auto;';
        content.innerHTML = '<div style="font-size:11px; color:#aaa;">Searching tracks...</div>';

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        document.body.appendChild(wrapper);

        header.onclick = () => {
            const isMin = content.style.display === 'none';
            content.style.display = isMin ? 'block' : 'none';
            document.getElementById('yflix-toggle').innerText = isMin ? '−' : '+';
        };

        if (cachedSubs.length > 0) bindButtons();
    };

    const forceDownload = (url, filename) => {
        const status = document.getElementById('yflix-content');
        const originalContent = status.innerHTML;
        status.innerHTML = `<div style="text-align:center; padding:10px; color:yellow;">Saving...</div>`;

        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            responseType: "blob",
            onload: function(response) {
                const blob = response.response;
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();

                setTimeout(() => {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(blobUrl);
                    status.innerHTML = `<div style="text-align:center; padding:10px; color:#0f0;">Done!</div>`;
                    setTimeout(() => { status.innerHTML = originalContent; bindButtons(); }, 1500);
                }, 100);
            }
        });
    };

    const bindButtons = () => {
        const container = document.getElementById('yflix-content');
        if (!container) return;
        container.innerHTML = '';
        const movieTitle = getMovieTitle();

        cachedSubs.forEach((s) => {
            const btn = document.createElement('button');
            btn.innerText = `⬇ ${s.label}`;
            btn.style = 'display:block; width:100%; margin-bottom:6px; background:#111; color:#0f0; border:1px solid #333; padding:8px; cursor:pointer; font-size:12px; text-align:left; border-radius:4px;';
            btn.onclick = () => forceDownload(s.file, `${movieTitle}_${s.label}.vtt`);
            container.appendChild(btn);
        });
    };

    const fetchSubtitles = (apiUrl) => {
        if (hasLoaded) return;
        hasLoaded = true;
        GM_xmlhttpRequest({
            method: "GET",
            url: apiUrl,
            onload: (res) => {
                try {
                    cachedSubs = JSON.parse(res.responseText);
                    bindButtons();
                } catch (e) { hasLoaded = false; }
            }
        });
    };

    const monitor = () => {
        // Jika navigasi keluar dari halaman watch, hapus UI
        if (!location.pathname.includes('/watch/')) {
            const wrapper = document.getElementById('yflix-wrapper');
            if (wrapper) wrapper.remove();
            hasLoaded = false;
            cachedSubs = [];
            return;
        }

        if (location.href !== lastUrl) {
            lastUrl = location.href;
            hasLoaded = false;
            cachedSubs = [];
            createUI();
        }

        createUI();

        if (hasLoaded) return;
        const iframe = document.querySelector('iframe[src*="sub.list="]');
        if (iframe) {
            const params = new URLSearchParams(iframe.src.split('?')[1]);
            const subListUrl = params.get('sub.list');
            if (subListUrl) fetchSubtitles(subListUrl);
        }
    };

    setInterval(monitor, 2000);
})();