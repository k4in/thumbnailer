export const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

export const ALLOWED_MIMETYPES = ["video/mp4", "video/quicktime"] as const;

export const ALLOWED_EXTENSIONS = [".mp4", ".mov"] as const;

// Base directory is hardcoded as current project folder
export const BASE_TEMP_DIR = ".";

// Subfolder names are hardcoded
export const VIDEO_SUBFOLDER = "videos";
export const SCREENSHOT_SUBFOLDER = "screenshots";
export const THUMBNAIL_SUBFOLDER = "thumbnails";

