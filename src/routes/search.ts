import { reduce } from 'lodash';
import { App } from '../App';

interface IVideoItem {
  videoId: string;
  title: string;
  thumbnail: string;
}

module.exports = {
  get: async (req, res) => {
    const {q} = req.query;
    const searchResult = await App.youTubeClient.searchVideos(q, 5);

    // @ts-ignore
    res.status(200).json(reduce(searchResult, (result, value) => {
      const item: IVideoItem = {
        videoId: value.id,
        title: value.title,
        thumbnail: value.thumbnails.default.url,
      };

      result.push(item);

      return result;
    }, []));
  },
};
