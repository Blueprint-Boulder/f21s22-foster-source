export interface Dimensions {
  height: number;
  width: number;
}

export class ImageUtils {
  public static readonly TYPE_ERROR = 'Invalid image type. Please upload a png or jpeg.';
  public static readonly SIZE_ERROR = 'File size was too large to upload.';
  public static readonly DIM_ERROR = 'Please upload an image with larger dimensions';

  public static async validateImage(minDim: Dimensions, maxSizeMb: number, file: File): Promise<string | undefined> {
    if (!ImageUtils.validateType(file)) {
      return ImageUtils.TYPE_ERROR;
    }
    if (!ImageUtils.validateSize(file, maxSizeMb)) {
      return ImageUtils.SIZE_ERROR;
    }
    if (!(await ImageUtils.validateDim(file, minDim))) {
      return ImageUtils.DIM_ERROR;
    }
    return undefined;
  }

  public static getDataUrlFromFile = (file: File) =>
    new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

  public static dataUrlToImageFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');

    const bstr = atob(arr[1]);
    let n = bstr.length;

    const mime = arr[0].match(/:(.*?);/)![1],
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  private static validateType(file: File): boolean {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return file && acceptedImageTypes.includes(file['type']);
  }

  private static async validateDim(file: File, minDim: Dimensions): Promise<boolean> {
    const dim = await ImageUtils.getHeightAndWidthFromDataUrl(await ImageUtils.getDataUrlFromFile(file));
    return !(dim.height < minDim.height || dim.width < minDim.width);
  }

  private static validateSize(file: File, maxSizeMb: number): boolean {
    return ImageUtils.bytesToMb(file.size) <= maxSizeMb;
  }

  private static getHeightAndWidthFromDataUrl = (dataURL: string) =>
    new Promise<Dimensions>((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          height: img.height,
          width: img.width,
        } as Dimensions);
      };
      img.src = dataURL;
    });

  private static bytesToMb(bytes: number): number {
    return bytes / 1024 / 1024;
  }
}
