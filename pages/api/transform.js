import cloudinary from 'cloudinary';

export default async (req, res) => {
    const { url, angle, flip } = req.body;

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const transformation = flip ? [{ "angle": "hflip" }] : [];
        const result = await cloudinary.v2.uploader.upload(url, { transformation, angle });

        const https_url = result.url.replace("http://", "https://");
        res.status(200).json({ transformedUrl: https_url });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
};
