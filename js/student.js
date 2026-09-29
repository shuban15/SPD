const urlParams = new URLSearchParams(window.location.search);
const rollNo = urlParams.get('rollNo');
const currentStudent = studentData.find(s => s.rollNo === rollNo);

if (!currentStudent) {
  alert('Student not found!');
  window.location.href = 'index.html';
} else {
  document.getElementById('vaultTitle').innerText = currentStudent.name;
  document.getElementById('vaultRoll').innerText = `Roll No: ${currentStudent.rollNo}`;
  renderHistory();
}

function renderHistory() {
  const uploads = getStorageData()[currentStudent.rollNo] || [];
  const container = document.getElementById('uploadHistory');
  
  if (uploads.length === 0) {
    container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No reports uploaded yet.</div>`;
    return;
  }

  container.innerHTML = uploads.map(u => `
    <div class="history-item">
      <div>
        <div style="font-weight: 600;">${u.fileName}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${u.timestamp}</div>
      </div>
    </div>
  `).join('');
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file || !currentStudent) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const uploads = getStorageData();
    if (!uploads[currentStudent.rollNo]) uploads[currentStudent.rollNo] = [];
    
    uploads[currentStudent.rollNo].push({
      fileName: file.name,
      timestamp: new Date().toLocaleString(),
      content: evt.target.result
    });

    saveStorageData(uploads);
    renderHistory();
  };
  reader.readAsDataURL(file);
}