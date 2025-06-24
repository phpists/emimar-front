import { fileIcons } from "../сonstats";

export const getFileIcon = (extension) => {
  const ext = extension?.toLowerCase();

  if (ext === "folder") {
    return fileIcons.folder;
  }
  if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext)) {
    return fileIcons.image;
  }
  if (["xls", "xlsm", "xlsb", "xlsx"].includes(ext)) {
    return fileIcons.spreadsheet;
  }
  if (["doc", "docx", "rtf", "txt"].includes(ext)) {
    return fileIcons.document;
  }
  if (["pdf"].includes(ext)) {
    return fileIcons.pdf;
  }
  if (["zip", "rar", "7z"].includes(ext)) {
    return fileIcons.zip;
  }
  if (["dwg"].includes(ext)) {
    return fileIcons.dwg;
  }
  if (["dxf"].includes(ext)) {
    return fileIcons.dxf;
  }
  if (["ifc"].includes(ext)) {
    return fileIcons.ifc;
  }
  if (["bimx"].includes(ext)) {
    return fileIcons.bimx;
  }
  if (["pln"].includes(ext)) {
    return fileIcons.archicad;
  }
  if (["edoc"].includes(ext)) {
    return fileIcons.sign;
  }
  // fallback icon
  return fileIcons.default;
};

export const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};
