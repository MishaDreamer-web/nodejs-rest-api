const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const { promisify } = require('util');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_CLOUD_KEY,
  api_secret: process.env.API_CLOUD_SECRET,
  secure: true,
});

class UploadFileAvatar {
  constructor(destination) {
    this.destination = destination;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async save(filePath, idUserCloud) {
    const { public_id: returnIdUserCloud, secure_url: avatarUrl } =
      await this.uploadCloud(filePath, {
        public_id: idUserCloud,
        folder: this.destination,
        transformation: { with: 250, height: 250, crop: 'pad' },
      });
    return {
      avatarUrl: avatarUrl,
      returnIdUserCloud: returnIdUserCloud.replace(`${this.destination}/`, ''),
    };
  }
}

module.exports = UploadFileAvatar;
