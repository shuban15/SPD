// Authenticate Professor on page load
window.addEventListener('DOMContentLoaded', () => {
  const pass = prompt("Enter Master Password:");
  if (pass === "admin123") {
    renderProfSidebar();
  } else {
    alert("Incorrect Password!");
    window.location.href = "index.html";
  }
});

function renderProfSidebar() {
  const uploads = getStorageData();
  const sidebar = document.getElementById('profSidebar');
  
  sidebar.innerHTML = studentData.map(s => {
    const count = (uploads[s.rollNo] || []).length;
    return `
      <div class="sidebar-item" onclick="selectProfStudent('${s.rollNo}', this)">
        <div style="font-weight:600;">${s.name}</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">${s.rollNo} • ${count} files</div>
      </div>
    `;
  }).join('');
}

function selectProfStudent(rollNo, el) {
  document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');

  const student = studentData.find(s => s.rollNo === rollNo);
  const uploads = getStorageData()[rollNo] || [];
  const panel = document.getElementById('profPreview');

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <div>
        <h3>${student.name}</h3>
        <p style="color:var(--text-muted); font-size:0.9rem;">Roll No: ${student.rollNo}</p>
      </div>
      ${uploads.length > 0 ? `<button class="btn btn-primary" onclick="downloadStudentZip('${rollNo}')">Download Student ZIP</button>` : ''}
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
            <a class="btn" href="${u.content}" download="${u.fileName}">Download</a>
          </div>
        `).join('')}
    </div>
  `;
}

async function downloadStudentZip(rollNo) {
  const student = studentData.find(s => s.rollNo === rollNo);
  const uploads = getStorageData()[rollNo] || [];
  if (uploads.length === 0) return alert("No files to zip!");

  const zip = new JSZip();
  uploads.forEach(u => {
    const base64Data = u.content.split(',')[1];
    zip.file(u.fileName, base64Data, {base64: true});
  });

  const blob = await zip.generateAsync({type:"blob"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${student.name.replace(/\s+/g, '_')}_${rollNo}.zip`;
  link.click();
}

async function downloadClassZip() {
  const uploads = getStorageData();
  const zip = new JSZip();
  let hasFiles = false;

  studentData.forEach(s => {
    const studentFiles = uploads[s.rollNo] || [];
    if (studentFiles.length > 0) {
      hasFiles = true;
      const folder = zip.folder(`${s.rollNo}_${s.name.replace(/\s+/g, '_')}`);
      studentFiles.forEach(u => {
        const base64Data = u.content.split(',')[1];
        folder.file(u.fileName, base64Data, {base64: true});
      });
    }
  });

  if (!hasFiles) return alert("No uploaded files found in the system!");

  const blob = await zip.generateAsync({type:"blob"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `SPD_Class_Semester_2_Reports.zip`;
  link.click();
}