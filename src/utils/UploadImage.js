import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const uploadImage = async (image) => {
    const formData = new FormData();

    formData.append("image", image);

    return await Axios({
        ...SummaryApi.uploadImage,
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export default uploadImage;