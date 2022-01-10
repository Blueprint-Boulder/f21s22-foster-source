import { ImageUtils } from './ImageUtils';

const MockFile = ({ name = 'file.txt', size = 1024, type = 'plain/txt', lastModified = new Date() }) => {
  const blob = new Blob(['a'.repeat(size)], { type });

  // @ts-ignore
  blob.lastModifiedDate = lastModified;

  return new File([blob], name);
};

export const validPngUrl = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6BAMAAAB6wkcOAAAACXBIWXMAABJ0AAASdAHeZh94AAAALVBMVEX///8AAAD9/f3+/v78/PzAwMDr6+vm5ubo6OikpKTy8vLd3d3z8/PCwsKfn59LkXtiAAAApUlEQVR42u3dAQ2CUBRA0VfBClawghWsYAUrWMEKVrCCFaxgBjIw3e6UcwrcfWDsA29jdqVRV1dXV1dXV1f/Vh0AAIC19qV47Y/SvErzLMXn/VByywGws/rbndW5NKfSXEqueQAAAFY4luK130pzLcVH3ncZAACA37Ll57h7ad4l76w2yqSTSSeTTiadAAAAAAAAAAAAYMv8V0hdXV1dXV1dXf1jCx5J3r37xYaYAAAAAElFTkSuQmCC`;
const validJpgUrl = `data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIAPoA+gMBIgACEQEDEQH/xAAZAAEBAAMBAAAAAAAAAAAAAAAABQEICQT/2gAIAQEAAAAA5/gAAAAAAAAADoOAAAAA33AAAAAAAAAAAAAAABIAAAAAVwAAAAEgAAAABWAAAAAZAAAAAAAAAAEkAAAABWAAAAAAAAAAAAAAABgAAAABFAAAAAekAAAABSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqUAAAAA5bAAAAAAAAAAAAAAAA//8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAhAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/xAAbEAADAQEBAQEAAAAAAAAAAAARFRYYE2BQgP/aAAgBAQABAgDwGEcI4RwjhHCOEcI4RwjhHCOEcI4RwjhHCOEcI4RwjhHCOEcI4RwjhHCOEcI+AJJJJJJJJJJJJJJJJVKlSpUqVKlSpUqVKlSpUqVKlSpUqVKlSpUqVKvgNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGjRo0aNGgAAAAAAAAAAAAAAAHgKampqampqampqampqampqampqampqampqampqampqam9B27du3bt27du3bt27du3bt27du3bt27du3bt27JkyZMmTJkyZMmTJkyZMmTJkyZMmTJkyZMmTJk0/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P/iDbm3Nubc25tzbm3Nubc25tzbm3Nubc25tzbm3Nubc25tzbm3Nubc25tzbm3PQf//EACkQAAADBwIHAQEBAAAAAAAAAAAEVQECAwWSlNEGUgdnkaXT1ORgUID/2gAIAQEAAz8A/Ac1Ox/UOanY/qHNTsf1Dmp2P6hzU7H9Q5qdj+oc1Ox/UOanY/qHNTsf1Dmp2P6hzU7H9Q5qdj+oc1Ox/UOanY/qHNTsf1Dmp2P6hzU7H9Q5qdj+oc1Ox/UOanY/qHNTsf1Dmp2P6hzU7H9Q5qdj+oc1Ox/UOanY/qHNTsf1Dmp2P6hzU7H9Q5qdj+oc1Ox/UOanY/q/AsDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4BldmFTuAZXZhU7gGV2YVO4/gnkE91cyDyCe6uZB5BPdXMg8gnurmQeQT3VzIPIJ7q5kHkE91cyDyCe6uZB5BPdXMg8gnurmQeQT3VzIPIJ7q5kHkE91cyDyCe6uZB5BPdXMg8gnurmQeQT3VzIPIJ7q5kHkE91cyDyCe6uZB5BPdXMg8gnurmQeQT3VzIPIJ7q5kHkE91cyDyCe6uZB5BPdXMg8gnurmQeQT3VzIPIJ7q5kHkE91cyDyCe6uZDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz8DLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXjEs3GbI14xLNxmyNeMSzcZsjXj/Qw97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MEPe7UwQ97tTBD3u1MGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYGmkmWW8DA00kyy3gYEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXpEoTS9IlCaXp/xDwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2RwpQNWWhP2f0P/8QAFBEBAAAAAAAAAAAAAAAAAAAAgP/aAAgBAgEBPwAAf//EABQRAQAAAAAAAAAAAAAAAAAAAID/2gAIAQMBAT8AAH//2Q==`;

describe('ImageUtils', () => {
  describe('validateImage', () => {
    it('should return a string error if invalid type', async () => {
      const textFile = MockFile({});
      const actual = await ImageUtils.validateImage({ width: 250, height: 250 }, 5, textFile);
      expect(actual).toEqual(ImageUtils.TYPE_ERROR);
    });
    it('should allow png', async () => {
      const imageFile = ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png')
      const actual = await ImageUtils.validateImage({ height: 250, width: 250 }, 5, imageFile);
      expect(actual).toEqual(undefined);
    });
    it('should allow jpg', async () => {
      const imageFile = ImageUtils.dataUrlToImageFile(validJpgUrl, 'image.jpg')
      const actual = await ImageUtils.validateImage({ height: 250, width: 250 }, 5, imageFile);
      expect(actual).toEqual(undefined);
    });
    it('should return a string error if invalid size', async () => {
      const imageFile = ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png')
      const actual = await ImageUtils.validateImage({ height: 250, width: 250 }, 0.0001, imageFile);
      expect(actual).toEqual(ImageUtils.SIZE_ERROR);
    });
    it('should allow file under size limit', async () => {
      const imageFile = ImageUtils.dataUrlToImageFile(validPngUrl, 'image.png')
      const actual = await ImageUtils.validateImage({ height: 250, width: 250 }, 1, imageFile);
      expect(actual === ImageUtils.SIZE_ERROR).toBeFalse();
    });
    it('should return a string error if too small dim', async () => {
      const imageFile = ImageUtils.dataUrlToImageFile(validJpgUrl, 'image.jpg')
      const actual = await ImageUtils.validateImage({ height: 10000, width: 10000 }, 5, imageFile);
      expect(actual).toEqual(ImageUtils.DIM_ERROR);
    });
    it('should return undefined if image ok', async () => {
      const imageFile = ImageUtils.dataUrlToImageFile(validJpgUrl, 'image.jpg')
      const actual = await ImageUtils.validateImage({ height: 100, width: 100 }, 5, imageFile);
      expect(actual).toEqual(undefined);
    });
  });
});
