import axios from 'axios';

export const searchProjectFiles = async (projectId, query) => {
  const res = await axios.post('/api/file-entry/get-project-file-entry', {
    projectId,
    query,
  });
  return res.data;
};
