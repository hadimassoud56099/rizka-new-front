import http from "../http-common";

class UploadFilesService {
  upload(projectId, file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("id", projectId);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(projectId) {
    
    return http.get(`/files/${projectId}`);
  }

  downloadFile(projectId,fileName) {
    
    return http.get(`/download/${projectId}/${fileName}`);
  }
}

export default new UploadFilesService();
