

class FileHelpers{

    async getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.slice(23));
          reader.onerror = error => reject(error);
        });
    }

}

export default new FileHelpers()