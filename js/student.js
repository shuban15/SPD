import { studentData, uploadReport, getStudentUploads } from "./firebase.js?v=2";

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

async function renderHistory() {
  const container = document.getElementById('uploadHistory');
  
  try {
    const uploads = await getStudentUploads(currentStudent.rollNo);

    if (uploads.length === 0) {
      container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No reports uploaded yet.</div>`;
      return;
    }

    container.innerHTML = uploads.map(upload => `
      <div class="history-item">
        <div>
          <div style="font-weight: 600;">${upload.fileName}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${upload.timestamp}</div>
        </div>
        <a href="${upload.fileUrl}" target="_blank" rel="noopener">Download</a>
      </div>
    `).join('');
  } catch (error) {
    console.error('Could not load upload history:', error);
    container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">Could not load submission history.</div>`;
  }
}

window.handleFileUpload = async function(e) {
  const file = e.target.files[0];
  if (!file || !currentStudent) return;

  try {
    await uploadReport(currentStudent.rollNo, file);
    await renderHistory();
  } catch (error) {
    console.error('Could not upload file:', error);
    alert(error.message || 'Upload failed. Please try again.');
  } finally {
    e.target.value = '';
  }
};