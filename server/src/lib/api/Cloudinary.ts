import {InternalServerErrorException} from "@nestjs/common";
// eslint-disable-next-line
const cloudinary = require("cloudinary");

export class Cloudinary {

    private cloudinaryOptions = {
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        cloud_name: process.env.CLOUDINARY_NAME,
        folder: "TH_Assets/"
    }

    async upload(image: string) {
        const res = await cloudinary.v2.uploader.upload(image, {
            ...this.cloudinaryOptions,
            width: 720, height: 720,
        });

        return { imageUrl: res.secure_url, publicId: res.public_id };
    }

    async update(oldImagePublicId: string, newImage: string){
        const deletionResponse = await cloudinary.v2.uploader.destroy(oldImagePublicId, this.cloudinaryOptions);
        if(deletionResponse.result !== "ok"){
            throw new InternalServerErrorException("Failed to update image on cloudinary!")
        }
        const uploadedResponse = await cloudinary.v2.uploader.upload(newImage, {
            ...this.cloudinaryOptions,
            width: 720, height: 720,
        });

        return { imageUrl: uploadedResponse.secure_url, publicId: uploadedResponse.public_id };
    }
};
