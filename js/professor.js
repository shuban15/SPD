import { studentData, getAllUploads } from "./firebase.js";

let cachedUploads = {};

window.addEventListener('DOMContentLoaded', () => {
  const pass = prompt("Enter Master Password:");
  if (pass === "admin123") {
    // 1. Render student sidebar immediately so names are visible right away
    renderProfSidebar();

    // 2. Load Firestore uploads in background to update counts
    loadUploadsInBackground();
  } else {
    alert("Incorrect Password!");
    window.location.href = "index.html";
  }
});

function renderProfSidebar() {
  const sidebar = document.getElementById('profSidebar');
  sidebar.innerHTML = studentData.map(s => {
    const count = (cachedUploads[s.rollNo] || []).length;
    return `
      <div class="sidebar-item" data-roll="${s.rollNo}">
        <div style="font-weight:600;">${s.name}</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">${s.rollNo} • <span class="count-label">${count} files</span></div>
      </div>
    `;
  }).join('');

  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', function() {
      selectProfStudent(this.getAttribute('data-roll'), this);
    });
  });
}

async function loadUploadsInBackground() {
  try {
    cachedUploads = await getAllUploads();
    // Update count labels without redrawing the whole DOM
    studentData.forEach(s => {
      const count = (cachedUploads[s.rollNo] || []).length;
      const item = document.querySelector(`.sidebar-item[data-roll="${s.rollNo}"] .count-label`);
      if (item) item.innerText = `${count} files`;
    });
  } catch (err) {
    console.warn("Could not fetch Firestore uploads for professor panel:", err);
  }
}

function selectProfStudent(rollNo, el) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');

  const student = studentData.find(s => s.rollNo === rollNo);
  const uploads = cachedUploads[rollNo] || [];
  const panel = document.getElementById('profPreview');

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3>${student.name}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">Roll No: ${student.rollNo}</p>
      </div>
      ${uploads.length > 0 ? `<button class="btn btn-primary" id="btnZipSingle">Download Student ZIP</button>` : ''}
    </div>
    <h4>Uploaded Files:</h4>
    <div class="history-list" style="margin-top:10px;">
      ${uploads.length === 0 ? '<div style="padding:15px; color:var(--text-muted);">No uploads found.</div>' : 
        uploads.map(u => `
          <div class="history-item">
            <div>
              <div style="font-weight:600;">${u.fileName}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">${u.timestamp}</div>
            </div>
            <a class="btn" href="${u.fileUrl}" target="_blank" download="${u.fileName}">Download</a>
          </div>
        `).join('')}
    </div>
  `;

  const btnSingle = document.getElementById('btnZipSingle');
  if (btnSingle) {
    btnSingle.addEventListener('click', () => downloadStudentZip(rollNo));
  }
}

async function downloadStudentZip(rollNo) {
  const student = studentData.find(s => s.rollNo === rollNo);
  const uploads = cachedUploads[rollNo] || [];
  if (uploads.length === 0) return alert("No files to zip!");

  const zip = new JSZip();
  for (const u of uploads) {
    const res = await fetch(u.fileUrl);
    const blob = await res.blob();
    zip.file(u.fileName, blob);
  }

  const zipBlob = await zip.generateAsync({type:"blob"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = `${student.name.replace(/\s+/g, '_')}_${rollNo}.zip`;
  link.click();
}

window.downloadClassZip = async function() {
  const zip = new JSZip();
  let hasFiles = false;

  for (const s of studentData) {
    const studentFiles = cachedUploads[s.rollNo] || [];
    if (studentFiles.length > 0) {
      hasFiles = true;
      const folder = zip.folder(`${s.rollNo}_${s.name.replace(/\s+/g, '_')}`);
      for (const u of studentFiles) {
        const res = await fetch(u.fileUrl);
        const blob = await res.blob();
        folder.file(u.fileName, blob);
      }
    }
  }

  if (!hasFiles) return alert("No uploaded files found in the system!");

  const zipBlob = await zip.generateAsync({type:"blob"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = `SPD_Class_Semester_2_Reports.zip`;
  link.click();
};