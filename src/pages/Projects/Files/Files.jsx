useEffect(() => {
  expandAllFolders();
}, []);

const handleDrop = async (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  const formData = new FormData();
  [...files].forEach(file => formData.append("files[]", file));
  formData.append("folderId", selectedFolder.id);
  await axios.post('/api/files/upload', formData);
  refreshFolder();
};

const handleSearch = async (query) => {
  const res = await axios.post('/api/file-entry/get-project-file-entry', {
    projectId: currentProject.id,
    query
  });
  setFiles(res.data);
};

const handleDelete = async (id) => {
  await axios.delete(`/api/folders/${id}`);
  refreshFolderTree(); // не перезагружаем всё
};
